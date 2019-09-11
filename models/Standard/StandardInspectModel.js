const Mysql = require('../../config/db');
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Standard = Mysql.import('../../schema/standard')

class StandardInspectModel {

    /**
     * 分页查询
    */
   static async queryList(data) {
        const limit = parseInt(data.limit);
        const page = parseInt(data.page);
        const searchVal = JSON.parse(data.searchVal)
        const {Founder, time, Audit, Entrance} = searchVal
        if(Object.keys(searchVal).length === 0 && data.username){
            return await Standard.findAndCountAll({
                where:{
                    belong:  data.username,
                    progress: '已体检'
                },
                order: [
                    ['updateTime', 'DESC']
                ],
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //单条件 多字段搜索
        if (Founder && Object.keys(searchVal).length === 1 && data.username){
            return await Standard.findAndCountAll({
                order: [
                    ['updateTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {
                            [Op.or]: [
                                {name: Founder},
                                {IDNumber: Founder},
                                {Sdeclare: Founder},
                                {Founder: Founder}
                            ]
                        },
                        {belong:  data.username},
                        { progress: '已体检' }
                    ]
                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //单条件搜索 审核方式
        if (Audit && Object.keys(searchVal).length === 1 && data.username){
            return await Standard.findAndCountAll({
                order: [
                    ['updateTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {Audit: Audit},
                        {belong:  data.username},
                        { progress: '已体检' }
                    ]
                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //单条件搜索 申报窗口
        if (Entrance && Object.keys(searchVal).length === 1 && data.username){
            return await Standard.findAndCountAll({
                order: [
                    ['updateTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {Entrance: Entrance},
                        {belong:  data.username},
                        { progress: '已体检' }
                    ]
                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //单条件搜索 日期范围搜索
        if (time && Object.keys(searchVal).length === 1 && data.username){
            return await Standard.findAndCountAll({
                order: [
                    ['updateTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {
                            updateTime:{ 
                                [Op.gte]: time[0]
                            }
                        },
                        {
                            updateTime:{ 
                                [Op.lte]: time[1]
                            }
                        },
                        {belong:  data.username},
                        { progress: '已体检' }
                    ]
                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //多条件搜索
        if(Founder && Audit && Object.keys(searchVal).length === 2 && data.username){
            return await Standard.findAndCountAll({
                order: [
                    ['updateTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {
                            [Op.or]:[
                                {name: Founder},
                                {IDNumber: Founder},
                                {Sdeclare: Founder},
                                {Founder: Founder}
                            ]
                        },
                        { Audit: Audit },
                        { belong:  data.username },
                        { progress: '已体检' }
                    ]
                }
            })
        }
        //多条件搜索
        if(Founder && Entrance && Object.keys(searchVal).length === 2 && data.username){
            return await Standard.findAndCountAll({
                order: [
                    ['updateTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {
                            [Op.or]:[
                                {name: Founder},
                                {IDNumber: Founder},
                                {Sdeclare: Founder},
                                {Founder: Founder}
                            ]
                        },
                        { belong:  data.username },
                        { Entrance: Entrance },
                        { progress: '已体检' }
                    ]
                }
            })
        }
        //多条件搜索
        if(Founder && time && Object.keys(searchVal).length === 2 && data.username){
            return await Standard.findAndCountAll({
                order: [
                    ['updateTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {
                            [Op.or]:[
                                {name: Founder},
                                {IDNumber: Founder},
                                {Sdeclare: Founder},
                                {Founder: Founder}
                            ]
                        },
                        { belong:  data.username },
                        { progress: '已体检' },
                        {
                            [Op.and]:[
                                {
                                    updateTime:{ 
                                        [Op.gte]: time[0]
                                    }
                                },
                                {
                                    updateTime:{ 
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
        if(Audit && Entrance && Object.keys(searchVal).length === 2 && data.username){
            return await Standard.findAndCountAll({
                order: [
                    ['updateTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        { belong:  data.username },
                        { Audit: Audit },
                        { Entrance: Entrance },
                        { progress: '已体检' }
                    ]
                }
            })
        }
        //多条件搜索
        if(Audit && time && Object.keys(searchVal).length === 2 && data.username){
            return await Standard.findAndCountAll({
                order: [
                    ['updateTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {Audit: Audit},
                        {
                            [Op.and]:[
                                { belong:  data.username },
                                { progress: '已体检' },
                                {
                                    updateTime:{ 
                                        [Op.gte]: time[0]
                                    }
                                },
                                {
                                    updateTime:{ 
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
        if(Audit && time && Entrance && Object.keys(searchVal).length === 3 && data.username){
            return await Standard.findAndCountAll({
                order: [
                    ['updateTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {Audit: Audit},
                        {Entrance: Entrance},
                        { belong:  data.username },
                        { progress: '已体检' },
                        {
                            [Op.and]:[
                                {
                                    updateTime:{ 
                                        [Op.gte]: time[0]
                                    }
                                },
                                {
                                    updateTime:{ 
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

module.exports = StandardInspectModel