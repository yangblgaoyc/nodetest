module.exports = function(app){
    app.get('/database-error',function(req,res){
        res.render('database-error');
    });
}