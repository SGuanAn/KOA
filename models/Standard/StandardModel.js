const Mysql = require('../../config/db');
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Standard = Mysql.import('../../schema/standard')

class StandardModel {
    /**
     * 查询 name
    */
   static async queryName(names) {
        return await Standard.findAll({
            where: {
                name: {
                    [Op.in]: names
                }
            }
        })
    }

    /**
     * 转出
    */
   static async RollOut(data) {
        return await Standard.update(
            { belong: data.belong },
            {
                where: {
                    id: data.id
                }
            }
        )
    }

    /**
     * 添加
    */
    static async add(data) {
        return await Standard.create({
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
     * id查询
    */
   static async query(ids) {
        return await Standard.findAll({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

    /**
     * 更新
    */
    static async upData(data) {
        return await Standard.update(
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
        return await Standard.update(
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
        return await Standard.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

}

module.exports = StandardModel