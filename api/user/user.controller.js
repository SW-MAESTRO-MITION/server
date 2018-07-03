const User = require('../../models/user');

const createUser = (req, res) => {
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save((err, createdUser) => {
    if (err) {
      res.status(500).json(err);
      console.log(err.message);
    }

    console.log(createdUser);
    res.status(200).json(createdUser);
  });
}

const getUser = (req, res) => {
  User.findOne({"_id": req.params.id}, (err, user) => {
    if (err) {
      res.status(500).json(err);
    }

    if (user) {
      console.log(user);
      res.status(200).json(user);
    }
    else {
      res.status(200).json("User is not found.");
    }
  });
};

const login = (req, res) => {
  User.findOne({
    "email": req.body.email,
    "password": req.body.password
  }, (err, user) => {
    if (err) {
      res.status(500).json(err);
    }

    if (user) {
      console.log(user);
      res.status(200).json(user);
    }
    else {
      res.status(200).json("User is not found.");
    }
  });
}

const modifyUser = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.is_checked_registered_contract = req.body.is_checked_registered_contract || user.is_checked_registered_contract;

      user.save((err, modifiedUser) => {
      if (err) {
        res.status(500).send(err)
      }

        console.log(modifiedUser);
        res.status(200).json(modifiedUser);
      });
    }
  });
}

const deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
    res.status(500).send(err)
    }

    let response = {
    message: "User is successfully deleted.",
    id: user._id
    };

    console.log(response);
    res.status(200).json(response);
  });
}

module.exports = {
  createUser,
  login,
  getUser,
  modifyUser,
  deleteUser
}
