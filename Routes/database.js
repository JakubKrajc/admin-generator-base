var express = require('express');
var router = express.Router();
var auth = require("../Modules/Auth");
var FlashMessages = require("../Modules/FlashMessages");

//models
const db = require('../Modules/Postgres')

router.get('/query', auth.authenticate, function (req, res, next){
    res.render('database/query', {
        title: 'Database :: Query',
        authuser: req.user,
        FlashMessages: FlashMessages.getAll(req)
    });
});

router.post('/query', auth.authenticate, function (req, res, next){
    db.query(req.body.query, [], function(err, data) {
        if (err) {
            FlashMessages.add(req, {
                type: "err",
                message: 'Error executing query.'
            });
        }else{
            FlashMessages.add(req, {
                type: "success",
                message: 'Query was executed succesfully.'
            });
            
        }
        res.redirect('/admin/database/query');
    });

    /**/
});

module.exports = router;