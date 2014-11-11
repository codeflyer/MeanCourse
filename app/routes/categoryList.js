var categoryList = require('../../data/categories.json');

// http://localhost:3000/categories?filter=phone
module.exports = function (req, res, next) {
    if (req.query.filter == null || req.query.filter.trim() == '') {
        return res.json(categoryList);
    }

    var filter = req.query.filter.trim().toLowerCase();
    var returnList = {};
    for (var key in categoryList) {
        if (categoryList[key].toLowerCase().indexOf(filter) >= 0) {
            returnList[key] = categoryList[key];
        }
    }
    return res.json(returnList);
};