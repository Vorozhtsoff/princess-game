import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import Router from '../../router';
import { socketEmit } from '../../modules/redux-socket';
import styles from './app.css';
import bg from './bg.png';


import {
    USER_LOGIN
} from '../../sockets';

const style = {
    backgroundImage: `url(${bg})`
}

const mapState = ({ settings, colors }) => ({
    selectedColor: colors.selected,
    deviceType: settings.device,
    userId: settings.userId
});

const mapAction = {
    socketEmit
};

class App extends Component {
    componentWillMount() {
        const {
            userId,
            socketEmit,
            deviceType,
            selectedColor
        } = this.props;

        socketEmit(USER_LOGIN, {
            type: deviceType,
            id: userId,
            color: selectedColor
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