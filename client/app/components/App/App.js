import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MainLayoutComponent } from '../mainLayout/mainLayoutComponent'
import { HomeComponent } from "../home/homeComponent";
import { UtilstandardComponent } from '../utilstandard/utilstandardComponent'
import { UtilanalysteComponent } from '../utilanalyste/utilanalysteComponent'
import { AdminComponent } from '../admin/adminComponent'

class App extends Component {

  render() {
    return (
      <Router>
        <div className={"outer-container"} style={{ height: '100%' }}>
          <MainLayoutComponent />
          <main id="page-wrap">
            <Route exact path="/" component={HomeComponent} />
            <Route path="/utilstandard" component={UtilstandardComponent} />
            <Route path="/utilanalyste" component={UtilanalysteComponent} />
            <Route path="/admin" component={AdminComponent} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
