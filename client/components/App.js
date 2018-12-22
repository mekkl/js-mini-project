import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import StartPage from './StartPage';
import InfoPage from './InfoPage';

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
                            <li><Link to='/info'>info page</Link></li>
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path="/" component={StartPage} />
                        <Route exact path="/info" component={InfoPage} />
                    </Switch>
                </div >
            </Router >
        );
    }
}
