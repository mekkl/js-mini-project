import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import StartPage from './StartPage';
import RegisterPage from './RegisterPage';
import NotFoundPage from './NotFoundPage';
import '../style/style.css'

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router basename='/node/react'>
                <div className="app">
                    <div className="topMenu">
                        <h1>4 semester noter</h1>
                    </div>
                    <div className='middle'>
                        <div className='sideMenu'>
                            <div className="sideMenuTitleContainer" >
                                <h4 className="sideMenuTitle">Security</h4>
                            </div>
                            <ul className="sideMenuList">
                                <li className="sideMenuItem" >
                                    <Link to='/'><button className="sideMenuButton" type='submit'>home</button></Link>
                                </li>
                                <li className="sideMenuItem">
                                    <Link to='/register'><button className="sideMenuButton" type='submit'>register</button></Link>
                                </li>
                            </ul>

                        </div>
                        <div className='content'>
                            <Switch>
                                <Route exact path="/" component={StartPage} />
                                <Route exact path="/register" component={RegisterPage} />
                                <Route component={NotFoundPage} />
                            </Switch>
                        </div>
                    </div>
                </div >
            </Router >
        );
    }
}
