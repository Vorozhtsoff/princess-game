import { h, Component } from 'preact';
import Router from '../../router';


export default class App extends Component {
    handleRoute = (e) => {
        this.currentUrl = e.url;
    }

    render() {
        return (
            <div>
                <Router />
            </div>
        );
    }
}
