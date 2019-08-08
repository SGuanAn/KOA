const Mysql = require('../../config/db');
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Alldata = Mysql.import('../../schema/alldata')

class AlldataModel {
    /**
     * 创建模型
    */
    static async add(data) {
        return await Alldata.create({
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
     * 批量创建模型
    */
   static async addArr(arr) {
       return await Alldata.bulkCreate(arr)
   }

    /**
     * 查询 姓名 或者 身份证号
    */
    static async queryData(data) {
        return await Alldata.findOne({
            where: {
                [Op.or]: [
                    { name: data.name },
                    { IDNumber: data.IDNumber }
                ]
            }
        })
    }

    /**
     * 查询 id
    */
    static async queryId(ids) {
        return await Alldata.findAll({
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
        return await Alldata.findAll({
            where: {
                name: names
            }
        })
    }

    /**
     * 并集查询
    */
   static async UnionQuery(IDNumberArr, phoneArr) {
        let dataSQL = `SELECT id,name FROM (SELECT * FROM standard union all SELECT * FROM integral UNION all SELECT * FROM alldata UNION all SELECT * FROM overseas UNION all SELECT * FROM freshmen) as table_zjz where IDNumber in (${IDNumberArr}) OR phone in (${phoneArr})`
        return await Mysql.query(dataSQL);
   }


    /**
     * 分页查询
    */
    static async queryList(data) {
        const limit = parseInt(data.limit);
        const page = parseInt(data.page);
        const ster = limit * (page - 1);
        const searchVal = JSON.parse(data.searchVal)
        let {Founder, time, progress, Audit, Entrance, Sdeclare} = searchVal

        let totalSQL = 'SELECT * FROM (SELECT * FROM standard union all SELECT * FROM integral UNION all SELECT * FROM alldata UNION all SELECT * FROM overseas UNION all SELECT * FROM freshmen) as table_zjz where queryKey=1'

        let dataSQL = `SELECT * FROM (SELECT * FROM standard union all SELECT * FROM integral UNION all SELECT * FROM alldata UNION all SELECT * FROM overseas UNION all SELECT * FROM freshmen) as table_zjz where queryKey=1`

        //多字段查询
        if(Founder){
            totalSQL += ` AND CONCAT(name,IDNumber,phone,source,Founder,belong) like '%${Founder}%'`

            dataSQL += ` AND CONCAT(name,IDNumber,phone,source,Founder,belong) like '%${Founder}%'`
        }
        //查询审核方式
        if(Audit){
            totalSQL += ` AND Audit='${Audit}'`

            dataSQL += ` AND Audit='${Audit}'`
        }
        //查询申报方式
        if(Sdeclare){
            totalSQL += ` AND Sdeclare like '%${Sdeclare}%' `

            dataSQL += ` AND Sdeclare like '%${Sdeclare}%' `
        }
        //查询申报窗口
        if(Entrance){
            totalSQL += ` AND Entrance like '%${Entrance}%'`

            dataSQL += ` AND Entrance like '%${Entrance}%'`
        }
        //查询工作进度
        if(progress){
            totalSQL += ` AND progress='${progress}'`

            dataSQL += ` AND progress='${progress}'`
        }
        //筛选时间查询
        if(time){
            totalSQL += ` AND (createTime >= '${time[0]}' and createTime <= '${time[1]}')`

            dataSQL += ` AND (createTime >= '${time[0]}' and createTime <= '${time[1]}')`
        }
        
        dataSQL += ` order by createTime DESC limit ${ster}, ${limit}`

        let Total = await Mysql.query(totalSQL);
        let DataList = await Mysql.query(dataSQL);
        return await { Total, DataList };
    }

    /**
     * 更新
    */
    static async upData(data) {
        return await Alldata.update(
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
     * 删除
    */
    static async Deletes(ids) {
        return await Alldata.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

    /**
     * 分配
    */
   static async branchData(data) {
       return await Alldata.create({

       })
   }
}

module.exports = AlldataModel