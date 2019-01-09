import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import StartPage from './StartPage';
import UsersPage from './UsersPage';
import LocationBlogPage from './LocationBlogPage';
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
                        <h1>js-mini-project apollo react client</h1>
                    </div>
                    <div className='middle'>
                        <div className='sideMenu'>
                            <div className="sideMenuTitleContainer" >
                                <h4 className="sideMenuTitle">Menu</h4>
                            </div>
                            <ul className="sideMenuList">
                                <li className="sideMenuItem" >
                                    <Link to='/'><button className="sideMenuButton" type='submit'>home</button></Link>
                                </li>
                                <li className="sideMenuItem">
                                    <Link to='/users'><button className="sideMenuButton" type='submit'>users</button></Link>
                                </li>
                                <li className="sideMenuItem">
                                    <Link to='/blog'><button className="sideMenuButton" type='submit'>location blogs</button></Link>
                                </li>
                            </ul>

                        </div>
                        <div className='content' style={{margin: '80px'}}>
                            <Switch>
                                <Route exact path="/" component={StartPage} />
                                <Route exact path="/users" component={UsersPage} />
                                <Route exact path="/blog" component={LocationBlogPage.AddLocationBlog} />
                                <Route component={NotFoundPage} />
                            </Switch>
                        </div>
                    </div>
                </div >
            </Router >
        );
    }
}
