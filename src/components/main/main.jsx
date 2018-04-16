import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import Button from '../button';
import style from './style';


export default class Main extends Component {
    render() {
        return (
            <div class={ style.main }>
                <div>
                    <img class={ style.logo } src='../../img/Дракон и Принцессы.png' alt='драконы и принцессы' />
                </div>
                <p class={ style.message }>
                    Чтобы сыграть в&nbsp;нашу игру, переверните телефон
                </p>
                <div class={ style.actions }>
                    <Button>
                        <Link href={ '/settings' }>
                            Играть
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }
}
