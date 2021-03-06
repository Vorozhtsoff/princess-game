import { h, Component } from 'preact';
import { socketEmit } from '../../modules/redux-socket';
import { connect } from 'preact-redux';

import ButtonLink from '../button-link';
import styles from './settings.css';

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
            <div class={ styles.page }>
                <div class={ styles.inner }>
                    <div class={ styles['name-block'] }>
                        <p class={ styles.name } >
                            <div class={ styles.nameInner }>
                                { name }
                            </div>
                        </p>
                        <div
                            onClick={ this.handleChangeName }
                            class={ styles['right-arrow'] }
                        />
                    </div>
                    <div class={ styles['color-changer'] }>
                        <div
                            onClick={ this.handleLeftArrow }
                            class={ styles['left-arrow'] }
                        />
                        <div style={ { backgroundColor: selectedColor } } class={ styles.color } />
                        <div
                            onClick={ this.handlerRightArrow }
                            class={ styles['right-arrow'] }
                        />
                    </div>

                    <div class={ styles.actions }>
                        <ButtonLink href={ '/game' }>
                            Играть
                        </ButtonLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapState, mapActions)(Settings);
