import { CHANGE_NAME, USER_LOGIN } from '../sockets';
import { getAction } from '../sockets/listeners';

export default function appReducer(state = {}, action) {
    switch (action.type) {
        case getAction(CHANGE_NAME): return { ...state, ...action.payload }
        case getAction(USER_LOGIN): return { ...state, ...action.payload }
        default: return state;
    }
}