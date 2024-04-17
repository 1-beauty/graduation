<!-- 词云 -->
<template>
    <NavBar>
        <div ref="chartContainer" style="width: 900px; height: 550px; margin-left: 60px;"></div>
    </NavBar>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import axios from 'axios';

export default {
    name: 'WordCloudChart',
    components: {
        NavBar,
    },
    data() {
        return {
            wordData: []
        };
    },
    mounted() {
        this.fetchWordData();
    },
    methods: {
        fetchWordData() {
            axios.get('http://127.0.0.1:8000/get_keyword/')
                .then(response => {
                    console.log(response.data.data)
                    this.wordData = response.data.data.map(item => ({
                        name: item.word,
                        value: item.hot
                    }));
                    this.initChart();
                })
                .catch(error => console.error('Error fetching word data:', error));
        },
        initChart() {
            const chart = echarts.init(this.$refs.chartContainer);
            chart.setOption({
                tooltip: {},
                series: [{
                    type: 'wordCloud',
                    shape: 'cardioid', // 心脏形状，形似心形
                    gridSize: 40,
                    sizeRange: [15, 25],
                    rotationRange: [-30, 30],
                    size: ['100%', '100%'],
                    drawOutOfBound: false,
                    layoutAnimation: true,
                    textStyle: {
                        normal: {
                            color: function () {
                                return 'rgb(' +
                                    Math.round(Math.random() * 255) +
                                    ', ' + Math.round(Math.random() * 255) +
                                    ', ' + Math.round(Math.random() * 255) + ')';
                            }
                        }
                    },
                    data: this.wordData
                }]
            });
        }
    }
};
</script>