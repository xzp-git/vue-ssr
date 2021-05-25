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
        render.renderToString((err, html) => {
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

app.use(static(path.resolve(__dirname,'dist')))
app.use(router.routes())
app.listen(3000)