import React, { Component } from 'react';
import './park.css';
import axios from 'axios';
import Campground from './campground.js';
import VisitorCenter from './visitorcenter.js';
import bgImage from './svg/new-landing-page.svg';
import backIcon from './svg/back-arrow.svg';
import ReactHtmlParser from 'react-html-parser';
import pawprintIcon from './svg/pawprint.svg';
import alertIcon from './svg/alarm.svg';
import cloudIcon from './svg/cloud.svg';
import mountainIcon from './svg/mountain.svg';
import ReactLoading from 'react-loading';
import DelayLink from './DelayLink.jsx';
import AttributionModal from './modal.js';

class Park extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.openNav = this.openNav.bind(this);
		this.closeNav = this.closeNav.bind(this);
		this.handleReturn = this.handleReturn.bind(this);
		this.returnToTop = this.returnToTop.bind(this);

		this.state = {
			campground: [],
			visitorcenter: [],
			park: [],
			events: [],
			articles: [],
			alerts: [],
			news: [],
			people: [],
			places: [],
			lessons: [],
			display: -1,
			campLoading: true,
			visitorLoading: true,
			parkLoading: true,
			eventLoading: true,
			articleLoading: true,
			alertLoading: true,
			newsLoading: true,
			peopleLoading: true,
			placeLoading: true,
			lessonLoading: true
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
				park: res.data.data[0],
				parkLoading: false
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
			// console.log(res.data.data);
			self.setState({
				campground: res.data.data,
				campLoading: false
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
			// console.log(res.data.data);
			self.setState({
				visitorcenter: res.data.data,
				visitorLoading: false
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
				articles: res.data.data,
				articleLoading: false
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
				news: res.data.data,
				newsLoading: false
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
			//console.log(res.data.data);
			self.setState({
				alerts: res.data.data,
				alertLoading: false
			})
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
			self.setState({
				events: res.data.data,
				eventLoading: false
			})
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
			//console.log(res.data.data);
			self.setState({
				people: res.data.data,
				peopleLoading: false
			});
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
			//console.log(res.data.data);
			self.setState({
				lessons: res.data.data,
				lessonLoading: false
			})
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
			//console.log(res.data.data);
			self.setState({
				places: res.data.data,
				placeLoading: false
			})
		})
		.catch(error => {
			console.log(error);
		});

	}

	componentWillUnmount() {
		document.getElementById('right-side').removeEventListener('scroll', this.handleScroll);
		
	}

	returnToTop(event) {
		document.getElementById('right-side').scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	handleScroll(event) {
		if (document.getElementById('right-side').scrollTop > window.innerHeight / 2) {
			document.getElementById('return-to-top').classList.add('visible');
		} else {
			document.getElementById('return-to-top').classList.remove('visible');
		}
	}

	openEvent(index, event) {
		document.getElementById('event-detail' + index).classList.remove('display-none');
		document.getElementById('event-list').classList.add('hide');
		document.getElementById('event-list').classList.remove('show');
		
		setTimeout(() => {
			document.getElementById('event-list').classList.add('display-none');
			document.getElementById('return-button2').classList.remove('hide');
			document.getElementById('event-detail' + index).classList.remove('hide');
			document.getElementById('event-detail' + index).classList.add('show');
		}, 250);

		this.setState({
			display: index
		});
	}

	handleClick(event) {
		this.forceUpdate();
	}

	handleReturn(evnet) {
		document.getElementById('event-detail' + this.state.display).classList.remove('show');
		document.getElementById('event-detail' + this.state.display).classList.add('hide');
		document.getElementById('return-button2').classList.add('hide');
		
		setTimeout(() => {
			document.getElementById('event-detail' + this.state.display).classList.add('display-none');
			document.getElementById('event-list').classList.remove('display-none');
			document.getElementById('event-list').classList.add('show');
			document.getElementById('event-list').classList.remove('hide');
		}, 250);
	}


	componentDidMount() {
		document.getElementById('right-side').addEventListener('scroll', this.handleScroll);
		setTimeout(() => {
			document.getElementById('left-side').classList.add('left-show');
			document.getElementById('right-side').classList.add('right-show');
		}, 10);
	}

	openNav() {
		document.getElementById('left-side').classList.remove('left-show');
		document.getElementById('side-nav').classList.add('side-nav-show');
	}

	closeNav() {
		document.getElementById('side-nav').classList.remove('side-nav-show');
		document.getElementById('left-side').classList.add('left-show');
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

		var eventList = [];
		var eventDetail = [];
		this.state.events.forEach((element, index) => {
			var eventTag = [];
			element.tags.forEach((e, i) => {
				eventTag.push(
					<div className='event-tag' key={ i }>{ e }</div>
				);
			})
			eventList.push(
				<div className='park-event' id={ 'park-event' + index } key={ index }>
					{ element.images.length !== 0 &&
						<div>
							<div className='event-image'>
							<img src={ "https://www.nps.gov/" + element.images[0].url } alt={ element.images[0].altText } />
							{ element.images[0].caption !== "" &&
								<p className='event-caption'>{ element.images[0].caption }</p>
							}
							{ element.images[0].credit !== "" &&
								<p className='event-credit'>Credit: { element.images[0].credit }</p>
							}
							</div>
						</div>
					}
					
					<div className='event-text'>
						<p className='event-title'>{ element.title }</p>
						{ element.types.length !== 0 &&
							<p className='event-type'>{ element.types.join(', ') }</p>
						}
						{ element.location !== "" &&
							<p className='event-location'>
								<span><i className="fas fa-map-marker-alt mr-2"></i></span>
								{ element.location }
							</p>
						}
						<p className='event-time'>
							<span><i className="far fa-calendar-alt mr-2"></i></span>
							<span>{ element.datestart }</span>
							{ element.datestart !== element.dateend && 
								<span> to { element.dateend }</span>
							}
							{ element.times.length !== 0 && 
								<span className='event-time-text'>
									<span><i className="far fa-clock mr-2"></i></span>
									{ element.times[0].timestart } - { element.times[0].timeend }
								</span>
							}
						</p>
						{ element.tags.length !== 0 && 
							<div className='tag-list'>
								<span className='tag-text'>Tags: </span>
								{ eventTag }
							</div>
						}
						<p className='more-detail-btn' onClick={ this.openEvent.bind(this, index) }>
							More detail
							<i className="fas fa-angle-double-right double-right-icon"></i>
						</p>
					</div>
				</div>
			);

			eventDetail.push(
				<div className='event-detail hide display-none' id={ 'event-detail' + index } key={ index }>
					<p className='event-detail-title'>{ element.title }</p>
					{ element.types.length !== 0 && 
						<p className='event-detail-types'>{ element.types.join(', ') }</p>
					}

					{ element.isfree === "true" && 
						<span className='has-border text-free'>Free</span>
					}
					{ element.isallday === "true" && 
						<span className='has-border text-all-day'>All Day</span>
					}
					{ element.isrecurring === "true" && 
						<span className='has-border text-recur'>Recurring</span>
					}
					{ element.isregresrequired === "true" && 
						<span className='has-border text-regres'>Registration or reservation required</span>
					}

					<div className='when-where'>
					{ element.location !== "" &&
						<p className='event-location'>
							<span className='bold-text text-location'>Location: </span>
							{ element.location }
						</p>
					}
					<p className='event-detail-date'>
						<span className='bold-text text-date'>Date: </span>
						<span>{ element.datestart }</span>
						{ element.datestart !== element.dateend && 
							<span> to { element.dateend }</span>
						}
					</p>
					<p className='event-detail-time'>
						{ element.times.length !== 0 && 
							<span className='text-time'>
								<span className='bold-text'>Time: </span>
								{ element.times[0].timestart } - { element.times[0].timeend }
							</span>
						}
					</p>
					<p className='event-time-info'>
						{ element.timeinfo !== "" && 
							<span>
								<span className='bold-text'>Note: </span>
								<span>{ element.timeinfo }</span>
							</span>
						}
					</p>
					{ element.feeinfo !== "" && 
						<p>
							<span className='bold-text'>Fee: </span>
							{ element.feeinfo }
						</p>
					}
					</div>					


					<div className='event-descr'>
						<p className='event-description'>Event description</p>
						<div className='event-descr-text'>{ ReactHtmlParser(element.description) }</div>
						{ element.infourl !== "" && 
							<div>
								<a href={ element.infourl } target='_blank' rel="noopener noreferrer">
									<i className="fas fa-info-circle mr-2"></i>More information
								</a>
							</div>
						}
					</div>
					
					<div>
					{ element.regresinfo !== "" && 
						<div className='event-regres'>
							<p className='regres-text'>Registration & Reservation</p>
							<p className='regres-info'>{ element.regresinfo }</p>
							{ element.regresurl !== "" && 
								<a href={ element.regresurl } target='_blank' rel="noopener noreferrer">
									<i className="fas fa-info-circle mr-2"></i>More information
								</a>
							}
						</div>
					}
					</div>

					<div className='event-contact'>
						<p className='contact-text'>Contact</p>	
						{ element.contactname !== "" && 
							<p className='contact-name'>
								<span className='contact-name-icon'><i className="fas fa-id-card-alt"></i></span>
								{ element.contactname }
							</p>
						}
						{ element.contactemailaddress !== "" && 
							<a href={ "mailto:" + element.contactemailaddress } target='_blank' 
								rel="noopener noreferrer" className='contact-email-text'>
								<span className='contact-email-icon'><i className="fas fa-envelope"></i></span>
								<span className='contact-email'>{ element.contactemailaddress }</span>
							</a>
						}
						{ element.contacttelephonenumber !== "" && 
							<p>
								<span className='contact-phone-icon'><i className="fas fa-phone"></i></span>
								{ element.contacttelephonenumber }
							</p>
						}
					</div>
					
					
				</div>
			);
		})

		var peopleList = [];
		// console.log(this.state.people);
		this.state.people.forEach((element, index) => {
			peopleList.push(
				<div className='park-people' key={ index }>
					<p className='people-title'>{ element.title }</p>
					<div className='people-detail'>
						{ (element.images.length !== 0 && element.images[0].url !== "") ?  
						<div>
							<div className='people-image'>
								<img src={ element.images[0].url} alt={ element.images[0].altText } />
								{ element.images[0].caption !== "" && 
									<p className='people-caption'>{ element.images[0].caption }</p>
								}

								{ element.images[0].credit !== "" && 
									<p className='people-credit'>Credit: { element.images[0].credit }</p>
								}
							</div>
						</div> : 
						<div className='people-image'>
							<div className="placeholder-img">No Image Available</div>
						</div>
						}
						<div className='people-descr'>
							<p className='listing-descr'>{ element.listingDescription }</p>
							<p>Quick Facts: </p>
							<ul id="quick-fact-list">
								{ element.quickFacts.map((fact, idx) => (
									<li key={idx}>{fact.name}: {fact.value}</li>
								))}
							</ul>
							
							<a href={ element.url } target='_blank' rel="noopener noreferrer" className='people-url'>Read more</a>
						</div>
					</div>
				</div>
			);
		})

		var placeList = [];
		// console.log(this.state.places);
		this.state.places.forEach((element, index) => {
			placeList.push(
				<div className='park-place' key={ index }>
					<p className='place-title'>{ element.title }</p>
					<div className='place-detail'>
						{ element.images.length !== 0 && element.images[0].url !== "" ? 
						<div>
							<div className='place-image'>
								<img src={ element.images[0].url } alt={ element.images[0].altText } />
								{ element.images[0].caption !== "" && 
									<p className='place-caption'>{ element.images[0].caption }</p>
								}

								{ element.images[0].credit !== "" && 
									<p className='place-credit'>Credit: { element.images[0].credit }</p>
								}
							</div>
						</div> : 
						<div className='place-image'>
							<div className="placeholder-img">No Image Available</div>
						</div>
						}
						<div className='place-descr'>
							<p className='listing-descr'>{ element.listingDescription }</p>
							{ element.quickFacts.length !== 0 && <p>Quick Facts: </p> }
							<ul>
								{ element.quickFacts.map((fact, idx) => 
									<li key={idx}>{fact.name}: {fact.value}</li>
								)}
							</ul>
							<a href={ element.url } target='_blank' rel="noopener noreferrer" className='place-url'>Read more</a>
						</div>
					</div>
				</div>
			);
		})

		var lessonList = [];
		// console.log(this.state.lessons);
		this.state.lessons.forEach((element, index) => {
			var subjectList = [];
			element.subject.forEach((e, i) => {
				if (e === 'Science') {
					subjectList.push(
						<span className='has-border subject-item subject-science' key={ i }>{ e }</span>
					);
				} else if (e === 'Math') {
					subjectList.push(
						<span className='has-border subject-item subject-math' key={ i }>{ e }</span>
					);
				} else if (e === 'Social Studies') {
					subjectList.push(
						<span className='has-border subject-item subject-social' key={ i }>{ e }</span>
					);
				} else if (e === 'Literacy and Language Arts') {
					subjectList.push(
						<span className='has-border subject-item subject-ela' key={ i }>{ e }</span>
					);
				} else {
					subjectList.push(
						<span className='has-border subject-item subject-else' key={ i }>{ e }</span>
					);
				}
			})

			lessonList.push(
				<div className='park-lesson' key={ index }>
					<p className='lesson-title'>{ element.title }</p>
					<div className='lesson-detail'>
						<p className='lesson-subject'>
							<span className='bold-text'>Subject: </span>
							{ subjectList }
						</p>
						
						<p className='lesson-duration'>
							<span className='bold-text'>Duration: </span>
							{ element.duration }
						</p>
						<p className='lesson-gradelevel'>
							<span className='bold-text'>Grade level: </span>
							{ element.gradeLevel }
						</p>
						<div className='lesson-questionobjective'>
							<span className='bold-text'>Objective</span>
							<br />
							<pre className='question-objective'>{ element.questionObjective }</pre>
						</div>
							  
						<div className='lesson-url'>
							<a href={ element.url } target='_blank' rel="noopener noreferrer">
								<i className="fas fa-info-circle lesson-info-icon"></i>
								More information
							</a>
						</div>
					
						
					</div>
				</div>
			);
		})
				

		var newsList = [];
		// console.log(this.state.news);
		this.state.news.forEach((element, index) => {
			newsList.push(
				<div className='park-news' key={ index }>
					<p className='news-title'>{ element.title }</p>
					<div className='news-detail'>
						{ element.image.url !== "" ? 
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
						</div> : 
						<div className='news-image'>
							<div className="placeholder-img">No Image Available</div>
						</div>
						}
						<div className='news-descr'>
							<p className='news-abstract'>{ element.abstract }</p>
							<p className='news-releasedate'>{ element.releaseDate }</p>
							<a href={ element.url } target='_blank' rel="noopener noreferrer" className='news-url'>Read more</a>
						</div>
					</div>
				</div>
			);
		})

		var articleList = [];
		// console.log(this.state.articles);
		this.state.articles.forEach((element, index) => {
			articleList.push(
				<div className='park-article' key={ index }>
					<p className='article-title'>{ element.title }</p>
					<div className='article-detail'>
						{ element.listingImage.url !== "" ?  
							<div>
								<div className='article-image'>
									<img src={ element.listingImage.url } alt={ element.listingImage.altText } />
								</div>
							</div> : 
							<div className='article-image'>
								<div className="placeholder-img">No Image Available</div>
							</div>
						}
						
						<div className='article-descr'>
							<p>{ element.listingDescription }</p>
							<a href={ element.url } target='_blank' rel="noopener noreferrer">Read more</a>
						</div>
					</div>
				</div>
			);
		})

		var cloudLoading = (
			<div className='cloud-loading-page'>
				<div className='cloud-loading'>
					<img src={ cloudIcon } alt='cloud icon' id='cloud-icon' />
					<img src={ mountainIcon } alt='mountain icon' id='mountain-icon' />
					<div className='cloud-loading-text'>Loading</div>
					<div className='cloud-loading-dots'>
						<ReactLoading type={'bubbles'} color={'#A3D4F7'} height={22} width={22} />
					</div>
				</div>
			</div>
		);

		return (
			<>
			<div className="wrapper">
				<div className="bg-img-no-transition" id='bg-img' key={0}>
	            	<img src={ bgImage } alt='background' />
	          	</div>


	          	<div className='side-nav-container' id='side-nav'>
					<div className='close-icon' onClick={ this.closeNav }>
						<i className="fas fa-times"></i>
					</div>
					<div className='side-nav-menu'>
						<DelayLink 
							delay={ 2900 }
							onDelayStart={() => {
								document.getElementById('bg-img').classList.add('bottom');

								document.getElementById('left-side').classList.remove('left-show');
								document.getElementById('right-side').classList.remove('right-show');
								document.getElementById('side-nav').classList.remove('side-nav-show');
							}}
							to="/" className='side-nav-link side-nav-home'>
							
							<span className='line-grow side-nav-item'>Home</span>
						</DelayLink>
						<DelayLink 
							delay={ 500 }
							onDelayStart={() => {
								document.getElementById('left-side').classList.remove('left-show');
								document.getElementById('right-side').classList.remove('right-show');
								document.getElementById('side-nav').classList.remove('side-nav-show');
							}}
							to='/search' className='side-nav-link side-nav-search'>
							
							<span className='line-grow side-nav-item'>Search</span>
						</DelayLink>
						<span className='side-nav-link side-nav-attr' data-toggle="modal" data-target="#attributionModal">
							<span className='line-grow side-nav-item'>Attribution</span>
						</span>
					</div>
				</div>

				<AttributionModal></AttributionModal>
				
				<div className='left-side' id='left-side'>
					<DelayLink 
						delay={ 500 }
						onDelayStart={() => {
							document.getElementById('left-side').classList.remove('left-show');
							document.getElementById('right-side').classList.remove('right-show');
						}}
						to="/search" id='back-icon' data-toggle="tooltip" data-placement="right" 
						title="Return to search">
						
						<img src={ backIcon } alt='return to previous page' />
					</DelayLink>

					<div className='nav-icon' onClick={ this.openNav }><i className="fas fa-bars"></i></div>
					
					<div className="navigation" onClick={ this.handleClick }>
						<ul className="nav flex-column" id="pills-tab" role="tablist">
						  <li className="nav-item mx-auto park-nav-item" id="nav-park">
						    <a className="nav-link active nav-option" id="pills-park-tab" data-toggle="pill" 
								href="#pills-park" role="tab" aria-controls="pills-park" 
								aria-selected="true"><span className='nav-tex line-grow'>Park Details</span></a>
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
				  <div className='return-to-top' id='return-to-top' onClick={ this.returnToTop }>
					<span className='top-arrow'><i className="fas fa-arrow-up"></i></span>
					<span className='top-bar'></span>
				  </div>

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
						  	{ this.state.parkLoading &&
						  		cloudLoading
						  	}
						  	{ !this.state.parkLoading &&
						  		<div className='basic-page'>
							  		<div className='park-fullname'>{ this.state.park.fullName }</div>
							  		<div className='state-desig'>
							  			<span className='park-state'>{ this.state.park.states }</span>
							  			<span className='park-desig'>{ this.state.park.designation }</span>
							  		</div>
							  		<p className='park-overview park-h4'>Overview</p>
							  		<p className='park-descr park-text'>{ this.state.park.description }</p>
							  		{ this.state.park.url !== "" &&
						  				<a href={ this.state.park.url } target="_blank" rel="noopener noreferrer">
						  					<i className="fas fa-info-circle link-icon"></i>
						  					<span className='more-info'>More information</span>
						  				</a>
							  		}

							  		<p className='park-h4'>Direction</p>
							  		<p className='park-direc park-text'>{ this.state.park.directionsInfo }</p>
							  		{ this.state.park.directionsUrl !== "" &&
						  				<a href={ this.state.park.directionsUrl } target="_blank" rel="noopener noreferrer">
						  					<i className="fas fa-info-circle link-icon"></i>
						  					<span className='more-info'>More information</span>
						  				</a>
							  		}
							  		
							  		<p className='park-h4 park-text'>Weather</p>
							  		<p className='park-weather pb-4'>{ this.state.park.weatherInfo }</p>
							  	</div>
						  	}
						  	
						  </div>
						  <div className="tab-pane fade" id="nav-alert" role="tabpanel" aria-labelledby="nav-alert-tab">
							  { this.state.alertLoading &&
							  	cloudLoading
							  }
							  { !this.state.alertLoading && 
							  	<div className='alert-page'>
							  		{ alertClosure.length !== 0 && 
								  		<p className='alert-head'>Park Closure</p>
							  		}
							  		{ alertClosure }
							  		{ alertCaution.length !== 0 && 
								  		<p className='alert-head'>Caution</p>
							  		}
							  		{ alertCaution }
							  		{ alertInfo.length !== 0 && 
								  		<p className='alert-head'>Information</p>
							  		}
							  		{ alertInfo }

							  		{ this.state.alerts.length === 0 && 
							  			<div className='no-event-page'>
						  					<div className='no-event'>
						  						<img src={ alertIcon } alt='alert' id='alert-icon' />
						  						<p className='no-alert-text'>No alert active</p>
						  					</div>
						  				</div>
							  		}
							  	</div>
							  }
						  </div>
						  <div className="tab-pane fade" id="nav-article" role="tabpanel" aria-labelledby="nav-article-tab">
						  	{ this.state.articleLoading &&
						  		cloudLoading
						  	}
						  	{ !this.state.articleLoading &&
						  		<div className='article-page'>
							  		{ this.state.articles.length !== 0 && 
							  			articleList 
							  		}
							  		{ this.state.articles.length === 0 && 
							  			<div className='no-event-page'>
						  					<div className='no-event'>
						  						<img src={ pawprintIcon } alt='paw print' id='paw-print-icon' />
						  						<p className='no-event-text'>No article found</p>
						  					</div>
						  				</div>
							  		}
							  	</div>	
						  	}
						  	
						  </div>
						  <div className="tab-pane fade" id="nav-news" role="tabpanel" aria-labelledby="nav-news-tab">
						  	{ this.state.newsLoading &&
						  		cloudLoading
						  	}
						  	{ !this.state.newsLoading && 
						  		<div className='news-page'>
							  		{ this.state.news.length !== 0 && 
							  			newsList 
							  		}
							  		{ this.state.news.length === 0 && 
							  			<div className='no-event-page'>
						  					<div className='no-event'>
						  						<img src={ pawprintIcon } alt='paw print' id='paw-print-icon' />
						  						<p className='no-event-text'>No news found</p>
						  					</div>
						  				</div>
							  		}
							  	</div>
						  	}
						  	
						  </div>
						</div>
					  </div>
					  
					  <div className="tab-pane fade" id="pills-thing" 
					  		role="tabpanel" aria-labelledby="pills-thing-tab">
					  	<nav className='thing-nav'>
						  <div className="nav nav-tabs" id="nav-tab" role="tablist">
						    <a className="nav-item nav-link active" id="nav-event-tab" data-toggle="tab" href="#nav-event" role="tab" aria-controls="nav-event" aria-selected="true">Events</a>
						    <a className="nav-item nav-link" id="nav-place-tab" data-toggle="tab" href="#nav-place" role="tab" aria-controls="nav-place" aria-selected="false">Places</a>
						    <a className="nav-item nav-link" id="nav-people-tab" data-toggle="tab" href="#nav-people" role="tab" aria-controls="nav-people" aria-selected="false">People</a>
						    <a className="nav-item nav-link" id="nav-lesson-tab" data-toggle="tab" href="#nav-lesson" role="tab" aria-controls="nav-lesson" aria-selected="false">Lessons</a>
						  </div>
						</nav>
						<div className="tab-content" id="nav-tabContent">
						  <div className="tab-pane fade show active" id="nav-event" role="tabpanel" aria-labelledby="nav-event-tab">
						  	{ this.state.eventLoading && 
						  		cloudLoading
						  	}
						  	{ !this.state.eventLoading && 
						  		<div className='event-page'>
							  		<div className='event-list show' id='event-list'>
							  			{ this.state.events.length !== 0 &&
							  				eventList
							  			}
							  			{ this.state.events.length === 0 &&
							  				<div className='no-event-page'>
							  					<div className='no-event'>
							  						<img src={ pawprintIcon } alt='paw print' id='paw-print-icon' />
							  						<p className='no-event-text'>No event found</p>
							  					</div>
							  				</div>
							  			}
							  		</div>
							  		<div className='event-detail-wrapper' id='event-detail-wrapper'>
							  			<i className="fas fa-angle-double-left return-button2 hide" id='return-button2' onClick={ this.handleReturn }></i>
							  			{ eventDetail }
							  		</div>
							  	</div>
						  	}						  	
						  </div>
						  <div className="tab-pane fade" id="nav-place" role="tabpanel" aria-labelledby="nav-place-tab">
						  	{ this.state.placeLoading && 
						  		cloudLoading
						  	}
						  	{ !this.state.placeLoading && 
						  		<div className='place-page'>
							  		{ this.state.places.length !== 0 && 
							  			placeList
							  		}
							  		{ this.state.places.length === 0 && 
							  			<div className='no-event-page'>
						  					<div className='no-event'>
						  						<img src={ pawprintIcon } alt='paw print' id='paw-print-icon' />
						  						<p className='no-event-text'>No place found</p>
						  					</div>
						  				</div>
							  		}
							  	</div>
						  	}						  	
						  </div>
						  <div className="tab-pane fade" id="nav-people" role="tabpanel" aria-labelledby="nav-people-tab">
						  	{ this.state.peopleLoading && 
						  		cloudLoading
						  	}
						  	{ !this.state.peopleLoading && 
						  		<div className='people-page'>
							  		{ this.state.people.length !== 0 && 
							  			peopleList
							  		}
							  		{ this.state.people.length === 0 &&
							  			<div className='no-event-page'>
						  					<div className='no-event'>
						  						<img src={ pawprintIcon } alt='paw print' id='paw-print-icon' />
						  						<p className='no-event-text'>No people found</p>
						  					</div>
						  				</div>
							  		}
							  	</div>
						  	}
						  	
						  </div>
						  <div className="tab-pane fade" id="nav-lesson" role="tabpanel" aria-labelledby="nav-lesson-tab">
						  	{ this.state.lessonLoading && 
						  		cloudLoading
						  	}
						  	{ !this.state.lessonLoading && 
						  		<div className='lesson-page'>
							  		{ this.state.lessons.length !== 0 && 
							  			lessonList
							  		}
							  		{ this.state.lessons.length === 0 && 
							  			<div className='no-event-page'>
						  					<div className='no-event'>
						  						<img src={ pawprintIcon } alt='paw print' id='paw-print-icon' />
						  						<p className='no-event-text'>No lesson found</p>
						  					</div>
						  				</div>
							  		}
							  	</div>
						  	}
						  </div>
						</div>
					  </div>

					  <div className="tab-pane fade" id="pills-camp" 
					  		role="tabpanel" aria-labelledby="pills-camp-tab">
					  		{ this.state.campLoading && 
					  			cloudLoading
					  		}
					  		{ !this.state.campLoading && 
								<Campground data={ this.state.campground }></Campground>
					  		}
					  </div>
					  
					  <div className="tab-pane fade" id="pills-visitor" 
					  		role="tabpanel" aria-labelledby="pills-visitor-tab">
					  		{ this.state.visitorLoading && 
					  			cloudLoading
					  		}
					  		{ !this.state.visitorLoading && 
					  			<VisitorCenter data={ this.state.visitorcenter }></VisitorCenter>
					  		}
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