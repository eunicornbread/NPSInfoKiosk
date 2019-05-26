import React, { Component } from 'react';
import './visitorcenter.css';

class VisitorCenter extends Component {
	render() {
		console.log(this.props.data);
		return (
			<>
				<p className="ml-4">This is the visitor center page</p>
			</>
		);
	}
}

export default VisitorCenter;