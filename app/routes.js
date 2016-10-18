module.exports = function (app, passport) {
    var logger = require('./utils/logger');    
    var async = require('async'); // Used to control the sequence of processes        
    var utils = require('./utils/utils');

    // =====================================
    // HOME PAGE 
    // =====================================
    // Show the landing page
    app.get('/', function (req, res) {
        var user = utils.getUserFromRequest(req);
        logger.log(user.userName + ': GET: /index.ejs.');

        res.render('index.ejs', {
            userInfo: user
        });
    });
    
    // Show Start Campaign Page
    app.get('/StartCampaign', function (req, res) {
        var user = utils.getUserFromRequest(req);
        logger.log(user.userName + ': GET: /startcampaign.ejs.');

        res.render('startcampaign.ejs', {
            userInfo: user
        });
    });

    // =====================================
    // LOGIN 
    // =====================================
    // Show the login form
    app.get('/SignIn', function (req, res) {
        var user = utils.getUserFromRequest(req);
        logger.log(user.userName + ': GET: /signin.ejs');

        // Render the page and pass in any flash data if it exists
        res.render('signin.ejs', {
            userInfo: user,
            message: req.flash('loginMessage')
        });
    });

    // Process the login form
    app.post('/api/users/SignIn', passport.authenticate('local-login', {
        successRedirect: '/', // Redirect to the Home Page after Login
        failureRedirect: '/SignIn', // Redirect back to the Login page in case of Error
        failureFlash: true // Allow flash messages
    }));

    // =====================================
    // REGISTER
    // =====================================
    // Show the Register form
    app.get('/Register', function (req, res) {
        var user = utils.getUserFromRequest(req);
        logger.log(user.userName + ': GET: /register.ejs');

        // Render the page and pass in any flash data if it exists
        res.render('register.ejs', {message: req.flash('RegisterMessage')});
    });

    // Process the signup form
    app.post('/api/users/Register', passport.authenticate('local-signup', {
        successRedirect: '/', // Redirect to the Home Page after Login
        failureRedirect: '/Register', // Redirect back to the Login page in case of Error
        failureFlash: true // Allow flash messages
    }));

    // =====================================
    // PROFILE
    // =====================================    
    // Show Profile Page
    app.get('/profile', isLoggedIn, function (req, res) {
        var user = utils.getUserFromRequest(req);
        logger.log(user.userName + ': GET: /profile');

        async.series([            
            function (callback) {
                res.render('profile.ejs', {
                    userInfo: user // get the user out of session and pass to template                      
                });

                //Wait until all operations are done
                callback();
            }
        ]);
    });   
    

    // =====================================
    // LOGOUT
    // =====================================
    app.get('/SignOut', function (req, res) {
        var user = utils.getUserFromRequest(req);
        logger.log(user.userName + ': GET: /SignOut');

        req.logout();
        res.redirect('/'); // Redirect to the Home Page after Logout
    });    
};

// =====================================
// UTILITIES
// =====================================
// Check if user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if not redirect him to the home page
    res.redirect('/SignIn');
}