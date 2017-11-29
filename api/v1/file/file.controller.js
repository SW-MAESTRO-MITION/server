var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

exports.uploadFile = function (req, res){
  res.status(200).json(req.file);
};

exports.getFile = function (req, res) {
  res.render('upload');
}
