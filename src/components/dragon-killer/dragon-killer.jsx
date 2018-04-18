import { h, Component } from 'preact';
import { concatClasses } from '../../utils';

import styles from './styles.css';
console.log(styles.blockCenter, styles.blockCenter);

export default class DragonKiller extends Component {
    render() {
        return (
            <div class={ styles.wrapper }>
                <div className={ styles.inner }>
                    <img
                        class={ concatClasses(styles.title, styles.blockCenter) }
                        src='../../img/dragon-killer-title.png'
                        alt='это невероятно'
                    />
                    <img
                        class={ concatClasses(styles.logo, styles.blockCenter) }
                        src='../../img/head.png'
                        alt='logo'
                    />
                    <p class={ styles.text }>
                        Теперь твоя очередь<br />
                        управлять драконом!<br />
                        ОТОМСТИ ЗА ВСЕ!
                    </p>
                    <p class={ styles.subtext }>
                        Покажи это сообщение организаторам<br />
                        и готовься надеть VR-шлем
                    </p>
                </div>
            </div>
        )
    }
}
