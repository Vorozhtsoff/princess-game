import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import Button from '../button';
import style from './style';


export default class Main extends Component {
    render() {
        return (
            <div class={ style.home }>
                <Button>
                    <Link href={ '/settings' }>
                        Играть
                    </Link>
                </Button>
            </div>
        );
    }
}
