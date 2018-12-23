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
                <div className="app" style={styles.app}>
                    <div style={styles.topMenu}>
                        <h1>4 semester noter</h1>
                    </div>
                    <div className='middle' style={styles.middle}>
                        <div className='sideMenu' style={styles.sideMenu}>
                            <div style={styles.sideMenuTitleContainer}><h4 style={styles.sideMenuTitle}>Security</h4></div>
                            <ul style={styles.sideMenuList}>
                                <li style={styles.sideMenuItem}>
                                    <Link to='/'><button style={styles.sideMenuButton} type='submit'>home</button></Link>
                                </li>
                                <li style={styles.sideMenuItem}>
                                    <Link to='/register'><button style={styles.sideMenuButton} type='submit'>register</button></Link>
                                </li>
                            </ul>
                            <div style={styles.sideMenuTitleContainer}><h4 style={styles.sideMenuTitle}>Fullstack JavaScript</h4></div>
                            <ul style={styles.sideMenuList}>
                                <li style={styles.sideMenuItem}>
                                    <Link to='/js'><button style={styles.sideMenuButton} type='submit'>to be finished</button></Link>
                                </li>
                                <li style={styles.sideMenuItem}>
                                    <Link to='/js'><button style={styles.sideMenuButton} type='submit'>to be finished</button></Link>
                                </li>
                                <li style={styles.sideMenuItem}>
                                    <Link to='/js'><button style={styles.sideMenuButton} type='submit'>to be finished</button></Link>
                                </li>
                                <li style={styles.sideMenuItem}>
                                    <Link to='/js'><button style={styles.sideMenuButton} type='submit'>to be finished</button></Link>
                                </li>
                            </ul>
                            <div style={styles.sideMenuTitleContainer}><h4 style={styles.sideMenuTitle}>Fullstack JavaScript</h4></div>
                            <ul style={styles.sideMenuList}>
                                <li style={styles.sideMenuItem}>
                                    <Link to='/js'><button style={styles.sideMenuButton} type='submit'>to be finished</button></Link>
                                </li>
                                <li style={styles.sideMenuItem}>
                                    <Link to='/js'><button style={styles.sideMenuButton} type='submit'>to be finished</button></Link>
                                </li>
                                <li style={styles.sideMenuItem}>
                                    <Link to='/js'><button style={styles.sideMenuButton} type='submit'>to be finished</button></Link>
                                </li>
                                <li style={styles.sideMenuItem}>
                                    <Link to='/js'><button style={styles.sideMenuButton} type='submit'>to be finished</button></Link>
                                </li>
                            </ul>

                        </div>
                        <div className='content' style={styles.content}>
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

const styles = {
    app: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        display: 'grid',
        'grid-template-rows': '50px calc(100% - 50px)',
        'font-family': 'Arial, Helvetica, sans-serif'
    },
    middle: {
        display: 'grid',
        'grid-template-columns': '200px calc(100% - 200px)',
    },
    sideMenu: {
        backgroundColor: '#2FA1C4',
        'overflow-y': 'auto',
        display: 'flex',
        'flex-direction': 'column',
    },
    topMenu: {
        display: 'flex',
        'flex-direction': 'row',
        'justify-content': 'center',
        'align-items': 'center',
        backgroundColor: '#248BB3',
        color: '#FFFFFF',
        'font-weight': 5
    },
    sideMenuTitleContainer: {
        width: '100%',
        backgroundColor: '#195C73',
        'padding-top': '15px',
        'padding-bottom': '15px',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    },
    content: {
        'overflow-y': 'auto',
    },
    sideMenuItem: {
        width: '100%',
        backgroundColor: '#475643',
    },
    sideMenuList: {
        width: '100%',
        padding: 0,
        'list-style-type': 'none',
        backgroundColor: '#6a9b5d'
    },
    sideMenuButton: {
        'border': 'none',
        width: '100%',
        backgroundColor: '#2FA1C4',
        height: '24px',
        margin: 0,
        color: '#FFFFFF'
    },
    sideMenuTitle: {
        padding: 0,
        margin: 0,
        color: '#47bde5'
    }
}
