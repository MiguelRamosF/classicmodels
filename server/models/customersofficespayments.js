const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customersofficespaymentsSchema = new Schema({

});

const customersofficespayments = mongoose.model('customersofficespayments', customersofficespaymentsSchema);

module.exports = customersofficespayments;
