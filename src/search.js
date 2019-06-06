import React, { Component } from 'react';
import axios from 'axios';
import './search.css';
import USStateData from './states_titlecase.json';
import designationData from './NPS_designation.json'
import bgImage from './svg/new-landing-page.svg';
import sunImage from './svg/sunny.svg';
import ReactLoading from 'react-loading';
import errorImage from './svg/error-image.svg';
import DelayLink from './DelayLink.jsx';

class Search extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleStateFilter = this.handleStateFilter.bind(this);
		this.handleStateDelete = this.handleStateDelete.bind(this);
		this.handleDesigFilter = this.handleDesigFilter.bind(this);
		this.handleDesigDelete = this.handleDesigDelete.bind(this);
		this.handleSearchFilter = this.handleSearchFilter.bind(this);
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
			desigFilter: [],
			loading: false,
			error: false
		};
	}

	componentDidMount() {
		window.addEventListener('click', this.handleClickOutside, false);
		if (this.props.location.transition !== undefined) {
			setTimeout(() => {
				document.getElementById('bg-img').classList.add('top');
			}, 50);
			
			setTimeout(() => {
				document.getElementById('left').classList.add('page-active');
				document.getElementById('right').classList.add('page-active');
			}, 550);
		} else {
			setTimeout(() => {
				document.getElementById('left').classList.add('page-active');
				document.getElementById('right').classList.add('page-active');
			}, 10);
		}
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
		this.setState({
			loading: true,
			error: false
		});
		var self = this;
		axios.get("https://developer.nps.gov/api/v1/parks", {
			params: {
				limit: 9,
				q: this.textInput.value,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			self.setState({
				searchResults: res.data.data,
				loading: false
			});
			console.log(res.data.data);
		})
		.catch(error => {
			console.log(error)
			self.setState({
				error: true,
				loading: false
			})
		});
	}

	render() {
		//console.log(this.props.location.state);
		
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



			if (includeState && includeDesig && includeSearch) {
				var parkURL = "/park/" + element.parkCode;
				resultList.push(
					<DelayLink 
						to={ parkURL } 
						delay={ 800 }
						onDelayStart={() => {
							document.getElementById('left').classList.remove('page-active');
							document.getElementById('right').classList.remove('page-active');
						}}
						className="result-link" 
						key={ element.parkCode }>
						

						<div className="result-item">
							<p className="result-name">
								<span className='result-fullname'>{ element.fullName }</span>
								<span><i className="fas fa-link result-link-icon"></i></span>
							</p>
							<p className='state-desig'>
								<span className="result-state">{ element.states }</span>
								<span className='result-desig'>{ element.designation }</span>
							</p>
							<p className='result-dest'>{ element.description }</p>
						</div>
					</DelayLink>
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
				<div key={ index }>
					<div className="state-filter-item" id={ element }>
						<div className="filter-text">{ element }</div>
						<i className="fas fa-times" data-state={ element } onClick={ this.handleStateDelete }></i>
					</div>
				</div>
			);
			index += 1;
		});

		// display selected designation filters
		var desigFilterList = [];
		index = 0;
		this.state.desigFilter.forEach(element => {
			desigFilterList.push(
				<div key={ index }>
					<div className="desig-filter-item" id={ element } data-desig={ element }>
						<div className="filter-text" id={ element + "-text" }>{ element }</div>
						<i className="fas fa-times" data-desig={ element } onClick={ this.handleDesigDelete }></i>
					</div>
				</div>
			);
			index += 1;
		})

		var background = [];
		if (this.props.location.transition === undefined) {
			background.push(
				<div className="bg-img-no-transition" key={0}>
	            	<img src={ bgImage } alt='background' />
	          	</div>
			);
		} else {
			background.push(
				<div className="bg-img" id="bg-img" key={0}>
	            	<img src={ bgImage } alt='background' />
	          	</div>
			);
		}

		var slow = (this.props.location.transition === undefined);

		return (
			<>
			<div className="wrapper">
				{ background }

				<div className={slow ? 'left-fast' : 'left-slow'} id='left'></div>
				<div className={slow ? 'right-fast' : 'right-slow'} id='right'>

				<div className='first-col'>
					<div className='add-filter' id='add-filter'>
						Filter your results
					</div>
					<div className="filter-menu" id="filter-menu">
						<div className="filter-wrapper" id="state-filter-wrapper" onClick={ this.handleStateCollapse }>
							<i className="fas fa-chevron-circle-right collapse-icon" id="state-collapse"></i>
							<div className="filter-button state-filter-button">
								<p className="noselect">Filter By State</p>
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
								<p className="noselect">Filter By Designation</p>
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
								<p className="noselect" id="search-filter">Search By Keyword</p>
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
				
				<div className="search-bar">
					<form onSubmit={ this.handleSearch }>
				    	<button type="submit" className="search-button">
				    		<i className="fas fa-search"></i>
				    	</button>
				    	<input type="text" className="search-input shadow-sm" id="search-input" 
				    			ref={(input) => this.textInput = input} placeholder="Find a park" />
					</form>
				</div>

				{ !this.state.loading && !this.state.error && 
					<div className="search-result" id="search-results">{ resultList }</div>
				}

				{ this.state.loading && 
					<div className='loading-page'>
						<div className='sun-loading'>
							<img src={ sunImage} alt='sun icon' id='sun-icon' />
							<div className='sun-eye' id='eye1'></div>
							<div className='sun-eye' id='eye2'></div>
							<div className='loading-text'>Loading</div>
							<div className='loading-dots'>
								<ReactLoading type={'bubbles'} color={'#FFC107'} height={22} width={22} />
							</div>
						</div>
					</div>
				}
				
				{ this.state.error && 
					<div className='error-page'>
						<div className='error-message'>
							<img src={ errorImage } alt='error' id='error-icon' />
							<span className='error-text'>ERROR</span>
							<span className='text-went-wrong'>Something went wrong</span>
							<div className='error-instr'>
								Try refreshing the page or come back later 	(｡•́︿•̀｡)
							</div>
						</div>
					</div>	
				}
				

				</div>

				</div>

			</>
		);
	}
}

export default Search;