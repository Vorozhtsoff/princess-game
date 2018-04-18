import { getAction } from '../sockets/listeners';
import { DEAD, DEAD_TO } from '../sockets';

const initialState = {
    isDragonKiller: false,
    dead: false
}

const RESET_RESULT = 'RESET_RESULT';
const DETECT_DRAGON_KILL = 'DETECT_DRAGON_KILL';

export const resetResult = () => ({ type: RESET_RESULT });
export const detectDragonKill = () => ({ type: DETECT_DRAGON_KILL });

export default function resultReducer(state = {}, action) {
    switch (action.type) {
        case getAction(DEAD): return { ...action.payload, dead: true };
        case getAction(DEAD_TO): return state;
        case DETECT_DRAGON_KILL: return { ...state, isDragonKiller: true };
        case RESET_RESULT: return initialState;
        default: return state;
    }
}
