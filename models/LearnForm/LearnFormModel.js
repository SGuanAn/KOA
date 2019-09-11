const Mysql = require('../../config/db');
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const LearnForm = Mysql.import('../../schema/learnform');


class LearnFormModel
{
    /**
     * 查询是否有重复手机号和身份证号
     */
    static async queryRepeat(phoneArr, IDNumberArr)
    {
        return await LearnForm.findAll({
            where: {
                [Op.or]: [
                    {
                        phone: {
                            [Op.in]: phoneArr
                        }
                    },
                    {
                        IDNumber: {
                            [Op.in]: IDNumberArr
                        }
                    }
                ]
            }
        })
    }

    /**
     * 添加
     */
    static async add(data)
    {
        return await LearnForm.create({
            name: data.name, //姓名
            Gender: data.Gender, //性别
            age: data.age, //年龄
            IDNumber: data.IDNumber, //身份证号
            BirthDate: data.BirthDate, //出身日期
            Nation: data.Nation, //民族
            Marriage: data.Marriage, //婚姻状况
            phone: data.phone, //手机号码
            Occupation: data.Occupation, //职业
            address: data.address, //通讯地址
            Total: data.Total, //总费用
            one_Tuition: data.one_Tuition, // 第一年学费
            two_Tuition: data.two_Tuition, //第二年学费
            Unpaid: data.Unpaid, //未缴
            source: data.source, //来源
            promote: data.promote, //层次
            Enrolment: data.Enrolment, //报读院校
            payment: data.payment, //付款方式
            major_enrollment: data.major_enrollment, //报读专业
            batch: data.batch, //批次
            receipt: data.receipt, //收据编号
            student_account: data.student_account, //学员账户
            student_password: data.student_password, //学员密码
            Payment_status: data.Payment_status, //缴费情况
            signTime: data.signTime, //报名日期
            recruit_teacher: data.recruit_teacher, //招生老师
            reception_teacher: data.reception_teacher, //接待老师
            Remarks: data.Remarks, //备注
            mail: data.mail, // 邮箱
            Political: data.Political, // 政治面貌
            register: data.register, // 户籍
            emergency_contact: data.emergency_contact, // 紧急联系人
            Types_type: data.Types_type, // 报读类型
            createTime: data.createTime, //创建时间
            updateTime: Date.now(), // 更新时间
        })
    }


    /**
     * 批量添加
     * @param {*} arr 
     */
    static async addArr(arr) {
        return await LearnForm.bulkCreate(arr)
    }

    /**
     * 更新
     */
    static async upData(data)
    {
        return await LearnForm.update(
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
                address: data.address, //通讯地址
                Total: data.Total, //总费用
                one_Tuition: data.one_Tuition, // 第一年学费
                two_Tuition: data.two_Tuition, //第二年学费
                Unpaid: data.Unpaid, //未缴
                source: data.source, //来源
                promote: data.promote, //层次
                Enrolment: data.Enrolment, //报读院校
                payment: data.payment, //付款方式
                major_enrollment: data.major_enrollment, //报读专业
                batch: data.batch, //批次
                receipt: data.receipt, //收据编号
                student_account: data.student_account, //学员账户
                student_password: data.student_password, //学员密码
                Payment_status: data.Payment_status, //缴费情况
                signTime: data.signTime, //报名日期
                recruit_teacher: data.recruit_teacher, //招生老师
                reception_teacher: data.reception_teacher, //接待老师
                Remarks: data.Remarks, //备注
                mail: data.mail, // 邮箱
                Political: data.Political, // 政治面貌
                register: data.register, // 户籍
                emergency_contact: data.emergency_contact, // 紧急联系人
                Types_type: data.Types_type, // 报读类型
            },
            {
                where: { id: data.id }
            }
        )
    }

    /**
     * 删除
    */
   static async Deletes(ids) {
        return await LearnForm.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
    }

    /**
     * 分页查询
    */
   static async queryList(data) {
        const limit = parseInt(data.limit);
        const page = parseInt(data.page);
        const ster = limit * (page - 1);
        const searchVal = JSON.parse(data.searchVal)
        let {Founder, time, promote, Enrolment, Types_type, major_enrollment, batch} = searchVal

        let totalSQL = 'SELECT * FROM learnform where queryKey=1'

        let dataSQL = `SELECT * FROM learnform where queryKey=1`

        //多字段查询
        if(Founder){
            totalSQL += ` AND CONCAT(name,Payment_status,IDNumber,phone) like '%${Founder}%'`

            dataSQL += ` AND CONCAT(name,Payment_status,IDNumber,phone) like '%${Founder}%'`
        }
        //查询层次
        if(promote){
            totalSQL += ` AND promote='${promote}'`

            dataSQL += ` AND promote='${promote}'`
        }
        //查询报读院校
        if(Enrolment){
            totalSQL += ` AND Enrolment like '%${Enrolment}%' `

            dataSQL += ` AND Enrolment like '%${Enrolment}%' `
        }
        //查询报读类型
        if(Types_type)
        {
            totalSQL += ` AND Types_type like '%${Types_type}%' `

            dataSQL += ` AND Types_type like '%${Types_type}%' `
        }
        //查询报读专业
        if(major_enrollment){
            totalSQL += ` AND major_enrollment like '%${major_enrollment}%'`

            dataSQL += ` AND major_enrollment like '%${major_enrollment}%'`
        }
        //查询批次
        if(batch){
            totalSQL += ` AND batch = '${batch}'`

            dataSQL += ` AND batch = '${batch}'`
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

}

module.exports = LearnFormModel