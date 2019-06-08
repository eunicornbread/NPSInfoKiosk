import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Search from './search';
import Park from './park';
import * as serviceWorker from './serviceWorker';
import { Route, HashRouter as Router } from 'react-router-dom';

const routing = (
	<Router>
		<div>
			<Route exact path="/" component={ App } />
			<Route path="/search" component={ Search } />
			<Route path="/park/:parkCode" component={ Park } />
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
