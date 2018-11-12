/**
 * Created by yangbolun on 2017/3/8.
 */
/**
 * Created by caifuyun on 2017/3/6.
 */
module.exports = {
    setup: function (hbs) {
        hbs.registerHelper('section', function(name, options) {
            if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
        });
    }
};