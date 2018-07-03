var express = require('express');
var router = express.Router();
var mailing = require('./mailing.controller');

router.post('/', mailing.sendMail);

module.exports = router;
