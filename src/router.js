import Vue from 'vue'
import VueRouter from "vue-router"


// 前端路由 分为两种 hash 和 history
// 路由根据路径的不同渲染不同的页面，
// hash值特点是hash值变化不会导致页面重新渲染，我们可以监控hash值的变化显示对应的组件（可以产生历史记录）服务端不会获取到hash 
// hash不向路径 比较丑

// historyApi H5的Api 漂亮 问题是刷新时会产生404


Vue.use(VueRouter)