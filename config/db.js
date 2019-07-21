const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'qinxueform', //数据库名
    'root',       //数据库用户名
    'root',       //数据库用户密码
    {
    host: 'localhost',  // 数据库地址
    dialect: 'mysql',   // 指定连接的数据库类型
    quoteIdentifiers: true,
    freezeTableName: true,  //可以给表设置别名
    define: {
        timestamps: false,
    },
    pool: {
        max: 5,        // 连接池中最大连接数量
        min: 0,        // 连接池中最小连接数量
        idle: 10000    // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },
    timezone: '+08:00'
})

module.exports = sequelize