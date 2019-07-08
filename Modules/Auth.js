var userModel = require("../Models/Users");
var FlashMessages = require("../Modules/FlashMessages");
var jwt = require('jsonwebtoken');

var config = require('../Config');
var crypto = require('crypto');


var adminLogin = {};

adminLogin.salt = config.auth.salt;
adminLogin.algo = config.auth.algo;

adminLogin.hash = function(str){
    return crypto.createHash(this.algo).update(str + this.salt).digest('hex');
};

adminLogin.authenticate = function (req, res, next) {
    //console.log(req.session);
    if(req.cookies.auth){
        console.log(req.cookies.auth);
        try {
            var dec = jwt.verify(req.cookies.auth, 'somepass');
            console.log(dec);
            req.user = dec;
            next();
        } catch(err) {
            FlashMessages.add(req, {
                type: "err",
                message: 'Page is restricted to logged admin only!'
            });
    
            res.redirect("/admin/users/login?redirect="+encodeURIComponent(req.originalUrl));
        }
    }else{
        FlashMessages.add(req, {
            type: "err",
            message: 'Page is restricted to logged admin only!'
        });

        res.redirect("/admin/users/login?redirect="+encodeURIComponent(req.originalUrl));
    }


    /*if (req.session.authuser) {
        console.log('Cookies: ', req.cookies)

        req.user = req.session.authuser;
        next();
    } else {
        FlashMessages.add(req, {
            type: "err",
            message: 'Page is restricted to logged admin only!'
        });

        res.redirect("/admin/users/login?redirect="+encodeURIComponent(req.originalUrl));
    }*/
    //next();
}

adminLogin.login = function (req, res, next) {
    var self = adminLogin;
    userModel.find({'email': req.body.email}, {}, function (err, users) {
        if (err) {
            FlashMessages.add(req, {
                type: "err",
                message: 'DB Error.'
            });
            if(req.query.redirect){
                res.redirect("/admin/users/login?redirect="+encodeURIComponent(req.query.redirect));
            }else{
                res.redirect("/admin/users/login");
            }
            
        } else {
            if (users.length > 0) {
                var user = users[0];
                var hpass = self.hash(req.body.pass);

                if (user.password.toUpperCase()!=hpass.toUpperCase()) {
                    FlashMessages.add(req, {
                        type: "err",
                        message: 'Wrong Email or Password!!.'
                    });
                    if(req.query.redirect){
                        res.redirect("/admin/users/login?redirect="+encodeURIComponent(req.query.redirect));
                    }else{
                        res.redirect("/admin/users/login");
                    }
                } else {
                    if(!user.is_admin){
                        FlashMessages.add(req, {
                            type: "err",
                            message: 'Wrong Email or Password or not admin!!!.'
                        });
                        if(req.query.redirect){
                            res.redirect("/admin/users/login?redirect="+encodeURIComponent(req.query.redirect));
                        }else{
                            res.redirect("/admin/users/login");
                        }
                    }else{
                        delete(user.password);
                        //req.session.authuser = user; 
                        
                        //todo create jwt and save it to cookie
                        var token = jwt.sign(user, 'somepass', { expiresIn: 60 * 60 });
                        res.cookie('auth',token);


                        if(req.query.redirect){
                            res.redirect(req.query.redirect);
                        }else{
                            res.redirect("/admin/");
                        }
                    }                    
                }
            } else {
                FlashMessages.add(req, {
                    type: "err",
                    message: 'Wrong Email!! or Password.'
                });
                res.redirect("/admin/users/login");
            }
        }
    });
}

adminLogin.logout = function (req, res, next) {
    if (req.session.authuser) {
        req.session.authuser=false
    }
    if(req.query.redirect){
        res.redirect("/admin/users/login?redirect="+encodeURIComponent(req.query.redirect));
    }else{
        res.redirect("/admin/users/login");
    }
}

module.exports = adminLogin;


