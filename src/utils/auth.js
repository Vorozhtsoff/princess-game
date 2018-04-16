import { generateId, localStorage } from './';

const auth = () => {
    const id = localStorage.getItem('id');
    if (!id) {
        localStorage.setItem('id', generateId());
        return auth();
    }

    return id;
};

export default auth;
