module.exports=function(app){
    const fortunes = [
        "conquer your feas or they will conquer you.",
        "rivers need springs.",
        "do not fear what you dont't know",
        "whenever possible,keep it simple."
    ];

    app.get('/about',function(req,res){
        var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        res.render('about',{
            "title":"关于",
            css: ['/styles/test.css'],
            js: [''],
            fortune:randomFortune
        });
    });
}