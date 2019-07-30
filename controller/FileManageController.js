const fs = require('fs')

class FileManageController {
    /**
     * 读取文件
     */
    static async FileManage(ctx) {
        const path = ctx.query.path
        console.log(path)
        fs.readdir(path, function(err, file){
            if(err){
                console.log(err);
            }else{
                console.log(file)
                // file.forEach(val => {
                //     fs.stat(val, function(err, stats){
                //         console.log(stats)
                //     })
                // })
            }
        });
    }


}

module.exports = FileManageController