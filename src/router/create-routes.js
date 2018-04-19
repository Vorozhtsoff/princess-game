import { h } from 'preact';
import Router from 'preact-router';

import { mapRoutes } from './map-routes';


export default (config = []) => {
    return ({ history }) => (
        <Router history={ history }>
            { config.map(mapRoutes) }
        </Router>
    );
}
