import { h, Component } from 'preact';

import Button from '../button';
import SimpleLink from '../simple-link';
import { Link } from 'preact-router/match';

import styles from './game-result.css';

export default class GameResult extends Component {
    render({ score, kills, name }) {
        return (
            <div class={ styles.tombstone }>
                <div class={ styles.leftSide }>
                    <img
                        class={ styles['dead-title'] }
                        src='../../img/dead-title.png'
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
                        src='../../img/death.png'
                    />
                    <div class={ styles.name }>{ name }</div>
                    <dl class={ styles.table }>
                        <div class={ styles.tableRow }>
                            <dd><img class={ styles.imgMoney } src='../../img/money.png' /></dd>
                            <dt>{ score }</dt>
                        </div>
                    </dl>
                </div>
                <div class={ styles.actions }>
                    <div class={ `${styles.leftSide} ${styles.linksGroup}` }>
                        <SimpleLink href='/'>На главную</SimpleLink>
                    </div>
                    <div class={ `${styles.rightSide} ${styles.center}` }>
                        <Button>
                            <Link href='/settings'>
                                В АТАКУ!
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
