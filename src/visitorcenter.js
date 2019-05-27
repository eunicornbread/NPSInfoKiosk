import React, { Component } from 'react';
import './visitorcenter.css';
import directionIcon from './svg/directions-black-22.svg';
import visitorIcon from './svg/visitor-center-black-18.svg';

class VisitorCenter extends Component {
	render() {
		console.log(this.props.data);
		if (this.props.data.length === 0) {
			return (
				<div>
					<p>No available visitor center nearby QAQ</p>
				</div>
			);
		}

		var visitorList = [];
		this.props.data.forEach((element, index) => {
			visitorList.push(
				<div key={ index }>
					<div className='visitor-item mb-5' data-toggle="modal" data-target={'#visitorModal' + index}>
						<p>{ element.name }</p>
						<p>{ element.description }</p>
					</div>

					<div className="modal fade" id={'visitorModal' + index} tabIndex="-1" role="dialog" 
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
									<h3>
										{ element.name }
										<img src={ visitorIcon } alt='visitor center icon' id='visitor-icon' />
									</h3>
								  
									<p className='info-title'>Description</p>
									{ element.description === "" && 
										<p className='info-detail'>None</p>
									}
									{ element.description !== "" && 
										<p className='info-detail'>{ element.description }</p>
									}
								  
									<p className='info-title'>URL</p>
									{ element.url === "" && 
										<p className='info-detail'>None</p>
									}
									{ element.url !== "" && 
										<div className='link-url'>
											<a href={ element.url } target="_blank" rel="noopener noreferrer" className='info-detail'>
												{ element.url }
												<span><i className="fas fa-external-link-alt link-icon"></i></span>
											</a>
										</div>
									}

									<h3>
										Direction
										<img src={ directionIcon } alt='direction icon' id='direction-icon' />
									</h3>

									<p className='info-title'>Info</p>
									{ element.directionsInfo === "" && 
										<p className='info-detail'>None</p>
									}
									{ element.directionsInfo !== "" && 
										<p className='info-detail'>{ element.directionsInfo }</p>
									}

									<p className='info-title'>URL</p>
									{ element.directionsUrl === "" && 
										<p className='info-detail'>None</p>
									}
									{ element.directionsUrl !== "" && 
										<div className='link-url' id="direction-url">
											<a href={ element.directionsUrl } target="_blank" rel="noopener noreferrer" className='info-detail'>
												{ element.directionsUrl }
												<span><i className="fas fa-external-link-alt link-icon"></i></span>
											</a>
										</div>
									}

									<p className='info-title'>Latitude & Longitude</p>
									{ element.latLong === "" && 
										<p className='info-detail'>None</p>
									}
									{ element.latLong !== "" && 
										<p className='info-detail'>{ element.latLong }</p>
									}

								</div>
					    	</div>
						</div>
					</div>
				</div>
			);
		});
		return (
			<div>
				<div className='space-top'></div>
				<div className='visitor-list'>
					{ visitorList }
				</div>	
			</div>
		);
	}
}

export default VisitorCenter;