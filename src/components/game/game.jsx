import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { socketEmit } from '../../modules/redux-socket';
import { getAngle } from '../../utils/math';
import gamepad from '../../modules/gamepad';
import multikey from '../../modules/multikey';
import throttle from 'lodash/throttle';
import Modal from '../modal';
import Button from '../button';
import SimpleLink from '../simple-link';
import { Link } from 'preact-router/match'

import {
    SHOT,
    START_GAME,
    FINISH_GAME,
    MOVE_PERSON
} from '../../sockets';

import styles from './game.css';

const getSpeed = (x, y) => Math.sqrt(x ** 2 + y ** 2) / 10;

const mapState = ({ colors, settings, result }) => ({
    selectedColor: colors.selected,
    deviceType: settings.device,
    userId: settings.userId,
    result
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
            socketEmit
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

    componentWillUnmount() {
        const list = document.getElementsByTagName('canvas');

        Array.from(list).forEach((item) => {
            document.body.removeChild(item);
        });

        this.props.socketEmit(FINISH_GAME);
    }

    render() {
        const { result } = this.props;
        const { dead, name, score, kills_count } = result;
        return (
            <div>
                {
                    dead &&
                    <Modal>
                        <div class={ styles.tombstone }>
                            <div class={ styles['left-side'] }>
                                <img class={ styles['dead-title'] } src="../../img/dead-title.png" alt="ты умер в бою"/>
                                <p class={ styles.description }>
                                    Ты был легкой мишенью, но у тебя есть все шансы стать лидером рейтинга.
                                    На кону брендовые трофеи ЦВТ.
                                </p>
                            </div>
                            <div class={ styles['right-side'] }>
                                { name } <br />
                                рейтинг: { score } <br />
                                убийств: { kills_count } <br />
                            </div>
                            <div class={ styles.actions }>
                                <SimpleLink href='/'>На главную</SimpleLink>
                                <Button>
                                    <Link href='/settings'>
                                        В АТАКУ!
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </Modal>
                }
            </div>
        )
    }
}

export default connect(mapState, mapActions)(Game);
