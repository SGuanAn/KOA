const Mysql = require('../config/db');
const User = Mysql.import('../schema/admin')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const RolesMenus = Mysql.import('../schema/roles_menus')
const Menus = Mysql.import('../schema/menu')
const Permission = Mysql.import('../schema/permission')
const RolesPermissions = Mysql.import('../schema/roles_permissions')

class UserModel {
    /**
     * 创建用户模型
    */
    static async addUser(data) {
        console.log(data.createTime)
        return await User.create({
            username: data.username,
            password: data.password,
            usernames: data.usernames,
            introduction: data.introduction,
            avatar: data.avatar,
            role_id: data.roleId,
            phone: data.phone,
            email: data.email,
            createTime: data.createTime
        })
    }

    /**
     * 更新用户模型
    */
    static async UpData(data) {
        return await User.update(
            {
                username: data.username,
                usernames: data.usernames,
                introduction: data.introduction,
                role_id: data.roleId,
                phone: data.phone,
                email: data.email
            },
            {
                where: {
                    id: data.id
                }
            }
        );
    }

    /**
     * 查询 用户名 
    */
    static async getUserByName(username) {
        return await User.findOne({
            where: { username }
        });
    }

    /**
     * 验证用户密码 
    */
    static async ValidPass(data) {
        return await User.findOne({
            where: {
                username: data.username,
                password: data.password
            }
        });
    }

    /**
     * 更新 密码 
    */
   static async updatePass(data) {
        return await User.update(
            { password: data.password },
            {
                where:{ username: data.username }
            }
        );
    }

    /**
     * 登录 用户 密码 查询
    */
   static async SignIn(data) {
        return await User.findOne({
            where: {
                username:data.username,
                password:data.password
            }
        });
    }

    /**
     * 用户信息
    */
   static async getInfo(name) {
        User.belongsTo(RolesMenus, { targetKey:'role_id', foreignKey: 'role_id'})
        User.belongsTo(RolesPermissions, { targetKey:'role_id', foreignKey: 'role_id'})
        return await User.findAll({
            where: {
                username: name
            },
            attributes: ['id', 'username', 'avatar', 'introduction', 'createTime', 'phone', 'email', 'usernames', 'role_id'],
            include:[
                {
                    model: RolesMenus,
                    attributes: ['menu_id'],
                },
                {
                    model: RolesPermissions,
                    attributes: ['permission_id'],
                },
            ]
        })
    }

    /**
     * 菜单权限查询
    */
    static async getMenus(id) {
        return await Menus.findAll({
            attributes: ['power'],
            where: {
                id: {
                    [Op.in]: id
                }
            },
        })
    }

    /**
     * 菜单权限查询
    */
   static async getPermissions(id) {
        return await Permission.findAll({
            attributes: ['name'],
            where: {
                id: {
                    [Op.in]: id
                }
            },
        })
    }

    /**
     * 分页列表
    */
    static async getList(data) {
        var limit = parseInt(data.limit);
        var page = parseInt(data.page);
        var searchVal = data.keyWord
        if(searchVal == ''){
                return await User.findAndCountAll({
                    order: [
                        ['createTime', 'DESC']
                    ],
                    limit: limit,
                    offset: (page - 1) * limit
                })
        } else {
                return await User.findAndCountAll({
                    order: [
                        ['createTime', 'DESC']
                    ],
                    where: {
                        [Op.or]: [
                            {
                                username:{[Op.like]: `%${searchVal}%`}
                            },
                            {
                                usernames:{[Op.like]: `%${searchVal}%`}
                            }
                        ]
                    },
                    limit: limit,
                    offset: (page - 1) * limit
                })
        }
    }

    /**
     * 删除用户
    */
    static async Delete(id) {
        return await User.destroy({
            where: {
                id: id
            }
        })
    }

    /**
     * 用户信息
    */
   static async AllUsers() {
       return await User.findAll({
           attributes:[
               'id',
               'usernames'
           ]
       })
   }

    /**
     * 头像上传
    */
   static async upAvatar(imgUrl, username) {
        return await User.update(
            { avatar: imgUrl },
            {
                where: { username: username }
            }
        )
    }

}

module.exports = UserModel;