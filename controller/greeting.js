module.exports = function(app){
    app.get('/greeting',function(req,res){
        res.render('greeting',{
            "title":"欢迎",
            css: ['/styles/test.css'],
            js: [''],
            'message':'welcome',
            //'style':req.query.style,
            //'userid':req.cookie.userid,
            //'username':req.session.username,
        });
    });
}