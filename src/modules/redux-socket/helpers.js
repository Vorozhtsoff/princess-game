export const isArray = value => Array.isArray(value);

export const isNill = value => value == null;

export const isFunc = value => typeof value === 'function';

export const isObject = (value) => {
    if (isNill(value)) {
        return false;
    }

    if (isArray(value)) {
        return false;
    }

    if (typeof value === 'object') {
        return true;
    }

    return false;
};
