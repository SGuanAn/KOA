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

    static async ArrayTrue(array) {
        for(var i in array){
            if(array[i].name !== '' && array[i].IDNumber !== '' && array[i].phone !== 'undefined' && (array[i].Sdeclare === '个人申报' || array[i].Sdeclare === '单位申报' && array[i].Sdeclare !== '') && (array[i].Audit === '标准制' || array[i].Audit === '积分制' || array[i].Audit === '留学生' || array[i].Audit === '应届生' && array[i].Audit !== '')){
            } else {
                return false;
            }
        }
        return true;
    }

    static async isRepeat(array) {
        var hash = {};
        for(var i in array) {
            if(hash[array[i].IDNumber] || hash[array[i].phone])
                return false;
            hash[array[i].IDNumber] = true;
            hash[array[i].phone] = true;
        }
        return true;
    }

}
module.exports = Common