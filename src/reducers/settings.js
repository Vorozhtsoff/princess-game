import { auth } from '../utils';


const initialState = {
    device: 'phone',
    userId: auth(),
    colors: ['#9C02A7', '#FF5301', '#1634AD', '#FEBB02', '#019898', '#01CB01', '#DEF801']
}

export default function settingsReducer(state = initialState, action) {
    switch (action.type) {
        default: return state;
    }
}
