const router = require('koa-router')()
const multer = require('koa-multer')
const UUID = require('uuid') //生成唯一标识，作为文件名
const userController = require('../controller/userController')
const RoleController = require('../controller/RoleController')
const PermissionController = require('../controller/PermissionController')
const AlldataController = require('../controller/AlldataController')
const ReceiveController = require('../controller/ReceiveController')
const standardController = require('../controller/standardController')
const IntegralController = require('../controller/IntegralController')

const storage = multer.diskStorage({
    destination(req,file,cb){
      cb(null, 'upload/images')
    },
    filename(req,file,cb){
      const extName = file.originalname.slice(file.originalname.lastIndexOf('.'))
      const fileName = UUID.v1()
      cb(null, fileName + extName);
    }
  })
  
  const upload = multer({storage});


/**
 * 用户
**/
router.post('/user/login', userController.userSignIn) //用户登录
router.post('/user/logout', userController.logout); //用户注销
router.get('/user/info', userController.getUserInfo) //获取用户信息
router.get('/user/list', userController.userList) //查询用户列表
router.get('/user/AllUsers', userController.getAllUsers) //全部用户
router.post('/user/adduser', userController.AddUser) //添加用户
router.put('/user/editUser', userController.editUser) //更新用户
router.post('/user/validPass', userController.validPass); //验证用户密码
router.put('/user/updatePass', userController.updatePass); //修改用户密码
router.delete('/deleteUser/:id', userController.DeleteUser) //删除用户
router.post('/user/updateAvatar', upload.single('file'), userController.updateAvatar); //头像上传


/**
 * 角色
**/
router.get('/roleAll', RoleController.RoleList) //角色全部列表
router.get('/roles', RoleController.queryRoles); //查询分页  角色
router.put('/role/editRole', RoleController.editRole); //更新角色信息
router.post('/role/addRole', RoleController.addRole); //添加角色
router.delete('/delete/roles/:id', RoleController.deleteRole); //删除角色

/**
 * 权限
**/
router.get('/menu/tree', PermissionController.getMenuTree); //全部菜单树
router.get('/permissions/tree', PermissionController.getPermissionTree); //全部按钮权限树
router.get('/roles/power', PermissionController.getRolePower); //获取角色所有权限
router.put('/edit/power', PermissionController.editPower); //编辑角色权限

/**
 * 所有数据
**/
router.get('/alldata/getList', AlldataController.getList); // 查询列表
router.delete('/alldata/delete', AlldataController.delete); // 删除
router.post('/alldata/add', AlldataController.addData); // 添加
router.put('/alldata/edit', AlldataController.edit); // 更新
router.post('/alldata/receive', AlldataController.Receive); // 领取
router.post('/alldata/branch', AlldataController.Distribution); // 分配
router.post('/alldata/excel', AlldataController.ImportExcel); // 导入Excel
/**
 * 领取数据
**/
router.get('/Receive/listData', ReceiveController.ReceiveList); // 查询列表

/**
 * 标准客户
**/
router.get('/standard/waitList', standardController.WaitList); // 待录列表 查询
router.post('/standard/checkData', standardController.checkData); // 步骤 => 核对资料
router.get('/standard/checkList', standardController.checkList); // 核对列表 查询
router.post('/standard/inspect', standardController.InspectData); // 步骤 => 已体检
router.get('/standard/inspectList', standardController.InspectList); // 已体检列表 查询
router.post('/standard/examine', standardController.ExamineData); // 步骤 => 一审
router.get('/standard/examineList', standardController.ExamineList); // 一审列表 查询
router.post('/standard/adopt', standardController.AdoptData); // 步骤 => 审批通过
router.get('/standard/adoptList', standardController.AdoptList); // 审批通过列表 查询
router.post('/standard/migration', standardController.MigrationData); // 步骤 => 办理准迁证
router.get('/standard/migrationList', standardController.MigrationList); // 办理准迁证列表 查询
router.post('/standard/transfer', standardController.TransferData); // 步骤 => 办理迁移证
router.get('/standard/transferList', standardController.TransferList); // 办理迁移证列表 查询
router.post('/standard/customer', standardController.CustomerData); // 步骤 => 办理身份证
router.get('/standard/customerList', standardController.CustomerList); // 办理身份证列表 查询
router.post('/standard/end', standardController.EndData); // 步骤 => 已办理完结
router.get('/standard/endList', standardController.EndList); // 已办理完结列表 查询

/**
 * 积分客户
**/
router.get('/Integral/waitList', IntegralController.WaitList); // 待录列表 查询
router.post('/Integral/checkData', IntegralController.checkData); // 步骤 => 核对资料
router.get('/Integral/checkList', IntegralController.checkList); // 核对列表 查询
router.post('/Integral/inspect', IntegralController.InspectData); // 步骤 => 已体检
router.get('/Integral/inspectList', IntegralController.InspectList); // 已体检列表 查询
router.post('/Integral/examine', IntegralController.ExamineData); // 步骤 => 一审
router.get('/Integral/examineList', IntegralController.ExamineList); // 一审列表 查询
router.post('/Integral/adopt', IntegralController.AdoptData); // 步骤 => 审批通过
router.get('/Integral/adoptList', IntegralController.AdoptList); // 审批通过列表 查询
router.post('/Integral/migration', IntegralController.MigrationData); // 步骤 => 办理准迁证
router.get('/Integral/migrationList', IntegralController.MigrationList); // 办理准迁证列表 查询
router.post('/Integral/transfer', IntegralController.TransferData); // 步骤 => 办理迁移证
router.get('/Integral/transferList', IntegralController.TransferList); // 办理迁移证列表 查询
router.post('/Integral/customer', IntegralController.CustomerData); // 步骤 => 办理身份证
router.get('/Integral/customerList', IntegralController.CustomerList); // 办理身份证列表 查询
router.post('/Integral/end', IntegralController.EndData); // 步骤 => 已办理完结
router.get('/Integral/endList', IntegralController.EndList); // 已办理完结列表 查询


module.exports = router
