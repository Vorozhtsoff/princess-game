import { applyListeners, socketEmit } from '../modules/redux-socket';
import { localStorage } from '../utils';
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

export const DRAGON = 'dragon';
export const PRINCESS = 'princess';

const playerTypes = {
    dragon: DRAGON,
    phone: PRINCESS
};

export const getAction = (type) => {
    // console.log(type, `SOCKET_ON_${type}`)
    return `SOCKET_ON_${type}`;
};

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
    [GET_AREA]: (data, store) => store.dispatch(getArea(data)),
    [CHANGE_NAME]: (data, store) => {
        localStorage.setItem('name', data.name);
        store.dispatch(changeName(data))
    },
    [GET_SCENE]: (data, store) => store.dispatch(getScene(data)),
    [DEAD_TO]: (data, store) => store.dispatch(onKill(data)),
    [SHOT]: (data) => console.log(SHOT, data),
    [HIT]: (data) => console.log(HIT, data),
    [GET_STATISTIC_SINGLE]: (data, store) => store.dispatch(onGetStatisticSingle(data)),
    [DEAD]: (data, store) => {
        store.dispatch(getDead(data));
        socketEmit(FINISH_GAME);
    }
});
