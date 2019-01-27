// 1 - La liste des clients 
db.customers.find({})

// 2 - Les 10 voitures les plus commandés 
opUnwind = {$unwind : "$orderDetails"};
opGroup = {$group : {_id:{productCode: "$orderDetails.productCode", productName:"$orderDetails.product.productName"}, "tot":{$sum:"$orderDetails.quantityOrdered"}}};
opSort = {$sort : {tot:-1}};
opLimit = {$limit: 10}
db.orders.aggregate([opUnwind, opGroup, opSort, opLimit]);

// 3 - Les 5 clients les plus fidèles 
opProject = { $project: { paymentTotal: { $sum: "$payments.amount"}, "customerNumber": 1, "customerName":1, "employee":1}}
opSort = {$sort:{"paymentTotal":-1}}
opLimit = {$limit: 5} 
db.customerspayments.aggregate([opProject, opSort, opLimit])

// 4 - Chiffres d’affaires mensuel pour l’année 2004 
opMatch = { $match: { "paymentDate": { $gt : "2004-01-01", $lt : "2005-01-01" }}}
opGroup = {$group : {_id: {$substr: ['$paymentDate', 5, 2]}, paymentsMonthTotal: {$sum: "$amount"}}};
opSort = {$sort: {"_id":1}}
db.payments.aggregate([opMatch, opGroup, opSort])


// 5 - Mensual profit in 2004 by offices location
mapFunction = function () {
	if(this.employee.office[0] && this.payments){
    	for(var i=0; i< this.payments.length; i++){
    		if(this.payments[i].paymentDate.substr(0,4) == "2004"){
            	emit({ "country" : this.employee.office[0].country, "month": this.payments[i].paymentDate.substr(5,2)},this.payments[i].amount)
             }
    	}  
  	}
};

reduceFunction = function (key, values) {
  return Array.sum(values)
};
queryParam = {"query":{}, "out":{"inline":true}};
db.customersofficespayments.mapReduce(mapFunction, reduceFunction, queryParam);


// 6 - Mean mensual expenses from customers in 2014 by customers locations
mapFunction = function () {
	if(this.payments){
    	for(var i=0; i< this.payments.length; i++){
    		if(this.payments[i].paymentDate.substr(0,4) == year){
            	emit({ "country" : this.country, "month": this.payments[i].paymentDate.substr(5,2)},{"avg":this.payments[i].amount, "sum":this.payments[i].amount, "nb":1})
             }
    	}  
  	}
};

reduceFunction = function (key, values) {
	sum = 0; nb = 0;
	for (i=0; i< values.length ; i++){
		sum += values[i].sum;
		nb += values[i].nb;
	}
	return {"avg" : sum / nb, "sum" : sum, "nb" : nb};
	
};
queryParam = {"query":{}, "scope":{"year":"2005"},"out":{"inline":true}};
db.customerspayments.mapReduce(mapFunction, reduceFunction, queryParam);