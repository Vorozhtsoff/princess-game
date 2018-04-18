import io from 'socket.io-client';
import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import { createSocketMiddleware } from './modules/redux-socket';
import thunk from 'redux-thunk';

import { listeners, config } from './sockets';


export default function configureStore(initState = {}) {
    const EXT_NAME = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

    const composeEnhancers = global[EXT_NAME] ? global[EXT_NAME]({}) : compose;

    const store = createStore(
        reducers,
        initState,
        composeEnhancers(
            applyMiddleware(
                thunk,
                createSocketMiddleware(io(config.HOST), listeners)
            )
        )
    );

    return store;
}
