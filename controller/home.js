const mongoose = require('mongoose');
module.exports = function(app){

    const kittySchema = mongoose.Schema({
        name: String
    });
    // 译者注：注意了， method 是给 document 用的
    // NOTE: methods must be added to the schema before compiling it with mongoose.model()
    kittySchema.methods.speak = function () {
        const greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    }

    const Kitten = mongoose.model('Kitten', kittySchema);
    const fluffy = new Kitten({ name: 'fluffy' });
    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });

    app.get('/',function(req,res){
       res.render('home',{
           "title":"首页",
           css: ['/styles/test.css'],
           js: ['']
       });
    });
}