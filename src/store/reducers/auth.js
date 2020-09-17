import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../../shared/utility";

const initialState = {
    tokenId: null,
    userId: null,
    loading: false,
    error: null,
}

const onAuthStart = state => {
    return updateObject(state, {loading: true, error: null})
}

const onAuthSuccess = (state, actions) => {
    return updateObject(state, {
        tokenId: actions.tokenId,
        userId: actions.userId,
        loading: false
    })
}

const onAuthFail = (state, actions) => {
    return updateObject(state, {
        loading: false,
        error: actions.error
    })
}

const onLogout = state => {
    return updateObject(state, {
        tokenId: null,
        userId: null,
        loading: false,
        error: null
    })
}

const onSetErrorToNull = state => {
    return updateObject(state, {error: null})
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.AUTH_START: return onAuthStart(state)
        case actionTypes.AUTH_SUCCESS: return onAuthSuccess(state, actions)
        case actionTypes.AUTH_FAIL: return onAuthFail(state,actions)
        case actionTypes.SET_ERROR_TO_NULL: return onSetErrorToNull(state)
        case actionTypes.LOGOUT: return onLogout(state)
        default: return state
    }
}

export default reducer
