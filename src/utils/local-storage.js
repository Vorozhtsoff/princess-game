import { isClientSide, noop } from '../utils';

const localStorageApi = () => global.localStorage || {
    getItem: noop,
    clear: noop,
    setItem: noop,
    removeItem: noop
};

const localStorage = {
    getItem: (id) => {
        const value = localStorageApi().getItem(id);

        if (!value) {
            return value;
        }

        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    },
    setItem: (key, value) => localStorageApi().setItem(key, JSON.stringify(value)),
    removeItem: (...args) => localStorageApi().removeItem(...args),
    clear: localStorageApi().clear,
    getLength: () => localStorageApi().length
};

export default localStorage;

