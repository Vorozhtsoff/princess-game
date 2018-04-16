import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { socketEmit } from '../../modules/redux-socket';
import { connect } from 'preact-redux';

import Button from '../button';
import style from './style.css';

import { selectColor } from '../../reducers/colors';
import { getRandomColor } from '../../utils';
import { CHANGE_COLOR, CHANGE_NAME } from '../../sockets'


const mapState = ({ settings, colors, app }) => ({
    settings,
    colors: colors.colors,
    selectedColor: colors.selected,
    name: app.name
})

const mapActions = {
    selectColor,
    socketEmit
}


class Settings extends Component {
    componentWillMount() {
        const { selectedColor, selectColor, colors } = this.props;
        !selectedColor && selectColor(getRandomColor(colors));
    }

    colorUpdate = (color) => {
        const { selectColor, socketEmit } = this.props;
        selectColor(color);
        socketEmit(CHANGE_COLOR, { color })
    }

    handleLeftArrow = () => {
        const { selectedColor, colors } = this.props;
        const index = colors.findIndex(v => v === selectedColor);
        const newColor = colors[index - 1 > 0 ? index - 1 : colors.length - 1];
        this.colorUpdate(newColor);
    }

    handlerRightArrow = () => {
        const { selectedColor, colors } = this.props;
        const index = colors.findIndex(v => v === selectedColor);
        const newColor = colors[index + 1] ? colors[index + 1] : colors[0];
        this.colorUpdate(newColor);
    }

    handleChangeName = () => {
        this.props.socketEmit(CHANGE_NAME);
    }

    render() {
        const { selectedColor, name } = this.props;
        return (
            <div class={ style['page-settings'] }>
                <div class={ style['name-block'] }>
                    <p class={ style.name} >{ name }</p>
                    <div
                        onClick={ this.handleChangeName }
                        class={ style['right-arrow'] }
                    />
                </div>
                <div class={ style['color-changer'] }>
                    <div
                        onClick={ this.handleLeftArrow }
                        class={ style['left-arrow'] }
                    />
                    <div style={ { backgroundColor: selectedColor } } class={ style.color } />
                    <div
                        onClick={ this.handlerRightArrow }
                        class={ style['right-arrow'] }
                    />
                </div>

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