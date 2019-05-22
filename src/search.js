import React, { Component } from 'react';
import axios from 'axios';
import './search.css';
import USStateData from './states_titlecase.json';
import designationData from './NPS_designation.json'
import { NavLink } from 'react-router-dom';

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
		this.handleSearchFilter = this.handleSearchFilter.bind(this);
		this.handleCollapse = this.handleCollapse.bind(this);
		this.handleStateCollapse = this.handleStateCollapse.bind(this);

		// convert the json file to key value pair
		var map = new Map();
		USStateData.forEach(element => {
			map.set(element.abbreviation, element.name);
		});

		this.state = {
			searchResults: [],
			statesMap: map,
			stateFilter: [],
			desigArray: [],
			desigFilter: []
		};

		window.addEventListener('click', event => {
			if (!document.getElementById('state-filter-wrapper').contains(event.target)) {
				document.getElementById('state-filter-option').classList.remove('show');
			}
		});
	}

	componentDidMount() {

	}

	handleCollapse(event) {

	}

	handleStateCollapse(event) {
		if (document.getElementById('state-filter-option').classList.contains('show')) {
			document.getElementById('state-filter-option').classList.remove('show');
		} else {
			document.getElementById('state-filter-option').classList.add('show');
		}
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

		document.getElementById('state-filter').selectedIndex = 0;

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

		document.getElementById('desig-filter').selectedIndex = 0;
	}

	handleSearchFilter(event) {
		event.preventDefault();
		this.forceUpdate();
	}

	handleSearch(event) {
		event.preventDefault();
		var self = this;
		axios.get("https://developer.nps.gov/api/v1/parks", {
			params: {
				limit: 19,
				q: this.textInput.value,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			self.setState({
				searchResults: res.data.data
			});
			//console.log(res.data.data);
		})
		.catch(error => {
			console.log(error)
		});
	}

	render() {

		// display the results from the api get request
		var resultList = [];
		this.state.searchResults.forEach(element => {
			
			// filter by state
			var includeState = false;
			var states = [];
			element.states.split(",").forEach(stateAbbr => {
				states.push(this.state.statesMap.get(stateAbbr));
			});

			if (this.state.stateFilter.length === 0) {
				includeState = true;
			}

			states.forEach(state => {
				if (this.state.stateFilter.includes(state)) {
					includeState = true;
				}
			});

			// filter by designation
			var includeDesig = false;
			if (this.state.desigFilter.length === 0) {
				includeDesig = true;
			}

			if (this.state.desigFilter.includes(element.designation)) {
				includeDesig = true;
			}

			// search by name or (default) keyword
			var includeSearch = false;
			if (document.getElementById('search-filter').value === "Search By Keyword") {
				includeSearch = true;
			}

			if (document.getElementById('search-filter').value === "Search By Name") {
				if (element.fullName.toLowerCase().includes(
							document.getElementById("search-input").value.toLowerCase())) {
					includeSearch = true;
				}
			}

			if (includeState && includeDesig && includeSearch) {
				var parkURL = "/park/" + element.parkCode;
				resultList.push(
					<NavLink to={ parkURL } className="result-link" key={ element.parkCode }>
						<div className="result-item mb-3">
							<span className="mr-5">{ element.states }</span>
							<span className="mr-5">{ element.fullName }</span>
							<span>{ element.designation }</span>
							<br />
						</div>
					</NavLink>
				);
			}
			
		});

		
		// display all the state options
		var stateOptions = [];
		var index = 0;
		this.state.statesMap.forEach(element => {
			stateOptions.push(
				<div className="dropdown-item" key={ index }>
					<p>{ element }</p>
				</div>
			);
			index += 1;
		});


		// var stateOptions = [];
		// var index = 1;
		// this.state.statesMap.forEach(element => {
		// 	stateOptions.push(
		// 		<option className="dropdown-item" key={ index }>
		// 			{ element }
		// 		</option>
		// 	);
		// 	index += 1;
		// });

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
				    	<input type="text" className="search-input" id="search-input" 
				    			ref={(input) => this.textInput = input} placeholder="Find a park" />
					</form>
				</div>

				<div className="search-result" id="search-results">{ resultList }</div>

				<div className="filter-menu" id="filter-menu">
					{/*
					<div>
						<i className="fas fa-chevron-circle-right collapse-icon"></i>
						<select className="filter-button state-filter-button" 
								id="state-filter" onChange={ this.handleStateFilter }>
							<option className="dropdown-item" key={ 0 }>
								Filter By State
							</option>
							{ stateOptions }
						</select>
					</div>
					*/}
					<div className="filter-wrapper" id="state-filter-wrapper" onClick={ this.handleStateCollapse }>
						<i className="fas fa-chevron-circle-right collapse-icon"></i>
						<div className="filter-button state-filter-button">
							<p className="noselect">Filter By State</p>
						</div>
						<div className="filter-option state-filter-option" id="state-filter-option">
							{ stateOptions }
						</div>
					</div>
					
					<div>
						<i className="fas fa-chevron-circle-right collapse-icon"></i>
						<select className="filter-button desig-filter-button mt-4" 
								id="desig-filter" onChange={ this.handleDesigFilter }>
							<option className="dropdown-item" key={ 0 }>
								Filter By Designation
							</option>
							{ desigOptions }
						</select>
					</div>

					<div>
						<i className="fas fa-chevron-circle-right collapse-icon"></i>
						<select className="filter-button search-filter-button mt-4"
								id="search-filter" onChange={ this.handleSearchFilter } >
							<option className="dropdown-item">Search By Keyword</option>
							<option className="dropdown-item">Search By Name</option>
						</select>
					</div>
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