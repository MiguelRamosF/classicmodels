const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation Schema
// const GeoSchema = new Schema({
//     type: {
//         type: String,
//         default: 'Point'
//     },
//     coordinates: {
//         type: [Number],
//         index: '2dsphere'
//     }
// });

// create customers Schema & model
// const customersSchema = new Schema({
//     customerNumber: {
//         type: Number,
//         required: [true, 'Country field is required']
//     },
//     customerName: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     contactLastName: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     contactFirstName: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     phone: {
//         type: String,
//         required: [true, 'Population field is required']
//     },
//     addressLine1: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     addressLine2: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     city: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     state: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     postalCode: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     country: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     salesRepEmployeeNumber: {
//         type: Number,
//         required: [true, 'Name field is required']
//     },
//     creditLimit: {
//         type: Number,
//         required: [true, 'Name field is required']
//     }
// });


// const customersSchema = new Schema({
//     customerNumber: {
//         type: Number,
//         required: [true, 'Country field is required']
//     },
//     customerName: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     contactLastName: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     contactFirstName: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     phone: {
//         type: String,
//         required: [true, 'Population field is required']
//     },
//     addressLine1: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     addressLine2: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     city: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     state: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     postalCode: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     country: {
//         type: String,
//         required: [true, 'Name field is required']
//     },
//     salesRepEmployeeNumber: {
//         type: Number,
//         required: [true, 'Name field is required']
//     },
//     creditLimit: {
//         type: Number,
//         required: [true, 'Name field is required']
//     },
//     employee: {
//         employeeNumber: {
//             type: Number,
//             required: [true, 'Name field is required']
//         },
//         lastName: {
//             type: String,
//             required: [true, 'Name field is required']
//         },
//         firstName: {
//             type: String,
//             required: [true, 'Name field is required']
//         },
//         extension: {
//             type: String,
//             required: [true, 'Name field is required']
//         },
//         email: {
//             type: String,
//             required: [true, 'Name field is required']
//         },
//         officeCode: {
//             type: String,
//             required: [true, 'Name field is required']
//         },
//         reportsTo: {
//             type: Number,
//             required: [true, 'Name field is required']
//         },
//         jobTitle: {
//             type: String,
//             required: [true, 'Name field is required']
//         },
//         office: [
//             {
//                 officeCode: {
//                     type: String,
//                     required: [true, 'Name field is required']
//                 },
//                 city: {
//                     type: String,
//                     required: [true, 'Name field is required']
//                 },
//                 phone: {
//                     type: String,
//                     required: [true, 'Name field is required']
//                 },
//                 addressLine1: {
//                     type: String,
//                     required: [true, 'Name field is required']
//                 },
//                 addressLine2: {
//                     type: String,
//                     required: [true, 'Name field is required']
//                 },
//                 addressLine2: {
//                     type: String,
//                     required: [true, 'Name field is required']
//                 },
//                 state: {
//                     type: String,
//                     required: [true, 'Name field is required']
//                 },
//                 country: {
//                     type: String,
//                     required: [true, 'Name field is required']
//                 },
//                 postalCode: {
//                     type: String,
//                     required: [true, 'Name field is required']
//                 },
//                 territory: {
//                     type: String,
//                     required: [true, 'Name field is required']
//                 }
//             }
//         ],
//     },
//     payments: [
//         {
//             customerNumber: {
//                 type: Number,
//                 required: [true, 'Name field is required']
//             },
//             checkNumber: {
//                 type: String,
//                 required: [true, 'Name field is required']
//             },
//             paymentDate: {
//                 type: String,
//                 required: [true, 'Name field is required']
//             },
//             amount: {
//                 type: Number,
//                 required: [true, 'Name field is required']
//             }
//         }
//     ],
//     orders: [
//         {
//             orderNumber: {
//                 type: Number,
//                 required: [true, 'Name field is required']
//             },
//             orderDate: {
//                 type: String,
//                 required: [true, 'Name field is required']
//             },
//             requiredDate: {
//                 type: String,
//                 required: [true, 'Name field is required']
//             },
//             shippedDate: {
//                 type: String,
//                 required: [true, 'Name field is required']
//             },
//             status: {
//                 type: String,
//                 required: [true, 'Name field is required']
//             },
//             comments: {
//                 type: String,
//                 required: [true, 'Name field is required']
//             },
//             customerNumber: {
//                 type: Number,
//                 required: [true, 'Name field is required']
//             },
//             orderDetails: [
//                 {
//                     orderNumber: {
//                         type: Number,
//                         required: [true, 'Name field is required']
//                     },
//                     productCode: {
//                         type: String,
//                         required: [true, 'Name field is required']
//                     },
//                     quantityOrdered: {
//                         type: Number,
//                         required: [true, 'Name field is required']
//                     },
//                     priceEach: {
//                         type: Number,
//                         required: [true, 'Name field is required']
//                     },
//                     orderLineNumber: {
//                         type: Number,
//                         required: [true, 'Name field is required']
//                     },
//                     product: [
//                         {
//                             productCode: {
//                                 type: String,
//                                 required: [true, 'Name field is required']
//                             },
//                             productName: {
//                                 type: String,
//                                 required: [true, 'Name field is required']
//                             },
//                             productLine: {
//                                 type: String,
//                                 required: [true, 'Name field is required']
//                             },
//                             productScale: {
//                                 type: String,
//                                 required: [true, 'Name field is required']
//                             },
//                             productVendor: {
//                                 type: String,
//                                 required: [true, 'Name field is required']
//                             },
//                             productDescription: {
//                                 type: String,
//                                 required: [true, 'Name field is required']
//                             },
//                             quantityInStock: {
//                                 type: Number,
//                                 required: [true, 'Name field is required']
//                             },
//                             buyPrice: {
//                                 type: Number,
//                                 required: [true, 'Name field is required']
//                             },
//                             MSRP: {
//                                 type: Number,
//                                 required: [true, 'Name field is required']
//                             }
//                         }
//                     ]
//                 }
//             ] 
//         }
//     ]
// });

// const customersSchema = new Schema({
//     customerNumber: Number,
//     customerName: String,
//     contactLastName: String,
//     contactFirstName: String,
//     phone: String,
//     addressLine1: String,
//     addressLine2: String,
//     city: String,
//     state: String,
//     postalCode: String,
//     country: String,
//     salesRepEmployeeNumber: Number,
//     creditLimit: Number,
//     employee: {
//         employeeNumber: Number,
//         lastName: String,
//         firstName: String,
//         extension: String,
//         email: String,
//         officeCode: String,
//         reportsTo: Number,
//         jobTitle: String,
//         office: [
//             {
//                 officeCode: String,
//                 city: String,
//                 phone: String,
//                 addressLine1: String,
//                 addressLine2: String,
//                 addressLine2: String,
//                 state: String,
//                 country: String,
//                 postalCode: String,
//                 territory: String
//             }
//         ],
//     },
//     payments: [
//         {
//             customerNumber: Number,
//             checkNumber: String,
//             paymentDate: String,
//             amount: Number
//         }
//     ],
//     orders: [
//         {
//             orderNumber: Number,
//             orderDate: String,
//             requiredDate: String,
//             shippedDate: String,
//             status: String,
//             comments: String,
//             customerNumber: Number,
//             orderDetails: [
//                 {
//                     orderNumber: Number,
//                     productCode: String,
//                     quantityOrdered: Number,
//                     priceEach: Number,
//                     orderLineNumber: Number,
//                     product: [
//                         {
//                             productCode: String,
//                             productName: String,
//                             productLine: String,
//                             productScale: String,
//                             productVendor: String,
//                             productDescription: String,
//                             quantityInStock: Number,
//                             buyPrice: Number,
//                             MSRP: Number
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// });
var PaymentsSchema = new Schema(
    {
        customerNumber: Number,
        checkNumber: String,
        paymentDate: String,
        amount: Number
    }
);

const customersSchema = new Schema({
    //customerNumber: Number,
    //customerName: String
    // contactLastName: String,
    // contactFirstName: String,
    // phone: String,
    // addressLine1: String,
    // addressLine2: String,
    // city: String,
    // state: String,
    // postalCode: String,
    // country: String,
    // salesRepEmployeeNumber: Number,
    // creditLimit: Number,
    // payments: [
    //     PaymentsSchema
    // ]
});

const customers = mongoose.model('tests', customersSchema);


module.exports = customers;
