//并集查询 
const QUERY_UNION = `SELECT * FROM alldata UNION ALL select * FROM standard UNION ALL select * FROM integral order by createTime DESC limit ${ster} ,${limit}`

module.exports = {
    QUERY_UNION
}