const Mysql = require('../../config/db');
const Sequelize = require('sequelize');
const Standard = Mysql.import('../../schema/standard');
const Integral = Mysql.import('../../schema/integral');
const Overseas = Mysql.import('../../schema/overseas');
const Freshmen = Mysql.import('../../schema/freshmen');

class IndexModel {
    /**
     * 我的数据
     */
    static async queryUserDatas(name){
        let totalSQL = `SELECT * FROM (SELECT * FROM standard union all SELECT * FROM integral UNION all SELECT * FROM alldata UNION all SELECT * FROM overseas UNION all SELECT * FROM freshmen) as table_zjz where belong= '${name}' `
        return await Mysql.query(totalSQL);
    }

    /**
     * 我的数据
     */
    static async queryLabelDatas(){
        const data = '已办理完结'
        let SameMonthSQL = `SELECT * FROM (SELECT * FROM standard union all SELECT * FROM integral UNION all SELECT * FROM alldata UNION all SELECT * FROM overseas UNION all SELECT * FROM freshmen) as table_zjz where progress='${data}' AND DATE_FORMAT( createTime, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' )`

        let LastMonthSQL = `SELECT * FROM (SELECT * FROM standard union all SELECT * FROM integral UNION all SELECT * FROM alldata UNION all SELECT * FROM overseas UNION all SELECT * FROM freshmen) as table_zjz where progress='${data}' AND PERIOD_DIFF( date_format( now( ) , '%Y%m' ) , date_format( createTime, '%Y%m' ) ) =1`

        let SameMonth = await Mysql.query(SameMonthSQL);
        let LastMonth = await Mysql.query(LastMonthSQL);
        return { SameMonth, LastMonth };
        
    }

    /**
     * 新录数据
     */
    static async queryNewData(){
        let totalSQL = `SELECT * FROM (SELECT * FROM standard union all SELECT * FROM integral UNION all SELECT * FROM alldata UNION all SELECT * FROM overseas UNION all SELECT * FROM freshmen) as table_zjz where progress='无' AND belong = '无'`
        return await Mysql.query(totalSQL);
    }

    /**
     * 我的数据详情
     */
    static async DataDetails(name) {
        let standardArr =  await Standard.findAll({ attributes: ['progress', 'id'], where:{ belong: name }});
        let IntegralArr =  await Integral.findAll({ attributes: ['progress', 'id'], where:{ belong: name }});
        let OverseasArr =  await Overseas.findAll({ attributes: ['progress', 'id'], where:{ belong: name }});
        let FreshmenArr =  await Freshmen.findAll({ attributes: ['progress', 'id'], where:{ belong: name }})
        return { standardArr, IntegralArr, OverseasArr, FreshmenArr };
    }

}
module.exports = IndexModel