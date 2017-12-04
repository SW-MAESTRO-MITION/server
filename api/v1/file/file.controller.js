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
      res.status(200).json(hash_value);
    });
}

function getFile(req, res) {
  res.send(req.body.originalname);
}

module.exports = {
  uploadFile,
  getFile
}
