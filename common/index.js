const md5 = require('md5')
const fs = require('fs')
const CryptoJS = require('crypto-js')
// 密钥
const key = CryptoJS.enc.Utf8.parse("eutg^7sNcKpe8ZjT");
const iv = CryptoJS.enc.Utf8.parse('NDZRO2Rtu2etl&PN');


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

    /**
     * 解密
     * @param {*} text
     */
    static async Decrypt(text)
    {
        // 私钥
        let encryptedHexStr = CryptoJS.enc.Hex.parse(text);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedStr.toString());
    }

    /**
     * 加密
     * @param {*} data
     */
    static async Encrypt(data)
    {
        let text = JSON.stringify(data)
        let srcs = CryptoJS.enc.Utf8.parse(text);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString().toUpperCase();
    }

}
module.exports = Common