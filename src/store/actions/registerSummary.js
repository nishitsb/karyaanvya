import * as actionsTypes from './actionTypes'
import axios from '../../axios'

export const savePersonalDetails = (name, gender, email) => {
    return {
        type: actionsTypes.SAVE_PERSONAL_DETAILS,
        name: name,
        gender: gender,
        email: email,
    }
}

export const onGetPersonalDetails = (userId) => {
    return dispatch => {
        const name = localStorage.getItem('name')
        const gender = localStorage.getItem('gender')
        const email = localStorage.getItem('email')
        if (!name && userId) {
            axios.get(`/${userId}/personalDetails.json`)
                .then(response => {
                    if (response.data) {
                        const name = Object.values(response.data)[0].name
                        const gender = Object.values(response.data)[0].gender
                        const email = Object.values(response.data)[0].email
                        localStorage.setItem("name", name)
                        dispatch(savePersonalDetails(name, gender, email))
                    }
                })
        } else {
            localStorage.removeItem('gender')
            localStorage.removeItem('email')
            dispatch(savePersonalDetails(name, gender, email))
        }
    }
}
