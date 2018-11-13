module.exports = function (app) {

    const formidable = require('formidable');

    app.post('/vacation-photo/:year/:month', function (req, res) {
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) return res.redirect(303, '/error');
            console.log('received fields:');
            console.log(fields);
            console.log('received files:');
            console.log(files);
            res.redirect(303, '/thank-you');
        });
    });
}