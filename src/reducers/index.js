import { combineReducers } from 'redux';
import colors from './colors';
import settings from './settings';
import app from './app';
import result from './result';


export default combineReducers({
    app,
    colors,
    settings,
    result
});
