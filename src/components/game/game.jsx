import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { socketEmit } from '../../modules/redux-socket';
import { getAngle } from '../../utils/math';
import gamepad from '../../modules/gamepad';
import multikey from '../../modules/multikey';
import throttle from 'lodash/throttle';
import Modal from '../modal';
import GameResult from '../game-result';
import DragonKiller from '../dragon-killer';
import { resetResult } from '../../reducers/result';

import {
    SHOT,
    START_GAME,
    FINISH_GAME,
    MOVE_PERSON
} from '../../sockets';


const getSize = v => `${parseInt(v)}px`;

const getSpeed = (x, y) => Math.sqrt(x ** 2 + y ** 2) / 10;

const mapState = ({ app, settings, result }) => ({
    selectedColor: app.color,
    deviceType: settings.device,
    userId: settings.userId,
    result
});

const mapActions = {
    socketEmit,
    resetResult
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
            socketEmit,
            resetResult
        } = this.props;

        resetResult();
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

    componentWillUnmount() {
        const list = document.getElementsByTagName('canvas');

        Array.from(list).forEach((item) => {
            document.body.removeChild(item);
        });

        this.props.socketEmit(FINISH_GAME);
    }

    render({ result }) {
        const { dead, name, score, kills_count: kills, isDragonKiller } = result;
        return (
            <div>
                <div
                    style={ {
                        width: getSize(window.innerWidth * 0.6936 + 35),
                        height: getSize(window.innerHeight * 0.6937 + 24)
                    } }
                    class={ 'mapWrapper' }
                />
                {
                    isDragonKiller &&
                        <Modal>
                            <DragonKiller
                            />
                        </Modal>
                }
                {
                    dead &&
                    <Modal>
                        <GameResult
                            name={ name }
                            score={ score }
                            kills={ kills }
                        />
                    </Modal>
                }
            </div>
        )
    }
}

export default connect(mapState, mapActions)(Game);
