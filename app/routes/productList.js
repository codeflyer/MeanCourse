var productList = require('../../data/products.json');
var len = productList.length;
// http://localhost:3000/categories?filter=phone
module.exports = function (req, res, next) {
    if (req.query.category == null || req.query.category.trim() == '') {
        return res.json({});
    }

    var category = req.query.category.trim();
    var filter = req.query.filter == null ? '' : req.query.filter.trim().toLowerCase();

    var returnList = [];
    for (var i = 0; i < len; i++) {
        if (productList[i]['categories'].indexOf(category) >= 0) {
            if(filter == '') {
                returnList.push(productList[i]);
            } else if(
                productList[i].name.toLowerCase().indexOf(filter) >= 0 ||
                productList[i].shortDescription.toLowerCase().indexOf(filter) >= 0 ||
                productList[i].longDescription.toLowerCase().indexOf(filter) >= 0 ||
                productList[i].type.toLowerCase().indexOf(filter) >= 0
            ){
                returnList.push(productList[i]);
            }
        }
    }

    return res.json(returnList.map(function(product) {
        return {
            sku : product.sku,
            name : product.name,
            type : product.type,
            thumbnailImage : product.thumbnailImage,
            regularPrice : product.regularPrice,
            salePrice : product.salePrice,
            shortDescription : product.shortDescription,
            manufacturer : product.manufacturer
        }
    }));
};