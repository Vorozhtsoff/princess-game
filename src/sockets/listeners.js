import { applyListeners } from '../modules/redux-socket';

const recieveResponse = payload => ({ type: 'RECIEVE_RESPONSE', payload });

export default applyListeners({
    sendResponse: (data, store) => store.dispatch(recieveResponse(data))
});
