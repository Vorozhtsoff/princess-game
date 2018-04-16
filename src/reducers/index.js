import { combineReducers } from 'redux';
import colors from './colors';
import settings from './settings';
import app from './app';


export default combineReducers({
    app,
    colors,
    settings
});
