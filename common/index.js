const md5 = require('md5')

class Common {
    /**
     * md5 加密处理
     * @param {需要加密的值} val 
     * @param {插入加密中的索引} solt 
    */
    static async MD5(val, solt) {
        return await md5(md5(val)+solt);
    }

    /**
     * 判断一个元素是否存在于一个数组中
     * @param {Object} arr 数组
     */
    static async isInArray(array) {
        for(var i in array){
            if(array[i].belong !== '无'){
                return false;
            } else {
                return true;
            }
        }
    }
}
module.exports = Common