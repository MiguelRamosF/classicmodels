import React from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import './css/utilstandardComponent.css'

//Import React charts
import { Bar, HorizontalBar, Line } from 'react-chartjs-2';


export class UtilstandardComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jsondata: null,
      top10productNames: [],
      top10productQuantities: [],
      top5customersNames: [],
      top5customersPayments: [],
      paymentsMonth2014: []
    };
  }

  componentDidMount() {
    this.fetchCustomers()
    this.fetchtop10orderedProducts()
    this.fetchtop5customers()
    this.monthlyPayments2004()
  }

  fetchCustomers() {
    fetch("/api/customers")
      .then(response => response.json())
      .then(parsedJSON => {
        this.setState({
          jsondata: parsedJSON
        })
      }
      )
      .catch(error => console.log("parsing failed", error))
  }

  fetchtop10orderedProducts() {
    fetch("/api/top10orderedProducts")
      .then(response => response.json())
      .then(parsedJSON => {
        console.log(parsedJSON)
        var top10productNames = []
        var top10productQuantities = []
        for (var i = 0; i < parsedJSON.length; i++) {
          top10productNames.push(parsedJSON[i]._id.productName[0])
          top10productQuantities.push(parsedJSON[i].tot)
        }
        this.setState({
          top10productNames: top10productNames,
          top10productQuantities: top10productQuantities
        })
      })
      .catch(error => console.log("parsing failed", error))
  }

  fetchtop5customers() {
    fetch("/api/top5customers")
      .then(response => response.json())
      .then(parsedJSON => {
        console.log(parsedJSON)
        var top5customersNames = []
        var top5customersPayments = []
        for (var i = 0; i < parsedJSON.length; i++) {
          top5customersNames.push(parsedJSON[i].customerName)
          top5customersPayments.push(parsedJSON[i].paymentTotal)
        }

        this.setState({
          top5customersNames: top5customersNames,
          top5customersPayments: top5customersPayments
        })
      })
      .catch(error => console.log("parsing failed", error))
  }

  monthlyPayments2004() {
    fetch("/api/monthlyPayments2004")
      .then(response => response.json())
      .then(parsedJSON => {
        console.log(parsedJSON)
        var paymentsMonth2014 = []
        for (var i = 0; i < parsedJSON.length; i++) {
          paymentsMonth2014.push(parsedJSON[i].paymentsMonthTotal)
        }

        this.setState({
          paymentsMonth2014: paymentsMonth2014
        })
      })
      .catch(error => console.log("parsing failed", error))
  }



  render() {
    const data = {
      labels: this.state.top10productNames,
      datasets: [
        {
          label: 'Les 10 voitures les plus commandés',
          backgroundColor: 'rgb(87, 128, 216)',
          borderColor: 'rgb(20, 240, 255)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.top10productQuantities
        }
      ]
    };

    const data2 = {
      labels: this.state.top5customersNames,
      datasets: [
        {
          label: 'Les 5 clients les plus fidèles',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.top5customersPayments
        }
      ]
    };

    const data3 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: "Chiffres d'affaires par mois en 2004",
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.paymentsMonth2014
        }
      ]
    };

    const columns = [
      {
        Header: 'CustomerId',
        accessor: 'customerNumber', // String-based value accessors!,
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        Header: 'Name',
        accessor: 'customerName' // String-based value accessors!
      },
      {
        Header: 'City',
        accessor: 'city' // String-based value accessors!
      }, 
      // {
      //   Header: 'State',
      //   accessor: 'state' // String-based value accessors!
      // }, {
      //   Header: 'PostalCode',
      //   accessor: 'postalCode' // String-based value accessors!
      // }, 
      {
        Header: 'Country',
        accessor: 'country' // String-based value accessors!
      }
      , {
        Header: 'CreditLimit',
        accessor: 'creditLimit', // String-based value accessors!
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }]

    if (this.state.jsondata == null) {
      return (
        <div></div>
      )
    }
    else return (
      <div className="css_wrapper">

        <div className="css_reacttable">
          <ReactTable
            data={this.state.jsondata}
            columns={columns}
            defaultPageSize={10}
          />
        </div>

        <div className="css_bar">
          <Bar
            data={data}
            // width={800}
            // height={424}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }],
                xAxes: [{
                  ticks: {
                    autoSkip: false,
                    fontSize: 2

                  }
                }]
              }
            }}
          />
        </div>

        <div className="css_bar_horizontal">
          <HorizontalBar data={data2} />
        </div>

        <div className="css_animated_line">
          <Line data={data3} />
        </div>
      </div>
    )
  }
}


