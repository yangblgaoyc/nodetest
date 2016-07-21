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

var fortunes = [
	"conquer your feas or they will conquer you.",
	"rivers need springs.",
	"do not fear what you dont't know",
	"whenever possible,keep it simple."
]

app.get('/',function(req,res){
	res.render('home')
});

app.get('/about',function(req,res){
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about',{fortune:randomFortune});
});

var tours = [
	{id:0,name:'Hood River',price:99.99},
	{id:1,name:'Oregon Coast',price:149.95}
]

app.get('/api/tours',function(req,res){
	res.json(tours);
})

app.get('/greeting',function(req,res){
	res.render('greeting',{
		'message':'welcome',
		//'style':req.query.style,
		//'userid':req.cookie.userid,
		//'username':req.session.username,
	})
});

app.get('/thank-you',function(req,res){
	res.render('thank-you');
});

app.get('/database-error',function(req,res){
	res.render('database-error');
});

app.post('/process-contact',function(req,res){
	console.log('Received contact from' + req.body.name + '<' + req.body.email + '>');
	try{
		return req.xhr ? res.render({succes:true}) : res.redirect(303,'/thank-you')
	}
	catch(ex) {
		return req.xhr ? res.json({error:'Database error'}) : res.redirect(303,'/database-error');
	}
});

app.get('/jquerytest',function(req,res){
	res.render('jquerytest')
});

app.get('/nursery-rhyme', function(req, res) {
	res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function(req, res){
	res.json({
		animal: 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
});


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

app.use(function(req,res,next){
	if(!res.locals.partials){
		res.locals.partials = {};
	}
	res.locals.partials.weather = getWeatherData();
	next();
})

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