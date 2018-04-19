import { GET_AREA } from '../sockets';
import { getAction } from '../sockets/listeners';

const initialState = {};


export default function canvasReducer(state = initialState, action) {
    switch (action.type) {
        case getAction(GET_AREA): return { ...state, ...action.payload };
        default: return state;
    }
}
