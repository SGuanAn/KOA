const Mysql = require('../config/db');
const User = Mysql.import('../schema/admin')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Roles = Mysql.import('../schema/roles')
const RolesMenus = Mysql.import('../schema/roles_menus')
const Menus = Mysql.import('../schema/menu')
const Permission = Mysql.import('../schema/permission')
const RolesPermissions = Mysql.import('../schema/roles_permissions')

class PermissionModel {

    /**
     * 查询菜单
     */
    static async MenuTree() {
        return await Menus.findAll({
            attributes: ['id', 'name', 'pid']
        })
    }

    /**
     * 查询按钮
     */
    static async PermissionTree() {
        return await Permission.findAll({
            attributes: ['id', 'alias', 'pid']
        })
    }

    /**
     * 角色所有菜单权限
     */
    static async RoleMenu(data) {
        if(data) {
            return await RolesMenus.findOne({
                where: {
                    role_id: data
                }
            })
        } else {
            return await RolesMenus.findAll({})
        }
    }

    /**
     * 角色所有按钮权限
     */
    static async RolePermission(data) {
        if(data) {
            return await RolesPermissions.findOne({
                where: {
                    role_id: data
                }
            })
        } else {
            return await RolesPermissions.findAll({})
        }
    }

    /**
     * 创建菜单权限模型
     */
    static async addMenu(role_id, menusId) {
        return await RolesMenus.create({
            role_id: role_id,
            menu_id: menusId
        })
    }

    /**
     * 更新菜单权限模型
     */
    static async upMenu(role_id, menusId) {
        return await RolesMenus.update(
            {
                menu_id: menusId
            },
            {
                where: {
                    role_id: role_id,
                }
            }
        )
    }

    /**
     * 创建按钮权限
     */
    static async addPermission(role_id, permissionId) {
        return await RolesPermissions.create({
            role_id: role_id,
            permission_id: permissionId
        })
    }

    /**
     * 更新按钮权限
     */
    static async upPermission(role_id, permissionId) {
        return await RolesPermissions.update(
            {
                permission_id: permissionId
            },
            {
                where: {
                    role_id: role_id,
                }
            }
        )
    }
}

module.exports = PermissionModel