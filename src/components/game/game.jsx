import { h, Component } from 'preact';
import once from 'lodash/once';
import { connect } from 'preact-redux';
import { socketEmit } from '../../modules/redux-socket';
import { getAngle } from '../../utils/math';
import gamepad from '../../modules/gamepad';
import multikey from '../../modules/multikey';
import throttle from 'lodash/throttle';
import Modal from '../modal';
import Table from '../table';
import GameResult from '../game-result';
import DragonKiller from '../dragon-killer';
import { resetResult } from '../../reducers/result';
import { isClientSide } from '../../utils';

import {
    SHOT,
    START_GAME,
    FINISH_GAME,
    MOVE_PERSON
} from '../../sockets';

import styles from './game.css';
import { drawCanvas } from '../../draw/canvas';
import { drawMap } from '../../draw/map';

const getSize = v => `${parseInt(v)}px`;

const getSpeed = (x, y) => Math.sqrt(x ** 2 + y ** 2) / 10;

const mapState = ({ app, settings, result, canvas, map }) => ({
    selectedColor: app.color,
    name: app.name,
    isLandscape: app.isLandscape,
    isPortrait: app.isPortrait,
    deviceType: settings.device,
    userId: settings.userId,
    isLogged: app.isLogged,
    canvas,
    map,
    result
});

const mapActions = {
    socketEmit,
    resetResult
};

const getGradient = (percent) => `linear-gradient(to right, #EB5757 ${percent}%, #1F374C ${percent}%)`;

class Game extends Component {
    interval = null;
    socketEmitThrottle = throttle((action, payload) => this.props.socketEmit(action, payload), 50)

    stopMoving = data => this.props.socketEmit(MOVE_PERSON, {
        moveDirect: getAngle(data['x-axis'], data['y-axis']),
        viewDirect: getAngle(data['x-axis'], data['y-axis']),
        speed: 0
    })

    setRef = (name) => (c) => {
        this[name] = c;
    }

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

    startGame = once(() => this.props.socketEmit(START_GAME))

    drawCanvas = once(drawCanvas)

    componentDidMount() {
        const {
            resetResult,
            isLandscape
        } = this.props;

        resetResult();

        if (
            isClientSide() &&
            isLandscape
        ) {
            gamepad.setup({
                trace: true,
                leftStick: true,
                debug: true,
                hint: true,
                onStateChanges: this.handleChange,
                buttons: [{ name: 'a', key: 'a' }]
            });

            multikey.setup(gamepad.events, 'a', true);
        }
        // window.addEventListener('resize', () => alert(`${window.screen.height} ${window.screen.availHeight} ${window.innerHeight}`))

        // alert(`${window.screen.availWidth} ${window.screen.availHeight} ${window.innerHeight}`);
    }

    componentWillReceiveProps({ isLogged, canvas, map, isLandscape }) {
        if (isLogged) {
            this.startGame();
        }

        if (canvas.CENTER && this.wrapper && isLandscape) {
            this.container = this.drawCanvas(canvas);
        }
    }

    componentWillUnmount() {
        const list = document.getElementsByTagName('canvas');

        Array.from(list).forEach((item) => {
            document.body.removeChild(item);
        });

        this.props.socketEmit(FINISH_GAME);
    }

    render({ result, name, canvas, map }) {
        const { dead, score, kills_count: kills, isDragonKiller } = result;

        if (canvas.CENTER && this.wrapper && this.container) {
            drawMap(this.container)(map);
        }

        return (
            <div class={ styles.page }>
                <div
                    ref={ this.setRef('wrapper') }
                    style={ {
                        width: `calc(${getSize(canvas.width)} + 2vh`,
                        height: `calc(${getSize(canvas.height)} + 3vh)`
                    } }
                    class={ 'mapWrapper' }
                >
                    <canvas class='map' ref={ this.setRef('canvas') } />
                </div>
                <div class={ styles.resultPlay }>
                    <div class={ styles.name }>{ name }</div>
                    <div class={ styles.scoreWrapper }>
                        <Table score={ score } />
                    </div>
                </div>
                <div
                    style={ { backgroundImage: getGradient(result.hp) } }
                    class={ styles.hp }
                >{ result.hp }%
                </div>
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
