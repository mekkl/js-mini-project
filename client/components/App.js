import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import StartPage from './StartPage';
import RegisterPage from './RegisterPage';
import NotFoundPage from './NotFoundPage';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router basename='/node/react'>
                <div className="app">
                    <div className='sideMenu'>
                        <ul>
                            <li><Link to='/'>start page</Link></li>
                            <li><Link to='/register'>register page</Link></li>
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path="/" component={StartPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div >
            </Router >
        );
    }
}
