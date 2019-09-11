const miBody = require('./mi-body/index')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body');
const Verification = require('./Verification')
const cors = require('koa2-cors')


/**
 * 集中调用所有的中间件
 */


module.exports = (app) => {
    // 对返回数据进行加密处理
    // app.use(miBody())

    //CORS 跨越处理
    app.use(cors({
        origin: 'admin.qqxxrh.com',
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept',  'X-Token', 'Admin-Token']
    }));

    app.use(Verification.Token); // 验证token

    app.use(koaBody({
        multipart: true,
    }));

    app.use(bodyparser({
        enableTypes:['json', 'form', 'text']
    }));

    app.use(json());
    app.use(logger());



}