module.exports = function(app){
    app.get('/newsletter',function(req,res){
        res.render('newsletter',{
            "title":"newsletter",
            css: ['/styles/test.css'],
            js: ['/scripts/jquery-1.12.4.js','/scripts/jqueryTest2.js'],
            csrf: 'CSRF token goes here'
        });
    });
}