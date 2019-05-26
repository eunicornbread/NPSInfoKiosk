import React, { Component } from 'react';
import './park.css';
import axios from 'axios';
import Campground from './campground.js';
import VisitorCenter from './visitorcenter.js';

class Park extends Component {
	constructor(props) {
		super(props);

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

	// three parts: park info, nearby campgrounds, visitor centers

	render() {
		return (
			<>
				<div className="wrapper">
					<ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
					  <li className="nav-item">
					    <a className="nav-link active" id="pills-park-tab" data-toggle="pill" 
							href="#pills-park" role="tab" aria-controls="pills-park" 
							aria-selected="true">Park</a>
					  </li>
					  <li className="nav-item">
					    <a className="nav-link" id="pills-camp-tab" data-toggle="pill" 
					    	href="#pills-camp" role="tab" aria-controls="pills-camp" 
					    	aria-selected="false">Campgrounds</a>
					  </li>
					  <li className="nav-item">
					    <a className="nav-link" id="pills-visitor-tab" data-toggle="pill" 
					    	href="#pills-visitor" role="tab" aria-controls="pills-visitor" 
					    	aria-selected="false">Visitor Centers</a>
					  </li>
					</ul>

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


			</>
		);
	}
}

export default Park;