import * as actionTypes from './actionTypes'
import axios from "../../axios";
import * as actions from './index'

export const onAuthStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const onAuthSuccess = (tokenId, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: userId
    }
}

export const onAuthFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const onLogout = (isDayEndLogout) => {
    return dispatch => {
        if (isDayEndLogout) {
            localStorage.removeItem("id")
            localStorage.removeItem("formId")
        }
        localStorage.removeItem('tokenId');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        localStorage.removeItem('targetForm');
        localStorage.removeItem("prevDayPendingTargets")
        localStorage.removeItem("agreedOnAddingPrevPendingTargets")
        localStorage.removeItem('name')
        localStorage.removeItem('gender')
        localStorage.removeItem('email')
        localStorage.removeItem('monthlyTargetsAchieved')
        localStorage.removeItem('monthlyData')
        localStorage.removeItem('monthlyDateData')
        localStorage.removeItem('prevMonthDateData')
        localStorage.removeItem('formId')
        localStorage.removeItem('id')
        dispatch(actions.setAllMonthlyData(null, []))
        dispatch(actions.savePersonalDetails("", "", ""))
        dispatch(actions.saveTargetForm([]))
        dispatch(actions.setMonthlyDateData({}))
        dispatch(actions.setPrevMonthDateData({}))
        dispatch(logout())
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(onLogout(false))
        }, expirationTime * 1000)
    }
}

const checkDayEnd = () => {
    const presentTime = new Date().getTime();
    let endTime = new Date();
    endTime.setHours(23, 59, 59, 999)
    endTime = endTime.getTime()
    const timer = endTime - presentTime
    return dispatch => {
        setTimeout(() => {
            dispatch(onLogout(true))
            dispatch(actions.initCalendar())
        }, timer)
    }
}

export const auth = (email, password, isSignup, name, gender) => {
    return dispatch => {
        if(isSignup){
            localStorage.setItem('name', name)
            localStorage.setItem('gender', gender)
            localStorage.setItem('email', email)
        }
        dispatch(onAuthStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQlHvQ-sYzBZVQaXYhRdkOopWlwT24tmA"
        if (!isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQlHvQ-sYzBZVQaXYhRdkOopWlwT24tmA"
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() +
                    response.data.expiresIn * 1000);
                localStorage.setItem("tokenId", response.data.idToken);
                localStorage.setItem("userId", response.data.localId);
                localStorage.setItem("expirationDate", expirationDate);
                const userId = response.data.localId
                dispatch(onAuthSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
                dispatch(checkDayEnd())

                if (isSignup) {
                    const personalDetails = {
                        name: name,
                        gender: gender,
                        email: email
                    }
                    return axios.post(`/${userId}/personalDetails.json`, personalDetails)
                        .then(res => {
                            dispatch(actions.savePersonalDetails(name, gender, email))
                        })
                        .catch(error => {
                            if (error.response) {
                                dispatch(actions.setSnackbar(`${error.response.data.error}`, "error"))  
                            } else {
                                dispatch(actions.setSnackbar("Internet disconnected", "error"))
                            }
                        })
                }
            })
            .catch(error => {
                if (error.response) {
                    dispatch(onAuthFail(error.response.data.error))
                } else {
                    dispatch(onAuthFail(""))
                    dispatch(actions.setSnackbar("Internet disconnected", "error"))
                }
            })
    }
}

export const authCheckStatus = () => {
    return dispatch => {
        const token = localStorage.getItem('tokenId')
        if (!token) {
            dispatch(onLogout(false))
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(onLogout(false))
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(onAuthSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
                dispatch(checkDayEnd())
            }
        }
    }
}
