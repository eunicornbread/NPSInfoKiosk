import React, { Component } from 'react';
import './park.css';
import axios from 'axios';
import Campground from './campground.js';
import VisitorCenter from './visitorcenter.js';
import bgImage from './new-landing-page.svg';


class Park extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			campground: [],
			visitorcenter: [],
			park: []
		};

		var self = this;

		// get parks
		axios.get("https://developer.nps.gov/api/v1/parks", {
			params: {
				parkCode: this.props.match.params.parkCode,
				limit: 19,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			//console.log(res.data.data);
			self.setState({
				park: res.data.data
			});
		})
		.catch(error => {
			console.log(error);
		});

		// get campgrounds
		axios.get("https://developer.nps.gov/api/v1/campgrounds", {
			params: {
				parkCode: this.props.match.params.parkCode,
				limit: 19,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			//console.log(res.data.data);
			self.setState({
				campground: res.data.data
			})
		})
		.catch(error => {
			console.log(error);
		});

		// get visitor centers
		axios.get("https://developer.nps.gov/api/v1/visitorcenters", {
			params: {
				parkCode: this.props.match.params.parkCode,
				limit: 19,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			//console.log(res.data.data);
			self.setState({
				visitorcenter: res.data.data
			})
		})
		.catch(error => {
			console.log(error);
		});

		
	/*
		// get alerts
		axios.get("https://developer.nps.gov/api/v1/alerts", {
			params: {
				parkCode: this.props.match.params.parkCode,
				limit: 19,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			console.log(res.data.data);
		})
		.catch(error => {
			console.log(error);
		});

		// get articles
		axios.get("https://developer.nps.gov/api/v1/articles", {
			params: {
				parkCode: this.props.match.params.parkCode,
				limit: 19,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			console.log(res.data.data);
		})
		.catch(error => {
			console.log(error);
		});

		
		

		// get events
		axios.get("https://developer.nps.gov/api/v1/events", {
			params: {
				parkCode: this.props.match.params.parkCode,
				limit: 19,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			console.log(res.data.data);
		})
		.catch(error => {
			console.log(error);
		});

		// get lesson plans
		axios.get("https://developer.nps.gov/api/v1/lessonplans", {
			params: {
				parkCode: this.props.match.params.parkCode,
				limit: 19,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			console.log(res.data.data);
		})
		.catch(error => {
			console.log(error);
		});

		// get news releases
		axios.get("https://developer.nps.gov/api/v1/newsreleases", {
			params: {
				parkCode: this.props.match.params.parkCode,
				limit: 19,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			console.log(res.data.data);
		})
		.catch(error => {
			console.log(error);
		});

		

		// get people
		axios.get("https://developer.nps.gov/api/v1/people", {
			params: {
				parkCode: this.props.match.params.parkCode,
				limit: 19,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			console.log(res.data.data);
		})
		.catch(error => {
			console.log(error);
		});

		// get places
		axios.get("https://developer.nps.gov/api/v1/places", {
			params: {
				parkCode: this.props.match.params.parkCode,
				limit: 19,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			console.log(res.data.data);
		})
		.catch(error => {
			console.log(error);
		});

		
	*/
	
	}

	handleClick(event) {
		this.forceUpdate();
	}

	// three parts: park info, nearby campgrounds, visitor centers

	render() {
		//console.log(document.getElementsByClassName('nav-option'));
		/*Array.prototype.slice.call(
			document.getElementsByClassName('nav-option')).forEach(element => {
			if (element.textContent === 'Park') {
				if (element.classList.contains('active')) {
					document.getElementById('nav-park').classList.add('nav-active');
				} else {
					document.getElementById('nav-park').classList.remove('nav-active');
				}
			} else if (element.textContent === 'Campgrounds') {
				if (element.classList.contains('active')) {
					document.getElementById('nav-camp').classList.add('nav-active');
				} else {
					document.getElementById('nav-camp').classList.remove('nav-active');
				}
			} else if (element.textContent === 'Visitor Centers') {
				if (element.classList.contains('active')) {
					document.getElementById('nav-visitor').classList.add('nav-active');
				} else {
					document.getElementById('nav-visitor').classList.remove('nav-active');
				}
			}	
		});*/

		return (
			<>
				<div className="wrapper">
					<div className="bg-img-no-transition" key={0}>
		            	<img src={ bgImage } alt='background' />
		          	</div>


					<div className='left-side' id='left-side'>

					<div className="navigation" onClick={ this.handleClick }>
						<ul className="nav flex-column" id="pills-tab" role="tablist">
						  <li className="nav-item mx-auto" id="nav-park">
						    <a className="nav-link active nav-option" id="pills-park-tab" data-toggle="pill" 
								href="#pills-park" role="tab" aria-controls="pills-park" 
								aria-selected="true"><span className='nav-tex line-grow'>Park Detail</span></a>
						  </li>
						  <li className="nav-item mx-auto" id="nav-camp">
						    <a className="nav-link nav-option" id="pills-camp-tab" data-toggle="pill" 
						    	href="#pills-camp" role="tab" aria-controls="pills-camp" 
						    	aria-selected="false"><span className='nav-tex line-grow'>Campgrounds</span></a>
						  </li>
						  <li className="nav-item mx-auto" id="nav-visitor">
						    <a className="nav-link nav-option" id="pills-visitor-tab" data-toggle="pill" 
						    	href="#pills-visitor" role="tab" aria-controls="pills-visitor" 
						    	aria-selected="false"><span className='nav-tex line-grow'>Visitor Centers</span></a>
						  </li>
						</ul>
					</div>



					</div>
					<div className='right-side' id='right-side'>

					

					<div className="tab-content" id="pills-tabContent">
					  <div className="tab-pane fade show active" id="pills-park" 
					  		role="tabpanel" aria-labelledby="pills-park-tab">1</div>
					  <div className="tab-pane fade" id="pills-camp" 
					  		role="tabpanel" aria-labelledby="pills-camp-tab">
					  		<Campground data={ this.state.campground }></Campground>
					  </div>
					  <div className="tab-pane fade" id="pills-visitor" 
					  		role="tabpanel" aria-labelledby="pills-visitor-tab">
					  		<VisitorCenter data={ this.state.visitorcenter }></VisitorCenter>
					  </div>
					</div>

					</div>

				</div>







			</>
		);
	}
}

export default Park;