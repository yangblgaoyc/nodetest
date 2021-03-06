﻿const express = require("express");
const app = express();
const path = require('path');
const hbs = require('express-hbs');
const http = require("http");
const mongoose = require('mongoose');
const credentials = require('./dataCredentials');
const fs = require('fs')

switch(app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString,{useNewUrlParser:true}, credentials.opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString,{useNewUrlParser:true}, credentials.opts);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}

// 初始化and启用handlebars引擎
function relative(myPath) {
    return path.join(__dirname, myPath);
}

app.engine('hbs', hbs.express4({
    partialsDir: relative('views/partials'),
    layoutsDir: relative('views/layouts'),
    defaultLayout: relative('views/layouts/default.hbs'),
}));
app.set('view engine', 'hbs');

const helpers = require('./helpers/helpers');
helpers.setup(hbs);
// helpers 暂时没用 参考https://www.cnblogs.com/qieguo/p/5811988.html

app.set('views', relative('views'));
app.set('port',process.env.PORT||3000);

// 设置静态呢文件目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser')());

//遍历所有路由文件函数
function readDirSync(path) {
    const route = fs.readdirSync(path);
    route.forEach(function (ele) {
        const info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            readDirSync(path + "/" + ele);
        } else {
            require(path + '/' + ele)(app);
        }
    });
}

//路由引入
readDirSync('./controller');

//api路由引入
readDirSync('./api');

//公用组件js引入
readDirSync('./component');
//更智能的路由引入请参考《Node与Express开发》143页。

//404
app.use(function(req,res,next){
	res.status(404);
	res.render('404');
});

//500或统一服务器error错误
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500')
});

// 引用集群，防止线程死掉而宕机
function startServer(){
    http.createServer(app).listen(app.get('port'),function(){
        console.log('express started in http://localhost:' + app.get('env') + 'mode on http://localhost: ' + app.get('port') + ';press ctrl-c; to terminate')
    });
}

if(require.main === module){
    // 本js应用程序直接运行；启用应用服务器；
    startServer();
}
else{
    // 应用 程序作为一个模块通过"require"引入：导出函数
    // 创建服务期
    module.exports = startServer;
}