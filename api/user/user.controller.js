var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var User = require('../../models/user');

function createUser(req, res) {
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save(function(err, createdUser) {
    if (err) {
      res.status(500).json(err);
      console.log(err.message);
    }

    console.log(createdUser);
    res.status(200).json(createdUser);
  });
}

function getUser(req, res) {
  User.findOne({"_id": req.params.id}, function(err, user) {
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

function login(req, res) {
  User.findOne({
    "email": req.body.email,
    "password": req.body.password
  }, function(err, user) {
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

function modifyUser(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.is_checked_registered_contract = req.body.is_checked_registered_contract || user.is_checked_registered_contract;

      user.save(function(err, modifiedUser) {
      if (err) {
        res.status(500).send(err)
      }

        console.log(modifiedUser);
        res.status(200).json(modifiedUser);
      });
    }
  });
}

function deleteUser(req, res) {
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
