import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import styles from './button-link.css';

export default class ButtonLink extends Component {
    render({ href }) {
        return (
            <Link class={ styles.button } href={ href }>
                { this.props.children }
            </Link>
        );
    }
}
