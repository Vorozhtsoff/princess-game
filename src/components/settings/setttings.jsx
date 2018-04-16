import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'preact-redux';

import Button from '../button';
import style from './style.css';

import { selectColor } from '../../reducers/colors';
import { getRandomColor } from '../../utils';


const mapState = ({ settings, colors }) => ({
    settings,
    colors: colors.colors,
    selectedColor: colors.selected
})

const mapActions = {
    selectColor
}


class Settings extends Component {
    componentWillMount() {
        const { selectedColor, selectColor, colors } = this.props;
        !selectedColor && selectColor(getRandomColor(colors));
    }

    render() {
        return (
            <div>
                Меняем цвет,
                Меняем ник
                выбранный цвет: { this.props.selectedColor }

                <div class={ style.actions }>
                    <Button>
                        <Link href={ '/game' }>
                            Играть
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }
}

export default connect(mapState, mapActions)(Settings);
