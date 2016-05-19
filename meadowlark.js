var express = require("express");
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT||3000);

app.use(express.static(__dirname + '/public'));

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

app.get('/greeting',function(req,res){
	res.render('greeting',{
		'message':'welcome',
		'style':req.query.style,
		//'userid':req.cookie.userid,
		//'username':req.session.username,
	})
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