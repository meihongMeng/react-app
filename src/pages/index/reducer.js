import { CHANGE_INDEX } from "./actionTypes";

const defaultState = {
    list: [],
    friendLink: [],
    slideshow: []
}

export default (state = defaultState, action) => {
    if(action.type === CHANGE_INDEX)  {
        const newState = Object.assign({},state);
        newState.list = action.value;
        newState.friendLink = action.friendLink;
        newState.slideshow = action.slideshow;
        return newState;
    }
    return state;
}