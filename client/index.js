import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import createHistory from "history/createBrowserHistory"
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import '@babel/polyfill';

const client = new ApolloClient({
  uri: "http://localhost:3000/node/graphql"
});

const history = createHistory();

ReactDOM.render(
  <ApolloProvider client={client}>
    <App history={history} />
  </ApolloProvider>,
  document.getElementById('root')
);