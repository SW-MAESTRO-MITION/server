exports.validatePassword = function(req, res, next) {
  var name = req.body.name;
  var password = req.body.password;

  if(!password || password.length < 3) {
    return res.status(400).json({code : -1,
                  message: 'password is something wrong!'});
  }else{
      return next();
  }
}
