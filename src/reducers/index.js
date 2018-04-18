import { combineReducers } from 'redux';
import settings from './settings';
import app from './app';
import result from './result';


export default combineReducers({
    app,
    settings,
    result
});
