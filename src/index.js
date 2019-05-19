import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Search from './search';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const routing = (
	<Router>
		<div>
			<Route exact path="/" component={ App } />
			<Route path="/search" component={ Search } />
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
