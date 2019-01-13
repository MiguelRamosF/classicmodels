const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentsSchema = new Schema({

});

const payments = mongoose.model('payments', paymentsSchema);

module.exports = payments;