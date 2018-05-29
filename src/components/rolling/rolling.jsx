import { h, Component } from 'preact';

import ButtonLink from '../button-link';
import ContainerCenter from '../container-center';

import { concatClasses } from '../../utils';

import styles from './style';

import img from '../../img/rolling.svg';
import logo from '../../img/main-logo.png';


export default class Rolling extends Component {
    render() {
        return (
            <div class={ styles.main }>
                <ContainerCenter>
                    <div class={ styles.shift }>
                        <img class={ concatClasses(styles.logo, styles.blockCenter) } src={ logo } alt='драконы и принцессы' />
                        <p class={ styles.message }>
                            Чтобы сыграть в&nbsp;нашу игру, переверните телефон
                        </p>
                        <img
                            class={ concatClasses(styles.messageImage, styles.blockCenter) }
                            src={ img }
                        />
                        <div class={ styles.actions }>
                            <ButtonLink href={ '/settings' }>Играть</ButtonLink>
                        </div>
                    </div>
                </ContainerCenter>
            </div>
        );
    }
}
