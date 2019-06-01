import React, { Component } from 'react';
import './park.css';
import axios from 'axios';
import Campground from './campground.js';
import VisitorCenter from './visitorcenter.js';
import bgImage from './new-landing-page.svg';
import backIcon from './svg/back-arrow.svg';
import { NavLink } from 'react-router-dom';

class Park extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.openNav = this.openNav.bind(this);
		this.closeNav = this.closeNav.bind(this);

		this.state = {
			campground: [],
			visitorcenter: [],
			park: [],
			events: [],
			articles: [],
			alerts: [],
			news: []
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
			//console.log(res.data.data[0]);
			self.setState({
				park: res.data.data[0]
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


		// get articles
		axios.get("https://developer.nps.gov/api/v1/articles", {
			params: {
				parkCode: this.props.match.params.parkCode,
				limit: 19,
				api_key: process.env.REACT_APP_API_KEY
			}
		})
		.then(res => {
			//console.log(res.data.data);
			self.setState({
				articles: res.data.data
			})
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
			//console.log(res.data.data);
			self.setState({
				news: res.data.data
			})

		})
		.catch(error => {
			console.log(error);
		});

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
			self.setState({
				alerts: res.data.data
			})
		})
		.catch(error => {
			console.log(error);
		});


/*
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
			self.setState({
				events: res.data.data
			})
		})
		.catch(error => {
			console.log(error);
		});
*/

		
	/*
		

		
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


	componentDidMount() {
		setTimeout(() => {
			document.getElementById('left-side').classList.add('left-show');
			document.getElementById('right-side').classList.add('right-show');
		}, 10);
	}

	openNav() {
		document.getElementById('left-side').classList.remove('left-show');
		setTimeout(() => {
			document.getElementById('side-nav').classList.add('side-nav-show');
		}, 500);
	}

	closeNav() {
		document.getElementById('side-nav').classList.remove('side-nav-show');
		setTimeout(() => {
			document.getElementById('left-side').classList.add('left-show');
		}, 700);
	}


	render() {
		var alertClosure = [];
		var alertCaution = [];
		var alertInfo = [];
		this.state.alerts.forEach((element, index) => {
			if (element.category === "Park Closure") {
				alertClosure.push(
					<div key={ index } className='alert-detail'>
						<div className='alert-left'>
							<img src="https://img.icons8.com/office/40/000000/no-entry.png" alt='no-entry icon' />
						</div>
						<div className='alert-right'>
							<p className='alert-title title-closure'>{ element.title }</p>
							<p className='alert-descr'>{ element.description }</p>
							<a href={ element.url } target='_blank' rel="noopener noreferrer" className='alert-url'>Learn more</a>
						</div>
					</div>
				);
			} else if (element.category === "Caution") {
				alertCaution.push(
					<div key={ index } className='alert-detail'>
						<div className='alert-left'>
							<img src="https://img.icons8.com/office/40/000000/error.png" alt='caution icon' />
						</div>
						<div className='alert-right'>
							<p className='alert-title title-caution'>{ element.title }</p>
							<p className='alert-descr'>{ element.description }</p>
							<a href={ element.url } target='_blank' rel="noopener noreferrer" className='alert-url'>Learn more</a>
						</div>
					</div>
				);
			} else if (element.category === "Information") {
				alertInfo.push(
					<div key={ index } className='alert-detail'>
						<div className='alert-left'>
							<img src="https://img.icons8.com/office/40/000000/info.png" alt='more-info icon' />
						</div>
						<div className='alert-right'>
							<p className='alert-title title-info'>{ element.title }</p>
							<p className='alert-descr'>{ element.description }</p>
							<a href={ element.url } target='_blank' rel="noopener noreferrer" className='alert-url'>Learn more</a>
						</div>
					</div>
				);
			}
		})

		var newsList = [];
		this.state.news.forEach((element, index) => {
			newsList.push(
				<div className='park-news' key={ index }>
					<p className='news-title'>{ element.title }</p>
					<div className='news-detail'>
						{ element.image.url !== "" && 
						<div>
							<div className='news-image'>
								<img src={ element.image.url} alt={ element.image.altText } />
								{ element.image.caption !== "" && 
									<p className='news-caption'>{ element.image.caption }</p>
								}

								{ element.image.credit !== "" && 
									<p className='news-credit'>Credit: { element.image.credit }</p>
								}
							</div>
						</div>
						}
						<div className='news-descr'>
							<p className='news-abstract'>{ element.abstract }</p>
							<p className='news-releasedate'>{ element.releasedate }</p>
							<a href={ element.url } target='_blank' rel="noopener noreferrer" className='news-url'>Read more</a>
						</div>
					</div>
				</div>
			);
		})

		var articleList = [];
		this.state.articles.forEach((element, index) => {
			articleList.push(
				<div className='park-article' key={ index }>
					<p className='article-title'>{ element.title }</p>
					<div className='article-detail'>
						{ element.listingimage.url !== "" && 
							<div>
								<div className='article-image'>
									<img src={ element.listingimage.url } alt={ element.listingimage.altText } />
								</div>
							</div>
						}
						
						<div className='article-descr'>
							<p>{ element.listingdescription }</p>
							<a href={ element.url } target='_blank' rel="noopener noreferrer">Read more</a>
						</div>
					</div>
				</div>
			);
		})

		return (
			<>
			<div className="wrapper">
				<div className="bg-img-no-transition" key={0}>
	            	<img src={ bgImage } alt='background' />
	          	</div>


	          	<div className='side-nav-container' id='side-nav'>
					<div className='close-icon' onClick={ this.closeNav }>
						<i className="fas fa-times"></i>
					</div>
					<div className='side-nav-menu'>
						<NavLink to="/" className='side-nav-link side-nav-home'>
							<span className='line-grow side-nav-item'>Home</span>
						</NavLink>
						<NavLink to='/search' className='side-nav-link side-nav-search'>
							<span className='line-grow side-nav-item'>Search</span>
						</NavLink>
						<span className='side-nav-link side-nav-attr'>
							<span className='line-grow side-nav-item'>Attribution</span>
						</span>
					</div>
				</div>

				<div className='left-side' id='left-side'>
					<NavLink to="/search" id='back-icon' data-toggle="tooltip" data-placement="right" title="Return to search">
						<img src={ backIcon } alt='return to previous page' />
					</NavLink>

					<div className='nav-icon' onClick={ this.openNav }><i className="fas fa-bars"></i></div>
					
					<div className="navigation" onClick={ this.handleClick }>
						<ul className="nav flex-column" id="pills-tab" role="tablist">
						  <li className="nav-item mx-auto park-nav-item" id="nav-park">
						    <a className="nav-link active nav-option" id="pills-park-tab" data-toggle="pill" 
								href="#pills-park" role="tab" aria-controls="pills-park" 
								aria-selected="true"><span className='nav-tex line-grow'>Park Detail</span></a>
						  </li>
						  <li className="nav-item mx-auto park-nav-item" id="nav-thing">
						    <a className="nav-link nav-option" id="pills-thing-tab" data-toggle="pill" 
						    	href="#pills-thing" role="tab" aria-controls="pills-thing" 
						    	aria-selected="false"><span className='nav-tex line-grow'>Things To Do</span></a>
						  </li>
						  <li className="nav-item mx-auto park-nav-item" id="nav-camp">
						    <a className="nav-link nav-option" id="pills-camp-tab" data-toggle="pill" 
						    	href="#pills-camp" role="tab" aria-controls="pills-camp" 
						    	aria-selected="false"><span className='nav-tex line-grow'>Campgrounds</span></a>
						  </li>
						  <li className="nav-item mx-auto park-nav-item" id="nav-visitor">
						    <a className="nav-link nav-option" id="pills-visitor-tab" data-toggle="pill" 
						    	href="#pills-visitor" role="tab" aria-controls="pills-visitor" 
						    	aria-selected="false"><span className='nav-tex line-grow'>Visitor Centers</span></a>
						  </li>
						</ul>
					</div>



				</div>
				<div className='right-side' id='right-side'>

				  <div className='park-page'>
					<div className="tab-content" id="pills-tabContent">
					  <div className="tab-pane fade show active" id="pills-park" 
					  		role="tabpanel" aria-labelledby="pills-park-tab">
					  	
					  	<nav className='park-nav'>
						  <div className="nav nav-tabs" id="nav-tab" role="tablist">
						    <a className="nav-item nav-link active" id="nav-basic-tab" data-toggle="tab" href="#nav-basic" role="tab" aria-controls="nav-basic" aria-selected="true">Basic Info</a>
						    <a className="nav-item nav-link" id="nav-alert-tab" data-toggle="tab" href="#nav-alert" role="tab" aria-controls="nav-alert" aria-selected="false">
						    	Alerts
						    	{ this.state.alerts.length !== 0 && 
						    		<i className="fas fa-exclamation-circle alert-icon"></i>
						    	}
						    	
						    </a>
						    <a className="nav-item nav-link" id="nav-article-tab" data-toggle="tab" href="#nav-article" role="tab" aria-controls="nav-article" aria-selected="false">Articles</a>
						    <a className="nav-item nav-link" id="nav-news-tab" data-toggle="tab" href="#nav-news" role="tab" aria-controls="nav-news" aria-selected="false">News</a>
						  </div>
						</nav>
						<div className="tab-content" id="nav-tabContent">
						  <div className="tab-pane fade show active" id="nav-basic" role="tabpanel" aria-labelledby="nav-basic-tab">
						  	<div className='basic-page'>
						  		<div className='park-fullname'>{ this.state.park.fullName }</div>
						  		<div className='state-desig'>
						  			<span className='park-state'>{ this.state.park.states }</span>
						  			<span className='park-desig'>{ this.state.park.designation }</span>
						  		</div>
						  		<h4 className='park-overview park-h4'>Overview</h4>
						  		<p className='park-descr park-text'>{ this.state.park.description }</p>
						  		{ this.state.park.url !== "" &&
						  			<p className='park-url'>
						  				<span className='mr-2 more-info'>More information at</span>
						  				<a href={ this.state.park.url } target="_blank" rel="noopener noreferrer">
						  					{ this.state.park.url }
						  					<span className='park-link'>
						  						<i className="fas fa-external-link-alt link-icon"></i>
						  					</span>
						  				</a>
						  			</p>
						  		}

						  		<h4 className='park-h4'>Direction</h4>
						  		<p className='park-direc park-text'>{ this.state.park.directionsInfo }</p>
						  		{ this.state.park.directionsUrl !== "" &&
						  			<div className='park-dire-url'>
						  				<span className='mr-2 more-info'>More information at</span>
						  				<a href={ this.state.park.directionsUrl } target="_blank" rel="noopener noreferrer">
						  					{ this.state.park.directionsUrl }
						  					<span className='park-link'>
						  						<i className="fas fa-external-link-alt link-icon"></i>
						  					</span>
						  				</a>
						  			</div>
						  		}
						  		
						  		<h4 className='park-h4 park-text'>Weather</h4>
						  		<p className='park-weather pb-4'>{ this.state.park.weatherInfo }</p>
						  	</div>
						  </div>
						  <div className="tab-pane fade" id="nav-alert" role="tabpanel" aria-labelledby="nav-alert-tab">
						  	<div className='alert-page'>
						  		{ alertClosure.length !== 0 && 
							  		<h3 className='alert-head'>Park Closure</h3>
						  		}
						  		{ alertClosure }
						  		{ alertCaution.length !== 0 && 
							  		<h3 className='alert-head'>Caution</h3>
						  		}
						  		{ alertCaution }
						  		{ alertInfo.length !== 0 && 
							  		<h3 className='alert-head'>Information</h3>
						  		}
						  		{ alertInfo }
						  	</div>
						  </div>
						  <div className="tab-pane fade" id="nav-article" role="tabpanel" aria-labelledby="nav-article-tab">
						  	<div className='article-page'>{ articleList }</div>
						  </div>
						  <div className="tab-pane fade" id="nav-news" role="tabpanel" aria-labelledby="nav-news-tab">
						  	<div className='news-page'>{ newsList }</div>
						  </div>
						</div>
					  </div>
					  
					  <div className="tab-pane fade" id="pills-thing" 
					  		role="tabpanel" aria-labelledby="pills-thing-tab">
					  	<nav className='thing-nav'>
						  <div class="nav nav-tabs" id="nav-tab" role="tablist">
						    <a class="nav-item nav-link active" id="nav-event-tab" data-toggle="tab" href="#nav-event" role="tab" aria-controls="nav-event" aria-selected="true">Events</a>
						    <a class="nav-item nav-link" id="nav-place-tab" data-toggle="tab" href="#nav-place" role="tab" aria-controls="nav-place" aria-selected="false">Places</a>
						    <a class="nav-item nav-link" id="nav-people-tab" data-toggle="tab" href="#nav-people" role="tab" aria-controls="nav-people" aria-selected="false">People</a>
						    <a class="nav-item nav-link" id="nav-lesson-tab" data-toggle="tab" href="#nav-lesson" role="tab" aria-controls="nav-lesson" aria-selected="false">Lessons</a>
						  </div>
						</nav>
						<div class="tab-content" id="nav-tabContent">
						  <div class="tab-pane fade show active" id="nav-event" role="tabpanel" aria-labelledby="nav-event-tab">This is the event page</div>
						  <div class="tab-pane fade" id="nav-place" role="tabpanel" aria-labelledby="nav-place-tab">This is the place page</div>
						  <div class="tab-pane fade" id="nav-people" role="tabpanel" aria-labelledby="nav-people-tab">This is the people page</div>
						  <div class="tab-pane fade" id="nav-lesson" role="tabpanel" aria-labelledby="nav-lesson-tab">This is the lesson page</div>
						</div>
					  </div>

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

			</div>
			</>
		);
	}
}

export default Park;