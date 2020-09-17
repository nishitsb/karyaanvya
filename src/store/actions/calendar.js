import * as actionTypes from './actionTypes'
import axios from "../../axios";
import * as actions from './index'
import moment from "moment";

export const setMonthlyDataStart = () => {
    return {
        type: actionTypes.SET_MONTHLY_DATA_START
    }
}

export const setMonthlyDataSuccess = monthlyData => {
    return {
        type: actionTypes.SET_MONTHLY_DATA_SUCCESS,
        monthlyData: monthlyData
    }
}

export const setMonthlyDataFail = (error) => {
    return {
        type: actionTypes.SET_MONTHLY_DATA_FAIL,
        error: error
    }
}

export const setAllMonthlyData = (monthlyTargetsAchieved, monthlyData) => {
    return {
        type: actionTypes.SET_ALL_MONTHLY_DATA,
        monthlyData: monthlyData,
        monthlyTargetsAchieved: monthlyTargetsAchieved
    }
}

export const setMonthlyDateData = monthlyDateData => {
    return {
        type: actionTypes.SET_MONTHLY_DATE_DATA,
        monthlyDateData: monthlyDateData
    }
}

export const setPrevMonthDateData = prevMonthDateData => {
    return {
        type: actionTypes.SET_PREV_MONTH_DATE_DATA,
        prevMonthDateData: prevMonthDateData
    }
}

export const setNextMonth = () => {
    return {
        type: actionTypes.SET_NEXT_MONTH,
    }
}

export const setPrevMonth = () => {
    return {
        type: actionTypes.SET_PREV_MONTH,
    }
}

export const onNextMonth = (userId, year, month) => {
    return dispatch => {
        dispatch(setNextMonth())
        if (userId) {
            dispatch(setAllMonthlyData(null, []))
            dispatch(setMonthlyDataStart())
            dispatch(setMonthlyDateData({}))
            dispatch(setPrevMonthDateData({}))
            dispatch(actions.setSnackbar("Fetching data", "info", 50000))
            axios.get(`${userId}/monthlyData/${year}/${month}.json`)
                .then(response => {
                    if (response.data !== null) {
                        const data = Object.values(response.data)
                        dispatch(setMonthlyDataSuccess(data))
                        return axios.get(`/${userId}/dateData/${year}/${month}.json`)
                            .then(response => {
                                if (response.data) {
                                    localStorage.setItem("monthlyDateData", JSON.stringify(response.data))
                                    dispatch(setMonthlyDateData(response.data))
                                    const presentMoment = moment([year, month])
                                    const prevMoment = presentMoment.subtract(1, "month")
                                    const prevYear = prevMoment.format("Y")
                                    const prevMonth = prevMoment.month()
                                    return axios.get(`/${userId}/dateData/${prevYear}/${prevMonth}.json`)
                                        .then(response => {
                                            if (response.data) {
                                                localStorage.setItem("prevMonthDateData", JSON.stringify(response.data))
                                                dispatch(setPrevMonthDateData(response.data))
                                                dispatch(actions.setSnackbar("Ready", "success"))
                                            } else {
                                                dispatch(actions.setSnackbar("Ready", "success"))
                                            }
                                        })
                                } else {
                                    dispatch(actions.removeSnackbar())
                                }
                            })
                    } else {
                        dispatch(actions.removeSnackbar())
                    }
                }).catch(error => {
                if (error.response) {
                    dispatch(setMonthlyDataFail(error.response.data.error))
                } else {
                    dispatch(setMonthlyDataFail(""))
                    dispatch(actions.setSnackbar("Internet disconnected", "error"))
                }
            })
        }
    }
}

export const onPrevMonth = (userId, year, month) => {
    return dispatch => {
        dispatch(setPrevMonth())
        if (userId) {
            dispatch(setAllMonthlyData(null, []))
            dispatch(setMonthlyDataStart())
            dispatch(setMonthlyDateData({}))
            dispatch(setPrevMonthDateData({}))
            dispatch(actions.setSnackbar("Fetching data", "info", 50000))
            axios.get(`${userId}/monthlyData/${year}/${month}.json`)
                .then(response => {
                    if (response.data !== null) {
                        const data = Object.values(response.data)
                        dispatch(setMonthlyDataSuccess(data))
                        return axios.get(`/${userId}/dateData/${year}/${month}.json`)
                            .then(response => {
                                if (response.data) {
                                    localStorage.setItem("monthlyDateData", JSON.stringify(response.data))
                                    dispatch(setMonthlyDateData(response.data))
                                    const presentMoment = moment([year, month])
                                    const prevMoment = presentMoment.subtract(1, "month")
                                    const prevYear = prevMoment.format("Y")
                                    const prevMonth = prevMoment.month()
                                    return axios.get(`/${userId}/dateData/${prevYear}/${prevMonth}.json`)
                                        .then(response => {
                                            if (response.data) {
                                                localStorage.setItem("prevMonthDateData", JSON.stringify(response.data))
                                                dispatch(setPrevMonthDateData(response.data))
                                                dispatch(actions.setSnackbar("Ready", "success"))
                                            } else {
                                                dispatch(actions.setSnackbar("Ready", "success"))
                                            }
                                        })
                                } else {
                                    dispatch(actions.removeSnackbar())
                                }
                            })
                    } else {
                        dispatch(actions.removeSnackbar())
                    }
                }).catch(error => {
                if (error.response) {
                    dispatch(setMonthlyDataFail(error.response.data.error))
                } else {
                    dispatch(setMonthlyDataFail(""))
                    dispatch(actions.setSnackbar("Internet disconnected", "error"))
                }
            })
        }
    }
}

export const onGetMonthlyData = (userId) => {
    return dispatch => {
        const monthlyTargetsAchieved = JSON.parse(localStorage.getItem('monthlyTargetsAchieved') || null)
        const monthlyData = JSON.parse(localStorage.getItem("monthlyData") || "[]")
        const monthlyDateData = JSON.parse(localStorage.getItem("monthlyDateData") || null)
        const prevMonthDateData = JSON.parse(localStorage.getItem("prevMonthDateData") || null)
        if (!monthlyData.length && userId && !monthlyDateData) {
            dispatch(actions.setSnackbar("Fetching data", "info", 50000))
            const presentMoment = moment()
            const year = presentMoment.format("Y")
            const month = presentMoment.month()
            const date = presentMoment.get("date")
            const prevMoment = presentMoment.subtract(1, "month")
            const prevYear = prevMoment.format("Y")
            const prevMonth = prevMoment.month()
            axios.get(`/${userId}/monthlyData/${year}/${month}.json`)
                .then(response => {
                    if (response.data) {
                        const data = Object.values(response.data)
                        localStorage.setItem("monthlyData", JSON.stringify(data))
                        for (let key in response.data) {
                            if (response.data[key].date === date) {
                                localStorage.setItem("id", key)
                            }
                        }
                        dispatch(actions.setMonthlyDataSuccess(data))
                        return axios.get(`/${userId}/dateData/${year}/${month}.json`)
                            .then(response => {
                                if (response.data) {
                                    localStorage.setItem("monthlyDateData", JSON.stringify(response.data))
                                    dispatch(setMonthlyDateData(response.data))
                                    return axios.get(`/${userId}/dateData/${prevYear}/${prevMonth}.json`)
                                        .then(response => {
                                            if (response.data) {
                                                localStorage.setItem("prevMonthDateData", JSON.stringify(response.data))
                                                dispatch(setPrevMonthDateData(response.data))
                                            }
                                        })
                                }
                            })
                    }
                }).catch(error => {
                if (error.response) {
                    dispatch(actions.setSnackbar(`${error.response.data.error}`, "error"))

                } else {
                    dispatch(actions.setSnackbar("Internet disconnected", "error"))
                }
            })
        } else {
            dispatch(setAllMonthlyData(monthlyTargetsAchieved, monthlyData))
            dispatch(setMonthlyDateData(monthlyDateData))
            dispatch(setPrevMonthDateData(prevMonthDateData))
        }
    }
}

export const initCalendar = () => {
    return {
        type: actionTypes.INIT_CALENDAR
    }
}
