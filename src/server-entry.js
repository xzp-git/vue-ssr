// 服务端渲染

import createApp from "./app.js"




// 服务端渲染可以导出一个函数

export default ({url}) => { //服务端调用方法时会传入url属性
    // 此方法实在服务端调用的
    // 路由是异步组件所以这里我需要等待路由加载完毕
    
    // let { app, router } = createApp();
    // router.push(url) //表示永远跳转到  /   第一次没有问题 刷新会出问题
    // app 对应new Vue  并没有被路由管理  我希望等路由跳转完毕后 在进行服务端渲染

    //当用户访问了一个不存在的页面如何匹配到前端路由


    // return app //每次都能产生一个新的应用

    return new Promise((resolve, reject) => {
        let { app, router } = createApp();
        router.push(url)
        router.onReady(() => { //等待路由跳转完毕组件 已经准备好了触发
            const matchComponents = router.getMatchedComponents()
            if (matchComponents.length == 0) { //没有匹配到前端路由
                return  reject({code:404})
            }else{
                resolve(app)
            }
        })
    })


}

// 访问bar的时候 我在服务端直接进行了服务端渲染，渲染后的结果返回给了浏览器。  浏览器加载js脚本，
// 根据路径加载js脚本，用重新渲染了bar