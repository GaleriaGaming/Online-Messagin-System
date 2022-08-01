const path = require('path')
const exphbs = require('express-handlebars');
const flash = require('connect-flash')
const session = require('express-session')
const express = require('express');
const errorHandler = require('errorhandler');
const routes = require('../routes/index');
const passport = require('passport')

module.exports = app => {

    // Settings
    app.set('port', process.env.PORT || 3000)
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout:'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');

    // Middlewares
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(session({
        secret: '1042312693',
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    // Global Variables
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });

    // Routes
    routes(app);

    // Static Files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    // Errorhandlers
    if('development' ===  app.get('env')) {
        app.use(errorHandler);
    }
    
    return app;
}