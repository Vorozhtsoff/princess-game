import App from './components/app';
import { h, Component } from 'preact';
import { Provider } from 'preact-redux';

import configureStore from './configure-store';

const store = configureStore();


export default class Root extends Component {
    render() {
        return (
            <Provider store={ store }>
                <App />
            </Provider>
        );
    }
}
