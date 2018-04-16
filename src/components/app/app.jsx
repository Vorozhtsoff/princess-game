import { h, Component } from 'preact';
import Router from '../../router';
import styles from './app.css';
import bg from './bg.png'

const style = {
    backgroundImage: `url(${bg})`
}

export default class App extends Component {
    handleRoute = (e) => {
        this.currentUrl = e.url;
    }

    render() {
        return (
            <div style={ style } class={ styles.app }>
                <Router />
            </div>
        );
    }
}
