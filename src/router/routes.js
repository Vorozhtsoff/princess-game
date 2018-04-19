import Main from '../components/main';
import Settings from '../components/settings';
import Game from '../components/game';
import Statistic from '../components/statistic';
console.log(Statistic);

const routes = [
    { Component: Main, path: '/' },
    { Component: Settings, path: '/settings' },
    { Component: Game, path: '/game' },
    { Component: Statistic, path: '/results' }
];

export default routes;
