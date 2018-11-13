﻿var express = require("express");
var app = express();
var path = require('path');
var hbs = require('express-hbs');
// var handlebars = require('express3-handlebars').create({
// 	defaultLayout:'main',
// 	helpers:{
// 		section:function(name,options){
// 			if(!this._sections) this._sections = {};
// 			this._sections[name] = options.fn(this);
// 			return null;
// 		}
// 	}
// });
// app.engine('handlebars',handlebars.engine);
// app.set('view engine','handlebars');
// 加载hbs模块


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

var helpers = require('./helpers/helpers');
helpers.setup(hbs);
// helpers 暂时没用 参考https://www.cnblogs.com/qieguo/p/5811988.html

app.set('views', relative('views'));

app.set('port',process.env.PORT||3000);



// 设置静态呢文件目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser')());

//路由引入
require('./controller/home.js')(app);
require('./controller/about.js')(app);
require('./controller/greeting.js')(app);
require('./controller/thank-you.js')(app);
require('./controller/database-error.js')(app);
require('./controller/jquerytest.js')(app);
require('./controller/nursery-rhyme.js')(app);
require('./controller/newsletter.js')(app);
require('./controller/vacation-photo.js')(app);

//api路由引入
require('./api/tours.js')(app);
require('./api/process-contact.js')(app);
require('./api/nursery-rhyme.js')(app);
require('./api/process.js')(app);
require('./api/vacation-photo.js')(app);

//公用组件js引入
require('./component/weatherData.js')(app);

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

app.listen(app.get('port'),function(){
	console.log('express started on http://localhost:' + app.get('port') + 'press ctrl-c; to terminate')
});