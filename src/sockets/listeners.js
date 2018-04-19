import { applyListeners, socketEmit } from '../modules/redux-socket';
import { iterateObject, localStorage } from '../utils';
import Canvas from '../modules/canvas';
import { detectDragonKill } from '../reducers/result';
import {
    GET_STATISTIC_SINGLE,
    USER_LOGIN,
    GET_AREA,
    DEAD_TO,
    GET_SCENE,
    FINISH_GAME,
    DEAD,
    SHOT,
    HIT,
    CHANGE_NAME
} from './event-types';

let canvas = null;

export const DRAGON = 'dragon';
export const PRINCESS = 'princess';

const playerTypes = {
    dragon: DRAGON,
    phone: PRINCESS
};

const img = new Image();
img.src = '/assets/img/map.png';


export const getAction = (type) => {
    // console.log(type, `SOCKET_ON_${type}`)
    return `SOCKET_ON_${type}`;
};

const drawDragon = ({ position, size }) => (
    canvas.point(position.x, position.y, size, 'blue')
);

const drawBoom = ({ x, y, radius }) => (
    radius > 0 && canvas.point(x, y, radius, 'black')
);


const onAnyKill = payload => ({
    type: getAction(DEAD_TO),
    payload
});

const isDragon = type => type === DRAGON;

const onKill = type => (dispatch) => {
    const correctedType = playerTypes[type];

    dispatch(onAnyKill(correctedType));

    if (isDragon(correctedType)) {
        dispatch(socketEmit(FINISH_GAME));
        dispatch(detectDragonKill())
    }
}

const getArea = payload => ({ type: getAction(GET_AREA), payload });
const getScene = payload => ({ type: getAction(GET_SCENE), payload });
const setName = payload => ({ type: getAction(USER_LOGIN), payload });
const changeName = payload => ({ type: getAction(CHANGE_NAME), payload });
const getDead = payload => ({ type: getAction(DEAD), payload });
const onGetStatisticSingle = payload => ({ type: getAction(GET_STATISTIC_SINGLE), payload });

export default applyListeners({
    [USER_LOGIN]: (data, store) => {
        localStorage.setItem('name', data.name);
        return store.dispatch(setName(data))
    },
    [GET_AREA]: (data, store) => {
        canvas = Canvas({
            area: {
                left: data.CENTER.x - data.X_SIZE / 2,
                bottom: data.CENTER.y - data.Y_SIZE / 2,
                width: data.X_SIZE,
                height: data.Y_SIZE,
                z: data.Z_SIZE
            },
            image: img,
            className: 'map',
            parent: '.mapWrapper',
            width: window.innerWidth * 0.6936,
            height: window.innerHeight * 0.6937
        });

        store.dispatch(getArea(data));
    },
    [CHANGE_NAME]: (data, store) => {
        localStorage.setItem('name', data.name);
        store.dispatch(changeName(data))
    },
    [GET_SCENE]: (data, store) => {
        const CROSS = 1;

        if (!canvas) {
            return;
        }

        canvas.clear();

        if (data.dragon) {
            drawDragon(data.dragon);
        }

        if (data.booms) {
            iterateObject(data.booms, (prop, { position, radius }) => (
                drawBoom({ x: position.x, y: position.y, radius })
            ));
        }

        if (data.princess) {
            iterateObject(
                data.princess,
                (id, {
                    position, viewDirect, size, color
                }) => {
                    const { x, y } = position;
                    canvas.line(
                        x,
                        y,
                        x + CROSS * Math.sin(viewDirect),
                        y + CROSS * Math.cos(viewDirect),
                        'rgba(0,0,0,1)',
                        1
                    );

                    canvas.point(x, y, size, color);
                }
            );

            canvas.line(0.6, 2.3, 0.6, 2.3, 'red', 1);
        }

        if (data.shots) {
            iterateObject(data.shots, (prop, { position }) => (
                canvas.point(position.x, position.y, null, 'red')
            ));
        }

        store.dispatch(getScene(data));
    },
    [DEAD_TO]: (data, store) => store.dispatch(onKill(data)),
    [SHOT]: (data) => console.log(SHOT, data),
    [HIT]: (data) => console.log(HIT, data),
    [GET_STATISTIC_SINGLE]: (data, store) => store.dispatch(onGetStatisticSingle(data)),
    [DEAD]: (data, store) => {
        store.dispatch(getDead(data));
        socketEmit(FINISH_GAME);
    }
});
