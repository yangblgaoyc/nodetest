const mongoose = require('mongoose');
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

module.exports = mongoose.model('Kitten', kittySchema);
