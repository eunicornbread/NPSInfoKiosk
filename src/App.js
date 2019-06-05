import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { NavLink } from 'react-router-dom';
import bgImage from './svg/new-landing-page.svg';

// resources used:
// google font
// font awesome

class App extends Component {
  render() {
    return (
      <>
        <div className="main">
          <div className="bg-img">
            <img src={ bgImage } alt='background' />
          </div>
          <div className='web-name'>
            <h1 className='head-1'>National Park Service Info Kiosk</h1>
          </div>
          <div className="content">
            <NavLink to={{
              pathname: "/search",
              transition: {
                transition: true
              }
            }}>
              <button type="button" className="button shadow-sm">
                <span className="button-text mr-2">Get Started</span>
                <span className='button-icon'><i className="fas fa-chevron-circle-right"></i></span>
              </button>
            </NavLink>
          </div>
        </div>
      </>
    );
  }

}

export default App;


