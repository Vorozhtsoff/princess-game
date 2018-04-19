import { h, Component } from 'preact';

import styles from './table.css';
import money from '../../img/money.png'


export default class Table extends Component {
    render({ score }) {
        return (
            <dl class={ styles.table }>
                <div class={ styles.tableRow }>
                    <dd><img class={ styles.imgMoney } src={ money } /></dd>
                    <dt>{ score }</dt>
                </div>
            </dl>
        )
    }
}


