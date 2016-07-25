var express = require("express");
var app = express();
var handlebars = require('express3-handlebars').create({
	defaultLayout:'main',
	helpers:{
		section:function(name,options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT||3000);

app.use( '/public',express.static(__dirname + '/public'));
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

//静态数据与下个ajax接口整理到一个api模块
var tours = [
	{id:0,name:'Hood River',price:99.99},
	{id:1,name:'Oregon Coast',price:149.95}
]
//一下胃待整理接口
//ajax接口
app.get('/api/tours',function(req,res){
	res.json(tours);
});

//表单ajax接口
app.post('/process-contact',function(req,res){
	console.log('Received contact from' + req.body.name + '<' + req.body.email + '>');
	try{
		return req.xhr ? res.render({succes:true}) : res.redirect(303,'/thank-you')
	}
	catch(ex) {
		return req.xhr ? res.json({error:'Database error'}) : res.redirect(303,'/database-error');
	}
});

//ajax接口
app.get('/api/nursery-rhyme', function(req, res){
	res.json({
		animal: 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
});

//公用组件
function getWeatherData(){
	return {
		loactions :[
			{
				'name': 'Portland',
				'forecastUrl':'http://www.wunderground.com/US/OR/Portland.html',
				'icon':'http://icon-ak.wxug.com/i/c/k/cloudy.gif',
				'weather':'Overcast',
				'temp':'54.1 F(12.3 C)'
			},
			{
				'name': 'Bend',
				'forecastUrl':'http://www.wunderground.com/US/OR/Bend.html',
				'icon':'http://icon-ak.wxug.com/i/c/k/partlycloudy.gif',
				'weather':'Partly Cloudy',
				'temp':'55.0 F(12.8 C)'
			},
			{
				'name': 'Manzanita',
				'forecastUrl':'http://www.wunderground.com/US/OR/Manzanita.html',
				'icon':'http://icon-ak.wxug.com/i/c/k/rain.gif',
				'weather':'Light Rain',
				'temp':'55.0 F(12.8 C)'
			}

		]
	}
}
//公用组件接上
app.use(function(req,res,next){
	if(!res.locals.partials){
		res.locals.partials = {};
	}
	res.locals.partials.weather = getWeatherData();
	next();
});

app.post('/process', function(req, res){
	console.log('Form (from querystring): ' + req.query.form);
	console.log('CSRF token (from hidden form field): ' + req.body._csrf);
	console.log('Name (from visible form field): ' + req.body.name);
	console.log('Email (from visible form field): ' + req.body.email);
	res.redirect(303, '/thank-you');
});


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