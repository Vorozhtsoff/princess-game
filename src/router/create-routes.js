import { h } from 'preact';
import Router from 'preact-router';

import { mapRoutesConfig } from './map-routes-config';


export default (config = []) => {
    return () => (
        <Router>
            { config.map(mapRoutesConfig) }
        </Router>
    );
}
