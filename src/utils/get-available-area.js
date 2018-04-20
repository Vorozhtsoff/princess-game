import get from 'lodash/get';


export default () => {
    const { availWidth, availHeight } = get(window, ['screen'], {});
    return {
        width: availWidth,
        height: availHeight
    }
}