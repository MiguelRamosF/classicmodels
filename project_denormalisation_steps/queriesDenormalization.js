// 2nd query: Denormalize orderdetails + products
db.orderdetails.aggregate([
   {
     $lookup:
       {
         from: "products",
         localField: "productCode",
         foreignField: "productCode",
         as: "product"
       }
   },
   {
    $unwind: 
     {
       path: "$product",
       preserveNullAndEmptyArrays: true 
     }
  }
])

// Denormalze orders + ordersdetails + products
db.orders.aggregate([
   {
     $lookup:
       {
         from: "orderdetails_products_denormalized",
         localField: "orderNumber",
         foreignField: "orderNumber",
         as: "orderDetails"
       }
   }
 ])

// Denormalize customers / employees / offices / payments / orders_denormalized
db.customers.aggregate([
   {
     $lookup:
       {
         from: "employees",
         localField: "salesRepEmployeeNumber",
         foreignField: "employeeNumber",
         as: "employee"
       }
  },
  {
    $unwind: 
     {
       path: "$employee",
       preserveNullAndEmptyArrays: true //dans le cas où le customer n'as pas d'employee, on garde quand même le customer
     }
  },
  {
     $lookup:
       {
         from: "offices",
         localField: "employee.officeCode",
         foreignField: "officeCode",
         as: "employee.office"
       }
  },
  {
     $lookup:
       {
         from: "payments",
         localField: "customerNumber",
         foreignField: "customerNumber",
         as: "payments"
       }
  },
  {
     $lookup:
       {
         from: "orders_denormalized",
         localField: "customerNumber",
         foreignField: "customerNumber",
         as: "orders"
       }
  },
//  { 
//    $project: { "salesRepEmployeeNumber": 0, "employee.officeCode": 0, "orders.customerNumber": 0, "orders.orderDetails.orderNumber": 0, "orders.orderDetails.product.productCode": 0 } 
//  }
])

//Customers payments denormalization


// 3rd query : Denormalize customers / employees / offices / payments / orders_denormalized
db.customers.aggregate([
  {
     $lookup:
       {
         from: "payments",
         localField: "customerNumber",
         foreignField: "customerNumber",
         as: "payments"
       }
  }
])


// 5th query : Denormalize customers / employees / offices / payments 
db.customers.aggregate([
   {
     $lookup:
       {
         from: "employees",
         localField: "salesRepEmployeeNumber",
         foreignField: "employeeNumber",
         as: "employee"
       }
  },
  {
    $unwind: 
     {
       path: "$employee",
       preserveNullAndEmptyArrays: true //dans le cas où le customer n'as pas d'employee, on garde quand même le customer
     }
  },
  {
     $lookup:
       {
         from: "offices",
         localField: "employee.officeCode",
         foreignField: "officeCode",
         as: "employee.office"
       }
  },
  {
     $lookup:
       {
         from: "payments",
         localField: "customerNumber",
         foreignField: "customerNumber",
         as: "payments"
       }
  }
])



