import React, { Component } from 'react';
import './visitorcenter.css';
import directionIcon from './svg/directions-black-22.svg';
import visitorIcon from './svg/visitor-center-black-18.svg';

class VisitorCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: -1
		}
		this.handleReturn = this.handleReturn.bind(this);
	}

	handleReturn(event) {
		document.getElementById('visitor-list').classList.remove('no-display');
		document.getElementById('return-button1').classList.add('hide');
		document.getElementById('visitor-' + this.state.display).classList.remove('show');
		document.getElementById('visitor-' + this.state.display).classList.add('hide');
		
		setTimeout(() => {

			document.getElementById('visitor-list').classList.add('show');
			document.getElementById('visitor-list').classList.remove('hide');
		
		}, 250);

		this.setState({
			display: -1
		});
	}

	handleClick(index, event) {
		document.getElementById('visitor-list').classList.add('hide');
		document.getElementById('visitor-list').classList.remove('show');
		
		setTimeout(() => {
			document.getElementById('visitor-list').classList.add('no-display');
			document.getElementById('return-button1').classList.remove('hide');
			document.getElementById('visitor-' + index).classList.remove('hide');
			document.getElementById('visitor-' + index).classList.add('show');
		}, 250);

		this.setState({
			display: index
		});
	}

	render() {
		console.log(this.props.data);
		if (this.props.data.length === 0) {
			return (
				<div>
					<p>No available visitor center nearby QAQ</p>
				</div>
			);
		}

		var visitorDetail = [];
		var visitorList = [];

		this.props.data.forEach((element, index) => {
			visitorList.push(
				<div className='visitor-item' data-index={index} key={index} onClick={ this.handleClick.bind(this, index) }>
					<p data-index={index} className='visitor-name'>{ element.name }</p>
					<p data-index={index} className='visitor-desc'><span className='bold-text'>Description:</span> { element.description }</p>
					<p data-index={index} className='visitor-dire'><span className='bold-text'>Direction:</span> { element.directionsInfo }</p>
				</div>
			);

			

			visitorDetail.push(
				<div className="detail-page hide" id={'visitor-' + index} key={ index }>
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
			);
		});
		return (
			<div className="visitor-wrapper">
				<div className='visitor-list show' id='visitor-list'>
					{ visitorList }
				</div>

				<div className='visitor-detail' id='visitor-detail'>
					<i className="fas fa-angle-double-left return-button1 hide" id='return-button1' onClick={ this.handleReturn }></i>
					{ visitorDetail }
				</div>	
			</div>
		);
	}
}

export default VisitorCenter;