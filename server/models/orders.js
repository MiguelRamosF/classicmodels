const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({

});

const orders = mongoose.model('orders', ordersSchema);

module.exports = orders;