import React, { Component } from 'react';
import axios from 'axios';
import './search.css';

class Search extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(event) {
		event.preventDefault();
		console.log(this.textInput.value);
		axios.get("https://developer.nps.gov/api/v1/parks", {
			params: {
				limit: 20,
				q: this.textInput.value,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			console.log(res.data.data);
		})
	}

	render() {
		return (
			<>
			<div className="wrapper">
				<div className="search-bar">
					<form onSubmit={ this.handleSearch }>
				    	<button type="submit" id="search-button"><i className="fas fa-search"></i></button>
				    	<input type="text" id="search-input" ref={(input) => this.textInput = input} placeholder="Find a park" />
				    	
					</form>
				</div>
			</div>
			</>
		);
	}
}

export default Search;