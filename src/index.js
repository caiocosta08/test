import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Main from './Main';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Main />, document.getElementById('root'));

serviceWorker.unregister();


