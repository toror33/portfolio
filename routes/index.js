var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/index', function (req, res, next) {
    res.render('index');
});

router.get('/contact', function (req, res, next) {
    res.render('contact');
});

router.get('/inside', function (req, res, next) {
    res.render('inside');
});

router.get('/services', function (req, res, next) {
    res.render('services');
});
module.exports = router;
