module.exports = function(app){
    app.post('/process-contact',function(req,res){
        console.log('Received contact from' + req.body.name + '<' + req.body.email + '>');
        try{
            return req.xhr ? res.render({succes:true}) : res.redirect(303,'/thank-you')
        }
        catch(ex) {
            return req.xhr ? res.json({error:'Database error'}) : res.redirect(303,'/database-error');
        }
    });
}