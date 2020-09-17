import * as actionsTypes from '../actions/actionTypes'
import {updateObject} from "../../shared/utility";

const initialState = {
    open: false,
    message: "",
    severity: "",
    autoHideDuration: null
}

const setSnackbar = (state, actions) => {
    return updateObject(state, {
        open: true,
        message: actions.message,
        severity: actions.severity,
        autoHideDuration: actions.autoHideDuration
    })
}

const removeSnack = state => {
    return updateObject(state, {
        open: false,
        message: "",
        severity: "",
        autoHideDuration: null
    })
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionsTypes.SET_SNACKBAR:
            return setSnackbar(state, actions)
        case actionsTypes.REMOVE_SNACKBAR:
            return removeSnack()
        default:
            return state
    }
}

export default reducer
