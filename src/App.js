import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    //axios.get("https://developer.nps.gov/api/v1/parks?stateCode=il&api_key=d89uHqV2SoNnB9ojknPK9NfumXPRF73cUNEFeibp")
    var self = this;
    
    axios.get("https://developer.nps.gov/api/v1/parks", {
      params: {
        stateCode: 'CA',
        limit: 10,
        api_key: process.env.REACT_APP_API_KEY
      }
    })
    .then(res => {
      // use ( process.env.REACT_APP_API_KEY ) to api key private;
      console.log(res);
      self.setState({
        data: res.data.data
      });
    });
    
  }

  render() {
    console.log(this.state.data);
    var p = "";
    if (this.state.data.length !== 0) {
      p = this.state.data[0];
    }

    return (
      <>
        <p>Hi! This is the landing page :)</p>
        <p>{ p.description }</p>
      </>
    );
  }

}

export default App;


