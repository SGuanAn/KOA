const jwt = require('jsonwebtoken')

class Verification
{
    /**
     * 验证 token
     * @param {*} ctx 
     * @param {*} next 
     */
    static async Token(ctx, next)
    {
        if(ctx.request.url !='/user/login' && ctx.request.url !='/code'){
            try {
              let token = ctx.headers.token;
              if(token) {
                  const payload = await jwt.verify(token, 'myqinxue_token');
                  
              } else {
                return ctx.body = {
                    code: 404,
                    msg: '非法访问'
                }
              }
              await next();   
            } catch(err) {
                return ctx.body = {
                  code: 50014,
                  msg: '登录状态已过期，请重新登录验证！！'
                }
            }
          } else {
            await next();
        }
    }

    /**
     * 身份验证
     */
    static async Authentication(ctx, next)
    {
      
    }

}

module.exports = Verification