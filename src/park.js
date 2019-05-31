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


	render() {

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
						<div>
							<div className='article-image'>
								<img src={ element.listingimage.url } alt={ element.listingimage.altText } />
							</div>
						</div>
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

				  <div className='park-page'>
					<div className="tab-content" id="pills-tabContent">
					  <div className="tab-pane fade show active" id="pills-park" 
					  		role="tabpanel" aria-labelledby="pills-park-tab">
					  	
					  	<nav className='park-nav'>
						  <div className="nav nav-tabs" id="nav-tab" role="tablist">
						    <a className="nav-item nav-link active" id="nav-basic-tab" data-toggle="tab" href="#nav-basic" role="tab" aria-controls="nav-basic" aria-selected="true">Basic Info</a>
						    <a className="nav-item nav-link" id="nav-alert-tab" data-toggle="tab" href="#nav-alert" role="tab" aria-controls="nav-alert" aria-selected="false">Alerts</a>
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
						  	This is alerts
						  </div>
						  <div className="tab-pane fade" id="nav-article" role="tabpanel" aria-labelledby="nav-article-tab">
						  	<div className='article-page'>{ articleList }</div>
						  </div>
						  <div className="tab-pane fade" id="nav-news" role="tabpanel" aria-labelledby="nav-news-tab">
						  	<div className='news-page'>{ newsList }</div>
						  </div>
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