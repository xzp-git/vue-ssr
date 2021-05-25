import Vue from "vue";
import App from "./App.vue";


// 每个用户访问服务器 都要产生一个新的实例，不能所有用户使用同一个实例
// 入口改装成了函数 目的是服务端渲染时 每次访问的时候都可以通过这个工厂函数返回一个全新的实例，保证每个人访问都可以拿到一个自己的实例
export default () => {
    const app =  new Vue({
        render: h => h(App)
    })
    return { 
        app
    }
}

// new Vue({
//     render: h => h(App)
// }).$mount('#app')