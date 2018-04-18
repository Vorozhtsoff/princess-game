import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import Router from '../../router';
import { socketEmit } from '../../modules/redux-socket';
import { getColor } from '../../reducers/app';
import styles from './app.css';
import bg from './bg.png';


import {
    USER_LOGIN
} from '../../sockets';

const style = {
    backgroundImage: `url(${bg})`
}

const mapState = ({ settings, app }) => ({
    selectedColor: app.color,
    deviceType: settings.device,
    colors: settings.colors,
    userId: settings.userId
});

const mapAction = {
    socketEmit,
    getColor
};

class App extends Component {
    componentWillMount() {
        const {
            colors,
            userId,
            getColor,
            socketEmit,
            deviceType,
            selectedColor
        } = this.props;
        let newColor = null;

        if (!selectedColor) {
            newColor = getColor(colors).payload;
        }

        socketEmit(USER_LOGIN, {
            type: deviceType,
            id: userId,
            color: selectedColor || newColor
        });
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
