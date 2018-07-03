validatePassword = (req, res, next) => {
  const password = req.body.password;

  if(!password || password.length < 3) {
    return res.status(400).json({
      code : -1,
      message: 'password is something wrong!'});
  }
  else {
      return next();
  }
}

module.exports = {
  validatePassword
}