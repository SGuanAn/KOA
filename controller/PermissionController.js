const PermissionModel = require('../models/PermissionModel')

class PermissionController {
    /**
     * 获取所有菜单树
     */
    static async getMenuTree(ctx) {
        const treeAll = [];
       const Tree = await PermissionModel.MenuTree();
       if(Tree){
            for (var i = 0; i < Tree.length; i++) {
                if(Tree[i].pid === 0){
                    treeAll.push({
                        id: Tree[i].id,
                        label: Tree[i].name,
                        children: []
                    })
                }
                for(var j=1;j<treeAll.length;j++){
                    if(Tree[i].pid == treeAll[j].id){
                        treeAll[j].children.push({
                            id: Tree[i].id,
                            label: Tree[i].name,
                        })
                    }
                }
            }
           ctx.body = {
               data: treeAll
           }
       }
    }

    /**
     * 获取所有按钮树
     */
    static async getPermissionTree(ctx) {
        const treeAll = [];
        const Tree = await PermissionModel.PermissionTree();
        if(Tree){
                for (var i = 0; i < Tree.length; i++) {
                    if(Tree[i].pid === 0){
                        treeAll.push({
                        id: Tree[i].id,
                        label: Tree[i].alias,
                        children: []
                    })
                    }
                    for(var j=0;j<treeAll.length;j++){
                        if(Tree[i].pid == treeAll[j].id){
                            treeAll[j].children.push({
                                id: Tree[i].id,
                                label: Tree[i].alias,
                            })
                        }
                    }
                }
            ctx.body = {
                data: treeAll
            }
        }
    }

    /**
     * 获取角色所有权限
     */
    static async getRolePower(ctx) {
        const Menu = await PermissionModel.RoleMenu();
        const Permission = await PermissionModel.RolePermission();
        if(Menu && Permission){
            ctx.body = {
                code: 200,
                menuId: Menu,
                permissionId: Permission
            }
        }
    }

    /**
     * 编辑角色权限
     */
    static async editPower(ctx) {
        const data = ctx.request.body
        const role_id = data.role_id
        const menus = data.menus
        const permissions = data.permissions
        var menusArr = []
        var permissionsArr = []
        //把前端传过来的权限数组转换成字符串
        if(menus[0] == undefined){
            menus.menu_id = ''
            var menusId = menus.menu_id
        } else {
            for(var i = 0; i < menus.length; i++){
                menusArr.push( menus[i].menu_id )
                var menusId = menusArr.toString()
            }
        }
        if(permissions[0] == undefined){
            permissions.permission_id = ''
            var permissionId = permissions.permission_id
        } else {
            for(var i=0;i<permissions.length;i++){
                permissionsArr.push(permissions[i].permission_id)
                var permissionId = permissionsArr.toString()
            }
        }
        // 查询数据库此角色是否存在权限
        const queryMenu = await PermissionModel.RoleMenu(role_id); 
        if(queryMenu){
            console.log('1')
            //此角色在菜单权限中存在权限 => 更新
           const edit = await PermissionModel.upMenu(role_id, menusId);
           ctx.body = {
               code: 200,
               msg: '修改成功'
           }
        } else {
            console.log('2')
            //此角色在菜单权限中没有权限 => 创建
            const addMenu = await PermissionModel.addMenu(role_id, menusId);
            ctx.body = {
                code: 200,
                msg: '创建成功'
            }
        }
        // 查询数据库此角色是否存在权限
        const queryPermission = await PermissionModel.RolePermission(role_id);
        if(queryPermission){
            //此角色在按钮权限中存在权限 => 更新
           const edit = await PermissionModel.upPermission(role_id, permissionId);
           ctx.body = {
               code: 200,
               msg: '修改成功'
           }
        } else {
            //此角色在按钮权限中没有权限 => 创建
            const addPerm = await PermissionModel.addPermission(role_id, permissionId);
            ctx.body = {
                code: 200,
                msg: '创建成功'
            }
        }
    }
}

module.exports = PermissionController