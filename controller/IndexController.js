const IndexModel = require('../models/Index/IndexModel')
const jwt = require('jsonwebtoken')

class IndexController {
    /**
     * 我的数据
     */
    static async Mydata(ctx) {
        const username = ctx.query.name
        const total = await IndexModel.queryUserDatas(username);
        if(total){
            ctx.body = {
                total: total[0].length
            }
        }
    }

    /**
     * 办理完结用户
     */
    static async LabelTotal(ctx) {
        const total = await IndexModel.queryLabelDatas();
        if(total){
            ctx.body = {
                SameMonth: total.SameMonth[0].length,
                LastMonth: total.LastMonth[0].length
            }
        }
    }

    /**
     * 新录数据
     */
    static async NewData(ctx) {
        const total = await IndexModel.queryNewData();
        if(total){
            ctx.body = {
                total: total[0].length
            }
        }
    }

    /**
     *  我的数据详情
     */
    static async Details(name) {
        
        const Arrs = await IndexModel.DataDetails(name);
        let standard = [
            //标准制
            { total: 0, tag: '待录' },
            { total: 0, tag: '核对资料' },
            { total: 0, tag: '已体检' },
            { total: 0, tag: '一审' },
            { total: 0, tag: '审批通过' },
            { total: 0, tag: '办理准迁证' },
            { total: 0, tag: '办理迁移证' },
            { total: 0, tag: '办理身份证' },
            { total: 0, tag: '已办理完结' },

        ];
        let Integral = [
            //积分制
            { total: 0, tag: '待录' },
            { total: 0, tag: '核对资料' },
            { total: 0, tag: '已体检' },
            { total: 0, tag: '一审' },
            { total: 0, tag: '审批通过' },
            { total: 0, tag: '办理准迁证' },
            { total: 0, tag: '办理迁移证' },
            { total: 0, tag: '办理身份证' },
            { total: 0, tag: '已办理完结' },
            
        ];
        let Overseas = [
            //留学生
            { total: 0, tag: '待录' },
            { total: 0, tag: '核对资料' },
            { total: 0, tag: '资格认证' },
            { total: 0, tag: '一审' },
            { total: 0, tag: '审批通过' },
            { total: 0, tag: '办理准迁证' },
            { total: 0, tag: '办理迁移证' },
            { total: 0, tag: '办理身份证' },
            { total: 0, tag: '已办理完结' },
            
        ];
        let Freshmen = [
            //应届生
            { total: 0, tag: '待录' },
            { total: 0, tag: '核对资料' },
            { total: 0, tag: '改派报到证中' },
            { total: 0, tag: '网上报道' },
            { total: 0, tag: '办理准迁证' },
            { total: 0, tag: '办理迁移证' },
            { total: 0, tag: '办理身份证' },
            { total: 0, tag: '已办理完结' },
            
        ];
        //标准制
        for(var i = 0; i < Arrs.standardArr.length; i++) {
            for(var j = 0; j < standard.length; j++) {
                if(Arrs.standardArr[i].progress == standard[j].tag){
                    standard[j].total++
                }
                
            }
        }
        //积分制
        for(var i = 0; i < Arrs.IntegralArr.length; i++) {
            for(var j = 0; j < Integral.length; j++) {
                if(Arrs.IntegralArr[i].progress == Integral[j].tag){
                    Integral[j].total++
                }
                
            }
        }
        //留学生
        for(var i = 0; i < Arrs.OverseasArr.length; i++) {
            for(var j = 0; j < Overseas.length; j++) {
                if(Arrs.OverseasArr[i].progress == Overseas[j].tag){
                    Overseas[j].total++
                }
                
            }
        }
        //应届生
        for(var i = 0; i < Arrs.FreshmenArr.length; i++) {
            for(var j = 0; j < Freshmen.length; j++) {
                if(Arrs.FreshmenArr[i].progress == Freshmen[j].tag){
                    Freshmen[j].total++
                }
                
            }
        }
       return await { standard, Integral, Overseas, Freshmen };
     }

}

module.exports = IndexController