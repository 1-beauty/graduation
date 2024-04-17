<!-- 历史记录柱状图 -->
<template>
  <NavBar>
    <t-input v-model="input" placeholder="请输入内容（有默认值）" @enter="onEnter" style="width:300px;" />
    <div id="mychart" style="width: 950px;height: 400px;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;">
    </div>
  </NavBar>
</template>

<script>
import { onMounted, ref } from 'vue'
import NavBar from '@/components/NavBar.vue';
import * as echarts from 'echarts';
import axios from 'axios'


export default {
  name: 'HomeView',
  components: {
    NavBar,
  },
  setup() {
    const data = ref([])
    const input = ref('中国');
    onMounted(() => {
      // 获取数据
      axios.get('http://127.0.0.1:8000/get_history', {
        params: {
          query: input.value
        }
      }).then(response => {
        // 确保API调用成功，并且数据格式正确
        if (response.data.result === "success" && Array.isArray(response.data.data)) {
          data.value = response.data.data;
        } else {
          console.error('Invalid API response:', response.data);
          data.value = []; // 设置为空数组以避免渲染错误
        }
        renderChart(); // 获取到数据后渲染柱状图
      })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    })

    const renderChart = () => {
      if (!Array.isArray(data.value)) {
        console.error("Expected data.value to be an array, received:", data.value);
        return; // 不是数组时不执行渲染
      }

      var myChart = echarts.init(document.getElementById('mychart'));
      var option = {
        tooltip: {
          trigger: 'axis',  // 坐标轴触发，适用于柱状图
          axisPointer: {  // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'  // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var date = params[0].name;  // 获取日期
            var totalHot = params[0].value;  // 获取热度值
            return date + '<br/>总热度: ' + totalHot.toLocaleString();  // 格式化显示文本
          }
        },
        xAxis: {
          type: 'category',
          data: data.value.map(item => item.date), // x轴为日期
          axisLabel: { interval: 0, rotate: 30 }
        },
        yAxis: {
          type: 'value' // y轴为数值类型
        },
        series: [{
          type: 'bar',
          data: data.value.map(item => item.total_hot), // y轴数据为总热度
          showBackground: true, // 显示条形背景（可选）
          backgroundStyle: { // 背景样式（可选）
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
      };
      myChart.setOption(option); // 设置ECharts配置项
    };


    const onEnter = (val) => {
      axios.get('http://127.0.0.1:8000/get_history', {
        params: {
          query: val
        }
      }).then(response => {
        console.log("Updated data:", response.data);  // 打印更新后的数据
        if (response.data.result === "success" && Array.isArray(response.data.data)) {
          data.value = response.data.data;
          renderChart(); // 获取到数据后重新渲染柱状图
        } else {
          console.error('Invalid API response or no data:', response.data);
          data.value = []; // 防止错误数据影响图表显示
        }
      })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
    };


    return {
      data, // 返回响应式数据以供模板使用
      input,
      onEnter,
    }
  }
}
</script>
