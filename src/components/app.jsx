import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';

if (module.hot) {
    require('preact/debug'); // eslint-disable-line global-require
}

export default class App extends Component {
    handleRoute (e) {
        this.currentUrl = e.url;
    }

    render () {
        return (
            <div id='app'>
                <Header />
                <Router onChange={ this.handleRoute }>
                    <Home path='/' />
                    <Profile path='/profile/' user='me' />
                    <Profile path='/profile/:user' />
                </Router>
            </div>
        );
    }
}
