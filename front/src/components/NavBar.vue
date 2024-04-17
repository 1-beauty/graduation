<template>
  <t-layout style="height: 95vh;">
    <t-aside>
      <t-menu theme="light" default-value="dashboard" style="margin-right: 40px" height="90px" @change="changeHandler">
        <template #logo>
          <img height="28" src="https://tdesign.gtimg.com/site/baseLogo-light.png" alt="logo" />
        </template>
        <t-menu-item value="dashboard" style="height: 60px; font-size: 15px;">
          <template #icon>
            <t-icon name="dashboard" />
          </template>
          <router-link class="navbar-brand" :to="{ name: 'TableView', params: {} }">热搜数据展示</router-link>
        </t-menu-item>
        <t-menu-item value="resource" style="height: 60px; font-size: 15px;">
          <template #icon>
            <t-icon name="server" />
          </template>
          <router-link class="navbar-brand" :to="{ name: 'SearchView', params: {} }">搜索热搜</router-link>
        </t-menu-item>
        <t-menu-item value="root" style="height: 60px; font-size: 15px;">
          <template #icon>
            <t-icon name="history-setting" />
          </template>
          <router-link class="navbar-brand" :to="{ name: 'HistoryView', params: {} }">热搜历史</router-link>
        </t-menu-item>
        <t-menu-item value="control-platform" style="height: 60px; font-size: 15px;">
          <template #icon>
            <t-icon name="cloud" />
          </template>
          <router-link class="navbar-brand" :to="{ name: 'CloudView', params: {} }">热搜词云</router-link>
        </t-menu-item>
        <t-menu-item value="ne" style="height: 60px; font-size: 15px;">
          <template #icon>
            <t-icon name="chat" />
          </template>
          <router-link class="navbar-brand" :to="{ name: 'SpeakView', params: {} }">吐槽留言</router-link>
        </t-menu-item>
      </t-menu>
    </t-aside>
    <t-layout>
      <t-header>
        <t-head-menu v-model="menu1Value" theme="light" @change="changeHandler">
          <t-menu-item value="item1" style="font-family: STXingkai; font-size: 30px; ">
            热搜分析平台
          </t-menu-item>
          <template #operations>
            <t-button variant="text" shape="square">
              <template #icon><t-icon name="logo-github" /></template>
            </t-button>
          </template>
        </t-head-menu>
      </t-header>
      <t-content style="margin:25px">
        <div style="position: relative;height: 100%;">
          <t-card style="height: 100%; border-radius: 30px;">
            <slot>

            </slot>
          </t-card>
        </div>

      </t-content>
    </t-layout>
  </t-layout>
</template>

<script script setup>
const changeHandler = (active) => {
  console.log('change', active);
};
</script>
