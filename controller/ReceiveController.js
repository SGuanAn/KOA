const ReceiveModel = require('../models/Receive/ReceiveModel');

class ReceiveController {
    /**
     * 领取数据列表
    */
   static async ReceiveList(ctx) {
        const data = ctx.query;
        const list = await ReceiveModel.getList(data);
        if(list) {
            ctx.body = {
                code: 200,
                data: list.rows,
                total: list.count
            }
        }
    }

}

module.exports = ReceiveController