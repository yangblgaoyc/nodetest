module.exports = function(app){
    app.get('/',function(req,res){
       res.render('home',{
           "title":"首页",
           css: ['/styles/test.css'],
           js: ['/scripts/jquery-1.12.4.js','/scripts/crud.js']
       });
    });
}