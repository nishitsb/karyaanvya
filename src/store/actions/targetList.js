import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios'
import {setSnackbar} from '../actions/index'
import * as actions from "./index";
import moment from "moment";
import * as actionsTypes from "./actionTypes";

const year = moment().format("Y")
const month = moment().month()
const date = moment().get("date")

export const openTargetList = () => {
    return {
        type: actionTypes.OPEN_TARGET_LIST
    }
}

export const closeTargetList = () => {
    return {
        type: actionTypes.CLOSE_TARGET_LIST
    }
}

const submitOrUpdateStart = () => {
    return {
        type: actionTypes.SUBMIT_OR_UPDATE_TARGET_LIST_START
    }
}

const submitOrUpdateSuccess = () => {
    return {
        type: actionTypes.SUBMIT_OR_UPDATE_TARGET_LIST_SUCCESS
    }
}

const submitOrUpdateFail = (error) => {
    return {
        type: actionTypes.SUBMIT_OR_UPDATE_TARGET_LIST_FAIL,
        error: error
    }
}

export const resetSubmission = () => {
    return {
        type: actionTypes.RESET_SUBMISSION
    }
}

const postTargetFormStart = () => {
    return {
        type: actionsTypes.POST_TARGET_FORM_START
    }
}

const postTargetFormSuccess = () => {
    return {
        type: actionsTypes.POST_TARGET_FORM_SUCCESS,
    }
}

const postTargetFormFail = error => {
    return {
        type: actionsTypes.POST_TARGET_FORM_FAIL,
        error: error
    }
}

export const postTargetFormReset = () => {
    return {
        type: actionsTypes.POST_TARGET_FORM_RESET
    }
}

export const saveTargetForm = targetForm => {
    return {
        type: actionsTypes.SAVE_TARGET_FORM,
        targetForm: targetForm
    }
}

const savePrevDayPendingTargets = prevDayPendingTargets => {
    return {
        type: actionsTypes.SAVE_PREV_DAY_PENDING_TARGET,
        prevDayPendingTargets: prevDayPendingTargets
    }
}

export const onSubmitTargetList = (userId, targetForm, noOfTargetsAcheived, noOfTargets) => {
    return dispatch => {
        dispatch(setSnackbar("Submitting", "info", 50000))
        dispatch(submitOrUpdateStart())
        const form = {
            targetForm: targetForm
        }
        const formId = localStorage.getItem("formId")
        axios.patch(`${userId}/dateData/${year}/${month}/${date}/${formId}.json`, form)
            .then(response => {
                const monthData = {
                    date: date,
                    noOfTargetsAcheived: noOfTargetsAcheived,
                    noOfTargets: noOfTargets
                }
                return axios.post(`/${userId}/monthlyData/${year}/${month}.json`, monthData)
                    .then(response => {
                        dispatch(setSnackbar("Submitted", "success"))
                        dispatch(submitOrUpdateSuccess())
                        dispatch(actions.saveTargetForm(targetForm))
                        localStorage.setItem("id", response.data.name)
                    })
            }).catch(error => {
            if (error.response) {
                dispatch(submitOrUpdateFail(error.response.data.error))
            } else {
                dispatch(setSnackbar("Internet disconnected", "error"))
            }
        })
    }
}

export const onUpdateTargetList = (userId, targetForm, noOfTargetsAcheived, noOfTargets) => {
    return dispatch => {
        const id = localStorage.getItem("id")
        const formId = localStorage.getItem("formId")
        dispatch(setSnackbar("Updating", "info", 50000))
        dispatch(submitOrUpdateStart())
        const monthData = {
            date: date,
            noOfTargetsAcheived: noOfTargetsAcheived,
            noOfTargets: noOfTargets
        }
        axios.patch(`/${userId}/monthlyData/${year}/${month}/${id}.json`, monthData)
            .then(response => {
                const oldForm = {
                    targetForm: targetForm
                }
                return axios.patch(`${userId}/dateData/${year}/${month}/${date}/${formId}.json`, oldForm)
                    .then(response => {
                        dispatch(setSnackbar("Updated", "success"))
                        dispatch(submitOrUpdateSuccess())
                        dispatch(actions.saveTargetForm(targetForm))
                    })
            }).catch(error => {
            if (error.response) {
                dispatch(submitOrUpdateFail(error.response.data.error))
            } else {
                dispatch(setSnackbar("Internet disconnected", "error"))
            }
        })
    }
}

export const onPostTargetForm = (userId, targetForm) => {
    return dispatch => {
        if (targetForm.length) {
            dispatch(postTargetFormStart())
            const data = {
                targetForm: targetForm
            }
            axios.post(`${userId}/dateData/${year}/${month}/${date}.json`, data)
                .then(response => {
                    dispatch(saveTargetForm(targetForm))
                    dispatch(savePrevDayPendingTargets([]))
                    dispatch(postTargetFormSuccess())
                    localStorage.setItem("formId", response.data.name)
                }).catch(error => {
                if (error.response) {
                    dispatch(postTargetFormFail(error.response.data.error))
                } else {
                    dispatch(actions.setSnackbar("Internet disconnected", "error"))
                }
            })
        }
    }
}

export const onEditTargetForm = (userId, editedTargetForm, noOfTargetsAchieved, noOfTargets) => {
    return dispatch => {
        dispatch(postTargetFormStart())
        const data = {
            targetForm: editedTargetForm
        }
        const id = localStorage.getItem("id")
        const formId = localStorage.getItem("formId")
        if (formId) {
            axios.patch(`${userId}/dateData/${year}/${month}/${date}/${formId}.json`, data)
                .then(response => {
                    dispatch(saveTargetForm(editedTargetForm))
                    localStorage.setItem("targetForm", JSON.stringify(editedTargetForm))
                    if (id) {
                        const monthData = {
                            date: date,
                            noOfTargetsAcheived: noOfTargetsAchieved,
                            noOfTargets: noOfTargets
                        }
                        return axios.patch(`/${userId}/monthlyData/${year}/${month}/${id}.json`, monthData)
                            .then(response => {
                                const styleNumber = (noOfTargetsAchieved / noOfTargets) * 3
                                const monthlyTargetsAchieved = JSON.parse(localStorage.getItem("monthlyTargetsAchieved"))
                                const monthlyTargetsAcheivedData = [...monthlyTargetsAchieved]
                                monthlyTargetsAcheivedData.splice(date, 1, styleNumber)
                                dispatch(actions.setAllMonthlyData(monthlyTargetsAcheivedData))
                                dispatch(postTargetFormSuccess())
                            })
                    } else {
                        dispatch(postTargetFormSuccess())
                    }
                }).catch(error => {
                if (error.response) {
                    dispatch(postTargetFormFail(error.response.data.error))
                    dispatch(actions.setSnackbar(error.response.data.error.message, "error"))
                } else {
                    dispatch(actions.setSnackbar("Internet disconnected", "error"))
                }
            })
        }
    }
}

export const onGetTargetForm = (userId) => {
    return dispatch => {
        const targetForm = JSON.parse(localStorage.getItem('targetForm') || "[]");
        const prevDayPendingTargets = JSON.parse(localStorage.getItem("prevDayPendingTargets") || "[]")
        if (!targetForm.length && userId) {
            axios.get(`${userId}/dateData/${year}/${month}/${date}.json`)
                .then(response => {
                    if (response.data) {
                        localStorage.setItem("formId", Object.keys(response.data)[0])
                        const targetForm = Object.values(response.data)[0].targetForm
                        dispatch(saveTargetForm(targetForm))
                        localStorage.setItem('targetForm', JSON.stringify(targetForm))
                        dispatch(actions.setSnackbar("Ready", "success"))
                    } else {
                        const prevDateContext = moment().subtract(1, 'day')
                        const preDate = prevDateContext.get("date")
                        const preMonth = prevDateContext.month()
                        const preYear = prevDateContext.format("Y")
                        return axios.get(`${userId}/dateData/${preYear}/${preMonth}/${preDate}.json`)
                            .then(response => {
                                if (response.data) {
                                    let prevDayPendingTargets = [];
                                    const prevDayTargetForm = Object.values(response.data)[0].targetForm
                                    prevDayTargetForm.filter(d => !d.checked)
                                    prevDayTargetForm.map(target => {
                                        if (!target.checked) {
                                            prevDayPendingTargets.push(target)
                                        }
                                        return 0;
                                    })
                                    localStorage.setItem("prevDayPendingTargets", JSON.stringify(prevDayPendingTargets))
                                    dispatch(savePrevDayPendingTargets(prevDayPendingTargets))
                                    dispatch(actions.setSnackbar("Ready", "success"))
                                } else {
                                    dispatch(actions.removeSnackbar())
                                }
                            })
                    }
                })
        } else {
            dispatch(saveTargetForm(targetForm))
            dispatch(savePrevDayPendingTargets(prevDayPendingTargets))
        }
    }
}
