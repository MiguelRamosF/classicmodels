const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customersSchema = new Schema({

});


const customers = mongoose.model('customers', customersSchema);


module.exports = customers;