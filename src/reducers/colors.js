const SELECT_COLOR = 'SELECT_COLOR';

export const selectColor = payload => ({ type: SELECT_COLOR, payload });

const initialState = {
    colors: ['#9C02A7FF', '#FF5301FF', '#1634ADFF', '#FEBB02FF', '#019898FF', '#01CB01FF', '#DEF801FF'],
    selected: null
};


export default function colorsReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_COLOR: return { ...state, selected: action.payload };
        default: return state;
    }
}
