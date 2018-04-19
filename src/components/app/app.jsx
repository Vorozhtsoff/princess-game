import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import Router from '../../router';
import { socketEmit } from '../../modules/redux-socket';
import { getColor, getName } from '../../reducers/app';
import styles from './app.css';
import bg from '../../img/bg.png';
import Rolling from '../rolling';


import {
    USER_LOGIN,
    GET_STATISTIC_SINGLE
} from '../../sockets';

const style = {
    backgroundImage: `url(${bg})`
}

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
    }


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

export default connect(mapState, mapAction)(App);
