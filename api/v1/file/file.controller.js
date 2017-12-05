var crypto = require('crypto');
var fs = require('fs');

function uploadFile(req, res) {
  var file_path = req.file.path;
  console.log(file_path);
  var readStream = fs.createReadStream(file_path);

  var hash = crypto.createHash('sha256');
  readStream
    .on('data', function (chunk) {
      hash.update(chunk);
    })
    .on('end', function () {
  	  var hash_value = hash.digest('hex');
      var file_info = {
        file_name: req.file.originalname,
        file_size: req.file.size,
        file_hash: hash_value
      }
      res.status(200).json(file_info);
    });
}

function getFile(req, res) {
  res.send(req.body.originalname);
}

module.exports = {
  uploadFile,
  getFile
}
