module.exports = function(app){
    app.get('/jquerytest',function(req,res){
        res.render('jquerytest');
    });
}