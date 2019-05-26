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
		var campList = [];
		this.props.data.forEach((element, index) => {
			campList.push(
				
			<div key={ index }>
				<div className='camp-item mb-5' data-toggle="modal" 
												data-target={ '#campModal' + index }>
					<p>{ element.name }</p>
					<p>{ element.description }</p>
				</div>

				<div className="modal fade" id={ 'campModal' + index } tabIndex="-1" role="dialog" 
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
								  <a className="nav-item nav-link" id={"nav-access-tab" + index} data-toggle="tab" href={"#nav-access" + index} role="tab" aria-controls={"nav-access" + index} aria-selected="false">
								    		Accessibility
								    	</a>
								    	<a className="nav-item nav-link" id={"nav-amen-tab" + index} data-toggle="tab" href={"#nav-amen" + index} role="tab" aria-controls={"nav-amen" + index} aria-selected="false">Amenities</a>
								    	<a className="nav-item nav-link" id={"nav-site-tab" + index} data-toggle="tab" href={"#nav-site" + index} role="tab" aria-controls={"nav-site" + index} aria-selected="false">Campsites</a>
								  	</div>
								</nav>
								
								<div className="tab-content" id="nav-tabContent">
									<div className="tab-pane fade show active" id={"nav-camp" + index} role="tabpanel" aria-labelledby={"nav-camp-tab" + index}>
										{element.name}
									</div>
									<div className="tab-pane fade" id={"nav-access" + index} role="tabpanel" aria-labelledby={"nav-profile-tab" + index}>
										{element.accessibility.cellphoneinfo}
									</div>
									<div className="tab-pane fade" id={"nav-amen" + index} role="tabpanel" aria-labelledby={"nav-amen-tab" + index}>
										{element.amenities.campstore}
									</div>
									<div className="tab-pane fade" id={"nav-site" + index} role="tabpanel" aria-labelledby={"nav-site-tab" + index}>
										{element.campsites.group}
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