const userModel = require('../models/User/userModel')
const RoleModel = require('../models/Role/RoleModel')
const jwt = require('jsonwebtoken')
const md5 = require('../common/index')
const svgCaptcha = require('svg-captcha')  // 引入验证码生成包
const solt = 'qinxuejiao' //md5加密索引可自行修改
const TotalData = require('./IndexController')
const Redis = require('../config/redis')
var paths = require('path');
const UUID = require('uuid') //生成唯一标识，作为文件名
const fs = require('fs')
const common = require('../common/index')

class userController {

    /**
     * 用户登录
    */
   static async userSignIn(ctx) {
        const req = ctx.request.body; //接收前端传值
        const data = await common.Decrypt(req.data)
        const qxCode = data.code
        const md5Pass = await md5.MD5(data.password, solt); //md5 加密处理
        data.password = md5Pass
        const user = await userModel.SignIn(data);
        let RedisCode = await Redis.get('textCode')
        let codeTime = await Redis.ttl('textCode') // 监听验证码过期时间
        if(codeTime <= 0)
        {
            return ctx.body = {
                code: -200,
                msg: '验证码已过期'
            };
        }
        if(qxCode === RedisCode)
        {
            if(user){
                if(user.state === 1)
                {
                    // Redis.del('textCode'); // 删除redis key值为textCode的数据
                    //生成 token
                    const token = jwt.sign(
                        {
                            username:data.username,
                            name: user.usernames,
                            role: user.role_id,
                            state: user.state
                        },
                        'myqinxue_token',{expiresIn: '2h'}
                    )
                    return ctx.body = {
                        code: 200,
                        msg: '登录成功',
                        token: token
                    }
                } else {
                    return ctx.body = {
                        code: -200,
                        msg: '账号已被禁用'
                    }
                }
            } else {
                return ctx.body = {
                    code: -200,
                    msg: '用户名或密码错误',
                    data: null
                };
            }
        } else {
            return ctx.body = {
                code: -200,
                msg: '验证码错误',
            };
        }
        
    }

    /**
     * 用户注销
    */
    static async logout(ctx) {
        ctx.body = {
            code:50008
        }
    }

    /**
     * 拉取用户信息
    */
    static async getUserInfo(ctx){
        let token = ctx.headers.token
        var username ;
        var permission = [];
        const payload = await jwt.verify(token, 'myqinxue_token')
        // const name  = payload.name
        // let total = await TotalData.Details(name)
        const user = await userModel.getInfo(payload.username);
        if(user){
            var menusID = user[0].roles_menu.menu_id.split(',')
            var PermissionsID = user[0].roles_permission.permission_id.split(',')
            const Menus = await userModel.getMenus(menusID);
            const Permissions = await userModel.getPermissions(PermissionsID);
            if(Menus && Permissions){
                for( var i=0; i < Menus.length; i++){
                    permission.push(Menus[i].power)
                }
                for( var i=0; i < Permissions.length; i++){
                    permission.push(Permissions[i].name)
                }
                let strPermission = await common.Encrypt(permission)
                let userInfo = await common.Encrypt(user[0])
                return ctx.body = {
                    code: 200,
                    data: userInfo,
                    permission: strPermission
                }
            }
        } else {
            ctx.body = {
                code: -200,
                msg: '用户不存在',
                data: null
            }
        }
    }

    /**
     * 用户列表 查询
    */
    static async userList(ctx) {
        const data = ctx.query
        const list = await userModel.getList(data)
        let res = []
        if(list){
            const RoleList = await RoleModel.getList() // 所有角色

            for(let i = 0; i < list.rows.length; i++)
            {
                for(let r = 0; r < RoleList.length; r++)
                {
                    if(list.rows[i].role_id === RoleList[r].id)
                    {
                        list.rows[i].roleName = RoleList[r].name
                        res.push({
                            avatar: list.rows[i].avatar,
                            id: list.rows[i].id,
                            phone: list.rows[i].phone,
                            role_id: list.rows[i].role_id,
                            state: list.rows[i].state,
                            username: list.rows[i].username,
                            usernames: list.rows[i].usernames,
                            email: list.rows[i].email,
                            createTime: list.rows[i].createTime,
                            roleName: RoleList[r].name,
                        })
                    }
                }
            }
            return ctx.body = {
                code: 200,
                data: res,
                total: list.count
            }
        }
    }

    /**
     * 删除用户
    */
    static async DeleteUser(ctx) {
        const id = ctx.params.id
        const Delete = await userModel.Delete(id)
        if(Delete){
            ctx.body = {
                code: 200,
                msg: '删除成功'
            }
        }
    }

    /**
     * 新增用户
    */
   static async AddUser(ctx) {
        const data = ctx.request.body;
        const md5Pass = await md5.MD5('123456', solt); //md5 加密处理
        data.password = md5Pass
        data.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';
        const queryUser = await userModel.getUserByName(data.username)
        if(queryUser){
            ctx.body = {
                code: 1,
                msg: '名称已被占用'
            }
        } else {
            const add = await userModel.addUser(data)
            if(add){
                ctx.body = {
                    code: 200,
                    msg: '添加成功',
                    data:add
                }
            }
        }
    }

    /**
     * 更新用户
    */
    static async editUser(ctx) {
        const data = ctx.request.body;
        const editData = await userModel.UpData(data)
        if(editData){
            ctx.body = {
                code: 200,
                msg: '修改成功'
            }
        }
    }

    /**
     * 验证用户密码
    */
    static async validPass(ctx) {
        const data = ctx.request.body;
        const md5Pass = await md5.MD5(data.password, solt); //md5 加密处理
        data.password = md5Pass
        const paw = await userModel.ValidPass(data);
        if(paw){
            ctx.body = {
                code:200,
                msg: '验证成功',
            }
        } else {
            ctx.body = {
                code:-200,
                msg: '验证失败',
            }
        }
        
    }

    /**
     * 更新用户密码
    */
    static async updatePass(ctx) {
        const data = ctx.request.body;
        const md5Pass = await md5.MD5(data.password, solt); //md5 加密处理
        data.password = md5Pass
        const upPass = await userModel.updatePass(data);
        if(upPass){
            ctx.body = {
                code: 200,
                msg: '修改成功，请重新登录'
            }
        } else {
            ctx.body = {
                code: -200,
                msg: '修改失败'
            }
        }
    }

    /**
     * 全部用户
    */
   static async getAllUsers(ctx) {
       const getTrue  = await userModel.AllUsers();
       if(getTrue){
           ctx.body = {
               code: 200,
               data: getTrue
           }
       }
   }

   /**
    * 上传头像
    */
   static async updateAvatar(ctx) {
       const file = ctx.request.files.file; // 获取上传文件
       // 创建可读流
       const reader = fs.createReadStream(file.path);
       // 图片名唯一标识
       const fileName = UUID.v1()
       // 获取上传文件扩展名
       let filePath = paths.join('./' + 'upload/images') + `/${fileName}.`+ file.name.split('.').pop();
       // 创建可写流
       const upStream = fs.createWriteStream(filePath);
       // 可读流通过管道写入可写流
       reader.pipe(upStream);
       let token = ctx.headers.token;
       const payload = await jwt.verify(token, 'myqinxue_token');
       const imgUrl = '/' + 'upload/images' + `/${fileName}.`+ file.name.split('.').pop();
       const upTrue = await userModel.upAvatar(imgUrl, payload.username);
       if(upTrue) {
           ctx.body = {
               code:200,
               msg: '上传成功'
           }
       }
   }

   /**
    * 用户登录验证码
    */
   static async getCode(ctx)
    {
        const code = svgCaptcha.create({
            size: 4, // 验证码长度
            width:160,
            height:52,
            fontSize: 50,
            ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
            noise: 0, // 干扰线条的数量
            color: false, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#fff' // 验证码图片背景颜色
        })
        let img = code.data // 验证码
        let text = code.text.toLowerCase() // 验证码字符，忽略大小写
        Redis.set('textCode', text) // 把验证码字符存入redis中
        Redis.expire('textCode', 60) // 验证码60s过期
        ctx.type = 'svg'
        return ctx.body = {
            result: img
        }
    }

}

module.exports = userController