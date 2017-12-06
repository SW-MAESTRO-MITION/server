/**
 * Created by dn2757 on 2017. 12. 6..
 */

var Transaction = require('../../../models/transaction');
var User = require('../../../models/user');

function createTransaction(req, res) {
    // 파일 생성 코드가 필요함
    var transaction = new Transaction();
    transaction.sender = req.body.sender;
    transaction.recipient = req.body.recipient;
    transaction.path = "1";
    // transaction.path = 파일 생성 코드 이후의 값으로 받는다.;
    transaction.is_registered = false;

    transaction.save((err, createdTransaction) => {
        if (err) {
            res.status(500).json(err);
        }

        User.findOne({"_id": req.body.sender}, (err, sender) => {
            if (err) {
                res.status(500).json(err);
            }
            if (sender) {
                sender.transaction_id = createdTransaction._id;
                sender.type_of_party = "sender";
                sender.save((err, modifiedUser) => {
                });
            }
        });

        User.findOne({"_id": req.body.recipient}, (err, recipient) => {
            if (err) {
                res.status(500).json(err);
            }

            if (recipient) {
                recipient.transaction_id = createdTransaction._id;
                recipient.type_of_party = "recipient";
                recipient.save((err, modifiedUser) => {
                });
            }
        });

        res.status(200).json(createdTransaction);
    });
}

function getSenderTransaction(req, res) {
    var tx_id = req.params.id;
    console.log(tx_id);
    Transaction.findOne({"_id": tx_id}, (err, tx) => {
        if (err) {
            res.status(500).json(err);
        }

        if (tx) {  // Search could come back empty, so we should protect against sending nothing back
            res.status(200).json(tx);
        } else {  // In case no kitten was found with the given query
            res.status(200).json("No user found");
        }
    });
}

function getRecipientTransaction(req, res) {
    var tx_id = req.params.id;
    Transaction.findOne({"_id": tx_id}, (err, tx) => {
        if (err) {
            res.status(500).json(err);
        }
        if (tx) {
            res.status(200).json(tx);
        } else {
            res.status(200).json("No user found");
        }
    });
}

function acceptTransaction(req, res) {
    var tx_id = req.params.id;
    Transaction.findOne({"_id": tx_id}, (err, tx) => {
        if (err) {
            res.status(500).json(err);
        }

        User.findOne({"sender": tx.sender}, (err, sender) => {
            if (err) {
                res.status(500).json(err);
            }

            if (sender) {
                sender.transaction_id = null;
                sender.type_of_party = null;
                sender.save((err, modifiedUser) => {
                });
            }
        });

        User.findOne({"_id": tx.recipient}, (err, recipient) => {
            if (err) {
                res.status(500).json(err);
            }

            if (recipient) {
                recipient.transaction_id = null;
                recipient.type_of_party = null;
                recipient.save((err, modifiedUser) => {
                });
            }
        });
    });
}

module.exports = {
    createTransaction,
    getSenderTransaction,
    getRecipientTransaction,
    acceptTransaction
}