const Mysql = require('../../config/db');
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Freshmen = Mysql.import('../../schema/freshmen')

class FreshmenModel {
    /**
     * id查询
    */
    static async query(ids) {
        return await Freshmen.findAll({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

    /**
     * 删除
    */
   static async Deletes(ids) {
        return await Freshmen.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

    /**
     * 查询 name
    */
   static async queryName(names) {
        return await Freshmen.findAll({
            where: {
                name: {
                    [Op.in]: names
                }
            }
        })
    }

    /**
     * 更新
    */
   static async upData(data) {
        return await Freshmen.update(
            { progress: data.progress },
            {
                where: {
                    id: data.id
                }
            }
        )
    }

    /**
     * 更新
    */
   static async allupData(data) {
        return await Freshmen.update(
            { 
                name: data.name, //姓名
                Gender: data.Gender, //性别
                age: data.age, //年龄
                IDNumber: data.IDNumber, //身份证号
                BirthDate: data.BirthDate, //出身日期
                Nation: data.Nation, //民族
                Marriage: data.Marriage, //婚姻状况
                phone: data.phone, //手机号码
                Occupation: data.Occupation, //职业
                detailed: data.detailed, //详细地址
                HouseholdProvince: data.HouseholdProvince, //区域
                HouseholdCity: data.HouseholdCity, //省份/市
                HouseholdA: data.HouseholdA, //区
                learn: data.learn, //学历
                graduation: data.graduation, //毕业学校
                Company: data.Company, //工作单位
                email: data.email, //邮箱地址
                social: data.social, //社保数
                address: data.address, //通讯地址
                Children: data.Children, //小孩随迁
                Account: data.Account, //人保账号
                AccountPassword: data.AccountPassword, //人保密码
                Total: data.Total, //总费用
                Pay: data.Pay, //已交费用
                Unpaid: data.Unpaid, //未交费用
                source: data.source, //来源
                Audit: data.Audit, //审核方式
                Entrance: data.Entrance, //申报窗口
                payment: data.payment, //付款方式
                Sdeclare: data.Sdeclare, //申报方式
                progress: data.progress, //工作进度
                Remarks: data.Remarks, //备注
                major: data.major, //专业
                Immigration: data.Immigration, //迁移地
                XueXin: data.XueXin, //学信网账户
                XueXinPassword: data.XueXinPassword, //学信网密码
                Founder: data.Founder, //创建人
                belong: data.belong, //归属用户
                createTime: data.createTime, //创建时间
            },
            {
                where:{ id: data.id }
            }
        );
    }

    /**
     * 转出
    */
   static async RollOut(data) {
        return await Freshmen.update(
            { belong: data.belong },
            {
                where: {
                    id: data.id
                }
            }
        )
    }

    /**
     * 创建
    */
    static async add(data) {
        return await Freshmen.create({
            name: data.name, //姓名
            Gender: data.Gender, //性别
            age: data.age, //年龄
            IDNumber: data.IDNumber, //身份证号
            BirthDate: data.BirthDate, //出身日期
            Nation: data.Nation, //民族
            Marriage: data.Marriage, //婚姻状况
            phone: data.phone, //手机号码
            Occupation: data.Occupation, //职业
            detailed: data.detailed, //详细地址
            HouseholdProvince: data.HouseholdProvince, //区域
            HouseholdCity: data.HouseholdCity, //省份/市
            HouseholdA: data.HouseholdA, //区
            learn: data.learn, //学历
            graduation: data.graduation, //毕业学校
            Company: data.Company, //工作单位
            email: data.email, //邮箱地址
            social: data.social, //社保数
            address: data.address, //通讯地址
            Children: data.Children, //小孩随迁
            Account: data.Account, //人保账号
            AccountPassword: data.AccountPassword, //人保密码
            Total: data.Total, //总费用
            Pay: data.Pay, //已交费用
            Unpaid: data.Unpaid, //未交费用
            source: data.source, //来源
            Audit: data.Audit, //审核方式
            Entrance: data.Entrance, //申报窗口
            payment: data.payment, //付款方式
            Sdeclare: data.Sdeclare, //申报方式
            progress: data.progress, //工作进度
            Remarks: data.Remarks, //备注
            major: data.major, //专业
            Immigration: data.Immigration, //迁移地
            XueXin: data.XueXin, //学信网账户
            XueXinPassword: data.XueXinPassword, //学信网密码
            Founder: data.Founder, //创建人
            belong: data.belong, //归属用户
            createTime: data.createTime, //创建时间
        })
    }

    /**
     * 分页查询
    */
   static async queryList(data) {
        const limit = parseInt(data.limit);
        const page = parseInt(data.page);
        const searchVal = JSON.parse(data.searchVal)
        const {Founder, time, Audit, Entrance} = searchVal
        if(Object.keys(searchVal).length === 0){
            return await Freshmen.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //单条件 多字段搜索
        if (Founder && Object.keys(searchVal).length === 1){
            return await Freshmen.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.or]: [
                        {name: Founder},
                        {IDNumber: Founder},
                        {Sdeclare: Founder},
                        {Founder: Founder}
                    ]
                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //单条件搜索 审核方式
        if (Audit && Object.keys(searchVal).length === 1){
            return await Freshmen.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    Audit: Audit
                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //单条件搜索 申报窗口
        if (Entrance && Object.keys(searchVal).length === 1){
            return await Freshmen.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    Entrance: Entrance
                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //单条件搜索 日期范围搜索
        if (time && Object.keys(searchVal).length === 1){
            return await Freshmen.findAndCountAll({
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
                        }
                    ]

                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        //多条件搜索
        if(Founder && Audit && Object.keys(searchVal).length === 2){
            return await Freshmen.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
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
                        { Audit: Audit }
                    ]
                }
            })
        }
        //多条件搜索
        if(Founder && Entrance && Object.keys(searchVal).length === 2){
            return await Freshmen.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
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
                        { Entrance: Entrance }
                    ]
                }
            })
        }
        //多条件搜索
        if(Founder && time && Object.keys(searchVal).length === 2){
            return await Freshmen.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
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
        if(Audit && Entrance && Object.keys(searchVal).length === 2){
            return await Freshmen.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {Audit: Audit},
                        { Entrance: Entrance }
                    ]
                }
            })
        }
        //多条件搜索
        if(Audit && time && Object.keys(searchVal).length === 2){
            return await Freshmen.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {Audit: Audit},
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
            return await Freshmen.findAndCountAll({
                order: [
                    ['createTime', 'DESC']
                ],
                where:{
                    [Op.and]:[
                        {Audit: Audit},
                        {Entrance: Entrance},
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

module.exports = FreshmenModel