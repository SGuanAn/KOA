const RoleModel = require('../models/RoleModel')

class RoleController {

    /**
     * 所有角色列表
    */
    static async RoleList(ctx) {
        const list = await RoleModel.getList()
        if(list){
            ctx.body = {
                code: 200,
                data: list
            }
        }
    }

    /**
     * 查询列表分页
    */
    static async queryRoles(ctx) {
        const data = ctx.query;
        const list = await RoleModel.queryList(data);
        if(list){
            ctx.body = {
                code: 200,
                data: list.rows,
                total: list.count
            }
        }
    }

    /**
     * 更新角色信息
     */
    static async editRole(ctx) {
        const data = ctx.request.body;
        const updata = await RoleModel.UpRoles(data);
        if(updata) {
            ctx.body = {
                code: 200,
                msg: '修改成功'
            }
        } else {
            ctx.body = {
                code: -200,
                msg: '修改失败'
            }
        }
    }

    /**
     * 添加角色
     */
    static async addRole(ctx) {
        const data = ctx.request.body;
        //查询当前用户是否存在
        const queryRole = await RoleModel.queryName(data.name);
        if(queryRole) {
            ctx.body = {
                code: -1,
                msg: '名称已被占用'
            }
        } else {
            const addData = await RoleModel.addRole(data);
            if(addData) {
                ctx.body = {
                    code: 200,
                    msg: '添加成功'
                }
            } else {
                ctx.body = {
                    code: -200,
                    msg: '添加失败'
                }
            }
        }
    }

    /**
     * 删除角色
     */
    static async deleteRole(ctx) {
        const id = ctx.params.id
        const Delete = await RoleModel.Delete(id)
        if(Delete){
            ctx.body = {
                code: 200,
                msg: '删除成功'
            }
        } else {
            ctx.body = {
                code: -200,
                msg: '删除失败'
            }
        }
    }

    
}

module.exports = RoleController