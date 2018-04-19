import { h, Component } from 'preact';
import { socketEmit } from '../../modules/redux-socket';
import { connect } from 'preact-redux';

import ButtonLink from '../button-link';
import style from './style.css';

import { selectColor, getColor } from '../../reducers/app';
import { CHANGE_COLOR, CHANGE_NAME } from '../../sockets'


const mapState = ({ settings, app }) => ({
    settings,
    colors: settings.colors,
    selectedColor: app.color,
    name: app.name
})

const mapActions = {
    selectColor,
    socketEmit,
    getColor
}


class Settings extends Component {
    colorUpdate = (color) => {
        const { selectColor, socketEmit } = this.props;
        selectColor(color);
        socketEmit(CHANGE_COLOR, { color });
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
                    <p class={ style.name } >{ name }</p>
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
                    <ButtonLink href={ '/game' }>
                        Играть
                    </ButtonLink>
                </div>
            </div>
        );
    }
}

export default connect(mapState, mapActions)(Settings);
