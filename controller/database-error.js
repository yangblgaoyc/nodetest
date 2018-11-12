module.exports = function(app){
    app.get('/database-error',function(req,res){
        res.render('database-error',{
            "title":"数据错误",
            css: ['/styles/test.css'],
            js: ['']
        });
    });
}