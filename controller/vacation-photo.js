module.exports=function(app){
    app.get('/vacation-photo',function(req,res){
        const now = new Date();
        res.render('vacation-photo',{
            "title":"vacation-photo",
            css: ['/styles/test.css'],
            js: [''],
            year: now.getFullYear(),
            month: now.getMonth()
        });
    });
}