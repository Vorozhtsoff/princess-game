import { Component } from 'preact';
import { when, compose, curryN } from 'ramda';

import {
    detectIOS,
    getSafariNavigateElementsHeight,
    preventEvent
} from '../../utils';


export default class IOsAdapter extends Component {
    container = null

    getContainer = () => document.body;

    getNavaigateHeight = () => {
        const result = -getSafariNavigateElementsHeight() / 2;
        console.log(result);
        return result;
    }

    preventTouchmove = element => element.addEventListener('touchmove', preventEvent, { passive: false })

    componentDidMount() {
        when(
            detectIOS,
            compose(
                curryN(2, window.scrollTo)(0),
                this.getNavaigateHeight
            ),
            null
        );

        compose(
            this.preventTouchmove,
            this.getContainer
        )()
    }

    render() {
        return null;
    }
}
