const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const index = require('./routes/index')
const jwt = require('jsonwebtoken')

// 错误处理程序
onerror(app)

// 中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/dist', {
//   extension: 'html'
// }))

//CORS 跨越处理
app.use(cors({
  origin: '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept',  'X-Token', 'Admin-Token']
}))


//验证 token
app.use(async (ctx, next) => {
  if(ctx.request.url !='/user/login'){
    try {
      let token = ctx.headers.token;
      if(token) {
          const payload = await jwt.verify(token, 'myqinxue_token');
      }
      await next();
    } catch(err) {
        ctx.body = {
          code: 50014,
          msg: '登录状态已过期，请重新登录验证！！'
        }
    }
  } else {
    await next();
  }
})

// 日志记录
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 路由
app.use(index.routes(), index.allowedMethods())

// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err)
});

module.exports = app
