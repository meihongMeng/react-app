import { LIST_CHANGE } from './actionTypes';

export const getListChangeAction = (value) => ({
    type: LIST_CHANGE,
    value: value
})