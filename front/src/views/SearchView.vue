<template>
    <NavBar>
        <t-input v-model="input" placeholder="请输入内容" @enter="onEnter" style="width:300px;" />

        <t-space direction="vertical" style="margin-top: 2%;">
            <t-table row-key="index" :data="datas" :columns="columns" stripe bordered hover size="medium"
                :pagination="pagination" table-layout='fixed' show-header resizable lazy-load @row-click="gotoLink">
            </t-table>
        </t-space>
    </NavBar>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

const input = ref();

// 事件处理器，当用户在输入框中按Enter时触发
const onEnter = () => {
    fetchData(input.value); // 使用v-model绑定的input值作为参数
};

const datas = ref([]);

// 从API获取数据并更新表格
const fetchData = async (word) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/get_search', {
            params: {
                query: word
            },
        });
        if (response.data) {
            console.log(response)
            datas.value = response.data.map((item, index) => ({ // 修改这里，添加index
                title: item.name, // 根据后端返回的字段名更新
                url: item.url, // 根据后端返回的字段名更新
                ctime: item.created_at, // 根据后端返回的字段名更新
                source: item.source,
                index: index + 1
            }));
        }
        console.log(response)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const columns = ref([
    { colKey: 'index', title: '序号' }, // 添加序号列
    { colKey: 'title', title: '标题', ellipsis: true },
    { colKey: 'url', title: '链接', ellipsis: true },
    { colKey: 'source', title: '来源' },
    { colKey: 'ctime', title: '发生时间' }
]);

// 表格行点击事件，用于打开链接
const gotoLink = (e) => { // 修改这里，函数名首字母小写
    window.open(e.row.url, "_blank");
}

// 分页配置
const pagination = ref({
    defaultCurrent: 1,
    defaultPageSize: 6,
    total: 50
});

</script>
