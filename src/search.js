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
		this.handleFilter = this.handleFilter.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.state = {
			searchResults: [],
			statesMap: [],
			stateFilter: [],
			desigArray: [],
			desigFilter: []
		};
		console.log(designationData);
	}

	componentDidMount() {
	}

	handleDelete(event) {
		var filtered = this.state.stateFilter.filter((value, index, arr) => {
			return value != event.target.getAttribute("data-state");
		});
		this.setState({
			stateFilter: filtered
		})
	}

	handleFilter(event) {
		event.preventDefault();
		var stateFilter = this.state.stateFilter;
		stateFilter.push(document.getElementById('state-filter').value);
		var uniqueState = [...new Set(stateFilter)];
		
		this.setState({
			stateFilter: uniqueState
		});
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
		var stateSelected = [];
		var index = 1;
		map.forEach((value, key) => {
			stateSelected.push(
				<option className="dropdown-item" key={ index }>
					{ key }
				</option>
			);
			index += 1;
		});

		var filterList = [];
		index = 0;
		this.state.stateFilter.forEach(element => {
			filterList.push(
				<div className="state-filter-item" key={ index }>
					<div className="filter-text">{ element }</div>
					<i className="fas fa-times" data-state={ element } onClick={ this.handleDelete }></i>
				</div>
			);
			index += 1;
		});



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
							id="state-filter" onChange={ this.handleFilter }>
						<option className="dropdown-item" key={ 0 }>
							Filter By State
						</option>
						{ stateSelected }
					</select>
				</div>

				<div className="filter-group">
					{ filterList }
				</div>

			</div>


			</>
		);
	}
}

export default Search;