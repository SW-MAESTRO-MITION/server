var express = require('express');
var router = express.Router();
var user = require('./user.controller');
var validateParams = require('./user.middleware');

router.post('/', user.createUser);
router.post('/login', user.login);
router.get('/:id', user.getUser);
router.put('/:id', user.modifyUser);
router.delete('/:id', user.deleteUser);

module.exports = router;
