const isClient = () => typeof window !== 'undefined';

const getWindowSize = () => ({
    height: isClient() ? window.innerHeight : null,
    width: isClient() ? window.innerWidth: null
});

export default getWindowSize;
