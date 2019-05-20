import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    var self = this;
    
    axios.get("https://developer.nps.gov/api/v1/campgrounds", {
      params: {
        stateCode: 'CA',
        limit: 10,
        api_key: process.env.REACT_APP_API_KEY
      }
    })
    .then(res => {
      // use ( process.env.REACT_APP_API_KEY ) to api key private;
      console.log(res.data.data);
      self.setState({
        data: res.data.data
      });
    });
    
  }

  render() {
    return (
      <>
        <div className="main">
          <div className="content">
            <p>Hi! This is the landing page :)</p>
            <NavLink to="/search" className="nounderline">
              <button type="button" className="btn btn-primary">Find a park</button>
            </NavLink>
          </div>
        </div>
      </>
    );
  }

}

export default App;


