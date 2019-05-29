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

// start with row 1
// nps symbol libray
// amphitheater row 1
// automobiles row 3
// camping row 7
// campsite row 7
// directions row 9
// electrical hookup row 10
// emergencies / 911 row 10
// emergency telephone row 10
// firewood row 11
// flushed toilets row 13
// food service row 13
// historic feature row 14
// ice row 15


class Campground extends Component {


	render() {
		//console.log(this.props.data);
		if (this.props.data.length === 0) {
			return (
				<>
					<p>No available campground nearby QAQ</p>
				</>
			);
		}

		// Modal and navigation setup
		var campList = [];
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
				<p key={2} className='info-title'>Direction Overview</p>
			);

			if (element.directionsoverview === "") {
				campInfo.push(
					<p id='direction-overview' key={3} className='info-detail'>None</p>
				);
			} else {
				campInfo.push(
					<p id='direction-overview' key={3} className='info-detail'>{ element.directionsoverview }</p>
				);
			}

			campInfo.push(
				<p key={4} className='info-title'>Direction URL</p>
			);

			if (element.directionsUrl === "") {
				campInfo.push(
					<p id='direction-url' key={5} className='info-detail'>None</p>
				);
			} else {
				campInfo.push(
					<a href={ element.directionsUrl } target="_blank" rel="noopener noreferrer" id='direction-url' key={5} className='info-detail'>
						{ element.directionsUrl }
						<span><i className="fas fa-external-link-alt link-icon"></i></span>
					</a>
				);
			}

			campInfo.push(
				<p key={6} className='info-title'>Longitude & Latitude</p>
			);

			if (element.latLong === "") {
				campInfo.push(
					<p id='lat-long' key={7} className='info-detail'>None</p>
				);
			} else {
				campInfo.push(
					<p id='lat-long' key={7} className='info-detail'>{ element.latLong }</p>
				);
			}

			campInfo.push(
				<h3 key={8}>
					Regulation
					<span>
						<i className="fas fa-info-circle inform-icon"></i>
					</span>
				</h3>
			);

			campInfo.push(
				<p key={11} className='info-title'>Regulation Overview</p>
			);

			if (element.regulationsoverview === "") {
				campInfo.push(
					<p id='regulation-overview' key={9} className='info-detail'>None</p>
				);
			} else {
				var regulation = [];
				element.regulationsoverview.replace(/\n/g, " ").split('. ').forEach((e, i) => {
					
					if (e.charAt(0) === '-') {
						e = e.substring(1);
					}

					regulation.push(
						<p className='rule-item info-detail' key={ e }>
							{ (i + 1) + ". " + e }
						</p>
					);
				})
				campInfo.push(
					<div id='regulation-overview' key={9}>
						{ regulation }
					</div>
				);
			}

			campInfo.push(
				<p key={10} className='info-title'>Regulation URL</p>
			);


			if (element.regulationsurl === "") {
				campInfo.push(
					<p id='regulation-url' key={12} className='info-detail'>None</p>
				);
			} else {
				campInfo.push(
					<a href={ element.regulationsurl } target="_blank" rel="noopener noreferrer"  id='regulation-url' key={12} className='info-detail'>
						{ element.regulationsurl }
						<span><i className="fas fa-external-link-alt link-icon"></i></span>
					</a>
				);
			}

			campInfo.push(
				<h3 key={13}>
					Reservation
					<img src={ reservationIcon } alt='reservation icon' id='reservation-icon' />
				</h3>
			);

			campInfo.push(
				<p key={14} className='info-title'>Reservation Description</p>
			);


			if (element.reservationsdescription === "") {
				campInfo.push(
					<p id='reservation-description' key={15} className='info-detail'>None</p>
				);
			} else {
				campInfo.push(
					<p id='reservation-description' key={15} className='info-detail'>{ element.reservationsdescription }</p>
				);
			}

			campInfo.push(
				<p key={16} className='info-title'>Reservation Sites First Come First Serve</p>
			);


			if (element.reservationssitesfirstcome === "") {
				campInfo.push(
					<p id='reservation-first' key={17} className='info-detail'>None</p>
				);
			} else {
				campInfo.push(
					<p id='reservation-first' key={17} className='info-detail'>{ element.reservationssitesfirstcome }</p>
				);
			}

			campInfo.push(
				<p key={18} className='info-title'>Reservation Sites Reservable</p>
			);


			if (element.reservationssitesreservable === "") {
				campInfo.push(
					<p id='reservation-reserve' key={19} className='info-detail'>None</p>
				);
			} else {
				campInfo.push(
					<p id='reservation-reserve' key={19} className='info-detail'>{ element.reservationssitesreservable }</p>
				);
			}

			campInfo.push(
				<p key={20} className='info-title'>Reservation URL</p>
			);


			if (element.reservationsurl === "") {
				campInfo.push(
					<p id='reservation-url' key={21} className='info-detail'>None</p>
				);
			} else {
				campInfo.push(
					<p id='reservation-url' key={21} className='info-detail'>{ element.reservationsurl }</p>
				);
			}

			campInfo.push(
				<h3 key={22}>
					Weather
					<span><i className="fas fa-cloud-sun weather-icon"></i></span>
				</h3>
			);

			if (element.weatheroverview === "") {
				campInfo.push(
					<p id='weather-overview' key={23}>No Overview</p>
				);
			} else {
				campInfo.push(
					<p id='weather-overview' key={23}>{ element.weatheroverview }</p>
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

			// name
			// - description
			// direction
			// regulation
			// reservation
			// weather

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

			if (accessData.accessroads.length === 0) {
				accessInfo.push(
					<p key={1}>None</p>
				);
			} else {
				accessInfo.push(
					<div key={1}>
						<div>
							<p className='road-title'>Road Access</p>
							<p className='road-detail'>{ accessData.accessroads[0] }</p>
						</div>
						<div>
							<p className='road-title'>Road Info</p>
							<p className='road-detail'>{ accessData.adainfo }</p>
						</div>
					</div>
				);
			}

			accessInfo.push(
				<h3 key={2}>
					<span className='info-header'>
						Cellphone Info
						<img src={ telephoneIcon } alt='telephone icon' id='phone-icon' />
					</span>

				</h3>
			);

			if (accessData.cellphoneinfo === "") {
				accessInfo.push(
					<p key={3}>None</p>
				);
			} else {
				accessInfo.push(
					<p key={3}>{ accessData.cellphoneinfo }</p>
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

			if (accessData.firestovepolicy === "") {
				accessInfo.push(
					<p key={7}>None</p>
				);
			} else {
				accessInfo.push(
					<p key={7}>{ accessData.firestovepolicy }</p>
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

			if (accessData.internetinfo === "") {
				accessInfo.push(
					<p key={9}>None</p>
				);
			} else {
				accessInfo.push(
					<p key={9}>{ accessData.internetinfo }</p>
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

			if (accessData.wheelchairaccess === "") {
				accessInfo.push(
					<p key={11}>None</p>
				);
			} else {
				accessInfo.push(
					<p key={11}>{ accessData.wheelchairaccess }</p>
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
				<div key={13}>
					<p className='vehicle-group'>RV</p>
					<p className='vehicle-info'>Number of RVs Allowed: { accessData.rvallowed }</p>
				</div>
			);

			if (accessData.rvinfo === "") {
				accessInfo.push(
					<p key={14} className='vehicle-info'>RV Info: None</p>
				);
			} else {
				accessInfo.push(
					<p key={14} className='vehicle-info'>RV Info: { accessData.rvinfo }</p>
				);
			}

			accessInfo.push(
				<p key={15} className='vehicle-info'>RV Maxlength: { accessData.rvmaxlength }</p>
			);

			accessInfo.push(
				<div key={16}>
					<p className='vehicle-group'>Trailer</p>
					<p className='vehicle-info'>Number of Trailers Allowed: { accessData.trailerallowed } </p>
				</div>
			);

			accessInfo.push(
				<p key={17} className='vehicle-info'>Trailers Maxlength: { accessData.trailermaxlength } </p>
			);

			accessInfo.push(
				<h3 key={20}>
					<span className='info-header'>
						Additional Info
						<img src={ infoIcon } alt='info icon' id='info-icon' />
					</span>
				</h3>
			);

			if (accessData.additionalinfo === "") {
				accessInfo.push(
					<p key={21}>None</p>
				);
			} else {
				accessInfo.push(
					<p key={21}>{ accessData.additionalinfo }</p>
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

			if (amenData.ampitheater.toUpperCase().includes('YES')) {
				yesList.push('Amphitheater');
			} else {
				noList.push('Amphitheater');
			}

			if (amenData.campstore.toUpperCase().includes('YES')) {
				yesList.push('Camp Store');
			} else {
				noList.push('Camp Store');
			}

			if (amenData.cellphonereception.toUpperCase().includes('YES')) {
				yesList.push('Cell Phone Reception');
			} else {
				noList.push('Cell Phone Reception');
			}

			if (amenData.dumpstation.toUpperCase().includes('YES')) {
				yesList.push('Dump Station');
			} else {
				noList.push('Dump Station');
			}

			if (amenData.firewoodforsale.toUpperCase().includes('YES')) {
				yesList.push('Firewood For Sale');
			} else {
				noList.push('Firewood For Sale');
			}

			if (amenData.foodstoragelockers.toUpperCase().includes('YES')) {
				yesList.push('Food Storage Lockers');
			} else {
				noList.push('Food Storage Lockers');
			}

			if (amenData.iceavailableforsale.toUpperCase().includes('YES')) {
				yesList.push('Ice Available For Sale');
			} else {
				noList.push('Ice Available For Sale');
			}

			if (amenData.internetconnectivity.toUpperCase().includes('YES')) {
				yesList.push('Internet Connectivity');
			} else {
				noList.push('Internet Connectivity');
			}

			if (amenData.laundry.toUpperCase().includes('YES')) {
				yesList.push('Laundry');
			} else {
				noList.push('Laundry');
			}

			if (amenData.potablewater.length !== 0 
					&& amenData.potablewater[0].toUpperCase().includes('YES')) {
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

			if (amenData.stafforvolunteerhostonsite.toUpperCase().includes('YES')) {
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

			if (amenData.trashrecyclingcollection.toUpperCase().includes('YES')) {
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
						<span className='dot-icon' data-number={ siteData.totalsites }>
							<i className={"fas fa-circle number-" + siteData.totalsites}></i>
						</span>
						<span className='site-name'>Total Sites: </span>
						<span>{ siteData.totalsites }</span>
					</p>

					<p className='site-item'>
						<span className='dot-icon' data-number={ siteData.electricalhookups }>
							<i className={"fas fa-circle number-" + siteData.electricalhookups}></i>
						</span>
						<span className='site-name'>Electrical Hookups: </span>
						<span>{ siteData.electricalhookups }</span>
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
						<span className='dot-icon' data-number={ siteData.rvonly }>
							<i className={"fas fa-circle number-" + siteData.rvonly}></i>
						</span>
						<span className='site-name'>RV Only: </span>
						<span>{ siteData.rvonly }</span>
					</p>

					<p className='site-item'>
						<span className='dot-icon' data-number={ siteData.tentonly }>
							<i className={"fas fa-circle number-" + siteData.tentonly}></i>
						</span>
						<span className='site-name'>Tent Only: </span>
						<span>{ siteData.tentonly }</span>
					</p>

					<p className='site-item'>
						<span className='dot-icon' data-number={ siteData.walkboatto }>
							<i className={"fas fa-circle number-" + siteData.walkboatto}></i>
						</span>
						<span className='site-name'>Walk & Boat To: </span>
						<span>{ siteData.walkboatto }</span>
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
			  
			  <div key={index}>
				<div className='camp-item mb-5' data-toggle="modal" data-target={'#campModal' + index}>
					<p>{ element.name }</p>
					<p>{ element.description }</p>
				</div>

				<div className="modal fade" id={'campModal' + index} tabIndex="-1" role="dialog" 
						aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
						<div className="modal-content">
						    <div className='close-modal'>
						        <button type="button" className="close" data-dismiss="modal" 
						        	aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						    </div>
							<div className="modal-body">
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
				    	</div>
					</div>
				</div>
			  </div>
			);
		})

		return (
			<>
				
				<div className='camp-list'>
					{ campList }
				</div>		
			</>
		);
	}
}

export default Campground;