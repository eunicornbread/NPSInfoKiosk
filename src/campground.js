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
		// one tab is accessibility
		// one tab is amenities will be a checklist with yes on top and no on the bottom
		var campList = [];
		this.props.data.forEach((element, index) => {
			campList.push(
				<div className='camp-item mb-3' key={ index }>
					<p>{ element.name }</p>
					<p>{ element.description }</p>
				</div>
			);
		})

		return (
			<>
				<div className='camp-list pt-3 ml-3'>
					{ campList }
				</div>
			</>
		);
	}
}

export default Campground;