const file = require('./file.controller');
const express = require('express');
const router = express.Router();
var multer = require('multer');

var _storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

var upload = multer({storage: _storage});
router.post('/upload', upload.single('contract_file'), file.uploadFile);
router.get('/upload', upload.single('contract_file'), file.getFile);

module.exports = router;
