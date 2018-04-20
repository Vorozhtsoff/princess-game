import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { concatClasses } from '../../utils';

import styles from './styles.css';

import title from '../../img/dragon-killer-title.png';
import head from '../../img/head.png';


export default class DragonKiller extends Component {
    render() {
        return (
            <div class={ styles.wrapper }>
                <div className={ styles.inner }>
                    <img
                        class={ concatClasses(styles.title, styles.blockCenter) }
                        src={ title }
                        alt='это невероятно'
                    />
                    <img
                        class={ concatClasses(styles.logo, styles.blockCenter) }
                        src={ head }
                        alt='logo'
                    />
                    <p class={ styles.text }>
                        Теперь твоя очередь<br />
                        управлять драконом!<br />
                        ОТОМСТИ ЗА ВСЕ!
                    </p>
                    <p class={ styles.subtext }>
                        Покажи это сообщение организаторам<br />
                        и готовься надеть VR-шлем или { ' ' }
                        <Link href='/settings' class={ styles.link }>начни заново</Link>
                    </p>
                </div>
            </div>
        )
    }
}
