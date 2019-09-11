const Redis = require('ioredis')

const redis = {
    port: 6379,  // redis 端口
    host: '127.0.0.1',  // redis ip地址
    family: 4,  // 4 (IPv4) or 6 (IPv6)
}

const newRedis = new Redis(redis)

// 监听链接
// newRedis.on('connect', function () {
//     console.log('Redis client connected')
// })

// 监听错误
newRedis.on('error', function (err) {
    // console.error(err)
})


module.exports = newRedis