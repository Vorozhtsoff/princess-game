import { GET_SCENE } from '../sockets';
import { getAction } from '../sockets/listeners';

const initialState = {};


export default function mapReducer(state = initialState, action) {
    switch (action.type) {
        case getAction(GET_SCENE): return { ...state, ...action.payload };
        default: return state;
    }
}
