import { LIST_CHANGE } from './actionTypes';

const defaultState = {
    list: []
}

export default (state = defaultState,action ) => {
    if(action.type === LIST_CHANGE) {
        return {
            list: action.value
        }
    }
    return state;
}