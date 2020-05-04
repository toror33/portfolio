var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('main');
});

router.get('/main', function (req, res, next) {
    res.render('main');
});

router.get('/about', function (req, res, next) {
    res.render('about');
});

router.get('/services', function (req, res, next) {
    res.render('services');
});

router.get('/contact', function (req, res, next) {
    res.render('contact');
});

module.exports = router;
