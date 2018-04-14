import { h, Component } from 'preact';

import styles from './button.css';

export default class Button extends Component {
    render() {
        return (
            <button class={ styles.button }>{ this.props.children }</button>
        )
    }
}
