const Koa  = require('koa')
const app  = new Koa()
const router = require('koa-router')
app.use(async (ctx, next) => {
    ctx.body = 'hello imooc!'
    ctx.header = 'content-type:html'
})

app.listen(3000)