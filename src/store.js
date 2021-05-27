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
                        commit('changeName','jiangwen')
                        resolve()
                    },1000)
                })
            }
        }
    })
    return store
}
Vue.use(Vuex)
export default createStore

// 服务端使用Vuex 将数据保存到全局变量 window 浏览器用服务端渲染好的数据 进行替换