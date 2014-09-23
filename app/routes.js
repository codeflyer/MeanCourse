/**
 * @author Davide Fiorello <davide@codeflyer.com>
 */

var indexCtrl = require('./routes/index');

module.exports = function(app) {
    app.get('/', indexCtrl);
};
