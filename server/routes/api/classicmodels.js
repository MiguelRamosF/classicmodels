const customers = require('../../models/customers');
const payments = require('../../models/payments');
const orders = require('../../models/orders');
const customerspayments = require('../../models/customerspayments');
const customersofficespayments = require('../../models/customersofficespayments');


module.exports = (app) => {
  app.get('/api/customers', (req, res, next) => {
    var query = "{}"
    var object_query = JSON.parse(query);
    customers.find(object_query)
      .exec()
      .then((query_result) => res.json(query_result))
      .catch((err) => next(err));
  });

  app.get('/api/top10orderedProducts', (req, res, next) => {
    opUnwind = { $unwind: "$orderDetails" };
    opGroup = { $group: { _id: { productCode: "$orderDetails.productCode", productName: "$orderDetails.product.productName" }, "tot": { $sum: "$orderDetails.quantityOrdered" } } };
    opSort = { $sort: { tot: -1 } };
    opLimit = { $limit: 10 }
    orders.aggregate([opUnwind, opGroup, opSort, opLimit])
      .exec()
      .then((query_result) => res.json(query_result))
      .catch((err) => next(err));
  });

  app.get('/api/top5customers', (req, res, next) => {
    opProject = { $project: { paymentTotal: { $sum: "$payments.amount" }, "customerNumber": 1, "customerName": 1, "employee": 1 } }
    opSort = { $sort: { "paymentTotal": -1 } }
    opLimit = { $limit: 5 }
    customerspayments.aggregate([opProject, opSort, opLimit])
      .exec()
      .then((query_result) => res.json(query_result))
      .catch((err) => next(err));
  });

  app.get('/api/monthlyPayments2004', (req, res, next) => {
    opMatch = { $match: { "paymentDate": { $gt: "2004-01-01", $lt: "2005-01-01" } } }
    opGroup = { $group: { _id: { $substr: ['$paymentDate', 5, 2] }, paymentsMonthTotal: { $sum: "$amount" } } };
    opSort = { $sort: { "_id": 1 } }
    payments.aggregate([opMatch, opGroup, opSort])
      .exec()
      .then((query_result) => res.json(query_result))
      .catch((err) => next(err));
  });

  app.get('/api/monthlyOfficesPaymentsYears', (req, res, next) => {

    var o = {};
    o.map = function () {
      if (this.employee.office[0] && this.payments) {
        for (var i = 0; i < this.payments.length; i++) {
          if (this.payments[i].paymentDate.substr(0, 4) == year) {
            emit({ "country": this.employee.office[0].country, "month": this.payments[i].paymentDate.substr(5, 2) }, this.payments[i].amount)
          }
        }
      }
    }
    o.reduce = function (key, values) {
      return Array.sum(values)
    };
    if (req.query.year) {
      o.scope = { "year": req.query.year };

    }

    customersofficespayments.mapReduce(o, function (err, query_result) {
      res.json(query_result);
    })

  });



  app.get('/api/avgMonthlyCustomersPaymentsYears', (req, res, next) => {
    var p = {};
    p.map = function () {
      if (this.payments) {
        for (var i = 0; i < this.payments.length; i++) {
          if (this.payments[i].paymentDate.substr(0, 4) == year) {
            emit({ "country": this.country, "month": this.payments[i].paymentDate.substr(5, 2) }, { "avg": this.payments[i].amount, "sum": this.payments[i].amount, "nb": 1 })
          }
        }
      }
    };

    p.reduce = function (key, values) {
      sum = 0; nb = 0;
      for (i = 0; i < values.length; i++) {
        sum += values[i].sum;
        nb += values[i].nb;
      }
      return { "avg": sum / nb, "sum": sum, "nb": nb };

    };

    if (req.query.year) {
      p.scope = { "year": req.query.year };

    }

    customerspayments.mapReduce(p, function (err, query_result) {
      res.json(query_result);
    })


  });

};
