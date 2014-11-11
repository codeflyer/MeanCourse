var productList = require('../../data/products.json');
var len = productList.length;
// http://localhost:3000/categories?filter=phone
module.exports = function (req, res, next) {
    if (req.query.sku == null || req.query.sku.trim() == '') {
        return res.json(400, {});
    }

    for (var i = 0; i < len; i++) {
        if (productList[i].sku == req.query.sku) {
            res.json(productList[i]);
        }
    }
    return res.json(404, {});
};