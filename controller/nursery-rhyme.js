module.exports = function(app){
    app.get('/nursery-rhyme',function(req,res){
        res.render('nursery-rhyme');
    });
}