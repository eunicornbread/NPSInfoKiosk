import React, { Component } from 'react';
import './campground.css';

class Campground extends Component {


	render() {
		console.log(this.props.data);
		if (this.props.data.length === 0) {
			return (
				<>
					<p>No available campground nearby QAQ</p>
				</>
			);
		}
		// modal for selected camp site
		// one tab the starting tab is basic info about the campgrounds
		// just display all other information
		// one tab is accessibility
		// one tab is amenities will be a checklist with yes on top and no on the bottom
		// one tab is camp sites

		


		// Modal and navigation setup
		var campList = [];
		this.props.data.forEach((element, index) => {

			// Info about the campground
			var campTab = (
				<>
					<p>Hi</p>
				</>
			);

			// Info about accessibility
			var accessTab = (
				<>
					<p>What</p>
				</>
			);

			// Info about amenities
			var yesList = [];
			var noList = [];
			var accessData = element.amenities;

			if (accessData.ampitheater.toUpperCase().includes('YES')) {
				yesList.push('Ampitheater');
			} else {
				noList.push('Ampitheater');
			}

			if (accessData.campstore.toUpperCase().includes('YES')) {
				yesList.push('Camp Store');
			} else {
				noList.push('Camp Store');
			}

			if (accessData.cellphonereception.toUpperCase().includes('YES')) {
				yesList.push('Cell Phone Reception');
			} else {
				noList.push('Cell Phone Reception');
			}

			if (accessData.dumpstation.toUpperCase().includes('YES')) {
				yesList.push('Dump Station');
			} else {
				noList.push('Dump Station');
			}

			if (accessData.firewoodforsale.toUpperCase().includes('YES')) {
				yesList.push('Firewood For Sale');
			} else {
				noList.push('Firewood For Sale');
			}

			if (accessData.foodstoragelockers.toUpperCase().includes('YES')) {
				yesList.push('Food Storage Lockers');
			} else {
				noList.push('Food Storage Lockers');
			}

			if (accessData.iceavailableforsale.toUpperCase().includes('YES')) {
				yesList.push('Ice Available For Sale');
			} else {
				noList.push('Ice Available For Sale');
			}

			if (accessData.internetconnectivity.toUpperCase().includes('YES')) {
				yesList.push('Internet Connectivity');
			} else {
				noList.push('Internet Connectivity');
			}

			if (accessData.laundry.toUpperCase().includes('YES')) {
				yesList.push('Laundry');
			} else {
				noList.push('Laundry');
			}

			if (accessData.potablewater.length !== 0 
					&& accessData.potablewater[0].toUpperCase().includes('YES')) {
				yesList.push('Potable Water');
			} else {
				noList.push('Potable Water');
			}

			if (accessData.showers.length !== 0 
					&& !accessData.showers[0].toUpperCase().includes('NONE')) {
				yesList.push('Showers');
			} else {
				noList.push('Showers');
			}

			if (accessData.stafforvolunteerhostonsite.toUpperCase().includes('YES')) {
				yesList.push('Staff Or Volunteer Host On Site');
			} else {
				noList.push('Staff Or Volunteer Host On Site');
			}

			if (accessData.toilets.length !== 0 
					&& !accessData.toilets[0].toUpperCase().includes('NONE')) {
				yesList.push('Toilets');
			} else {
				noList.push('Toilets');
			}

			if (accessData.trashrecyclingcollection.toUpperCase().includes('YES')) {
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
				 if (e.getAttribute('data-number') === "0") {
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
				<div className='space-top'></div>
				<div className='camp-list'>
					{ campList }
				</div>		
			</>
		);
	}
}

export default Campground;