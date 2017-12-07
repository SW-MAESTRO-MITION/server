var crypto = require('crypto');
var fs = require('fs');
var multiparty = require('multiparty');

function uploadFile(req, res) {
    console.log(req);

    console.log(req.file);

    var file_path = req.file.path;
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

            var pdfFile = {
                name: req.file.originalname,
                absolute_path: "file_content/" + req.file.originalname
            }
            res.status(200).json(pdfFile);
        });
}

module.exports = {
    uploadFile
}
