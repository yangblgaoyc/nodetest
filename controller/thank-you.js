module.exports = function(app){
    app.get('/thank-you',function(req,res){
        res.render('thank-you',{
            "title":"thank-you",
            css: ['/styles/test.css'],
            js: ['']
        });
    });
}