import { auth } from '../utils';


const initialState = {
    device: 'phone',
    userId: auth()
}

export default function settingsReducer(state = initialState, action) {
    switch (action.type) {
        default: return state;
    }
}
