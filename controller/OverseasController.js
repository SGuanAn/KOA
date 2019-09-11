const OverseasWaitModel = require('../models/Overseas/OverseasWaitModel')
const OverseasCheckModel = require('../models/Overseas/OverseasCheckModel')
const OverseasQualiModel = require('../models/Overseas/OverseasQualiModel')
const OverseasExamineModel = require('../models/Overseas/OverseasExamineModel')
const OverseasModel = require('../models/Overseas/OverseasModel')
const OverseasAdoptModel = require('../models/Overseas/OverseasAdoptModel')
const OverseasMigrationModel = require('../models/Overseas/OverseasMigrationModel')
const OverseasTransferModel = require('../models/Overseas/OverseasTransferModel')
const OverseasCustomerModel = require('../models/Overseas/OverseasCustomerModel')
const OverseasEndModel = require('../models/Overseas/OverseasEndModel')

class OverseasController {
     /**
     * 代录 => 列表查询
    */
    static async WaitList(ctx) {
        const data = ctx.query;
        const queryTrue = await OverseasWaitModel.queryList(data);
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
        const queryTrue = await OverseasCheckModel.queryList(data);
        if(queryTrue){
            ctx.body = {
                code: 200,
                data: queryTrue.rows,
                total: queryTrue.count
            }
        }
    }

    /**
     *  资格认证 => 列表查询
     */
    static async InspectList(ctx) {
        const data = ctx.query;
        const queryTrue = await OverseasQualiModel.queryList(data);
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
        const queryTrue = await OverseasExamineModel.queryList(data);
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
        const queryTrue = await OverseasAdoptModel.queryList(data);
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
        const queryTrue = await OverseasMigrationModel.queryList(data);
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
        const queryTrue = await OverseasTransferModel.queryList(data);
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
        const queryTrue = await OverseasCustomerModel.queryList(data);
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
        const queryTrue = await OverseasEndModel.queryList(data);
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
        const idTrue = await OverseasModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '核对资料'
                const addTrue = await OverseasModel.upData(idTrue[i]);
                ctx.body = {
                    code: 200,
                    msg: '操作成功'
                }
            }
        }
    }

    /**
     * 步骤 => 资格认证
     */
    static async InspectData(ctx) {
        const ids = ctx.request.body
        const idTrue = await OverseasModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '资格认证'
                const addTrue = await OverseasModel.upData(idTrue[i]);
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
        const idTrue = await OverseasModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '一审'
                const addTrue = await OverseasModel.upData(idTrue[i]);
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
        const idTrue = await OverseasModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '审批通过'
                const addTrue = await OverseasModel.upData(idTrue[i]);
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
        const idTrue = await OverseasModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '办理准迁证'
                const addTrue = await OverseasModel.upData(idTrue[i]);
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
        const idTrue = await OverseasModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '办理迁移证'
                const addTrue = await OverseasModel.upData(idTrue[i]);
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
        const idTrue = await OverseasModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '办理身份证'
                const addTrue = await OverseasModel.upData(idTrue[i]);
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
        const idTrue = await OverseasModel.query(ids);
        if(idTrue) {
            for( var i in idTrue) {
                idTrue[i].progress = '已办理完结'
                const addTrue = await OverseasModel.upData(idTrue[i]);
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
        const queryTrue = await OverseasModel.query(data.id);
        if(queryTrue[0]) {
            for(let i in queryTrue) {
                queryTrue[i].belong = data.username
                const addTrue = await OverseasModel.RollOut(queryTrue[i]);
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
        const idTrue = await OverseasModel.query(ids);
        if(idTrue[0]) {
            for( var i in idTrue) {
                idTrue[i].progress = '退费'
                const addTrue = await OverseasModel.upData(idTrue[i]);
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
module.exports = OverseasController