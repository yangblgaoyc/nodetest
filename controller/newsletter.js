module.exports = function(app){
    app.get('/newsletter',function(req,res){
        res.render('newsletter', { csrf: 'CSRF token goes here' });
    });
}