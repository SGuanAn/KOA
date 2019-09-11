const LearnFormModel = require('../models/LearnForm/LearnFormModel')

class LearnFormController
{
    /**
     * 添加
    */
   static async addData(ctx) {
        const data = ctx.request.body;
        let phoneArr = []
        let IDNumberArr = []
        phoneArr.push(data.phone)
        IDNumberArr.push(data.IDNumber)
        const queryTrue = await LearnFormModel.queryRepeat(phoneArr, IDNumberArr);
        if(queryTrue[0]) {
            ctx.body = {
                code: -1,
                msg: '手机号或身份证号存在重复！！'
            }
        } else {
            const addTrue = await LearnFormModel.add(data);
            if(addTrue) {
                ctx.body = {
                    code: 200,
                    msg: '添加成功'
                }
            }
        }
    }

    /**
     * 更新
    */
    static async edit(ctx) {
        const upData = ctx.request.body;
        const editTrue = await LearnFormModel.upData(upData);
        if(editTrue[0])
        {
           return ctx.body = {
               code: 200,
               msg: '更新成功'
            }
        } else {
            return ctx.body = {
                code: -200,
                msg: '更新失败'
             }
        }
    }

    /**
     * 删除
     */
    static async delete(ctx) {
        const deleteData = ctx.request.body;
        let IDS = [];
        for(var i in deleteData) {
            IDS.push(deleteData[i].id)
        }
        const deleteTrue = await LearnFormModel.Deletes(IDS);
        if(deleteTrue)
        {
            return ctx.body = {
                code: 200,
                msg: '删除成功'
            }
        } else {
            return ctx.body = {
                code: -200,
                msg: '删除失败'
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
            const queryTrue = await LearnFormModel.queryList(data);
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
     * 导入Excel
     */
    static async ImportExcel(ctx)
    {
        const data = ctx.request.body;
        let DataArr = []
        let IDNumberArr = []
        let phoneArr = []
        data.forEach(v => {
            DataArr.push({
                 name: v.姓名,
                 age: v.年龄,
                 Gender: v.性别,
                 IDNumber: v.身份证号,
                 BirthDate: v.出身日期,
                 Nation: v.民族,
                 Marriage: v.婚姻状况,
                 phone: v.手机号码,
                 Occupation: v.职业,
                 address: v.通讯地址,
                 Total: v.总学费,
                 one_Tuition: v.第一年学费,
                 two_Tuition: v.第二年学费,
                 Unpaid: v.未缴,
                 source: v.来源,
                 promote: v.层次,
                 Enrolment: v.报读院校,
                 payment: v.付款方式,
                 major_enrollment: v.报读专业,
                 batch: v.批次,
                 receipt: v.收据编号,
                 student_account: v.学员账户,
                 student_password: v.学员密码,
                 Payment_status: v.缴费情况,
                 signTime: v.报名日期,
                 recruit_teacher: v.招生老师,
                 reception_teacher: v.接待老师,
                 Remarks: v.备注,
                 createTime: v.创建时间,
                 mail: v.邮箱, // 邮箱
                 Political: v.政治面貌, // 政治面貌
                 register: v.户籍, // 户籍
                 emergency_contact: v.紧急联系人, // 紧急联系人
                 Types_type: v.报读类型, // 报读类型
            })
        })

        for(var i=0; i < DataArr.length; i++) {
            for(var key in DataArr[i]) {
                if(DataArr[i][key] === undefined){
                    DataArr[i][key] = ''
                }
                if(key === 'BirthDate' && DataArr[i][key] === '') {
                    DataArr[i][key] = null
                }
                if(key === 'signTime' && DataArr[i][key] === '') {
                    DataArr[i][key] = null
                }
                if(key === 'Total' && DataArr[i][key] === '') {
                    DataArr[i][key] = 0
                }
                if(key === 'one_Tuition' && DataArr[i][key] === '') {
                    DataArr[i][key] = 0
                }
                if(key === 'two_Tuition' && DataArr[i][key] === '') {
                    DataArr[i][key] = 0
                }
                if(key === 'Unpaid' && DataArr[i][key] === '') {
                    DataArr[i][key] = 0
                }
            }
       }
       // 计算未缴和缴费情况
       DataArr.forEach(v => {

            v['Unpaid'] = v['Total'] - v['one_Tuition'] - v['two_Tuition']
            if(v['phone'] === 'undefined')
            {
                v['phone'] = ''
            }
            if(v['Total'] > 0 && v['Unpaid'] === 0)
            {
                v['Payment_status'] = '学费已缴完'

            } else if(v['Total'] > 0 && v['Unpaid'] > 0)
            {
                v['Payment_status'] = '学费未缴完'

            } else {
                v['Payment_status'] = '学费未缴完'
            }
       })
       // 遍历Excel数据，根据身份证和手机号去重
       let result = []
       let Repeat = [] 
       let obj = {}
       for(var i = 0; i < DataArr.length; i++)
       {
            if(!(obj[DataArr[i].IDNumber] || obj[DataArr[i].phone])){
                result.push(DataArr[i]); // 去重后数据
                obj[DataArr[i].IDNumber] = true;
                obj[DataArr[i].phone] = true;
                IDNumberArr.push(DataArr[i].IDNumber) // 去重后身份证 用于数据库查询
                phoneArr.push(DataArr[i].phone) // 去重后手机号 用于数据库查询
            } else {
                if(DataArr[i].phone === '' || DataArr[i].IDNumber === '')
                {
                    result.push(DataArr[i]);
                } else {
                    Repeat.push(DataArr[i].name); // 重复学员
                }
                
            }
       }

       // 遍历数据库中重复数据
       const queryTrue = await LearnFormModel.queryRepeat(phoneArr, IDNumberArr);
       if(queryTrue[0])
       {
            for(var i = 0; i < queryTrue.length; i++)
            {
                Repeat.push(queryTrue[i].name);
            }
            var Array1 = [];//临时数组1
            var Array2 = [];//临时数组2
            for(var i = 0; i < queryTrue.length; i++)
            {
                Array1[queryTrue[i].phone] = true;
                Array1[queryTrue[i].IDNumber] = true;
            }
            for(var i=0;i<result.length;i++){
                if(!(Array1[result[i].phone] || Array1[result[i].IDNumber])){
                    Array2.push(result[i]);
                }
            }
            const addArr = await LearnFormModel.addArr(Array2);
            return ctx.body = {
                code: 200,
                msg: '导入成功。存在重复添加：' + Repeat
            }
       } else {
            const addArr = await LearnFormModel.addArr(result);
            return ctx.body = {
                code: 200,
                msg: '导入成功。存在重复添加：' + Repeat
            }
       }
    }
}

module.exports = LearnFormController