const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const onerror = require('koa-onerror')
const middleware = require('./middleware')
const router = require('./router/index')

// 中间件
middleware(app)

// 错误处理程序
onerror(app)

// 日志记录
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 路由
app.use(router.routes())

// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err)
});


module.exports = app
