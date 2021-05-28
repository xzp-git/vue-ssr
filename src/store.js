import Vue from "vue";


import Vuex from "vuex";


const createStore = () => {
    let store = new Vuex.Store({
        state: {
            name: 'zhufeng'
        },
        mutations: {
            changeName(state,payload){
                state.name = payload
            }
        },
        actions:{
            changeName({commit}){
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        commit('changeName','xzp')
                        resolve()
                    },1000)
                })
            }
        }
    })
    if(typeof window != 'undefined' && window.__INITIAL_STATE__){
        // 浏览器开始渲染了
        store.replaceState(window.__INITIAL_STATE__) //用服务端加载好的数据去替换客户端的数据
    }
    return store
}
Vue.use(Vuex)
export default createStore

// 服务端使用Vuex 将数据保存到全局变量 window 浏览器用服务端渲染好的数据 进行替换