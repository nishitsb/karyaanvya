import * as actionTypes from './actionTypes'

export const setSnackbar = (message, severity, autoHideDuration) => {
    return {
        type: actionTypes.SET_SNACKBAR,
        message: message,
        severity: severity,
        autoHideDuration: autoHideDuration
    }
}

export const removeSnackbar = () => {
    return {
        type: actionTypes.REMOVE_SNACKBAR
    }
}
