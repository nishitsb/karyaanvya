import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../../shared/utility";
import * as actionsTypes from "../actions/actionTypes";

const initialState = {
    open: false,
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    loading: false,
    isTargetFormPosted: false,
    targetForm: [],
    prevDayPendingTargets: []
}

const openTargetList = state => {
    return updateObject(state, {
        open: true
    })
}

const closeTargetList = state => {
    return updateObject(state, {
        open: false
    })
}

const submitTargetFormStart = state => {
    return updateObject(state, {
        isSubmitting: true
    })
}

const submitTargetFormSuccess = state => {
    return updateObject(state, {
        isSubmitting: false,
        isSubmitted: true
    })
}

const submitTargetFormFail = (state, actions) => {
    return updateObject(state, {
        isSubmitting: false,
        error: actions.error
    })
}

const resetSubmission = state => {
    return updateObject(state, {
        isSubmitting: false,
        isSubmitted: false,
        error: null
    })
}

const postTargetFormStart = (state) => {
    return updateObject(state, {
        loading: true
    })
}

const postTargetFormSuccess = (state) => {
    return updateObject(state, {
        loading: false,
        isTargetFormPosted: true
    })
}

const postTargetFormFail = (state, actions) => {
    return updateObject(state, {
        loading: false,
        error: actions.error
    })
}

const postTargetFormReset = state => {
    return updateObject(state, {
        loading: false,
        error: null,
        isTargetFormPosted: false,
    })
}

const saveTargetForm = (state, actions) => {
    return updateObject(state, {
        targetForm: actions.targetForm
    })
}

const savePrevDayPendingTargets = (state, actions) => {
    return updateObject(state, {
        prevDayPendingTargets: actions.prevDayPendingTargets
    })
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.OPEN_TARGET_LIST:
            return openTargetList(state)
        case actionTypes.CLOSE_TARGET_LIST:
            return closeTargetList(state)
        case actionTypes.SUBMIT_OR_UPDATE_TARGET_LIST_START:
            return submitTargetFormStart(state)
        case actionTypes.SUBMIT_OR_UPDATE_TARGET_LIST_SUCCESS:
            return submitTargetFormSuccess(state)
        case actionTypes.SUBMIT_OR_UPDATE_TARGET_LIST_FAIL:
            return submitTargetFormFail(state, actions)
        case actionTypes.RESET_SUBMISSION:
            return resetSubmission(state)
        case actionsTypes.SAVE_TARGET_FORM:
            return saveTargetForm(state, actions)
        case actionsTypes.POST_TARGET_FORM_START:
            return postTargetFormStart(state)
        case actionsTypes.POST_TARGET_FORM_SUCCESS:
            return postTargetFormSuccess(state, actions)
        case actionsTypes.POST_TARGET_FORM_FAIL:
            return postTargetFormFail(state, actions)
        case actionsTypes.SAVE_PREV_DAY_PENDING_TARGET:
            return savePrevDayPendingTargets(state, actions)
        case actionsTypes.POST_TARGET_FORM_RESET:
            return postTargetFormReset(state)
        default:
            return state
    }
}

export default reducer

