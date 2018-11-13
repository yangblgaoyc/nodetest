module.exports = function(app){
    app.get('/nursery-rhyme',function(req,res){
        res.render('nursery-rhyme',{
            "title":"nursery-rhyme",
            css: ['/styles/test.css'],
            js: ['/scripts/jquery-1.12.4.js','/scripts/jqueryTest3.js']
        });
    });
}