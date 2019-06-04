import React, { Component } from 'react';
import './visitorcenter.css';

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
				<div className='visitor-item' key={index}>
					<p className='visitor-name'>{ element.name }</p>
					<div className='visitor-desc'>
						<p className='visitor-head'>Description</p>
						<div className='info-detail'>{ element.description }</div>
					</div>
					{ element.url !== "" && 
						<a href={ element.url } target="_blank" rel="noopener noreferrer" className='info-detail more-info-link'>
							<span><i className="fas fa-info-circle link-icon"></i></span>
							More information
						</a>
					}
					<div className='visitor-dire'>
						<p className='visitor-head'>Direction</p>
						<div className='info-detail'>{ element.directionsInfo }</div>
					</div>
					{ element.directionsUrl !== "" &&
						<a href={ element.directionsUrl } target="_blank" rel="noopener noreferrer" className='info-detail more-info-link'>
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