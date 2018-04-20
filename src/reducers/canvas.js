import { GET_AREA } from '../sockets';
import { getAction } from '../sockets/listeners';
import { UPDATE_ORIENTATION } from './app';
import { getAvailableArea } from '../utils';

const K_AREA = 69.36;
const K_SIDE = 56.20


const mathCanvasArea = ({ width, height }) => {
    return (height / width * 100) > K_AREA
        ? mathByWidth(width)
        : mathByHeight(height)
}

const mathByHeight = (h) => {
    const height = mathSideByWindow(h);
    const width = height * 100 / K_SIDE;

    return { height, width };
}

const mathSideByWindow = (s) => s * K_AREA / 100

const mathByWidth = (w) => {
    const width = mathSideByWindow(w);
    const height = width * K_SIDE / 100;

    return { height, width };
}

const initialState = {
    ...mathCanvasArea(getAvailableArea())
};

export default function canvasReducer(state = initialState, action) {
    switch (action.type) {
        case getAction(GET_AREA): {
            return {
                ...state,
                ...action.payload
            };
        }
        case UPDATE_ORIENTATION:
            return {
                ...state,
                ...mathCanvasArea(action.payload)
            }
        default: return state;
    }
}
