import React, { Component } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import bgImage from './svg/new-landing-page.svg';

/* This is the landing page for the NPS info kiosk */

class App extends Component {
  componentDidMount() {
    document.getElementById('web-name').classList.add('opacity-one');
  }

  render() {
    return (
      <>
        <div className="main">
          <div className="bg-img">
            <img src={ bgImage } alt='background' />
          </div>
          <div className='web-name' id='web-name'>
            <h1 className='intro-head' id='head-1'>National Park Service</h1>
            <h1 className='intro-head' id='head-2'>Info Kiosk</h1>
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
                  <a href='https://github.com/eunicornbread/NPSInfoKiosk' 
                      className='button-text'>Go to GitHub</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default App;


