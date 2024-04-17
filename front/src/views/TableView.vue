<!-- 新闻表格展示 -->
<template>
    <NavBar>
        <t-select showArrow placeholder="选择新闻来源" @change="handleRowClick" size="medium" style="width: 30%;">
            <t-option key="internet" label="互联网新闻" value="internet" />
            <t-option key="world" label="国际新闻" value="world" />
            <t-option key="chine" label="国内新闻" value="chine" />
            <t-option key="social" label="社会新闻" value="social" />
        </t-select>

        <t-space direction="vertical" style="margin-top: 2%;">
            <!-- 当数据为空需要占位时，会显示 cellEmptyContent -->
            <t-table row-key="index" :data="datas" :columns="columns" stripe="true" bordered="true" hover="true"
                size="medium" :pagination="pagination" show-header="true" cell-empty-content="-" resizable lazy-load
                @row-click="goto_link">
            </t-table>
        </t-space>
    </NavBar>
</template>

<script setup lang="jsx">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Qs from 'qs';
import NavBar from '@/components/NavBar.vue';

let datas = ref([]);
const keys = {
    wr: "543f3e1a83c8bf95e6acffdc1dda1d68",
    cmh: "791f9198faac27a41523535bf0af46f9",
}

const urls = {
    internet: "https://apis.tianapi.com/internet/index",  // 互联网新闻
    world: "https://apis.tianapi.com/world/index",  // 国际新闻
    chine: "https://apis.tianapi.com/guonei/index",  // 国内新闻
    social: "https://apis.tianapi.com/social/index",  // 社会新闻
}

const fetchData = async (url, key) => {
    try {
        const response = await axios({
            method: 'post',
            url: url,
            data: Qs.stringify({ key: key, num: '50' }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        datas.value = response.data.result.newslist;
        datas.value.forEach((dictionary, i) => {
            dictionary.index = i + 1;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
// 将 fetchData 函数作为参数传递给 onMounted
onMounted(() => {
    fetchData(urls.internet, keys.wr);
});


const columns = ref([
    { colKey: 'title', title: '标题', },
    { colKey: 'url', title: '链接', ellipsis: true },
    { colKey: 'description', title: '详情', ellipsis: true },
    { colKey: 'ctime', title: '发生时间' },
]);

// 切换数据来源
const handleRowClick = async (e) => {
    switch (e) {
        case 'internet':
            fetchData(urls.internet, keys.wr);
            break;
        case 'world':
            fetchData(urls.world, keys.wr);
            break;
        case 'chine':
            fetchData(urls.chine, keys.cmh);
            break;
        case 'social':
            fetchData(urls.social, keys.cmh);
            break;
    }
};

// 跳转链接
const goto_link = (e) => {
    window.open(e.row.url, "_blank");
}

const pagination = {
    defaultCurrent: 1,
    defaultPageSize: 6,
    total: 50,
};
</script>