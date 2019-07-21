const Mysql = require('../config/db');
const User = Mysql.import('../schema/admin')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Roles = Mysql.import('../schema/roles')
const RolesMenus = Mysql.import('../schema/roles_menus')
const Menus = Mysql.import('../schema/menu')
const Permission = Mysql.import('../schema/permission')
const RolesPermissions = Mysql.import('../schema/roles_permissions')

class RoleModel {
    /**
     * 列表查询
    */
    static async getList() {
        return await Roles.findAll({})
    }

    /**
     * 角色名称 查询
    */
   static async queryName(name) {
        return await Roles.findOne({
            where: {
                name: name
            }
        })
    }

    /**
     * 查询分页
    */
   static async queryList(data) {
        var limit = parseInt(data.limit);
        var page = parseInt(data.page);
        var searchVal = data.keyWord
        if(searchVal == ''){
                return await Roles.findAndCountAll({
                    // order: [
                    //     ['id', 'DESC']
                    // ],
                    limit: limit,
                    offset: (page - 1) * limit
                })
        } else {
                return await Roles.findAndCountAll({
                    order: [
                        ['createTime', 'DESC']
                    ],
                    where: {
                        [Op.or]: [
                            {
                                name:{[Op.like]: `%${searchVal}%`}
                            },
                            {
                                remark:{[Op.like]: `%${searchVal}%`}
                            }
                        ]
                    },
                    limit: limit,
                    offset: (page - 1) * limit
                })
        }
    }

    /**
     * 更新角色模型
     */
    static async UpRoles(data) {
        return await Roles.update(
            {
                name: data.name,
                remark: data.remark,
                dataScope: data.dataScope,
                createTime: data.createTime
            },
            {
                where: { id: data.id }
            }
        )
    }

    /**
     * 创建角色模型
     */
    static async addRole(data) {
        return await Roles.create(
            {
                name: data.name,
                remark: data.remark,
                dataScope: data.dataScope,
                createTime: data.createTime
            }
        )
    }

    /**
     * 删除角色模型
     */
    static async Delete(id) {
        return await Roles.destroy({
            where: {
                id: id
            }
        })
    }


}

module.exports = RoleModel;