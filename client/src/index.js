import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//while we prefer to place semantic folder in /client, we must do /client/src because otherwise react cannot import it. 
//this is a limitation by create-react-app. better to nest semantic inside src than to 'eject' from cra.
import './semantic/dist/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker(); //boilerplate from cra
