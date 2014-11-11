/**
 * @author Davide Fiorello <davide@codeflyer.com>
 */

var indexCtrl = require('./routes/index');
var categoryListCtrl = require('./routes/categoryList');
var productListCtrl = require('./routes/productList');
var productCtrl = require('./routes/product');

module.exports = function(app) {
    app.get('/', indexCtrl);
    app.get('/categories', categoryListCtrl);
    app.get('/products', productListCtrl);
    app.get('/product', productCtrl);
};
