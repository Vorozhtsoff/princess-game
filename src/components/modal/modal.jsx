import {h, Component } from 'preact';

import styles from './modal.css';

export default class Modal extends Component {
    render() {
        return (
            <div class={ styles.modal }>
                { this.props.children }
            </div>
        )
    }
}