var express = require('express');
var router = express.Router();
var auth = require("../Modules/Auth");
var FlashMessages = require("../Modules/FlashMessages");
var dashboardModel = require("../Models/Dashboard");

/* List of products. */
router.get('/', auth.authenticate, function (req, res, next) {
    dashboardModel.getTiles(function (err, tiles) {
        if (err) {
            FlashMessages.add(req, {
                type: "err",
                message: err.message
            });
        }
        res.render('dashboard/index', {
            title: 'Express',
            authuser: req.user,
            FlashMessages: FlashMessages.getAll(req),
            tiles: tiles
        });
   });
});

/*ajax list of data*/
router.get('/dashboard/ajax', auth.authenticate, function (req, res, next) {
    /*productModel.find([], function (err, products) {
        res.json(products);
    });*/
});

module.exports = router;
