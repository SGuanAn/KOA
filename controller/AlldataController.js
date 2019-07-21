const AlldataModel = require('../models/AlldataModel')
const StandardModel = require('../models/StandardModel')
const IntegralModel = require('../models/IntegralModel')
const Common = require('../common/index')

class AlldataController {
    /**
     * 添加用户
    */
    static async addData(ctx) {
        const data = ctx.request.body;
        const queryTrue = await AlldataModel.queryData(data);
        if(queryTrue) {
            ctx.body = {
                code: -1,
                msg: '用户名或身份证号重复添加！！'
            }
        } else {
            const addTrue = await AlldataModel.add(data);
            if(addTrue) {
                ctx.body = {
                    code: 200,
                    msg: '添加成功'
                }
            }
        }
    }

    /**
     * 查询列表
    */
    static async getList(ctx) {
        const data = ctx.query;
        const searchVal = JSON.parse(data.searchVal)
        if(Object.keys(searchVal).length === 0) {
            ctx.body = {
                code: 200,
                data: [],
                total: 0
            }
        }else {
            const queryTrue = await AlldataModel.queryList(data);
            if(queryTrue){
                ctx.body = {
                    code: 200,
                    data: queryTrue.DataList[0],
                    total: queryTrue.Total[0].length
                }
            }
        }
    }

    /**
     * 更新
    */
   static async edit(ctx) {
        const data = ctx.request.body;
        const editTrue = await AlldataModel.upData(data);
        if(editTrue){
            ctx.body = {
                code:200,
                msg:'更新成功'
            }
        }
    }

    /**
     * 删除
    */
    static async delete(ctx) {
        const names = ctx.request.body;
        for(let i in names) {
            console.log(names.Audit)
        }
        // const deleteTrue = await AlldataModel.Deletes(names);
        // if(deleteTrue){
        //     ctx.body = {
        //         code:200,
        //         msg:'删除成功'
        //     }
        // }
    }

    /**
     * 领取
    */
    static async Receive(ctx) {
        const data = ctx.request.body;
        const queryTrue = await AlldataModel.queryId(data.id);
        const arrName = [];
        if(queryTrue) {
            const arrt = await Common.isInArray(queryTrue);
            for(var i in queryTrue) {
                if(arrt){
                    //领取添加 => 标准制
                    if(queryTrue[i].Audit === '标准制'){
                        const ids = [];
                        ids.push(queryTrue[i].id);
                        queryTrue[i].belong = data.username
                        queryTrue[i].progress = '待录'
                        const addTrue = await StandardModel.add(queryTrue[i]);
                        if(addTrue){
                            const Uptrue = await AlldataModel.upData(queryTrue[i]);
                            ctx.body = {
                                code:200,
                                msg:'领取成功'
                            }
                        }
                    }
                    //领取添加 => 积分制
                    if(queryTrue[i].Audit === '积分制'){
                        const ids = [];
                        ids.push(queryTrue[i].id);
                        queryTrue[i].belong = data.username
                        queryTrue[i].progress = '待录'
                        const addTrue = await IntegralModel.add(queryTrue[i]);
                        if(addTrue){
                            const Uptrue = await AlldataModel.upData(queryTrue[i]);
                            ctx.body = {
                                code:200,
                                msg:'领取成功'
                            }
                        }
                    }
                } else {
                    if(queryTrue[i].belong !== '无'){
                        arrName.push(queryTrue[i].name)
                    }
                    ctx.body = {
                        code:-1,
                        msg: '用户：' + arrName + '，已经被领取，请重新选择'
                    }
                }
            }
        }
    }

    /**
     * 分配
    */
   static async Distribution(ctx) {
       const data = ctx.request.body;
       const arrName = [];
       const queryTrue = await AlldataModel.queryId(data.id);
       if(queryTrue) {
            const arrts = await Common.isInArray(queryTrue);
            for(var i in queryTrue) {
                if(arrts){
                    //分配用户数据 => 标准制
                    if(queryTrue[i].Audit === '标准制'){
                        const ids = [];
                        ids.push(queryTrue[i].id);
                        queryTrue[i].belong = data.username
                        queryTrue[i].progress = '待录'
                        const addTrue = await StandardModel.add(queryTrue[i]);
                        if(addTrue){
                            const Uptrue = await AlldataModel.upData(queryTrue[i]);
                            ctx.body = {
                                code:200,
                                msg:'领取成功'
                            }
                        }
                    }
                    //分配用户数据 => 积分制
                    if(queryTrue[i].Audit === '积分制'){
                        const ids = [];
                        ids.push(queryTrue[i].id);
                        queryTrue[i].belong = data.username
                        queryTrue[i].progress = '待录'
                        const addTrue = await IntegralModel.add(queryTrue[i]);
                        if(addTrue){
                            const Uptrue = await AlldataModel.upData(queryTrue[i]);
                            ctx.body = {
                                code:200,
                                msg:'分配成功'
                            }
                        }
                    }
                } else {
                    console.log('22')
                    if(queryTrue[i].belong !== '无'){
                        arrName.push(queryTrue[i].name)
                    }
                    ctx.body = {
                        code:-1,
                        msg: '用户：' + arrName + '，已经被领取，请重新选择'
                    }
                }
            }
       }
   }

   /**
    * 导入Excel
    */
   static async ImportExcel(ctx) {
       const data = ctx.request.body;
       const ExcleData = {}
       const DataArr = []
       data.map(v => {
           ExcleData.name = v.姓名
           ExcleData.age = v.年龄
           ExcleData.IDNumber = v.身份证号
           ExcleData.BirthDate = v.出身日期
           ExcleData.Nation = v.民族
           ExcleData.Marriage = v.婚姻状况
           ExcleData.phone = v.手机号码
           ExcleData.Occupation = v.职业
           ExcleData.detailed = v.详细地址
           ExcleData.HouseholdProvince = v.省
           ExcleData.HouseholdCity = v.市
           ExcleData.learn = v.学历
           ExcleData.graduation = v.毕业学校
           ExcleData.Company = v.工作单位
           ExcleData.email = v.邮箱地址
           ExcleData.social = v.社保数
           ExcleData.address = v.通讯地址
           ExcleData.Children = v.小孩随迁
           ExcleData.Account = v.人保账号
           ExcleData.AccountPassword = v.人保密码
           ExcleData.Total = v.总费用
           ExcleData.Pay = v.已交费用
           ExcleData.Unpaid = v.未交费用
           ExcleData.source = v.来源
           ExcleData.Audit = v.审核方式
           ExcleData.Entrance = v.申报窗口
           ExcleData.payment = v.付款方式
           ExcleData.declare = v.申报方式
           ExcleData.progress = v.工作进度
           ExcleData.Remarks = v.备注
           ExcleData.major = v.专业
           ExcleData.Immigration = v.迁移地
           ExcleData.XueXin = v.学信网账户
           ExcleData.XueXinPassword = v.学信网密码
           ExcleData.Founder = v.创建人
           ExcleData.belong = v.归属用户
           ExcleData.createTime = v.创建时间
           for(var key in ExcleData) {
                if(ExcleData[key] === undefined){
                    ExcleData[key] = ''
                }
                if(key === 'progress' && ExcleData[key] === '') {
                    ExcleData[key] = '无'
                }
                if(key === 'belong' && ExcleData[key] === '') {
                    ExcleData[key] = '无'
                }
                if(key === 'BirthDate' && ExcleData[key] === '') {
                    ExcleData[key] = 0
                }
            }
           DataArr.push(ExcleData);
       })
       const addExcel = await AlldataModel.addArr(DataArr);
       if(addExcel){
            ctx.body = {
                code: 200,
                msg: '导入成功'
            }
       } else {
            ctx.body = {
                code: -200,
                msg: '导入失败'
            }
       }
   }


}

module.exports = AlldataController