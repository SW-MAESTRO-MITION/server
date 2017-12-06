/**
 * Created by dn2757 on 2017. 12. 6..
 */

var Transaction = require('../../../models/transaction');
var RegisteredTransaction = require('../../../models/registeredTransaction');
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
        });

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
        });

        res.status(200).json(createdTransaction);
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
                sender.save((err, modifiedUser) => {
                });
            }
        });

        User.findOne({"email": tx.recipient}, (err, recipient) => {
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

        var registeredTransactionForSender = new RegisteredTransaction();
        registeredTransactionForSender.email = tx.sender;
        registeredTransactionForSender.path = tx.path;
        registeredTransactionForSender.save((err, registeredTransactionForSender) => {
            if (err) {
                res.status(500).json(err);
            }
        });

        var registeredTransactionForRecipient = new RegisteredTransaction();
        registeredTransactionForRecipient.email = tx.recipient;
        registeredTransactionForRecipient.path = tx.path;
        registeredTransactionForRecipient.save((err, registeredTransactionForRecipient) => {
            if (err) {
                res.status(500).json(err);
            }
        });
        res.status(200).json();
    });
}

module.exports = {
    createTransaction,
    getSenderTransaction,
    getRecipientTransaction,
    acceptTransaction
}