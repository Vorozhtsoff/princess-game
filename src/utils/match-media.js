import { isClientSide } from './';

export const isPortrait = () => {
    if (isClientSide()) {
        return global.matchMedia('(orientation: portrait)').matches;
    }

    return false;
}

export const isLandscape = () => {
    if (isClientSide()) {
        return global.matchMedia('(orientation: landscape)').matches;
    }

    return false;
}
