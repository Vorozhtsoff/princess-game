import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import Router from '../../router';
import { socketEmit } from '../../modules/redux-socket';
import { getColor, getName } from '../../reducers/app';
import { fullScreen } from '../../utils';

import styles from './app.css';


import {
    USER_LOGIN,
    GET_STATISTIC_SINGLE
} from '../../sockets';


const mapState = ({ settings, app }) => ({
    selectedColor: app.color,
    name: app.name,
    deviceType: settings.device,
    colors: settings.colors,
    userId: settings.userId
});

const mapAction = {
    socketEmit,
    getColor,
    getName
};

class App extends Component {
    componentDidMount() {
        const {
            name,
            colors,
            userId,
            getName,
            getColor,
            socketEmit,
            deviceType,
            selectedColor
        } = this.props;
        let n = null;
        let c = null;

        if (!name) {
            n = getName().payload;
        }

        if (!selectedColor) {
            c = getColor(colors).payload;
        }

        socketEmit(USER_LOGIN, {
            type: deviceType,
            id: userId,
            color: selectedColor || c,
            name: name || n
        });
        socketEmit(GET_STATISTIC_SINGLE);

        document.body.addEventListener('click', this.getFullscreen);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.getFullscreen);
    }


    handleRoute = (e) => {
        this.currentUrl = e.url;
    }

    appRef = (c) => {
        this.app = c;
    }

    getFullscreen = () => {
        fullScreen(document.body);
    }

    render() {
        return (
            <div onClick={ this.getFullscreen } class={ styles.wrapper }>
                <div ref={ this.appRef } class={ styles.app }>
                    <Router />
                </div>
            </div>
        );
    }
}

export default connect(mapState, mapAction)(App);
