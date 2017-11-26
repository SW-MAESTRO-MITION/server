var express = require('express');
var router = express.Router();
var user = require('./user.controller');

router.post('/', user.createUser);
router.get('/:id', user.getUser);
router.put('/:id', user.modifyUser);
router.delete('/:id', user.deleteUser);

module.exports = router;
