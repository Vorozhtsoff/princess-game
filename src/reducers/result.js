import { getAction } from '../sockets/listeners';
import { DEAD, START_GAME } from '../sockets';

const initialState = {
    dead: false
}

export default function resultReducer(state = {}, action) {
    switch (action.type) {
        case getAction(DEAD): return { ...action.payload, dead: true };
        case START_GAME: return initialState;
        default: return state;
    }
}
