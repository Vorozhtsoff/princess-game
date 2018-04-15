import { h } from 'preact';
import Router from 'preact-router';

import { mapRoutes } from './map-routes';


export default (config = []) => {
    return () => (
        <Router>
            { config.map(mapRoutes) }
        </Router>
    );
}
