// 服务端渲染

import createApp from "./app.js"




// 服务端渲染可以导出一个函数

export default () => {
    // 此方法实在服务端调用的
    console.log("ffffffffffffffff");
    let { app } = createApp();
    return app //每次都能产生一个新的应用
}