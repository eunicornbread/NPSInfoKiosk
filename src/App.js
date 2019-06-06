import React, { Component } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import bgImage from './svg/new-landing-page.svg';

/* This is the landing page for the NPS info kiosk */

class App extends Component {
  render() {
    return (
      <>
        <div className="main">
          <div className="bg-img">
            <img src={ bgImage } alt='background' />
          </div>
          <div className='web-name'>
            <h1 id='head-1'>National Park Service</h1>
            <h1 id='head-2'>Info Kiosk</h1>
          </div>
          <div className="content">
            <div className='ghost-btn-group'>
              <NavLink to={{
                            pathname: "/search",
                            transition: {
                              transition: true
                            }
                          }}>
                <button type="button" className="ghost-button" id='ghost-1'>
                  <span className="button-text mr-2">Get Started</span>
                </button>
              </NavLink>
              <button type='button' className='ghost-button' id='ghost-2'>
                <span className='button-text'>Go to GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default App;


