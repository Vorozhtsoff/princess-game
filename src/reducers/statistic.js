import { GET_STATISTIC } from '../sockets';
import { getAction } from '../sockets/listeners';

const initialState = [];


export default function mapReducer(state = initialState, action) {
    switch (action.type) {
        case getAction(GET_STATISTIC): return [ ...action.payload ];
        default: return state;
    }
}
