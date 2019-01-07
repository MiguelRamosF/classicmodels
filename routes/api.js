const express = require('express');
const router = express.Router();
const customers = require('../models/customers');
const customers1 = require('../models/customers1');
const payments = require('../models/payments');
const orders = require('../models/orders');
const customerspayments = require('../models/customerspayments');
const customersofficespayments = require('../models/customersofficespayments');


// get a list of customers based on filters from the db

router.get('/all', function (req, res, next) {
    var query = "{}"
    var object_query = JSON.parse(query);
    customers1.find(
        object_query
    ).then(function (query_result) {
        res.send(query_result);
    }).catch(next);
});

router.get('/top10orderedProducts', function (req, res, next) {
    opUnwind = {$unwind : "$orderDetails"};
opGroup = {$group : {_id:{productCode: "$orderDetails.productCode", productName:"$orderDetails.product.productName"}, "tot":{$sum:"$orderDetails.quantityOrdered"}}};
opSort = {$sort : {tot:-1}};
opLimit = {$limit: 10}
    orders.aggregate(
        [opUnwind, opGroup, opSort, opLimit]
    ).then(function (query_result) {
        res.send(query_result);
    }).catch(next);
});

router.get('/top5customers', function (req, res, next) {
    opProject = { $project: { paymentTotal: { $sum: "$payments.amount"}, "customerNumber": 1, "customerName":1, "employee":1}}
opSort = {$sort:{"paymentTotal":-1}}
opLimit = {$limit: 5} 
    customerspayments.aggregate(
        [opProject, opSort, opLimit]
    ).then(function (query_result) {
        res.send(query_result);
    }).catch(next);
});

router.get('/paymentsMonth2014', function (req, res, next) {
    opMatch = { $match: { "paymentDate": { $gt : "2004-01-01", $lt : "2005-01-01" }}}
opGroup = {$group : {_id: {$substr: ['$paymentDate', 5, 2]}, paymentsMonthTotal: {$sum: "$amount"}}};
opSort = {$sort: {"_id":1}}
    payments.aggregate(
        [opMatch, opGroup, opSort]
    ).then(function (query_result) {
        res.send(query_result);
    }).catch(next);
});

router.get('/paymentsCountryMonths2014', function (req, res, next) {
    var o = {};
// `map()` and `reduce()` are run on the MongoDB server, not Node.js,
// these functions are converted to strings
o.map = function() {
  
    if(this.employee.office[0] && this.payments)
        for(var i=0; i< this.payments.length; i++){
              if(this.payments[i].paymentDate.substr(0,4) == "2004"){
                emit({ "country" : this.employee.office[0].country, "month": this.payments[i].paymentDate.substr(5,2)},this.payments[i].amount)
              }
        }
        
   
  };
o.reduce = function(key, values) {
  
	return Array.sum(values)

};
customersofficespayments.mapReduce(o, function (err, results) {
    res.send(results);
  })
});

router.get('/paymentsAvgCustomersMonths2014', function (req, res, next) {
    var p = {};
p.map = function () {
	if(this.payments){
    	for(var i=0; i< this.payments.length; i++){
    		if(this.payments[i].paymentDate.substr(0,4) == "2004"){
            	emit({ "country" : this.country, "month": this.payments[i].paymentDate.substr(5,2)},{"avg":this.payments[i].amount, "sum":this.payments[i].amount, "nb":1})
             }
    	}  
  }
};

p.reduce = function (key, values) {
	sum = 0; nb = 0;
	for (i=0; i< values.length ; i++){
		sum += values[i].sum;
		nb += values[i].nb;
	}
	return {"avg" : sum / nb, "sum" : sum, "nb" : nb};
	
};

customerspayments.mapReduce(p, function (err, results) {
    res.send(results);
})

});


// add a new query_result to the db
router.post('/customers', function (req, res, next) {
    customers.create(req.body).then(function (query_result) {
        res.send(query_result);
    }).catch(next);
});

// update a query_result in the db
router.put('/customers/:id', function (req, res, next) {
    customers.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        customers.findOne({ _id: req.params.id }).then(function (query_result) {
            res.send(query_result);
        });
    }).catch(next);
});

// delete a query_result from the db
router.delete('/customers/:id', function (req, res, next) {
    customers.findByIdAndRemove({ _id: req.params.id }).then(function (query_result) {
        res.send(query_result);
    }).catch(next);
});

module.exports = router;
