import { getAction } from '../sockets/listeners';
import { DEAD, DEAD_TO, GET_STATISTIC_SINGLE, HIT } from '../sockets';

const initialState = {
    isDragonKiller: false,
    hp: 100,
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
        case getAction(HIT): console.log(HIT); return { ...state, ...action.payload };
        case getAction(GET_STATISTIC_SINGLE): {
            return { ...state, ...action.payload };
        }
        case DETECT_DRAGON_KILL: return { ...state, isDragonKiller: true };
        case RESET_RESULT: return { ...state, ...initialState };
        default: return state;
    }
}
