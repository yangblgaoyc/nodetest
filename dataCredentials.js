
module.exports = {
    mongo: {
        development: {
            connectionString: 'mongodb://127.0.0.1:27017/nodetest',
        },
        production: {
            connectionString: 'mongodb://127.0.0.1:27017/nodetest',
        }
    },
    //关于opts配置请参考https://www.cnblogs.com/surahe/p/5191598.html
    opts:{
        server: {
            socketOptions: { keepAlive: 1 }
        },
        replset : {
            socketOptions: { keepAlive: 1 }
        }

    }
}