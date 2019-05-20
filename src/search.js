import React, { Component } from 'react';
import axios from 'axios';
import './search.css';
import USStateData from './states_titlecase.json';
import designationData from './NPS_designation.json'

// US State JSON 
// https://gist.github.com/mshafrir/2646763

// Nationa Park Service designation json file with data from
// https://www.nps.gov/goga/planyourvisit/designations.htm

class Search extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleStateFilter = this.handleStateFilter.bind(this);
		this.handleStateDelete = this.handleStateDelete.bind(this);
		this.handleDesigFilter = this.handleDesigFilter.bind(this);
		this.handleDesigDelete = this.handleDesigDelete.bind(this);
		this.state = {
			searchResults: [],
			statesMap: [],
			stateFilter: [],
			desigArray: [],
			desigFilter: []
		};
	}

	componentDidMount() {

	}


	handleDesigDelete(event) {
		var filtered = this.state.desigFilter.filter((value, index, arr) => {
			return value !== event.target.getAttribute("data-desig");
		})
		this.setState({
			desigFilter: filtered
		});
	}

	handleStateDelete(event) {
		var filtered = this.state.stateFilter.filter((value, index, arr) => {
			return value !== event.target.getAttribute("data-state");
		});
		this.setState({
			stateFilter: filtered
		});
	}

	handleStateFilter(event) {
		event.preventDefault();
		if (document.getElementById('state-filter').value === 'Filter By State') {
			return;
		}
		var stateFilter = this.state.stateFilter;
		stateFilter.push(document.getElementById('state-filter').value);
		var uniqueState = [...new Set(stateFilter)];
		
		this.setState({
			stateFilter: uniqueState
		});
	}

	handleDesigFilter(event) {
		event.preventDefault();
		if (document.getElementById('desig-filter').value === 'Filter By Designation') {
			return;
		}
		var desigFilter = this.state.desigFilter;
		desigFilter.push(document.getElementById('desig-filter').value);
		var uniqueDesig = [...new Set(desigFilter)];

		this.setState({
			desigFilter: uniqueDesig
		});
	}

	handleSearchFilter(event) {
		event.preventDefault();
		console.log(document.getElementById('search-filter').value);
	}

	handleSearch(event) {
		event.preventDefault();
		var self = this;
		axios.get("https://developer.nps.gov/api/v1/parks", {
			params: {
				limit: 20,
				q: this.textInput.value,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			self.setState({
				searchResults: res.data.data
			})
		})
	}

	render() {
		// display the results from the api get request
		var resultList = [];
		this.state.searchResults.forEach(element => {
			resultList.push(
				<div className="result-item" key={ element.parkCode }>
					<span className="mr-5">{ element.states }</span>
					<span className="mr-5">{ element.name }</span>
					<span>{ element.designation }</span>
					<br />
				</div>
			);
		});

		// convert the json file to key value pair
		var map = new Map();
		USStateData.forEach(element => {
			map.set(element.name, element.abbreviation);
		});
		// display all the state options
		var stateOptions = [];
		var index = 1;
		map.forEach((value, key) => {
			stateOptions.push(
				<option className="dropdown-item" key={ index }>
					{ key }
				</option>
			);
			index += 1;
		});

		// display all the designation options
		var desigOptions = [];
		index = 1;
		designationData.forEach((element) => {
			desigOptions.push(
				<option className="dropdown-item" key={ index }>
					{ element.designation }
				</option>
			);
			index += 1;
		});

		// display selected state filters
		var stateFilterList = [];
		index = 0;
		this.state.stateFilter.forEach(element => {
			stateFilterList.push(
				<div className="state-filter-item" key={ index }>
					<div className="filter-text">{ element }</div>
					<i className="fas fa-times" data-state={ element } onClick={ this.handleStateDelete }></i>
				</div>
			);
			index += 1;
		});

		// display selected designation filters
		var desigFilterList = [];
		index = 0;
		this.state.desigFilter.forEach(element => {
			desigFilterList.push(
				<div className="desig-filter-item" key={ index }>
					<div className="filter-text">{ element }</div>
					<i className="fas fa-times" data-desig={ element } onClick={ this.handleDesigDelete }></i>
				</div>
			);
			index += 1;
		})


		return (
			<>
			<div className="wrapper">
				<div className="search-bar">
					<form onSubmit={ this.handleSearch }>
				    	<button type="submit" className="search-button">
				    		<i className="fas fa-search"></i>
				    	</button>
				    	<input type="text" className="search-input" 
				    			ref={(input) => this.textInput = input} placeholder="Find a park" />
					</form>
				</div>

				<div className="search-result">{ /*resultList*/ }</div>

				<div className="filter-menu" id="filter-menu">
					<select className="filter-button state-filter-button" 
							id="state-filter" onChange={ this.handleStateFilter }>
						<option className="dropdown-item" key={ 0 }>
							Filter By State
						</option>
						{ stateOptions }
					</select>
					
					<br />
					<select className="filter-button desig-filter-button mt-4" 
							id="desig-filter" onChange={ this.handleDesigFilter }>
						<option className="dropdown-item" key={ 0 }>
							Filter By Designation
						</option>
						{ desigOptions }
					</select>
					
					<br />
					<select className="filter-button search-filter-button mt-4"
							id="search-filter" onChange={ this.handleSearchFilter } >
						<option className="dropdown-item">By Keyword</option>
						<option className="dropdown-item">By Name</option>
					</select>
				</div>

				<div className="filter-group">
					{ stateFilterList }
					{ desigFilterList }
				</div>

				

			</div>


			</>
		);
	}
}

export default Search;