import { h, Component } from 'preact';
import { concatClasses } from '../../utils';
import ButtonLink from '../button-link';
import styles from './style';


export default class Rolling extends Component {
    render() {
        return (
            <div class={ styles.main }>
                <div>
                    <img class={ concatClasses(styles.logo, styles.blockCenter) } src='../../img/Дракон и Принцессы.png' alt='драконы и принцессы' />
                </div>
                <p class={ styles.message }>
                    Чтобы сыграть в&nbsp;нашу игру, переверните телефон
                </p>
                <img class={ concatClasses(styles.messageImage, styles.blockCenter) } src='../../img/rolling.svg' />
                <div class={ styles.actions }>
                    <ButtonLink href={ '/settings' }>Играть</ButtonLink>
                </div>
            </div>
        );
    }
}
