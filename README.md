# ClassicModels

Our project consisted in creating an application, on the language of our choice, on a NoSQL database studied during the courses, namely MongoDB.

First, a denormalization step of the SQL data was performed. Indeed, we started from a relational database that represents the data of a miniaturized car shop, and that we transformed into JSON and then integrate it unnormally into MongoDB under different collections.

So we created a web application coded in full JS with the MERN stack (Mongoose, Express, ReactJS, NodeJS). This application serves as a data visualization interface for the queries that will be described later in the report.


The application includes 3 views:

- A standard user view: these are 4 most requested queries on the database without user intervention.
- An Analyst / Decision-maker view: these are 2 complex queries that can be set by the user.
- An Administrator view: It provides statistics on the data.


### Preview 

The project was deployed to an AWS instance so you can preview the project here : http://35.180.61.119/


### Prerequisites

1 - NodeJS and Mongo DB must be installed

2 - Import customers.json, customersoffciespayments.json,  customerspayments.json, orders.json, payments.json in your mongoDB with the following commands:

    ```
    mongoimport --db ZIPS --collection customers --file projectpath/json_data/customers.json
    mongoimport --db ZIPS --collection customersoffciespayments --file projectpath/json_data/customersoffciespayments.json
    mongoimport --db ZIPS --collection customerspayments --file projectpath/json_data/customerspayments.json
    mongoimport --db ZIPS --collection orders --file projectpath/json_data/orders.json
    mongoimport --db ZIPS --collection payments --file projectpath/json_data/payments.json
    ```

3 - Mongod must be launched (connection open)


### Installing

1 - Open a command prompt in the folder project

2 - Run the following commands :
```
npm install
node server.js
```
3 - Open your browser and go to : 
```
localhost:8080
```


## Built With

* [ReactJS](https://reactjs.org/) - Front-end : ReactJS
* [NodeJS](https://nodejs.org/) - Back-end : NodeJS
* [MongoDB](https://www.mongodb.com) Database : Mongo DB, GUI : Studio 3T
* [ReactTable](https://react-table.js.org)
* [ReactChartJS](https://www.npmjs.com/package/react-chartjs-2)
* [ReactSimpleMaps](https://www.react-simple-maps.io/)



## Screenshots

![screenshot1](https://raw.githubusercontent.com/MiguelRamosF/classicmodels/master/img/Capture01.PNG)
![screenshot1](https://raw.githubusercontent.com/MiguelRamosF/classicmodels/master/img/Capture02.PNG)
![screenshot1](https://raw.githubusercontent.com/MiguelRamosF/classicmodels/master/img/Capture03.PNG)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details