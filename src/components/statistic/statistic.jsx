import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { concatClasses } from '../../utils';

import styles from './statistic.css';
import img from '../../img/cup.png';


const mapState = ({ statistic }) => ({ statistic });

class Statistic extends Component {
    static defaultProps = {
        statistic: [
            { name: 'пальма 31', kills_count: 4, kills_dragon_count: 25, score: 2540 },
            { name: 'пальма 31', kills_count: 4, kills_dragon_count: 25, score: 2540 },
            { name: 'пальма 31', kills_count: 4, kills_dragon_count: 25, score: 2540 }
        ]
    }

    renderRow = ({ name, score }, index) => {
        return (
            <tr class={ styles.row }>
                <td class={ styles.number }>
                    <img class={ styles.icon } src={ img } />
                    <div class={ styles.italic }>
                        { index + 1 }
                    </div>
                </td>
                <td class={ styles.name }>{ name }</td>
                <td class={ concatClasses(styles.score, styles.italic) }>{ score }</td>
            </tr>
        )
    }
    render({ statistic }) {
        return (
            <div class={ styles.page }>
                <img class={ styles.title } src='../../img/r.png' alt='рейтинг' />
                <table class={ styles.table }>
                    { statistic.map(this.renderRow) }
                </table>
            </div>
        )
    }
}

export default connect(mapState)(Statistic);
