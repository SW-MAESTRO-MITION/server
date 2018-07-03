/**
 * Created by dn2757 on 2017. 12. 6..
 */

var express = require('express');
var router = express.Router();
var transaction = require('./transaction.controller');

router.post('/', transaction.createTransaction);
router.get('/sender/:id', transaction.getSenderTransaction);
router.get('/recipient/:id', transaction.getRecipientTransaction);
router.post('/accept/:id', transaction.acceptTransaction);
router.get('/contract/user/:email', transaction.getRegisteredContract);

module.exports = router;
