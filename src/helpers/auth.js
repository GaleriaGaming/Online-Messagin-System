const helpers = {};

helpers.isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Not authorized');
    res.redirect('/oauth/signin');
};

helpers.isLoged = (req, res, next) => {
    if(req.isAuthenticated()) {
        req.flash('error_msg', 'Already loged');
        res.redirect('/');
    }
    return next();
}

module.exports = helpers;