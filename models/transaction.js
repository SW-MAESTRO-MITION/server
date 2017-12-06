/**
 * Created by dn2757 on 2017. 12. 6..
 */

const timestamps = require('mongoose-timestamp');
const paginate = require('mongoose-paginate');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionJson = require('./json/transaction.json');
const transactionSchema = Schema(transactionJson);

transactionSchema.plugin(timestamps);
transactionSchema.plugin(paginate);

module.exports = mongoose.model('Transaction', transactionSchema);
