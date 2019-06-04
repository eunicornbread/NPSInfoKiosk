import React, { Component } from 'react';
import './visitorcenter.css';
import visitorIcon from './svg/visitors.svg';

class VisitorCenter extends Component {
	
	render() {
		console.log(this.props.data);
		if (this.props.data.length === 0) {
			return (
				<div className='no-visitor-page'>
					<div className='no-visitor'>
						<img src={ visitorIcon } alt='visitor center' id='visitor-icon' />
						<p className='no-visitor-text'>No visitor center available :(</p>
					</div>
				</div>
			);
		}

		var visitorList = [];

		this.props.data.forEach((element, index) => {
			visitorList.push(
				<div className='visitor-item' key={index}>
					<p className='visitor-name'>{ element.name }</p>
					{ element.description !== "" && 
						<div className='visitor-desc'>
							<p className='visitor-head'>Description</p>
							<div className='info-detail-visitor'>{ element.description }</div>
						</div>
					}
					
					{ element.url !== "" && 
						<a href={ element.url } target="_blank" rel="noopener noreferrer" className='info-detail-visitor more-info-link'>
							<span><i className="fas fa-info-circle link-icon"></i></span>
							More information
						</a>
					}

					{ element.directionsInfo !== "" && 
						<div className='visitor-dire'>
							<p className='visitor-head'>Direction</p>
							<div className='info-detail-visitor'>{ element.directionsInfo }</div>
						</div>
					}
					
					{ element.directionsUrl !== "" &&
						<a href={ element.directionsUrl } target="_blank" rel="noopener noreferrer" className='info-detail-visitor more-info-link'>
							<span><i className="fas fa-info-circle link-icon"></i></span>
							More information
						</a>
					}
				</div>
			);

			
		});
		return (
			<div className="visitor-wrapper">
				<div className='visitor-list show' id='visitor-list'>
					{ visitorList }
				</div>
			</div>
		);
	}
}

export default VisitorCenter;