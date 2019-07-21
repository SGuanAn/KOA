const Mysql = require('../config/db');
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Alldata = Mysql.import('../schema/alldata')

class ReceiveModel {
    
    /**
     * 未领取数据
    */
    static async getList(data) {
        const limit = parseInt(data.limit);
        const page = parseInt(data.page);
        const searchVal = JSON.parse(data.searchVal)
        const {Founder, time, Audit, Entrance} = searchVal
        if(Object.keys(searchVal).length === 0){
            return await Alldata.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{ belong:'无' },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //单条件 多字段搜索
        if (Founder && Object.keys(searchVal).length === 1){
            return await Alldata.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]: [
                        {
                            [Op.or]: [
                                {name: Founder},
                                {IDNumber: Founder},
                                {declare: Founder},
                                {Founder: Founder}
                            ]
                        },
                        { belong:'无' }
                    ]
                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //单条件搜索 审核方式
        if (Audit && Object.keys(searchVal).length === 1){
            return await Alldata.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {Audit: Audit},
                        { belong:'无' }
                    ]
                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //单条件搜索 申报窗口
        if (Entrance && Object.keys(searchVal).length === 1){
            return await Alldata.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {Entrance: Entrance},
                        { belong:'无' }
                    ]
                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //单条件搜索 日期范围搜索
        if (time && Object.keys(searchVal).length === 1){
            return await Alldata.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {
                            createTime:{ 
                                [Op.gte]: time[0]
                            }
                        },
                        {
                            createTime:{ 
                                [Op.lte]: time[1]
                            }
                        },
                        { belong:'无' }
                    ]
                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //多条件搜索
        if(Founder && Audit && Object.keys(searchVal).length === 2){
            return await Alldata.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {
                            [Op.or]:[
                                {name: Founder},
                                {IDNumber: Founder},
                                {declare: Founder},
                                {Founder: Founder}
                            ]
                        },
                        { Audit: Audit },
                        { belong:'无' }
                    ]
                }
            })
        }
        //多条件搜索
        if(Founder && Entrance && Object.keys(searchVal).length === 2){
            return await Alldata.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {
                            [Op.or]:[
                                {name: Founder},
                                {IDNumber: Founder},
                                {declare: Founder},
                                {Founder: Founder}
                            ]
                        },
                        { Entrance: Entrance },
                        { belong:'无' }
                    ]
                }
            })
        }
        //多条件搜索
        if(Founder && time && Object.keys(searchVal).length === 2){
            return await Alldata.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {
                            [Op.or]:[
                                {name: Founder},
                                {IDNumber: Founder},
                                {declare: Founder},
                                {Founder: Founder}
                            ]
                        },
                        {
                            [Op.and]:[
                                {
                                    createTime:{ 
                                        [Op.gte]: time[0]
                                    }
                                },
                                {
                                    createTime:{ 
                                        [Op.lte]: time[1]
                                    }
                                },
                                { belong:'无' }
                            ]
                        }
                    ]
                }
            })
        }
        //多条件搜索
        if(Audit && Entrance && Object.keys(searchVal).length === 2){
            return await Alldata.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {Audit: Audit},
                        { Entrance: Entrance },
                        { belong:'无' }
                    ]
                }
            })
        }
        //多条件搜索
        if(Audit && time && Object.keys(searchVal).length === 2){
            return await Alldata.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {Audit: Audit},
                        { belong:'无' },
                        {
                            [Op.and]:[
                                {
                                    createTime:{ 
                                        [Op.gte]: time[0]
                                    }
                                },
                                {
                                    createTime:{ 
                                        [Op.lte]: time[1]
                                    }
                                }
                            ]
                        }
                    ]
                }
            })
        }
        //多条件搜索
        if(Audit && time && Entrance && Object.keys(searchVal).length === 3){
            return await Alldata.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {Audit: Audit},
                        {Entrance: Entrance},
                        { belong:'无' },
                        {
                            [Op.and]:[
                                {
                                    createTime:{ 
                                        [Op.gte]: time[0]
                                    }
                                },
                                {
                                    createTime:{ 
                                        [Op.lte]: time[1]
                                    }
                                }
                            ]
                        }
                    ]
                }
            })
        }
    }


}

module.exports = ReceiveModel