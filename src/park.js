import React, { Component } from 'react';
import './park.css';
import axios from 'axios';

class Park extends Component {
	render() {
		return (
			<>
				<p>This is the park page :D</p>
				<p>parkCode is { this.props.match.params.parkCode }</p>
			</>
		);
	}
}

export default Park;