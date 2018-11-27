const crud = require('../../model/crud.js');
module.exports = function(app){
    app.post('/update', function(req, res){
        if(req.xhr || req.accepts('json,html')==='json'){
            // 如果发生错误,应该发送 { error: 'error description' }
            var id = req.body.id;
            var updatevalue = {'name': req.body.name};
            crud.findByIdAndUpdate(id,updatevalue, function(err, update_data){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    console.log("Res:" + update_data);
                    res.send({
                        success: true
                    });
                }
            })
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