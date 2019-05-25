import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { NavLink } from 'react-router-dom';

class App extends Component {
  
  componentDidMount() {
    
  }

  render() {
    return (
      <>
        <div className="main">
          <div className="content">
            <NavLink to="/search">
              <button type="button" className="btn btn-primary">Find a park</button>
            </NavLink>
          </div>
        </div>
      </>
    );
  }

}

export default App;


