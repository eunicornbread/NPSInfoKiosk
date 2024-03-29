import React, { Component } from 'react';
import './campground.css';
import telephoneIcon from './svg/telephone-black-18.svg';
import campsiteIcon from './svg/campsite-black-18.svg';
import fireGrateIcon from './svg/fire-grate-black-22.svg';
import wheelchairIcon from './svg/wheelchair-accessible-black-18.svg';
import wifiIcon from './svg/wi-fi-black-18.svg';
import carIcon from './svg/automobiles-black-22.svg';
import infoIcon from './svg/information-black-18.svg';
import directionIcon from './svg/directions-black-22.svg';
import campgroundIcon from './svg/campground-black-18.svg';
import reservationIcon from './svg/reservations-black-22.svg';
import campingIcon from './svg/camping-tent.svg';

class Campground extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: -1
		}
		this.handleReturn = this.handleReturn.bind(this);
	}

	handleReturn(event) {
		document.getElementById('camp-list').classList.remove('display-none');
		document.getElementById('return-button').classList.add('hide');
		document.getElementById('camp-' + this.state.display).classList.remove('show');
		document.getElementById('camp-' + this.state.display).classList.add('hide');
		
		setTimeout(() => {
			document.getElementById('camp-' + this.state.display).classList.add('display-none');
			document.getElementById('camp-list').classList.add('show');
			document.getElementById('camp-list').classList.remove('hide');
		
		}, 250);
	}

	handleClick(index, event) {
		document.getElementById('camp-' + index).classList.remove('display-none');
		document.getElementById('camp-list').classList.add('hide');
		document.getElementById('camp-list').classList.remove('show');
		
		setTimeout(() => {
			document.getElementById('camp-list').classList.add('display-none');
			document.getElementById('camp-' + index).classList.remove('hide');
			document.getElementById('camp-' + index).classList.add('show');
			document.getElementById('return-button').classList.remove('hide');
		}, 250);
		this.setState({
			display: index
		});
	}

	render() {
		//console.log(this.props.data);
		if (this.props.data.length === 0) {
			return (
				<div className='no-camp-page'>
					<div className='no-camp'>
						<img src={ campingIcon } alt='camping tent' id='camping-icon' />
						<p className='no-camp-text'>No campground available :(</p>
					</div>
				</div>
			);
		}

		// Modal and navigation setup
		var campList = [];
		var campDetail = [];

		this.props.data.forEach((element, index) => {

			// Info about the campground
			var campInfo = [];
			
			if (element.description === "") {
				campInfo.push(
					<p id='description' key={0}>No Description</p>
				);
			} else {
				campInfo.push(
					<p id='description' key={0}>{ element.description }</p>
				);
			}

			campInfo.push(
				<h3 key={1}>
					Direction
					<img src={ directionIcon } alt='direction icon' id='direction-icon' />
				</h3>
			);

			campInfo.push(
				<ul key={2}>
					<li>
						<p className='info-title'>Direction Overview</p>
						{ element.directionsOverview === "" ? 
							<p id='direction-overview' className='info-detail'>None</p>
							: <p id='direction-overview' className='info-detail'>{ element.directionsOverview }</p>
						}
					</li>
					<li>
						<p className='info-title'>Direction URL</p>
						{ element.directionsUrl === "" ? 
							<p id='direction-url' key={5} className='info-detail'>None</p> : 
							<p>
								<a href={ element.directionsUrl } target="_blank" rel="noopener noreferrer" id='direction-url' key={5} className='info-detail'>
									{ element.directionsUrl }
									<span><i className="fas fa-external-link-alt link-icon"></i></span>
								</a>
							</p>
						}
					</li>
					<li>
						<p className='info-title'>Longitude & Latitude</p>
						{ element.latLong === "" ? 
							<p id='lat-long' key={7} className='info-detail'>None</p> : 
							<p id='lat-long' key={7} className='info-detail'>Latitude: { element.latitude }, Longitude: { element.longitude }</p>
						}
					</li>
				</ul>
			);

			campInfo.push(
				<h3 key={8}>
					Regulation
					<span>
						<i className="fas fa-info-circle inform-icon"></i>
					</span>
				</h3>
			);

			campInfo.push(
				<ul key={3}>
					<li>
						<p className='info-title'>Regulation Overview</p>
						{ element.regulationsOverview === "" ? 
							<p id='regulation-overview' className='info-detail'>None</p> :
							<p id='regulation-overview' className='info-detail'>
								{ element.regulationsOverview }
							</p>
						}
					</li>
					<li>
						<p className='info-title'>Regulation URL</p>
						{ element.regulationsurl === "" ? 
							<p id='regulation-url' className='info-detail'>None</p> : 
							<p>
								<a href={ element.regulationsurl } target="_blank" rel="noopener noreferrer"  id='regulation-url' className='info-detail'>
									{ element.regulationsurl }
									<span><i className="fas fa-external-link-alt link-icon"></i></span>
								</a>
							</p>
						}
					</li>
				</ul>
			);

			campInfo.push(
				<h3 key={13}>
					Reservation
					<img src={ reservationIcon } alt='reservation icon' id='reservation-icon' />
				</h3>
			);

			campInfo.push(
				<ul key={4}>
					<li>
						<p className='info-title'>Reservation Information</p>
						{ element.reservationInfo === "" ? 
							<p id='reservation-description' className='info-detail'>None</p> : 
							<p id='reservation-description' className='info-detail'>{ element.reservationInfo }</p>
						}
					</li>
					<li>
						<p className='info-title'>Reservation URL</p>
						{ element.reservationUrl === "" ? 
							<p id='reservation-url' className='info-detail'>None</p> : 
							<p>
								<a href={ element.reservationUrl } target="_blank" rel="noopener noreferrer"  id='reservation-url' className='info-detail'>
									{ element.reservationUrl }
									<span><i className="fas fa-external-link-alt link-icon"></i></span>
								</a>
							</p>
						}
					</li>
				</ul>
			);

			campInfo.push(
				<h3 key={22}>
					Weather
					<span><i className="fas fa-cloud-sun weather-icon"></i></span>
				</h3>
			);

			if (element.weatherOverview === "") {
				campInfo.push(
					<p id='weather-overview' key={23}>No Overview</p>
				);
			} else {
				campInfo.push(
					<p id='weather-overview' key={23}>{ element.weatherOverview }</p>
				);
			}

			
			var campTab = (
				<div className='camp-tab'>
					<h3 id='name'>
						{ element.name }
						<img src={ campgroundIcon } alt='campground icon' id='campground-icon' />
					</h3>
					{ campInfo }
				</div>
			);

			// Info about accessibility
			var accessInfo = [];
			var accessData = element.accessibility;
			accessInfo.push(
				<h3 key={0} id='road-info'>
					<span className='info-header'>
						Road Info
						<i className="fas fa-road"></i>
					</span>
				</h3>
			);

			accessInfo.push(
				<ul key={1}>
					<li>
						<p className='road-title'>Road Access</p>
						{ accessData.accessRoads.length === 0 ? 
							<p>None</p>: 
							<p className='road-detail'>{ accessData.accessRoads[0] }</p>
						}
					</li>
					<li>
						<p className='road-title'>Road Info</p>
						<p className='road-detail'>{ accessData.adaInfo }</p>
					</li>
				</ul>
			);
			
			accessInfo.push(
				<h3 key={2}>
					<span className='info-header'>
						Cellphone Info
						<img src={ telephoneIcon } alt='telephone icon' id='phone-icon' />
					</span>

				</h3>
			);

			if (accessData.cellPhoneInfo === "") {
				accessInfo.push(
					<p key={3}>None</p>
				);
			} else {
				accessInfo.push(
					<p key={3}>{ accessData.cellPhoneInfo }</p>
				);	
			}

			accessInfo.push(
				<h3 key={4}>
					<span className='info-header'>
						Classification
						<img src={ campsiteIcon } alt='campsite icon' id='camp-icon' />
					</span>
				</h3>
			);

			if (accessData.classifications.length === 0) {
				accessInfo.push(
					<p key={5}>None</p>
				);
			} else {
				accessInfo.push(
					<p key={5}>{ accessData.classifications[0] }</p>
				);	
			}

			accessInfo.push(
				<h3 key={6}>
					<span className='info-header'>
						Fire Stove Policy
						<img src={ fireGrateIcon } alt="fire grate icon" id="fire-grate-icon" />
					</span>
				</h3>
			);

			if (accessData.fireStovePolicy === "") {
				accessInfo.push(
					<p key={7}>None</p>
				);
			} else {
				accessInfo.push(
					<p key={7}>{ accessData.fireStovePolicy }</p>
				);	
			}

			accessInfo.push(
				<h3 key={8}>
					<span className='info-header'>
						Internet Info
						<img src={ wifiIcon } alt='wifi icon' id='wifi-icon' />
					</span>
				</h3>
			);

			if (accessData.internetInfo === "") {
				accessInfo.push(
					<p key={9}>None</p>
				);
			} else {
				accessInfo.push(
					<p key={9}>{ accessData.internetInfo }</p>
				);	
			}

			accessInfo.push(
				<h3 key={10}>
					<span className='info-header'>
						Wheelchair Access
						<img src={ wheelchairIcon } alt='wheelchair icon' id='wheelchair-icon' />
					</span>
				</h3>
			);

			if (accessData.wheelchairAccess === "") {
				accessInfo.push(
					<p key={11}>None</p>
				);
			} else {
				accessInfo.push(
					<p key={11}>{ accessData.wheelchairAccess }</p>
				);	
			}

			accessInfo.push(
				<h3 key={12}>
					<span className='info-header'>
						Vehicle Info
						<img src={ carIcon } alt='car icon' id='car-icon' />
					</span>
				</h3>
			);

			accessInfo.push(
				<ul key={13}>
					<li>
						<p className='vehicle-group'>RV</p>
						<ul>
							<li>
								<p className='vehicle-info'>Number of RVs Allowed: { accessData.rvAllowed }</p>
							</li>
							<li>
								{ accessData.rvInfo === "" ? 
									<p className='vehicle-info'>RV Info: None</p> : 
									<p className='vehicle-info'>RV Info: { accessData.rvInfo }</p>
								}
							</li>
							<li>
								<p key={15} className='vehicle-info'>RV Maxlength: { accessData.rvMaxLength }</p>
							</li>
						</ul>
					</li>
					<li>
						<p className='vehicle-group'>Trailer</p>
						<ul>
							<li>
								<p className='vehicle-info'>Number of Trailers Allowed: { accessData.trailerAllowed } </p>
							</li>
							<li>
							<p key={17} className='vehicle-info'>Trailers Maxlength: { accessData.trailerMaxLength } </p>
							</li>
						</ul>
					</li>
				</ul>
			);


			accessInfo.push(
				<h3 key={20}>
					<span className='info-header'>
						Additional Info
						<img src={ infoIcon } alt='info icon' id='info-icon' />
					</span>
				</h3>
			);

			if (accessData.additionalInfo === "") {
				accessInfo.push(
					<p key={21}>None</p>
				);
			} else {
				accessInfo.push(
					<p key={21}>{ accessData.additionalInfo }</p>
				);	
			}

			var accessTab = (
				<div className='access-tab'>
					{ accessInfo }
				</div>
			);

			// Info about amenities
			var yesList = [];
			var noList = [];
			var amenData = element.amenities;

			if (amenData.amphitheater.toUpperCase().includes('YES')) {
				yesList.push('Amphitheater');
			} else {
				noList.push('Amphitheater');
			}

			if (amenData.campStore.toUpperCase().includes('YES')) {
				yesList.push('Camp Store');
			} else {
				noList.push('Camp Store');
			}

			if (amenData.cellPhoneReception.toUpperCase().includes('YES')) {
				yesList.push('Cell Phone Reception');
			} else {
				noList.push('Cell Phone Reception');
			}

			if (amenData.dumpStation.toUpperCase().includes('YES')) {
				yesList.push('Dump Station');
			} else {
				noList.push('Dump Station');
			}

			if (amenData.firewoodForSale.toUpperCase().includes('YES')) {
				yesList.push('Firewood For Sale');
			} else {
				noList.push('Firewood For Sale');
			}

			if (amenData.foodStorageLockers.toUpperCase().includes('YES')) {
				yesList.push('Food Storage Lockers');
			} else {
				noList.push('Food Storage Lockers');
			}

			if (amenData.iceAvailableForSale.toUpperCase().includes('YES')) {
				yesList.push('Ice Available For Sale');
			} else {
				noList.push('Ice Available For Sale');
			}

			if (amenData.internetConnectivity.toUpperCase().includes('YES')) {
				yesList.push('Internet Connectivity');
			} else {
				noList.push('Internet Connectivity');
			}

			if (amenData.laundry.toUpperCase().includes('YES')) {
				yesList.push('Laundry');
			} else {
				noList.push('Laundry');
			}

			if (amenData.potableWater.length !== 0 
					&& amenData.potableWater[0].toUpperCase().includes('YES')) {
				yesList.push('Potable Water');
			} else {
				noList.push('Potable Water');
			}

			if (amenData.showers.length !== 0 
					&& !amenData.showers[0].toUpperCase().includes('NONE')) {
				yesList.push('Showers');
			} else {
				noList.push('Showers');
			}

			if (amenData.staffOrVolunteerHostOnsite.toUpperCase().includes('YES')) {
				yesList.push('Staff Or Volunteer Host On Site');
			} else {
				noList.push('Staff Or Volunteer Host On Site');
			}

			if (amenData.toilets.length !== 0 
					&& !amenData.toilets[0].toUpperCase().includes('NONE')) {
				yesList.push('Toilets');
			} else {
				noList.push('Toilets');
			}

			if (amenData.trashRecyclingCollection.toUpperCase().includes('YES')) {
				yesList.push('Trash Recycling Collection');
			} else {
				noList.push('Trash Recycling Collection');
			}

			var yesDisplay = [];
			var noDisplay = [];
			yesList.forEach((e, i) => {
				yesDisplay.push(
					<div className='yes-item mb-3' key={ i }>
						<img src="https://img.icons8.com/office/30/000000/checkmark.png" alt='yes icon' />
						<span className='ml-3 list-text'>{ e }</span>
					</div>
				);
			})

			noList.forEach((e, i) => {
				noDisplay.push(
					<div className='no-item mb-3' key={ i }>
						<img src="https://img.icons8.com/office/30/000000/delete-sign.png" alt='no icon' />
						<span className='ml-3 list-text'>{ e }</span>
					</div>
				);
			})

			var amenTab = (
				<>
					<div className='yes-display float-left mt-4 pl-4'>{ yesDisplay }</div>
					<div className='no-display float-right mt-4'>{ noDisplay }</div>
				</>
			);

			// Info about campsites
			var siteData = element.campsites;
			var siteTab = (
				<div className='site-tab'>
					<p className='site-item'>
						<span className='dot-icon' data-number={ siteData.totalSites }>
							<i className={"fas fa-circle number-" + siteData.totalSites}></i>
						</span>
						<span className='site-name'>Total Sites: </span>
						<span>{ siteData.totalSites }</span>
					</p>

					<p className='site-item'>
						<span className='dot-icon' data-number={ siteData.electricalHookups }>
							<i className={"fas fa-circle number-" + siteData.electricalHookups}></i>
						</span>
						<span className='site-name'>Electrical Hookups: </span>
						<span>{ siteData.electricalHookups }</span>
					</p>

					<p className='site-item'>
						<span className='dot-icon' data-number={ siteData.group }>
							<i className={"fas fa-circle number-" + siteData.group}></i>
						</span>
						<span className='site-name'>Group: </span>
						<span>{ siteData.group }</span>
					</p>

					<p className='site-item'>
						<span className='dot-icon' data-number={ siteData.horse }>
							<i className={"fas fa-circle number-" + siteData.horse}></i>
						</span>
						<span className='site-name'>Horse: </span>
						<span>{ siteData.horse }</span>
					</p>

					<p className='site-item'>
						<span className='dot-icon' data-number={ siteData.rvOnly }>
							<i className={"fas fa-circle number-" + siteData.rvOnly}></i>
						</span>
						<span className='site-name'>RV Only: </span>
						<span>{ siteData.rvOnly }</span>
					</p>

					<p className='site-item'>
						<span className='dot-icon' data-number={ siteData.tentOnly }>
							<i className={"fas fa-circle number-" + siteData.tentOnly}></i>
						</span>
						<span className='site-name'>Tent Only: </span>
						<span>{ siteData.tentOnly }</span>
					</p>

					<p className='site-item'>
						<span className='dot-icon' data-number={ siteData.walkBoatTo }>
							<i className={"fas fa-circle number-" + siteData.walkBoatTo}></i>
						</span>
						<span className='site-name'>Walk & Boat To: </span>
						<span>{ siteData.walkBoatTo }</span>
					</p>

					<p className='site-item'>
						<span className='dot-icon' data-number={ siteData.other }>
							<i className={"fas fa-circle number-" + siteData.other}></i>
						</span>
						<span className='site-name'>Other: </span>
						<span>{ siteData.other }</span>
					</p>
				</div>
			);

			Array.prototype.slice.call(
					document.getElementsByClassName('dot-icon')).forEach(e => {
				 if (e.getAttribute('data-number') !== "0") {
				 	e.classList.add('green-icon');
				 } else {
				 	e.classList.add('red-icon');
				 }
			})

			// Combining all into the modal
			campList.push(
				<div className='camp-item' key={index}>
					<p className='camp-name'>{ element.name }</p>
					<p className='camp-desc'>
						<span className='bold-text'>Description:</span> { element.description }
					</p>
					{ element.weatheroverview !== "" && 
						<p className='camp-weat'>
							<span className='bold-text'>Weather:</span> { element.weatherOverview }
						</p>
					}
					<p className='more-detail-btn' onClick={ this.handleClick.bind(this, index) }>
						More detail
						<i className="fas fa-angle-double-right double-right-icon"></i>
					</p>
				</div>
			);

			campDetail.push(
				<div className="detail-page-camp hide display-none" id={'camp-' + index} key={index}>
				  <nav>
					<div className="nav nav-tabs" id="nav-tab" role="tablist">
					  <a className="nav-item nav-link active" id={"nav-camp-tab" + index} data-toggle="tab" href={"#nav-camp" + index} role="tab" aria-controls={"nav-camp" + index} aria-selected="true">Campground</a>
					  <a className="nav-item nav-link" id={"nav-access-tab" + index} data-toggle="tab" href={"#nav-access" + index} role="tab" aria-controls={"nav-access" + index} aria-selected="false">Accessibility</a>
					  <a className="nav-item nav-link" id={"nav-amen-tab" + index} data-toggle="tab" href={"#nav-amen" + index} role="tab" aria-controls={"nav-amen" + index} aria-selected="false">Amenities</a>
					  <a className="nav-item nav-link" id={"nav-site-tab" + index} data-toggle="tab" href={"#nav-site" + index} role="tab" aria-controls={"nav-site" + index} aria-selected="false">Campsites</a>
					</div>
				  </nav>
					
				  <div className="tab-content" id="nav-tabContent">
					<div className="tab-pane fade show active" id={"nav-camp" + index} role="tabpanel" aria-labelledby={"nav-camp-tab" + index}>
					  {campTab}
					</div>
					<div className="tab-pane fade" id={"nav-access" + index} role="tabpanel" aria-labelledby={"nav-profile-tab" + index}>
					  {accessTab}
					</div>
					<div className="tab-pane fade" id={"nav-amen" + index} role="tabpanel" aria-labelledby={"nav-amen-tab" + index}>
					  {amenTab}
					</div>
					<div className="tab-pane fade" id={"nav-site" + index} role="tabpanel" aria-labelledby={"nav-site-tab" + index}>
					  {siteTab}
					</div>
				  </div>
				</div>

			);
		})

		return (
			<div className='camp-wrapper'>
				<div className='camp-list show' id='camp-list'>
					{ campList }
				</div>		
				<div className='camp-detail' id='camp-detail'>
					<i className="fas fa-angle-double-left return-button hide" id='return-button' onClick={ this.handleReturn }></i>
					{ campDetail }
				</div>
			</div>
		);
	}
}

export default Campground;