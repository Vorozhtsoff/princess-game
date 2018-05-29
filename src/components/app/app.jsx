import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import Router from '../../router';
import { socketEmit } from '../../modules/redux-socket';
import { getColor, getName, updateOrientation } from '../../reducers/app';
import { fullScreen } from '../../utils';
import createHashHistory from 'history/createHashHistory';

import SizeObserver from '../size-observer';
import IOsAdapter from '../ios-adapter';

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
    width: app.width,
    height: app.height,
    userId: settings.userId
});

const mapAction = {
    updateOrientation,
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

    render({ width, height }) {
        return (
            <div
                style={ `width: ${width}px; height: ${height}px;` }
                onClick={ this.getFullscreen } class={ styles.wrapper }
            >
                <IOsAdapter />
                <SizeObserver onResize={ this.props.updateOrientation } />
                <div ref={ this.appRef } class={ styles.app }>
                    <Router history={ createHashHistory() } />
                </div>
            </div>
        );
    }
}

export default connect(mapState, mapAction)(App);
