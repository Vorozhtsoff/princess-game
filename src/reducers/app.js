import { CHANGE_NAME, USER_LOGIN } from '../sockets';
import { localStorage, getRandomColor } from '../utils';
import { getAction } from '../sockets/listeners';

const initialState = {
    color: null,
    name: null
}

export const SELECT_COLOR = 'SELECT_COLOR';
export const selectColor = color => {
    localStorage.setItem('color', color);

    return { type: SELECT_COLOR, payload: color };
};

export const getColor = (colors) => {
    let color = localStorage.getItem('color');

    if (!color) {
        color = getRandomColor(colors);
        localStorage.setItem('color', color);
    }

    return { type: SELECT_COLOR, payload: color };
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case getAction(CHANGE_NAME): return { ...state, ...action.payload }
        case getAction(USER_LOGIN): return { ...state, ...action.payload }
        case SELECT_COLOR: return { ...state, color: action.payload }
        default: return state;
    }
}
