const crud = require('../../model/crud.js');
module.exports = function(app){
    app.post('/create', function(req, res){
        if(req.xhr || req.accepts('json,html')==='json'){
            console.log(req.body.name)
            // 如果发生错误,应该发送 { error: 'error description' }

            if(!!req.body.name){

                const fluffy = new crud({ name: req.body.name });

                fluffy.save(function (err, returnData) {
                    if (err) {
                        return console.error(err);
                    }
                    else{
                        returnData.speak();
                        res.send({ success: true });
                    }
                });
            }
            else{
                { message: "必须传参数" }
            }
        }
        else{
            // 如果发生错误,应该重定向到错误页面
            console.log('Form (from querystring): ' + req.query.form);
            console.log('CSRF token (from hidden form field): ' + req.body._csrf);
            console.log('Name (from visible form field): ' + req.body.name);
            console.log('Email (from visible form field): ' + req.body.email);
            res.redirect(303, '/thank-you');
        }
    });
}