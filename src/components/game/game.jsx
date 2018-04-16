import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { socketEmit } from '../../modules/redux-socket';
import { getAngle } from '../../utils/math';
import gamepad from '../../modules/gamepad';
import multikey from '../../modules/multikey';
import throttle from 'lodash/throttle';

import {
    SHOT,
    START_GAME,
    USER_LOGIN,
    MOVE_PERSON
} from '../../sockets';

import './game.css';

const getSpeed = (x, y) => Math.sqrt(x ** 2 + y ** 2) / 10;

const mapState = ({ colors, settings }) => ({
    selectedColor: colors.selected,
    deviceType: settings.device,
    userId: settings.userId
});

const mapActions = {
    socketEmit
};

class Game extends Component {
    interval = null;
    socketEmitThrottle = throttle((action, payload) => this.props.socketEmit(action, payload), 50)

    stopMoving = data => this.props.socketEmit(MOVE_PERSON, {
        moveDirect: getAngle(data['x-axis'], data['y-axis']),
        viewDirect: getAngle(data['x-axis'], data['y-axis']),
        speed: 0
    })

    handleChange = (map) => {
        const axisX = map['x-axis'];
        const axisY = map['y-axis'];

        if (map.a) {
            this.socketEmitThrottle(SHOT);
        }

        if (axisX || axisY) {
            clearTimeout(this.interval);
            this.interval = setTimeout(() => this.stopMoving(map), 400);

            this.socketEmitThrottle(MOVE_PERSON, {
                moveDirect: getAngle(axisX, axisY),
                viewDirect: getAngle(axisX, axisY),
                speed: getSpeed(axisX, axisY)
            });
        }
    }

    componentWillMount() {
        const {
            userId,
            socketEmit,
            deviceType,
            selectedColor
        } = this.props;

        socketEmit(START_GAME);

        gamepad.setup({
            canvas: 'controller',
            trace: true,
            leftStick: true,
            debug: true,
            hint: true,
            onStateChanges: this.handleChange,
            buttons: [{ name: 'a', key: 'a' }]
        });

        multikey.setup(gamepad.events, 'qwasbv', true);
    }

    render() {
        return (
            <div>
                Играем
            </div>
        )
    }
}

export default connect(mapState, mapActions)(Game);
