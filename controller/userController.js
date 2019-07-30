const userModel = require('../models/User/userModel')
const jwt = require('jsonwebtoken')
const md5 = require('../common/index')
const solt = 'qinxuejiao' //md5加密索引可自行修改

class userController {

    /**
     * 用户登录
    */
   static async userSignIn(ctx) {
        const data = ctx.request.body; //接收前端传值
        console.log(data)
        const md5Pass = await md5.MD5(data.password, solt); //md5 加密处理
        data.password = md5Pass
        const user = await userModel.SignIn(data);
        if(user){
            //生成 token
            const token = jwt.sign(
                {
                    username:data.username
                },
                'myqinxue_token',{expiresIn: '2h'}
            )
            ctx.body = {
                code: 20000,
                message: '登录成功',
                token: token
            }
        } else {
            ctx.body = {
                code: -20000,
                message: '用户名或密码错误',
                data: null
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
        try{
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
                    ctx.body = {
                        code: 200,
                        data: user[0],
                        permission: permission
                    }
                }
            } else {
                ctx.body = {
                    code: -200,
                    message: '用户不存在',
                    data: null
                }
            }
        } catch (err){
            ctx.body = {
                code: 401,
                message: 'token过期，请重新登录'
            }
        }
    }

    /**
     * 用户列表 查询
    */
    static async userList(ctx) {
        const data = ctx.query
        const list = await userModel.getList(data)
        if(list){
            ctx.body = {
                code: 200,
                data: list.rows,
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
       const file = ctx.req.file; // 获取上传文件
       let token = ctx.headers.token;
       const destination = file.destination
       const filename = file.filename
       const payload = await jwt.verify(token, 'myqinxue_token');
       const imgUrl = '/' + destination + '/' + filename
       console.log(imgUrl)
       const upTrue = await userModel.upAvatar(imgUrl, payload.username);
       if(upTrue) {
           ctx.body = {
               code:200,
               msg: '上传成功'
           }
       }
   }

}

module.exports = userController