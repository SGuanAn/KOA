const fs = require('fs')
var paths = require('path');
const util = require('util');

class FileManageController {
    /**
     * 读取文件
     */
    static async FileManage(ctx) {
        const path = ctx.query.path
        let filesList = []
        let newfiles = []
        await new Promise((resolve, reject) => {
            fs.readdir('./' + path, function(err, picFiles) {
                if(err) ctx.throw(err);
                filesList = picFiles; // 将所有的文件夹名字存入filesList。
                resolve();  // resolve过后，await语句结束
            })
        })
        const stats = function (fileName) {
            return new Promise((resolve, reject) => {
                let file = fs.statSync('./' + path + '/' + fileName);
                if(file.isDirectory()) {
                    let obj1 = {
                        size: file.size,
                        name: fileName,
                        type: 'folder',
                        gmtModified: file.ctime,
                        path: path + '/' + fileName
                    }
                    newfiles.push(obj1);
                } else {
                    var site = fileName.lastIndexOf(".");
                    let Suffix = fileName.substring(site + 1, fileName.length)
                    let obj2 = {
                        size: file.size,
                        name: fileName,
                        type: Suffix,
                        gmtModified: file.ctime,
                        path: path + '/' + fileName
                    }
                    newfiles.push(obj2);
                }
                resolve();
            })
        }
        let promises = filesList.map(fileName => stats(fileName));
        await Promise.all(promises);
        ctx.body = newfiles
    }

    /**
     * 新建文件夹
     */
    static async createFolder(ctx) {
        const fileName = ctx.request.body.fileName;
        const path = ctx.request.body.path;
        let Mkdir = function (fileName) {
            return new Promise((resolve, reject) => {
                fs.mkdir(path + '/' + fileName , function(err){
                    if(err) ctx.throw(err);
                });
                resolve();
            })
        }
        let add = Mkdir(fileName);
        if(add){
            ctx.body = {
                code: 200,
                msg: '创建成功'
            }
        } else {
            ctx.body = {
                code: -200,
                msg: '创建失败'
            }
        }
    }

    /**
     * 上传
     */
    static async uploadData(ctx) {
        const path = ctx.request.body.filePath;
        const files = ctx.request.files.file; // 获取上传文件
        let filesArr = []
        filesArr.push(files)
        for (let file of filesArr) {
          // 创建可读流
          const reader = fs.createReadStream(file.path);
          // 获取上传文件扩展名
          let filePath = paths.join('./' + path) + `/${file.name}`;
          // 创建可写流
          const upStream = fs.createWriteStream(filePath);
          // 可读流通过管道写入可写流
          reader.pipe(upStream);
        }
        ctx.body = {
            code: 200,
            msg: '上传成功'
        }
    }

    /**
     * 重命名
     */
    static async renameFile(ctx){
        const path = ctx.request.body.path;
        const oldName = ctx.request.body.oldName;
        const newName = ctx.request.body.newName;
        const aName = './' + path + '/' + oldName;
        const bName = './' + path + '/' + newName;
        let rename = function( aName, bName) {
            return new Promise((resolve, reject) => {
               fs.rename(aName, bName, function(err){
                    if(err) ctx.throw(err);
               })
               resolve();
            })
        }
        const True = await rename(aName, bName);
        ctx.body = {
            code: 200,
            msg: '操作成功'
        }
    }

    /**
     * 删除
     */
    static async deleteFile(ctx){
        const path = ctx.request.body.path;      
        let stat = util.promisify(fs.stat);
        let readdir = util.promisify(fs.readdir); //判断文件类型下面的文件
        let rmdir = util.promisify(fs.rmdir); //删除目录
        let unlink = util.promisify(fs.unlink);//删除文件
        let removeDir = async function(p){
            let statObj = await stat(p);
            if(statObj.isDirectory()){
                let dirs = await readdir(p);
                dirs = dirs.map(dir => paths.join(p, dir)); 
                dirs = dirs.map(dir => removeDir(dir));
                await Promise.all(dirs);
                await rmdir(p)
             }else{
                // 等待文件删除后 才让promise执行完 所以需要await
                await unlink(p);
             }
        }
        removeDir(path);
        ctx.body = {
            code: 200,
            msg: '操作成功'
        }
    }

}

module.exports = FileManageController