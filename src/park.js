import React, { Component } from 'react';
import './park.css';
import axios from 'axios';

class Park extends Component {
	constructor(props) {
		super(props);

		// get parks
		axios.get("https://developer.nps.gov/api/v1/parks", {
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

		
		// get campgrounds
		axios.get("https://developer.nps.gov/api/v1/campgrounds", {
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

		// get visitor centers
		axios.get("https://developer.nps.gov/api/v1/visitorcenters", {
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

	render() {
		return (
			<>
				<p>This is the park page :D</p>
				<p>parkCode is { this.props.match.params.parkCode }</p>
			</>
		);
	}
}

export default Park;