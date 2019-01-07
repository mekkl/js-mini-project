import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import createHistory from "history/createBrowserHistory"

const history = createHistory();

ReactDOM.render(
  <App history={history} />,
  document.getElementById('root')
);