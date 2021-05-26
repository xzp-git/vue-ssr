const Koa = require('koa')
const app = new Koa();
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const VueServerRenderer = require('vue-server-renderer');
const  static = require('koa-static')

const serverBundle = fs.readFileSync(path.resolve(__dirname, 'dist/server.bundle.js'), 'utf8')
const template = fs.readFileSync(path.resolve(__dirname, 'dist/server.html'), 'utf8')


const render = VueServerRenderer.createBundleRenderer(serverBundle, {
    template
})

router.get('/', async (ctx) => {
    ctx.body = await new Promise((resolve, reject) => {
        render.renderToString({url:ctx.url},(err, html) => {
            if (err) {
                reject(err)
            }
            resolve(html)
        })
    })
    //   const html = await render.renderToString()
    //   console.log(html);
    // 如果想让css生效 只能使用回调的方式
})
// 当用户访问一个不存在的服务端路径，我就返回给你首页，你通过前端的js渲染的时候，会重新根据路径
// 渲染组件
//只要用户刷新就会像 服务器发请求
router.get('/(.*)', async (ctx) => {
    ctx.body = await new Promise((resolve, reject) => {
        render.renderToString({url:ctx.url},(err, html) => { //通过服务器端渲染渲染后返回 
            if (err && err.code == 404) resolve(`not found`)
            resolve(html)
        })
    })
})

// 默认先查找静态文件 没有再找 /  路径

app.use(static(path.resolve(__dirname,'dist')))  //顺序问题  
app.use(router.routes())

// 保证先走自己定义的路由再找静态文件
app.listen(3000)