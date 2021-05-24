const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const Vue = require('vue')
const VueServerRenderer = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')
const vm = new Vue({
    data(){
        return{
            name:'xzp'
        }
    },
    template:'<div>hello{{name}}</div>'
})
const template = fs.readFileSync(path.resolve(__dirname,'template.html'),'utf8')
router.get('/', async (ctx) => {
    // 当用户访问/路径时 需要讲渲染的字符串插入到末班中
    ctx.body = await VueServerRenderer.createRenderer({
        template
    }).renderToString(vm)
}) 








app.use(router.routes())



app.listen(3000,function(){
    console.log(3000);
})