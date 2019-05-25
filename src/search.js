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
		this.handleDesigCollapse = this.handleDesigCollapse.bind(this);
		this.handleSearchCollapse = this.handleSearchCollapse.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);

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
	}

	componentDidMount() {
		window.addEventListener('click', this.handleClickOutside, false);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.handleClickOutside, false);
	}

	handleClickOutside(event) {
		if (!document.getElementById('state-filter-wrapper').contains(event.target)) {
			document.getElementById('state-filter-option').classList.remove('show');
			document.getElementById('state-collapse').classList.remove('rotate-90');
			document.getElementById('state-wrapper').classList.remove('expand');
		}

		if (!document.getElementById('desig-filter-wrapper').contains(event.target)) {
			document.getElementById('desig-filter-option').classList.remove('show');
			document.getElementById('desig-collapse').classList.remove('rotate-90');
			document.getElementById('desig-wrapper').classList.remove('expand');
		}

		if (!document.getElementById('search-filter-wrapper').contains(event.target)) {
			document.getElementById('search-filter-option').classList.remove('show');
			document.getElementById('search-collapse').classList.remove('rotate-90');
			document.getElementById('search-wrapper').classList.remove('expand-sm');
		}
	}

	handleCollapse(event) {

	}

	handleStateCollapse(event) {
		if (document.getElementById('state-filter-option').classList.contains('show')) {
			document.getElementById('state-filter-option').classList.remove('show');
			document.getElementById('state-collapse').classList.remove('rotate-90');
			document.getElementById('state-wrapper').classList.remove('expand');
		} else {
			document.getElementById('state-filter-option').classList.add('show');
			document.getElementById('state-collapse').classList.add('rotate-90');
			document.getElementById('state-wrapper').classList.add('expand');
		}
	}

	handleDesigCollapse(event) {
		if (document.getElementById('desig-filter-option').classList.contains('show')) {
			document.getElementById('desig-filter-option').classList.remove('show');
			document.getElementById('desig-collapse').classList.remove('rotate-90');
			document.getElementById('desig-wrapper').classList.remove('expand');
		} else {
			document.getElementById('desig-filter-option').classList.add('show');
			document.getElementById('desig-collapse').classList.add('rotate-90');
			document.getElementById('desig-wrapper').classList.add('expand');
		}	
	}

	handleSearchCollapse(event) {
		if (document.getElementById('search-filter-option').classList.contains('show')) {
			document.getElementById('search-filter-option').classList.remove('show');
			document.getElementById('search-collapse').classList.remove('rotate-90');
			document.getElementById('search-wrapper').classList.remove('expand-sm');
		} else {
			document.getElementById('search-filter-option').classList.add('show');
			document.getElementById('search-collapse').classList.add('rotate-90');
			document.getElementById('search-wrapper').classList.add('expand-sm');
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
		var stateFilter = this.state.stateFilter;
		stateFilter.push(event.target.getAttribute('data-state'));
		var uniqueState = [...new Set(stateFilter)];
		
		this.setState({
			stateFilter: uniqueState
		});		
	}

	handleDesigFilter(event) {
		var desigFilter = this.state.desigFilter;
		desigFilter.push(event.target.getAttribute('data-desig'));
		var uniqueDesig = [...new Set(desigFilter)];

		this.setState({
			desigFilter: uniqueDesig
		});

	}

	handleSearchFilter(event) {
		event.preventDefault();
		document.getElementById('search-filter').innerHTML = event.target.getAttribute('data-search');
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
			console.log(res.data.data);
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
			if (document.getElementById('search-filter') !== null
				&& document.getElementById('search-filter').textContent === "Search By Keyword") {
				includeSearch = true;
			}

			if (document.getElementById('search-filter') !== null
				&& document.getElementById('search-filter').textContent === "Search By Name") {
				if (element.fullName.toLowerCase().includes(
							document.getElementById("search-input").value.toLowerCase())) {
					includeSearch = true;
				}
			}
			// console.log(includeState);
			// console.log(includeDesig);
			// console.log(includeSearch);

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
				<div className="dropdown-item" onClick={ this.handleStateFilter } key={ index } data-state={ element }>
					<p data-state={ element }>{ element }</p>
				</div>
			);
			index += 1;
		});

		// display all the designation options
		var desigOptions = [];
		index = 0;
		designationData.forEach((element) => {
			desigOptions.push(
				<div className="dropdown-item" onClick={ this.handleDesigFilter } key={ index } data-desig={ element.designation }>
					<p data-desig={ element.designation }>{ element.designation }</p>
				</div>
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
				    	<input type="text" className="search-input shadow-sm" id="search-input" 
				    			ref={(input) => this.textInput = input} placeholder="Find a park" />
					</form>
				</div>

				<div className="search-result" id="search-results">{ resultList }</div>

				<div className="filter-menu" id="filter-menu">
					
					<div className="filter-wrapper" id="state-filter-wrapper" onClick={ this.handleStateCollapse }>
						<i className="fas fa-chevron-circle-right collapse-icon" id="state-collapse"></i>
						<div className="filter-button state-filter-button">
							<p className="noselect line-grow">Filter By State</p>
						</div>
						
						<div className="filter-option state-filter-option" id="state-filter-option">
							<div className="option-wrapper" id="state-wrapper">
								{ stateOptions }
							</div>
						</div>
					</div>

					<div className="filter-wrapper" id="desig-filter-wrapper" onClick={ this.handleDesigCollapse }>
						<i className="fas fa-chevron-circle-right collapse-icon" id="desig-collapse"></i>
						<div className="filter-button desig-filter-button">
							<p className="noselect line-grow">Filter By Designation</p>
						</div>
	
						<div className="filter-option desig-filter-option" id="desig-filter-option">
							<div className="option-wrapper" id="desig-wrapper">
								{ desigOptions }
							</div>
						</div>
					</div>

					<div className="filter-wrapper" id="search-filter-wrapper" onClick={ this.handleSearchCollapse }>
						<i className="fas fa-chevron-circle-right collapse-icon" id="search-collapse"></i>
						<div className="filter-button search-filter-button">
							<p className="noselect line-grow" id="search-filter">Search By Keyword</p>
						</div>

						<div className="filter-option search-filter-option" id="search-filter-option">
							<div className="option-wrapper-sm" id="search-wrapper">
								<div className="dropdown-item" id="dropdown-keyword"
									 onClick={ this.handleSearchFilter } data-search="Search By Keyword">
									<p data-search="Search By Keyword">Search By Keyword</p>
								</div>
								<div className="dropdown-item" id="dropdown-name"
									 onClick={ this.handleSearchFilter } data-search="Search By Name">
									<p data-search="Search By Name" id="search-by-name">Search By Name</p>
								</div>
							</div>
						</div>
					
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