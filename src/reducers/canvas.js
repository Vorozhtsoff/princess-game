import { GET_AREA } from '../sockets';
import { getAction } from '../sockets/listeners';

const initialState = {};


export default function canvasReducer(state = initialState, action) {
    switch (action.type) {
        case getAction(GET_AREA): {
            const width = window.innerWidth * 0.6936;
            const height = width * 0.5620;

            return {
                ...state,
                ...action.payload,
                width,
                height
            };
        }
        default: return state;
    }
}
