import { h, Component } from 'preact';
import { Link } from 'preact-router';

import styles from './simple-link.css';

export default class SimpleLink extends Component {
    render() {
        return (
            <Link href={ this.props.href } class={ styles.link }>
                { this.props.children }
            </Link>
        )
    }
}