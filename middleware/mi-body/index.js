/**
 * 返回客户端数据处理中间件
 */
const common = require('../../common')

module.exports = () => {
    // function render(json) {
    //     this.set("Content-Type", "application/json")
    //     this.body = JSON.stringify(json)
    // }
    return async (ctx, next) => {
        console.log(ctx.res)
        ctx.body = await common.Encrypt(ctx.body)
        console.log("加密返回值：" + ctx.body)
        await next()
    }
}