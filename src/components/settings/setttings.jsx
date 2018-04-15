import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import Button from '../button';


export default class Settings extends Component {
    render() {
        return (
            <div>
                Меняем цвет,
                Меняем ник
                <Button>
                    <Link href={ '/game' }>
                        Играть
                    </Link>
                </Button>
            </div>
        );
    }
}
