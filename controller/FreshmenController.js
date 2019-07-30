const FreshmenWaitModel = require('../models/Freshmen/FreshmenWaitModel')
const FreshmenCheckModel = require('../models/Freshmen/FreshmenCheckModel')
const FreshmenReportModel = require('../models/Freshmen/FreshmenReportModel')
const FreshmenOnlineModel = require('../models/Freshmen/FreshmenOnlineModel')
const FreshmenModel = require('../models/Freshmen/FreshmenModel')
const FreshmenMigrationModel = require('../models/Freshmen/FreshmenMigrationModel')
const FreshmenTransferModel = require('../models/Freshmen/FreshmenTransferModel')
const FreshmenCustomerModel = require('../models/Freshmen/FreshmenCustomerModel')
const FreshmenEndModel = require('../models/Freshmen/FreshmenEndModel')

class FreshmenController {
     /**
     * 代录 => 列表查询
    */
    static async WaitList(ctx) {
        const data = ctx.query;
        const queryTrue = await FreshmenWaitModel.queryList(data);
        if(queryTrue){
            ctx.body = {
                code: 200,
                data: queryTrue.rows,
                total: queryTrue.count
            }
        }
    }

    /**
     *  核对资料 => 列表查询
     */
    static async checkList(ctx) {
        const data = ctx.query;
        const queryTrue = await FreshmenCheckModel.queryList(data);
        if(queryTrue){
            ctx.body = {
                code: 200,
                data: queryTrue.rows,
                total: queryTrue.count
            }
        }
    }

    /**
     *  改派报到证中 => 列表查询
     */
    static async InspectList(ctx) {
        const data = ctx.query;
        const queryTrue = await FreshmenReportModel.queryList(data);
        if(queryTrue){
            ctx.body = {
                code: 200,
                data: queryTrue.rows,
                total: queryTrue.count
            }
        }
    }

    /**
     * 网上报道 => 列表查询
     */
    static async ExamineList(ctx) {
        const data = ctx.query;
        const queryTrue = await FreshmenOnlineModel.queryList(data);
        if(queryTrue){
            ctx.body = {
                code: 200,
                data: queryTrue.rows,
                total: queryTrue.count
            }
        }
    }


    /**
     *  办理准迁证 => 列表查询
     */
    static async MigrationList(ctx) {
        const data = ctx.query;
        const queryTrue = await FreshmenMigrationModel.queryList(data);
        if(queryTrue){
            ctx.body = {
                code: 200,
                data: queryTrue.rows,
                total: queryTrue.count
            }
        }
    }

    /**
     *  办理迁移证 => 列表查询
     */
    static async TransferList(ctx) {
        const data = ctx.query;
        const queryTrue = await FreshmenTransferModel.queryList(data);
        if(queryTrue){
            ctx.body = {
                code: 200,
                data: queryTrue.rows,
                total: queryTrue.count
            }
        }
    }

    /**
     *  办理身份证 => 列表查询
     */
    static async CustomerList(ctx) {
        const data = ctx.query;
        const queryTrue = await FreshmenCustomerModel.queryList(data);
        if(queryTrue){
            ctx.body = {
                code: 200,
                data: queryTrue.rows,
                total: queryTrue.count
            }
        }
    }

    /**
     *  已办理完结 => 列表查询
     */
    static async EndList(ctx) {
        const data = ctx.query;
        const queryTrue = await FreshmenEndModel.queryList(data);
        if(queryTrue){
            ctx.body = {
                code: 200,
                data: queryTrue.rows,
                total: queryTrue.count
            }
        }
    }

    /**
     * 步骤 => 核对资料
     */
    static async checkData(ctx) {
        const ids = ctx.request.body
        const idTrue = await FreshmenModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '核对资料'
                const addTrue = await FreshmenModel.upData(idTrue[i]);
                ctx.body = {
                    code: 200,
                    msg: '操作成功'
                }
            }
        }
    }

    /**
     * 步骤 => 改派报到证中
     */
    static async InspectData(ctx) {
        const ids = ctx.request.body
        const idTrue = await FreshmenModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '改派报到证中'
                const addTrue = await FreshmenModel.upData(idTrue[i]);
                ctx.body = {
                    code: 200,
                    msg: '操作成功'
                }
            }
        }
    }

    /**
     * 步骤 => 网上报道
     */
    static async ExamineData(ctx) {
        const ids = ctx.request.body
        const idTrue = await FreshmenModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '网上报道'
                const addTrue = await FreshmenModel.upData(idTrue[i]);
                ctx.body = {
                    code: 200,
                    msg: '操作成功'
                }
            }
        }
    }

    /**
     * 步骤 => 办理准迁证
     */
    static async MigrationData(ctx) {
        const ids = ctx.request.body
        const idTrue = await FreshmenModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '办理准迁证'
                const addTrue = await FreshmenModel.upData(idTrue[i]);
                ctx.body = {
                    code: 200,
                    msg: '操作成功'
                }
            }
        }
    }
    
    /**
     * 步骤 => 办理迁移证
     */
    static async TransferData(ctx) {
        const ids = ctx.request.body
        const idTrue = await FreshmenModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '办理迁移证'
                const addTrue = await FreshmenModel.upData(idTrue[i]);
                ctx.body = {
                    code: 200,
                    msg: '操作成功'
                }
            }
        }
    }

    /**
     * 步骤 => 办理身份证
     */
    static async CustomerData(ctx) {
        const ids = ctx.request.body
        const idTrue = await FreshmenModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '办理身份证'
                const addTrue = await FreshmenModel.upData(idTrue[i]);
                ctx.body = {
                    code: 200,
                    msg: '操作成功'
                }
            }
        }
    }

    /**
     * 步骤 => 已办理完结
     */
    static async EndData(ctx) {
        const ids = ctx.request.body
        const idTrue = await FreshmenModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '已办理完结'
                const addTrue = await FreshmenModel.upData(idTrue[i]);
                ctx.body = {
                    code: 200,
                    msg: '操作成功'
                }
            }
        }
    }

    /**
     * 转出数据
     */
    static async Distribution(ctx) {
        const data = ctx.request.body;
        const queryTrue = await FreshmenModel.query(data.id);
        if(queryTrue[0]) {
            for(let i in queryTrue) {
                queryTrue[i].belong = data.username
                const addTrue = await FreshmenModel.RollOut(queryTrue[i]);
                if(addTrue){
                    ctx.body = {
                        code:200,
                        msg:'操作成功'
                    }
                }
            }
        } else {
            ctx.body = {
                code: -200,
                msg: '操作失败'
            }
        }
    }

    /**
     * 退费
     */
    static async RefundData(ctx) {
        const ids = ctx.request.body
        const idTrue = await FreshmenModel.query(ids);
        if(idTrue[0]) {
            for( var i in idTrue) {
                idTrue[i].progress = '退费'
                const addTrue = await FreshmenModel.upData(idTrue[i]);
                ctx.body = {
                    code: 200,
                    msg: '操作成功'
                }
            }
        } else {
            ctx.body = {
                code: -200,
                msg: '操作失败'
            }
        }
    }
    
}
module.exports = FreshmenController