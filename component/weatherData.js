//公用天气组件
function getWeatherData(){
    return {
        loactions :[
            {
                'name': 'Portland',
                'forecastUrl':'http://www.wunderground.com/US/OR/Portland.html',
                'icon':'http://icon-ak.wxug.com/i/c/k/cloudy.gif',
                'weather':'Overcast',
                'temp':'54.1 F(12.3 C)'
            },
            {
                'name': 'Bend',
                'forecastUrl':'http://www.wunderground.com/US/OR/Bend.html',
                'icon':'http://icon-ak.wxug.com/i/c/k/partlycloudy.gif',
                'weather':'Partly Cloudy',
                'temp':'55.0 F(12.8 C)'
            },
            {
                'name': 'Manzanita',
                'forecastUrl':'http://www.wunderground.com/US/OR/Manzanita.html',
                'icon':'http://icon-ak.wxug.com/i/c/k/rain.gif',
                'weather':'Light Rain',
                'temp':'55.0 F(12.8 C)'
            }

        ]
    }
}
module.exports = function(app){
    app.use(function(req,res,next){
        if(!res.locals.partials){
            res.locals.partials = {};
        }
        res.locals.partials.weather = getWeatherData();
        next();
    });
}