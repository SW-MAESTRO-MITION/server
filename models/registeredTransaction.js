/**
 * Created by dn2757 on 2017. 12. 6..
 */

const timestamps = require('mongoose-timestamp');
const paginate = require('mongoose-paginate');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registeredTransactionJson = require('./json/registeredTransaction.json');
const registeredTransactionSchema = Schema(registeredTransactionJson);

registeredTransactionSchema.plugin(timestamps);
registeredTransactionSchema.plugin(paginate);

module.exports = mongoose.model('RegisteredTransaction', registeredTransactionSchema);
