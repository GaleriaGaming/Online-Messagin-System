const ctrl = {};

const User = require('../models/user');

const passport = require('passport');

const { isAuth, isLoged } = require('../helpers/auth');

ctrl.signup = (req, res) => {
    res.render('oauth/signup')
}; 

ctrl.signupdata = async (req, res) => {
    const { 
        name, 
        email, 
        password, 
        confirm_password, 
        phone_number
    } = req.body;
    const errors = [];

    if(password != confirm_password) {
        errors.push({
            text: `Passwords don't match`
        });
    }
    if (password.length < 8 ) {
        errors.push({
            text: `Password must be at least 8 characters`
        });
    }
    if (isNaN(phone_number)) {
        errors.push({
            text: `Phone number must be a number`
        })
    }
    if (!name) {
        errors.push({
            text: `You must write a name`
    })
    }
    if (!email) {
        errors.push({
            text: `You must write a email`
        })
    }
    if (!password) {
        errors.push({
            text: `You must write a password`
        })
    }
    if(!confirm_password) {
        errors.push({
            text: `You must confirm your password`
        })
    }
    if (!phone_number) {
        errors.push({
            text: `You must write your phone`
        })
    }
    if(errors.length > 0){
        res.render('oauth/signup', {
            errors, 
            name, 
            email, 
            password, 
            confirm_password, 
            phone_number
        });
    } else {
        const userEmail = await User.findOne({email: email});
        if(userEmail) {
            req.flash('error_msg', 'Your email is already taken')
            return res.redirect('/oauth/signup');
        };
        const newUser = new User({name, email, password, phone_number});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You get registered');
        res.redirect('/oauth/signin');
    }
};

ctrl.signin = (req, res) => {
    res.render('oauth/signin')
};

ctrl.signindata = passport.authenticate('local',  {
    successRedirect: '/',
    failureRedirect: '/oauth/signin',
    successFlash: true,
    failureFlash: true
});

ctrl.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports = ctrl;