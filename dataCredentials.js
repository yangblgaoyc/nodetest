
// module.exports = {
//     mongo: {
//         development: {
//             connectionString: 'mongodb://127.0.0.1:27017/nodetest',
//         },
//         production: {
//             connectionString: 'mongodb://127.0.0.1:27017/nodetest',
//         }
//     },
//     //关于opts配置请参考https://www.cnblogs.com/surahe/p/5191598.html
//     opts:{
//         server: {
//             socketOptions: { keepAlive: 1 }
//         },
//         replset : {
//             socketOptions: { keepAlive: 1 }
//         }
//
//     }
// }
//mlab线上免费数据库连接地址
module.exports = {
    mongo: {
        development: {
            connectionString: 'mongodb://nodetest:gaibo010@ds125684.mlab.com:25684/practice',
        },
        production: {
            connectionString: 'mongodb://nodetest:gaibo010@ds125684.mlab.com:25684/practice',
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