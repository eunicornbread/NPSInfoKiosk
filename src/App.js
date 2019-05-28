import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { NavLink } from 'react-router-dom';
import bgImage from './new-landing-page.svg';

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
          <div className="content">
            <NavLink to={{
              pathname: "/search",
              props: {
                transition: true
              }
            }}>
              <button type="button" className="button shadow-sm">
                <span className="button-text mr-2">Find a park</span>
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


