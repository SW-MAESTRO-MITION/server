var express = require('express');
var router = express.Router();
var user = require('./user.controller');
var validateParams = require('./user.middleware');

router.post('/login', user.login);
router.post('/', validateParams.validatePassword, user.createUser);
router.get('/:id', user.getUser);
router.put('/:id', validateParams.validatePassword, user.modifyUser);
router.delete('/:id', user.deleteUser);

module.exports = router;
