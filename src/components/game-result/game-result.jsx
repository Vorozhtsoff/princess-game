import { h, Component } from 'preact';

import ButtonLink from '../button-link';
import Table from '../table';
import SimpleLink from '../simple-link';

import styles from './game-result.css';
import title from '../../img/dead-title.png';
import death from '../../img/death.png'


export default class GameResult extends Component {
    render({ score, kills, name }) {
        return (
            <div class={ styles.tombstone }>
                <div class={ styles.leftSide }>
                    <img
                        class={ styles['dead-title'] }
                        src={ title }
                        alt='ты умер в бою'
                    />
                    <p class={ styles.description }>
                        Ты был легкой мишенью, но у тебя есть все шансы стать лидером рейтинга.
                        На кону брендовые трофеи ЦВТ.
                    </p>
                </div>
                <div class={ styles.rightSide }>
                    <img
                        class={ styles.logo }
                        src={ death }
                    />
                    <div class={ styles.name }>{ name }</div>
                    <Table
                        score={ score }
                    />
                </div>
                <div class={ styles.actions }>
                    <div class={ `${styles.leftSide} ${styles.linksGroup}` }>
                        <SimpleLink href='/'>На главную</SimpleLink>
                    </div>
                    <div class={ `${styles.rightSide} ${styles.center}` }>
                        <ButtonLink href='/settings'> В АТАКУ! </ButtonLink>
                    </div>
                </div>
            </div>
        );
    }
}
