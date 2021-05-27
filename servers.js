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

// 1.服务端渲染的核心是解析vue的实例 生成一个字符串返回给浏览器

// 通过 webpack打包 返回了一个函数 函数执行的结果是一个promise -> vue 实例

// createBundleRender（去调用函数获取实例） 找到webpack打包后的后的函数 内部会调用这个函数获取到vue的实例
// renderToString(vm)【根据实例生成一个字符串】 生成一个字符串，返回个一个浏览器

// node目的是可以解析js语法 可以将vue的实例渲染成字符串
// 默认直接通过url 回车输入 -> 访问的都是服务端(通过的是服务端渲染)
// 后续操作是根据浏览器的api进行跳转的

// 只有首屏算是seo  所有页面直接访问都具有服务端渲染 只是我们第一次加载的页面是服务端渲染的 后续透过前端路由

// 数据在前端还是后端请求  需要看你使用的场景  如果你希望html加载的内容很快被显示 那就在服务端， 如果是后续点击按钮 其他逻辑 可以使用前端请求

