import React from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import request from "axios"
import Select from 'react-select';

import ReactTooltip from "react-tooltip"
import tooltip from "wsdm-tooltip"

import './css/utilanalysteComponent.css'

var countriesGeoCoord = 
[
  {
      "latlng": [
          2, 
          46
      ], 
      "name": "France", 
  },
  {
      "latlng": [
          133,
          -27 
          
      ], 
      "name": "Australia", 
  },
  {
      "latlng": [
          138, 
          36
      ], 
      "name": "Japan", 
  },
  {
      "latlng": [
          -2, 
          54
      ], 
      "name": "UK", 
  },
  {
      "latlng": [
          -100, 
          40
      ], 
      "name": "USA", 
  },
  {
    "latlng": [ 
      13.33333333,
      47.33333333
  ], 
  "name": "Austria",
},
{
  "latlng": [
    4,
    50.83333333
    
], 
"name": "Belgium", 
},
{
  "latlng": [
    -95,
    60
    
], 
"name": "Canada", 
},
{
  "latlng": [
    10,
    56
], 
"name": "Denmark", 
},
{
  "latlng": [
    26,
    64
], 
"name": "Finland", 
},
{
  "latlng": [ 
    9,
    51
], 
"name": "Germany", 
},
{
  "latlng": [ 
    -8,
    53
], 
"name": "Ireland", 
},
{
  "latlng": [
    12.83333333,
    42.83333333
], 
"name": "Italy", 
},
{
  "latlng": [ 
    174,
    -41
], 
"name": "New Zealand", 
},
{
  "latlng": [ 
    122,
    13
], 
"name": "Philippines", 
},
{
  "latlng": [
    10,
    62
], 
"name": "Norway",  
},
{
  "latlng": [
    103.8,
    1.36666666
], 
"name": "Singapore", 
},
{
  "latlng": [ 
    -4,
    40
], 
"name": "Spain", 
},
{
  "latlng": [ 
    15,
    62
], 
"name": "Sweden",  
},
{
  "latlng": [ 
    8,
    47
], 
"name": "Switzerland",  
}

]

const options = [
  { value: 'january', label: 'January' },
  { value: 'february', label: 'February' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' },
];

const wrapperStyles = {
  width: "100%",
  maxWidth: 800,
  //margin: "0 auto",
}

function fetchGeoCoord(country){
  if(country == "Norway  ") country = country.replace(/\s/g, '');
  for ( var j=0; j<countriesGeoCoord.length; j++){
    if(countriesGeoCoord[j].name == country){
      return countriesGeoCoord[j].latlng
    }
  }

  return "not found"

}

const cityScale = scaleLinear()
  .domain([0, 200000])
  .range([5, 15])



export class UtilanalysteComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      cities: [],
      dataMonthProfit: [],
      paymentsAvgCustomersMonths2014: [],
      selectedOption1: {"value":"january", "label": "January"},
      selectedOption2: {"value":"january", "label": "January"},
      
    }

    this.fetchpaymentsCountryMonths2014 = this.fetchpaymentsCountryMonths2014.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    // this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {

    // 
    // ReactTooltip.rebuild()
    this.tip = tooltip()
    this.tip.create()
    this.fetchpaymentsCountryMonths2014()
    this.fetchpaymentsAvgCustomersMonths2014()
    this.fetchCities()
    // ReactTooltip.rebuild()
    setTimeout(() => {
      ReactTooltip.rebuild()
      

    }, 300)
    // this.fetchpaymentsCountryMonths2014()
  }

  componentDidUpdate (){
    setTimeout(() => {
      ReactTooltip.rebuild()
      

    }, 300)
  }

  handleMouseMove(city, evt) {
    
    this.tip.show(`
      <div class="tooltip-inner">
        ${city.population}
      </div>
    `)
    this.tip.position({ pageX: evt.pageX, pageY: evt.pageY })
  }
  handleMouseLeave() {
    this.tip.hide()
  }

  handleChange1 = (selectedOption1) => {
    this.setState({ selectedOption1 });
    console.log(`Option selected:`, selectedOption1);
  }

  handleChange2 = (selectedOption2) => {
    this.setState({ selectedOption2 });
    console.log(`Option selected:`, selectedOption2);
  }

  handleClick = (marker, evt) => {
    console.log("Marker data: ", marker)
  }

  fetchCities() {
    request
      .get("/world-most-populous-cities.json")
      .then(res => {
        this.setState({
          cities: res.data,
        })
      })
  }

  fetchpaymentsCountryMonths2014() {

    var dataMonthProfit = []

    fetch("/api/paymentsCountryMonths2014")
      .then(response => response.json())
      .then(parsedJSON => {
        //console.log(parsedJSON)
        
        for (var i=0; i< parsedJSON.results.length; i++){
          
            var latlng = fetchGeoCoord(parsedJSON.results[i]._id.country)
            console.log("final", latlng)
            var donnee = {
              "name": parsedJSON.results[i]._id.country,
              "coordinates": latlng,
              "month": parsedJSON.results[i]._id.month,
              "population": parsedJSON.results[i].value
            }
            console.log("donnee",donnee)
            if(parsedJSON.results[i]._id.month == "01"){ donnee.month = "January"; dataMonthProfit.push(donnee)}
            if(parsedJSON.results[i]._id.month == "02"){ donnee.month = "February"; dataMonthProfit.push(donnee)}
            if(parsedJSON.results[i]._id.month == "03"){ donnee.month = "March"; dataMonthProfit.push(donnee)}
            if(parsedJSON.results[i]._id.month == "04"){ donnee.month = "April"; dataMonthProfit.push(donnee)}
            if(parsedJSON.results[i]._id.month == "05"){ donnee.month = "May"; dataMonthProfit.push(donnee)}
            if(parsedJSON.results[i]._id.month == "06"){ donnee.month = "June"; dataMonthProfit.push(donnee)}
            if(parsedJSON.results[i]._id.month == "07"){ donnee.month = "July"; dataMonthProfit.push(donnee)}
            if(parsedJSON.results[i]._id.month == "08"){ donnee.month = "August"; dataMonthProfit.push(donnee)}
            if(parsedJSON.results[i]._id.month == "09"){ donnee.month = "September"; dataMonthProfit.push(donnee)}
            if(parsedJSON.results[i]._id.month == "10"){ donnee.month = "October"; dataMonthProfit.push(donnee)}
            if(parsedJSON.results[i]._id.month == "11"){ donnee.month = "November"; dataMonthProfit.push(donnee)}
            if(parsedJSON.results[i]._id.month == "12"){ donnee.month = "December"; dataMonthProfit.push(donnee)}
        }
        this.setState({
          dataMonthProfit: dataMonthProfit

        })
        console.log("state",this.state)
      })
      .catch(error => console.log("parsing failed", error))
      
  }

  fetchpaymentsAvgCustomersMonths2014() {

    var paymentsAvgCustomersMonths2014 = []

    fetch("/api/paymentsAvgCustomersMonths2014")
      .then(response => response.json())
      .then(parsedJSON => {
        //console.log(parsedJSON)
        
        for (var i=0; i< parsedJSON.results.length; i++){
          
            var latlng = fetchGeoCoord(parsedJSON.results[i]._id.country)
            console.log("final", latlng)
            var donnee = {
              "name": parsedJSON.results[i]._id.country,
              "coordinates": latlng,
              "month": parsedJSON.results[i]._id.month,
              "population": parsedJSON.results[i].value.avg
            }
            console.log("donnee",donnee)
            if(parsedJSON.results[i]._id.month == "01"){ donnee.month = "January"; paymentsAvgCustomersMonths2014.push(donnee)}
            if(parsedJSON.results[i]._id.month == "02"){ donnee.month = "February"; paymentsAvgCustomersMonths2014.push(donnee)}
            if(parsedJSON.results[i]._id.month == "03"){ donnee.month = "March"; paymentsAvgCustomersMonths2014.push(donnee)}
            if(parsedJSON.results[i]._id.month == "04"){ donnee.month = "April"; paymentsAvgCustomersMonths2014.push(donnee)}
            if(parsedJSON.results[i]._id.month == "05"){ donnee.month = "May"; paymentsAvgCustomersMonths2014.push(donnee)}
            if(parsedJSON.results[i]._id.month == "06"){ donnee.month = "June"; paymentsAvgCustomersMonths2014.push(donnee)}
            if(parsedJSON.results[i]._id.month == "07"){ donnee.month = "July"; paymentsAvgCustomersMonths2014.push(donnee)}
            if(parsedJSON.results[i]._id.month == "08"){ donnee.month = "August"; paymentsAvgCustomersMonths2014.push(donnee)}
            if(parsedJSON.results[i]._id.month == "09"){ donnee.month = "September"; paymentsAvgCustomersMonths2014.push(donnee)}
            if(parsedJSON.results[i]._id.month == "10"){ donnee.month = "October"; paymentsAvgCustomersMonths2014.push(donnee)}
            if(parsedJSON.results[i]._id.month == "11"){ donnee.month = "November"; paymentsAvgCustomersMonths2014.push(donnee)}
            if(parsedJSON.results[i]._id.month == "12"){ donnee.month = "December"; paymentsAvgCustomersMonths2014.push(donnee)}
        }
        this.setState({
          paymentsAvgCustomersMonths2014: paymentsAvgCustomersMonths2014

        })
        console.log("state",this.state)
      })
      .catch(error => console.log("parsing failed", error))
      
  }

  

  render() {
    const { selectedOption1 } = this.state;
    const { selectedOption2 } = this.state;


    return (
      <div className="css_wrapper_analyst">
      
      <div className="css_map1">
      <h2>Mensual profit in 2004 by offices</h2>
      <div style={wrapperStyles}>

        <Select
        className='react-select-container'
        classNamePrefix="react-select"
        value={selectedOption1}
        placeholder= {"January"}
        onChange={this.handleChange1}
        options={options}
      />

        <ComposableMap
          projectionConfig={{ scale: 205 }}
          width={800}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          <ZoomableGroup center={[0, 20]} disablePanning>
            <Geographies geography="/world-50m.json">
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                  geography.id !== "ATA" && (
                    <Geography
                      key={i}
                      data-tip={geography.properties.name}
                      geography={geography}
                      projection={projection}
                      // onMouseMove={this.handleMouseMove}
                      // onMouseLeave={this.handleMouseLeave}
                      style={{
                        default: {
                          fill: "rgb(146, 152, 156)",
                          stroke: "rgb(97, 106, 123)",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#607D8B",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#FF5722",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                      }}
                    />
                  ))}
            </Geographies>
            <Markers>
              {
                
                this.state.dataMonthProfit.map((city, i)=>{
                  

                  if( selectedOption1.label == city.month ) {

                    var datatip = city.population + ' - ' + city.name
                    return(
                      <Marker key={i} marker={city} onClick={ this.handleClick } 
                      // data-tip={"hello world"}
                      // onMouseMove={this.handleMouseMove}
                      // onMouseLeave={this.handleMouseLeave} 
                      >
                    <circle
                    data-tip={datatip}
                      cx={0}
                      cy={0}
                      r={cityScale(city.population)}
                      fill="rgb(92, 136, 230)"
                      stroke="#607D8B"
                      strokeWidth="2"
                    />
                  </Marker>
                  
                  
                    )
                  }
                  
                })
              }
    
            </Markers>
            
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip />
        </div>
        </div>

        <div className="css_map2">
        <h2>Mean mensual expenses from customers in 2014 by countries</h2>
        <div style={wrapperStyles}>
        <Select
        className='react-select-container'
        classNamePrefix="react-select"
        value={selectedOption2}
        placeholder= {"January"}
        onChange={this.handleChange2}
        options={options}
      />
      

<ComposableMap
          projectionConfig={{ scale: 205 }}
          width={800}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          <ZoomableGroup center={[0, 20]} disablePanning>
            <Geographies geography="/world-50m.json">             
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                  geography.id !== "ATA" && (
                    <Geography
                      key={i}
                      data-tip={geography.properties.name}
                      geography={geography}
                      projection={projection}
                      // onMouseMove={this.handleMouseMove}
                      // onMouseLeave={this.handleMouseLeave}
                      style={{
                        default: {
                          fill: "rgb(146, 152, 156)",
                          stroke: "rgb(97, 106, 123)",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#607D8B",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#FF5722",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                      }}
                    />
                  ))}
            </Geographies>
            <Markers>
              {
                
                this.state.paymentsAvgCustomersMonths2014.map((city, i)=>{
                  

                  if( selectedOption2.label == city.month ) {

                    var datatip = city.population + ' - ' + city.name
                    return(
                      <Marker key={i} marker={city} onClick={ this.handleClick } 
                      // data-tip={"hello world"}
                      // onMouseMove={this.handleMouseMove}
                      // onMouseLeave={this.handleMouseLeave} 
                      >
                    <circle
                    data-tip={datatip}
                      cx={0}
                      cy={0}
                      r={cityScale(city.population)}
                      fill="rgb(92, 136, 230)"
                      stroke="#607D8B"
                      strokeWidth="2"
                    />
                  </Marker>
                  
                  
                    )
                  }
                  
                })
              }
    
            </Markers>
            
          </ZoomableGroup>
        </ComposableMap>
        </div>
        </div>
        
      </div>
    )

  }
}


