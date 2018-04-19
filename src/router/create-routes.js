import { h } from 'preact';
import Router, { route } from 'preact-router';

import { mapRoutes } from './map-routes';

const MAIN_URL = '/';
const RESULTS_URL = '/results';

const handler = (e) => {
    if (!e.previous && ![MAIN_URL, RESULTS_URL].includes(e.url)) {
        route(MAIN_URL);
    }
}

export default (config = []) => {
    return ({ history }) => (
        <Router history={ history } onChange={ handler }>
            { config.map(mapRoutes) }
        </Router>
    );
}
