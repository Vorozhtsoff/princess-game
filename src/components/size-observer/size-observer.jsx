import { Component } from 'preact';
import { isLandscape, isPortrait, noop, getAvailableArea } from '../../utils';


export default class SizeObserver extends Component {
    static defaultProps = {
        onResize: noop
    }

    detectOrientation = () => ({
        isLandscape: isLandscape(),
        isPortrait: isPortrait(),
        ...getAvailableArea()
    })

    body = document.body

    handler = () => {
        const result = this.detectOrientation();
        this.props.onResize(result);
        this.classSetter(result);
    }

    memo = null;
    classSetter = ({ isLandscape }) => {
        const className = isLandscape ? 'landscape' : 'portrait';
        if (this.memo !== className) {
            this.body.classList.remove(this.memo);
            this.body.classList.add(className);
            this.memo = className;
        }
    }

    componentWillMount() {
        window.addEventListener('resize', this.handler);
    }

    componentDidMount() {
        this.handler();
    }

    componentWillUnmount() {
        this.body.classList.remove(this.memo);
        window.removeEventListener('resize', this.handler);
    }

    render() {
        return null;
    }
}
