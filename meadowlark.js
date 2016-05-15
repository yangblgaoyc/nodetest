var express = require("express");
var app = express();
app.set('port',process.env.PORT||3000);

app.get('/',function(req,res){
	res.type('text/plain');
	res.send('meadowlark travel')
});

app.get('/about',function(req,res){
	res.type('text/plain');
	res.send('about meadowlark travel')
});

//404
app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found')
});

//500
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('404 - Server Error')
});

app.listen(app.get('port'),function(){
	console.log('express started on http://localhost:' + app.get('port') + 'press ctrl-c; to terminate')
})