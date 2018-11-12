module.exports = function(app){
    app.get('/jquerytest',function(req,res){
        res.render('jquerytest',{
            "title":"jquery测试页面",
            css: ['/styles/test.css'],
            js: ['/scripts/jquery-1.12.4.js','/scripts/jqueryTest1.js']
        });
    });
}