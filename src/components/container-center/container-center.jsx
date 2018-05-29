import { h, Component } from 'preact';

import styles from './container-center.css';


export default class ContainerCenter extends Component {
    render() {
        return (
            <div class={ styles.container }>
                <div>
                    { this.props.children }
                </div>
            </div>
        )
    }
}
