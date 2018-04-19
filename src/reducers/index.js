import { combineReducers } from 'redux';
import settings from './settings';
import app from './app';
import result from './result';
import canvas from './canvas';
import map from './map';


export default combineReducers({
    app,
    map,
    canvas,
    settings,
    result
});
