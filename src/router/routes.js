import Main from '../components/main';
import Settings from '../components/settings';
import Game from '../components/game';

const routes = [
    { Component: Main, path: '/' },
    { Component: Settings, path: '/settings' },
    { Component: Game, path: '/game' }
];

export default routes;
