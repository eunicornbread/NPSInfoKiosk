import React, { Component } from 'react';
import './campground.css';

class Campground extends Component {
	render() {
		console.log(this.props.data);
		return (
			<>
				<p className="ml-5">This is the campground page</p>
			</>
		);
	}
}

export default Campground;