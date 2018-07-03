var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

function sendMail(req, res) {
  var hostemail = req.body.hostmail;
  var guestemail = req.body.guestemail;
  /*
  var url =
  블록체인에서 가져와야 됨
  'https://gateway.ipfs.io/ipfs/QmdbLLos3kLMgDWrojSezYAgps41ehyFreMRsXwGqcbVpH'
  */

  let transporter = nodemailer.createTransport(smtpTransport({
  	service: 'gmail',
  	auth: {
  		user: 'mitionplatform@gmail.com',
  		pass: 'altus123!@#'
  	}
  }));

  let mailOptions = {
  	from: 'mitionplatform@gmail.com',
  	to: hostemail + ',' + guestemail,
  	subject: 'MITION platform file url !',
  	text: 'file url : ' + url
  }

  transporter.sendMail(mailOptions, (error, info) => {
  	if (error) {
  		return console.log(error);
  	}

  	console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = {
  sendMail
}
