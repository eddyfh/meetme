var express = require('express');
var path = require('path');
var passport = require('passport');

module.exports = function (app) {
  app.configure('development', function () {
    app.use(function staticsPlaceholder(req, res, next) {
        return next();
    });
    var allowCrossDomain = function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    }

    app.set('port', process.env.PORT || 9000);
    app.set('views', path.join(app.directory, '/app'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.limit(1000000000));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function middlewarePlaceholder(req, res, next) {
      return next();
    });

    app.use(app.router);
    app.use(express.errorHandler());
  });
};
