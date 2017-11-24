import { CHANGE_INDEX } from './actionTypes';

export const getIndexAction = (value,friendLink,slideshow) => ({
    type: CHANGE_INDEX,
    value: value,
    friendLink: friendLink,
    slideshow: slideshow
})