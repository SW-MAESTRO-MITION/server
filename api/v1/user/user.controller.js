var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var User = require('../../../models/user');

function createUser(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err, createdUser) => {
        if (err) {
            res.status(500).json(err);
            console.log(err.message);
        }
        res.status(200).json(createdUser);
    });
}

function getUser(req, res) {
    User.findOne({"_id": req.params.id}, (err, user) => {
        if (err) {
            res.status(500).json(err);
        }

        if (user) {  // Search could come back empty, so we should protect against sending nothing back
            res.status(200).json(user);
        } else {  // In case no kitten was found with the given query
            res.status(200).json("No user found");
        }
    });
};

function login(req, res) {
    User.findOne({
        "email": req.body.email,
        "password": req.body.password
    }, (err, user) => {
        if (err) {
            res.status(500).json(err);
        }
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(200).json("No user found");
        }
    });
}

function modifyUser(req, res) {
    User.findById(req.params.id, (err, user) => {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;
            user.is_checked_registered_contract = req.body.is_checked_registered_contract || user.is_checked_registered_contract;

            // Save the updated document back to the database
            user.save((err, modifiedUser) => {
                if (err) {
                    res.status(500).send(err)
                }
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
            message: "Todo successfully deleted",
            id: user._id
        };
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
