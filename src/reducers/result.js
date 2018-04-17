import { getAction } from '../sockets/listeners';
import { DEAD } from '../sockets';

const initialState = {
    dead: false
}

const RESET_RESULT = 'RESET_RESULT';

export const resetResult = () => ({ type: RESET_RESULT });

export default function resultReducer(state = {}, action) {
    switch (action.type) {
        case getAction(DEAD): return { ...action.payload, dead: true };
        case RESET_RESULT: return initialState;
        default: return state;
    }
}
