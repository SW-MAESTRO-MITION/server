const contract = require('./contract.controller');
const express = require('express');
const router = express.Router();

router.post('/add', contract.addContract);
module.exports = router;
