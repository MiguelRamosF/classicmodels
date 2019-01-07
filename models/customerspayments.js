const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerspaymentsSchema = new Schema({

});

const customerspayments = mongoose.model('customerspayments', customerspaymentsSchema);

module.exports = customerspayments;
