const StandardWaitModel = require('../models/Standard/StandardWaitModel')
const StandardCheckModel = require('../models/Standard/StandardCheckModel')
const StandardInspectModel = require('../models/Standard/StandardInspectModel')
const StandardExamineModel = require('../models/Standard/StandardExamineModel')
const StandardModel = require('../models/Standard/StandardModel')
const StandardAdoptModel = require('../models/Standard/StandardAdoptModel')
const StandardMigrationModel = require('../models/Standard/StandardMigrationModel')
const StandardTransferModel = require('../models/Standard/StandardTransferModel')
const StandardCustomerModel = require('../models/Standard/StandardCustomerModel')
const StandardEndModel = require('../models/Standard/StandardEndModel')

class standardController {
     /**
     * 代录 => 列表查询
    */
    static async WaitList(ctx) {
        const data = ctx.query;
        const queryTrue = await StandardWaitModel.queryList(data);
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
        const queryTrue = await StandardCheckModel.queryList(data);
        if(queryTrue){
            ctx.body = {
                code: 200,
                data: queryTrue.rows,
                total: queryTrue.count
            }
        }
    }

    /**
     *  已体检 => 列表查询
     */
    static async InspectList(ctx) {
        const data = ctx.query;
        const queryTrue = await StandardInspectModel.queryList(data);
        if(queryTrue){
            ctx.body = {
                code: 200,
                data: queryTrue.rows,
                total: queryTrue.count
            }
        }
    }

    /**
     *  一审 => 列表查询
     */
    static async ExamineList(ctx) {
        const data = ctx.query;
        const queryTrue = await StandardExamineModel.queryList(data);
        if(queryTrue){
            ctx.body = {
                code: 200,
                data: queryTrue.rows,
                total: queryTrue.count
            }
        }
    }

    /**
     *  审批通过 => 列表查询
     */
    static async AdoptList(ctx) {
        const data = ctx.query;
        const queryTrue = await StandardAdoptModel.queryList(data);
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
        const queryTrue = await StandardMigrationModel.queryList(data);
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
        const queryTrue = await StandardTransferModel.queryList(data);
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
        const queryTrue = await StandardCustomerModel.queryList(data);
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
        const queryTrue = await StandardEndModel.queryList(data);
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
        const idTrue = await StandardModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '核对资料'
                const addTrue = await StandardModel.upData(idTrue[i]);
                ctx.body = {
                    code: 200,
                    msg: '操作成功'
                }
            }
        }
    }

    /**
     * 步骤 => 已体检
     */
    static async InspectData(ctx) {
        const ids = ctx.request.body
        const idTrue = await StandardModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '已体检'
                const addTrue = await StandardModel.upData(idTrue[i]);
                ctx.body = {
                    code: 200,
                    msg: '操作成功'
                }
            }
        }
    }

    /**
     * 步骤 => 一审
     */
    static async ExamineData(ctx) {
        const ids = ctx.request.body
        const idTrue = await StandardModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '一审'
                const addTrue = await StandardModel.upData(idTrue[i]);
                ctx.body = {
                    code: 200,
                    msg: '操作成功'
                }
            }
        }
    }

    /**
     * 步骤 => 审批通过
     */
    static async AdoptData(ctx) {
        const ids = ctx.request.body
        const idTrue = await StandardModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '审批通过'
                const addTrue = await StandardModel.upData(idTrue[i]);
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
        const idTrue = await StandardModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '办理准迁证'
                const addTrue = await StandardModel.upData(idTrue[i]);
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
        const idTrue = await StandardModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '办理迁移证'
                const addTrue = await StandardModel.upData(idTrue[i]);
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
        const idTrue = await StandardModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '办理身份证'
                const addTrue = await StandardModel.upData(idTrue[i]);
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
        const idTrue = await StandardModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '已办理完结'
                const addTrue = await StandardModel.upData(idTrue[i]);
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
        const queryTrue = await StandardModel.query(data.id);
        if(queryTrue[0]) {
            for(let i in queryTrue) {
                queryTrue[i].belong = data.username
                const addTrue = await StandardModel.RollOut(queryTrue[i]);
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
        const ids = ctx.request.body;
        const idTrue = await StandardModel.query(ids);
        if(idTrue[0]) {
            for( var i in idTrue) {
                idTrue[i].progress = '退费'
                const addTrue = await StandardModel.upData(idTrue[i]);
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
module.exports = standardController