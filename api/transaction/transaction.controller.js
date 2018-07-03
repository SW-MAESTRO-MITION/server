/**
 * Created by dn2757 on 2017. 12. 6..
 */

var Transaction = require('../../models/transaction');
var RegisteredTransaction = require('../../models/registeredTransaction');
var User = require('../../models/user');
var crypto = require('crypto');
var fs = require('fs');

function createTransaction(req, res) {
    var transaction = new Transaction();

    transaction.sender_name = req.body.sender_name;
    transaction.sender = req.body.sender;
    transaction.recipient = req.body.recipient;
    transaction.path = req.body.absolute_path;
    transaction.file_name = req.body.file_name;
    transaction.transaction_date = req.body.date;

    transaction.save((err, createdTransaction) => {
        if (err) {
            console.log(err.message);
            res.status(500).json(err);
        }

        User.findOne({"email": req.body.sender}, (err, sender) => {
            if (err) {
                res.status(500).json(err);
            }
            if (sender) {
                sender.transaction_id = createdTransaction._id;
                sender.type_of_party = "sender";
                sender.save((err, modifiedUser) => {
                });
            }
            User.findOne({"email": req.body.recipient}, (err, recipient) => {
                if (err) {
                    res.status(500).json(err);
                }
                if (recipient) {
                    recipient.transaction_id = createdTransaction._id;
                    recipient.type_of_party = "recipient";
                    recipient.save((err, modifiedUser) => {
                    });
                }
                res.status(200).json(createdTransaction);
            });
        });
    });
}

function getSenderTransaction(req, res) {
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

/**
 * 수락 버튼 눌렀을 때 API
 *
 * sender, recipient 유저의 tx_id를 null로 만든다.
 *
 */

function acceptTransaction(req, res) {
    var tx_id = req.params.id;
    Transaction.findOne({"_id": tx_id}, (err, tx) => {
        if (err) {
            res.status(500).json(err);
        }

        User.findOne({"email": tx.sender}, (err, sender) => {
            if (err) {
                res.status(500).json(err);
            }

            if (sender) {
                sender.transaction_id = null;
                sender.type_of_party = null;
                sender.is_checked_registered_contract = false;
                sender.save((err, modifiedUser) => {

                    User.findOne({"email": tx.recipient}, (err, recipient) => {
                        if (err) {
                            res.status(500).json(err);
                        }

                        if (recipient) {
                            recipient.transaction_id = null;
                            recipient.type_of_party = null;
                            recipient.is_checked_registered_contract = false;
                            recipient.save((err, modifiedUser) => {

                                var registeredTransactionForSender = new RegisteredTransaction();
                                registeredTransactionForSender.email = tx.sender;
                                registeredTransactionForSender.path = tx.path;
                                registeredTransactionForSender.save((err, registeredTransactionForSender) => {
                                    if (err) {
                                        res.status(500).json(err);
                                    }

                                    var registeredTransactionForRecipient = new RegisteredTransaction();
                                    registeredTransactionForRecipient.email = tx.recipient;
                                    registeredTransactionForRecipient.path = tx.path;
                                    registeredTransactionForRecipient.save((err, registeredTransactionForRecipient) => {
                                        if (err) {
                                            res.status(500).json(err);
                                        }
                                    });
                                    res.status(200).json(tx);
                                });
                            });
                        }
                    });
                });
            }
        });
    });
}

function getRegisteredContract(req, res) {
    console.log(req.params.email);
    RegisteredTransaction.find({'email': req.params.email}, function (err, contract) {
        if (err) {
            res.status(500).json(err);
        }
        return res.status(200).json(contract);
    });
};

module.exports = {
    createTransaction,
    getSenderTransaction,
    getRecipientTransaction,
    acceptTransaction,
    getRegisteredContract
}