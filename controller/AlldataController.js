const AlldataModel = require('../models/Alldata/AlldataModel')
const StandardModel = require('../models/Standard/StandardModel')
const IntegralModel = require('../models/Integral/IntegralModel')
const OverseasModel = require('../models/Overseas/OverseasModel')
const FreshmenModel = require('../models/Freshmen/FreshmenModel')
const Common = require('../common/index')

class AlldataController {
    /**
     * 添加用户
    */
    static async addData(ctx) {
        const data = ctx.request.body;
        const queryTrue = await AlldataModel.UnionQuery(`'${data.IDNumber}'`, data.phone);
        if(queryTrue[0][0]) {
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
                    testData: queryTrue,
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
        const upData = ctx.request.body;
        //更新 所有数据表
        if(upData.belong === '无') {
            const editTrue = await AlldataModel.upData(upData);
        }
        //更新 标准制
        if (upData.Audit === '标准制' && upData.belong !== '无') {
            const editTrue = await StandardModel.allupData(upData);
        }
         //更新 积分制
        if (upData.Audit === '积分制' && upData.belong !== '无'){
            const editTrue = await IntegralModel.allupData(upData);
        } 
         //更新 留学生
        if (upData.Audit === '留学生' && upData.belong !== '无') {
            const editTrue = await OverseasModel.allupData(upData);
        }
         //更新 应届生
        if(upData.Audit === '应届生' && upData.belong !== '无') {
            const editTrue = await FreshmenModel.allupData(upData);
        }
        ctx.body = {
            code:200,
            msg:'更新成功'
        }
    }

    /**
     * 删除
    */
    static async delete(ctx) {
        const deleteData = ctx.request.body;
        for(var i in deleteData) {
            // 删除 所有数据
            if(deleteData[i].belong === '无') {
                let Alldata_IDS = []
                Alldata_IDS.push(deleteData[i].id)
                const deleteTrue = await AlldataModel.Deletes(Alldata_IDS);
            }
            // 删除 标准制
            if(deleteData[i].Audit === '标准制' && deleteData[i].belong !== '无') {
                let Standard_IDS = []
                Standard_IDS.push(deleteData[i].id)
                const deleteTrue = await StandardModel.Deletes(Standard_IDS);
            }
            // 删除 积分制
            if(deleteData[i].Audit === '积分制' && deleteData[i].belong !== '无') {
                let Integral_IDS = []
                Integral_IDS.push(deleteData[i].id)
                const deleteTrue = await IntegralModel.Deletes(Integral_IDS);
            }
            // 删除 留学生
            if(deleteData[i].Audit === '留学生' && deleteData[i].belong !== '无') {
                let Overseas_IDS = []
                Overseas_IDS.push(deleteData[i].id)
                const deleteTrue = await OverseasModel.Deletes(Overseas_IDS);
            }
            // 删除 应届生
            if(deleteData[i].Audit === '应届生' && deleteData[i].belong !== '无') {
                let Freshmen_IDS = []
                Freshmen_IDS.push(deleteData[i].id)
                const deleteTrue = await FreshmenModel.Deletes(Freshmen_IDS);
            }
        }
        ctx.body = {
            code: 200,
            msg: '删除成功'
        }
    }

    /**
     * 领取
    */
    static async Receive(ctx) {
        const data = ctx.request.body;
        const queryTrue = await AlldataModel.queryId(data.id);
        const arrName = [];
        if(queryTrue[0]) {
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
                            const deleteData = await AlldataModel.Deletes(ids);
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
                            const deleteData = await AlldataModel.Deletes(ids);
                            const Uptrue = await AlldataModel.upData(queryTrue[i]);
                            ctx.body = {
                                code:200,
                                msg:'领取成功'
                            }
                        }
                    }
                    //领取添加 => 留学生
                    if(queryTrue[i].Audit === '留学生'){
                        const ids = [];
                        ids.push(queryTrue[i].id);
                        queryTrue[i].belong = data.username
                        queryTrue[i].progress = '待录'
                        const addTrue = await OverseasModel.add(queryTrue[i]);
                        if(addTrue){
                            const Uptrue = await AlldataModel.upData(queryTrue[i]);
                            const deleteData = await AlldataModel.Deletes(ids);
                            ctx.body = {
                                code:200,
                                msg:'领取成功'
                            }
                        }
                    }
                    //领取添加 => 应届生
                    if(queryTrue[i].Audit === '应届生'){
                        const ids = [];
                        ids.push(queryTrue[i].id);
                        queryTrue[i].belong = data.username
                        queryTrue[i].progress = '待录'
                        const addTrue = await FreshmenModel.add(queryTrue[i]);
                        if(addTrue){
                            const Uptrue = await AlldataModel.upData(queryTrue[i]);
                            const deleteData = await AlldataModel.Deletes(ids);
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
        } else {
            ctx.body = {
                code:-200,
                msg: '已经被领取，请刷新'
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
       if(queryTrue[0]) {
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
                            const deleteData = await AlldataModel.Deletes(ids);
                            ctx.body = {
                                code:200,
                                msg:'分配成功'
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
                            const deleteData = await AlldataModel.Deletes(ids);
                            ctx.body = {
                                code:200,
                                msg:'分配成功'
                            }
                        }
                    }
                    //分配用户数据 => 留学生
                    if(queryTrue[i].Audit === '留学生'){
                        const ids = [];
                        ids.push(queryTrue[i].id);
                        queryTrue[i].belong = data.username
                        queryTrue[i].progress = '待录'
                        const addTrue = await OverseasModel.add(queryTrue[i]);
                        if(addTrue){
                            const Uptrue = await AlldataModel.upData(queryTrue[i]);
                            const deleteData = await AlldataModel.Deletes(ids);
                            ctx.body = {
                                code:200,
                                msg:'分配成功'
                            }
                        }
                    }
                    //分配用户数据 => 应届生
                    if(queryTrue[i].Audit === '应届生'){
                        const ids = [];
                        ids.push(queryTrue[i].id);
                        queryTrue[i].belong = data.username
                        queryTrue[i].progress = '待录'
                        const addTrue = await FreshmenModel.add(queryTrue[i]);
                        if(addTrue){
                            const Uptrue = await AlldataModel.upData(queryTrue[i]);
                            const deleteData = await AlldataModel.Deletes(ids);
                            ctx.body = {
                                code:200,
                                msg:'分配成功'
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
       } else {
            ctx.body = {
                code:-200,
                msg: '已经被领取，请刷新'
            }
       }
   }

   /**
    * 导入Excel
    */
   static async ImportExcel(ctx) {
       const data = ctx.request.body;
       const DataArr = []
       const IDNumberArr = []
       const phoneArr = []
       data.forEach(v => {
           DataArr.push({
                name: v.姓名,
                age: v.年龄,
                IDNumber: v.身份证号,
                BirthDate: v.出身日期,
                Nation: v.民族,
                Marriage: v.婚姻状况,
                phone: v.手机号码,
                Occupation: v.职业,
                detailed: v.详细地址,
                HouseholdProvince: v.省,
                HouseholdCity: v.市,
                learn: v.学历,
                graduation: v.毕业学校,
                Company: v.工作单位,
                email: v.邮箱地址,
                social: v.社保数,
                address: v.通讯地址,
                Children: v.小孩随迁,
                Account: v.人保账号,
                AccountPassword: v.人保密码,
                Total: v.总费用,
                Pay: v.已交费用,
                Unpaid: v.未交费用,
                source: v.来源,
                Audit: v.审核方式,
                Entrance: v.申报窗口,
                payment: v.付款方式,
                Sdeclare: v.申报方式,
                progress: v.工作进度,
                Remarks: v.备注,
                major: v.专业,
                Immigration: v.迁移地,
                XueXin: v.学信网账户,
                XueXinPassword: v.学信网密码,
                Founder: v.创建人,
                belong: v.归属用户,
                createTime: v.创建时间
           })
       })
       for(var i=0; i < DataArr.length; i++) {
            for(var key in DataArr[i]) {
                if(DataArr[i][key] === undefined){
                    DataArr[i][key] = ''
                }
                if(key === 'progress' && DataArr[i][key] === '') {
                    DataArr[i][key] = '无'
                }
                if(key === 'belong' && DataArr[i][key] === '') {
                    DataArr[i][key] = '无'
                }
                if(key === 'BirthDate' && DataArr[i][key] === '') {
                    DataArr[i][key] = 0
                }
                if(key === 'Total' && DataArr[i][key] === '') {
                    DataArr[i][key] = 0
                }
                if(key === 'Pay' && DataArr[i][key] === '') {
                    DataArr[i][key] = 0
                }
                if(key === 'Unpaid' && DataArr[i][key] === '') {
                    DataArr[i][key] = 0
                }
                if(key === 'IDNumber') {
                    IDNumberArr.push(`'${DataArr[i][key]}'`)
                }
                if(key === 'phone') {
                    phoneArr.push(`'${DataArr[i][key]}'`)
                }
            }
       }
       const isRepeats = await Common.isRepeat(DataArr);
       if(!isRepeats){
            ctx.body = {
                code: -200,
                msg: '存在重复，请检查后重新上传！！'
            }
            return false;
       }
       const arrTrue = await Common.ArrayTrue(DataArr);
       if(arrTrue){
            const queryTrue = await AlldataModel.UnionQuery(IDNumberArr, phoneArr);
            if(queryTrue[0][0]){
                let arrName = []
                for(let i in queryTrue[0]) {
                    arrName.push(queryTrue[0][i].name)
                }
                ctx.body = {
                    code: -1,
                    msg: '用户：' + arrName + '，存在重复添加，请检查后重新添加'
                }
                return false;
            } else {
                for(let i in DataArr) {
                    if(DataArr[i].progress === '无' || DataArr[i].progress === ''){
                        DataArr[i].progress = '待录'
                    }
                    if(DataArr[i].belong === ''){
                        DataArr[i].belong = '无'
                    }
                    if(DataArr[i].Audit === '标准制' && DataArr[i].belong !== '无'){

                        const addTrue = await StandardModel.add(DataArr[i]);

                    } else if (DataArr[i].Audit === '积分制' && DataArr[i].belong !== '无') {

                        const addTrue = await IntegralModel.add(DataArr[i]);

                    } else if (DataArr[i].Audit === '留学生' && DataArr[i].belong !== '无') {

                        const addTrue = await OverseasModel.add(DataArr[i]);

                    } else if (DataArr[i].Audit === '应届生' && DataArr[i].belong !== '无') {

                        const addTrue = await FreshmenModel.add(DataArr[i]);

                    } else {

                        const addTrue = await AlldataModel.add(DataArr[i]);
                    }
                    ctx.body = {
                        code: 200,
                        msg: '导入成功'
                    }
                }
            }
       } else {
            ctx.body = {
                code: -200,
                msg: '存在错误格式，请检查后在上传！'
            }
       }
  
   }


}

module.exports = AlldataController