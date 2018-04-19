import { Component } from 'preact';
import { isLandscape, isPortrait, noop } from '../../utils';


export default class SizeObserver extends Component {
    static defaultProps = {
        onResize: noop
    }

    detectOrientation = () => ({
        isLandscape: isLandscape(),
        isPortrait: isPortrait()
    })

    handler = () => {
        this.props.onResize(this.detectOrientation());
    }

    componentWillMount() {
        window.addEventListener('resize', this.handler);
    }

    componentDidMount() {
        this.props.onResize(this.detectOrientation());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handler);
    }

    render() {
        return null;
    }
}
