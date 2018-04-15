import { h, Component } from 'preact';
import Button from '../button';
import styles from './app.css';
import Router from '../../router';


export default class App extends Component {
    handleRoute = (e) => {
        this.currentUrl = e.url;
    }

    render() {
        return (
            <div id={ styles.app }>
                <Button>button</Button>
                <Router />
            </div>
        );
    }
}
