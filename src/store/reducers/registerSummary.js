import * as actionsTypes from '../actions/actionTypes'
import {updateObject} from "../../shared/utility";

const initialState = {
    name: "",
    gender: "",
    email: "",
}

const savePersonalDetails = (state, actions) => {
    return updateObject(state, {
        name: actions.name,
        gender: actions.gender,
        email: actions.email,
    })
}
const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionsTypes.SAVE_PERSONAL_DETAILS:
            return savePersonalDetails(state, actions)
        default:
            return state
    }
}

export default reducer
