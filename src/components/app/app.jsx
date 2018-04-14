import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Button from '../button';
import styles from './app.css';

import Home from '../../routes/home';

export default class App extends Component {
    handleRoute = (e) => {
        this.currentUrl = e.url;
    }

    render() {
        return (
            <div id={ styles.app }>
                <Button>button</Button>
                <Router onChange={ this.handleRoute }>
                    <Home path='/' />
                </Router>
            </div>
        );
    }
}
