import moment from "moment";
import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../../shared/utility";

const initialState = {
    dateContext: null,
    month: null,
    year: null,
    daysInMonth: null,
    currentDateContext: null,
    currentDate: null,
    currentMonth: null,
    currentYear: null,
    firstDayOfMonth: null,
    isFetchingData: false,
    error: null,
    monthlyTargetsAchieved: [],
    monthlyData: [],
    monthlyDateData: {},
    prevMonthDateData: {}
}

const setNextMonth = state => {

    let dateContext = Object.assign({}, state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    const firstDay = moment(dateContext).startOf('month').format('d');

    return updateObject(state, {
        dateContext: dateContext,
        month: dateContext.month(),
        year: dateContext.format("Y"),
        daysInMonth: dateContext.daysInMonth(),
        firstDayOfMonth: firstDay,
    })
};

const setPrevMonth = state => {

    let dateContext = Object.assign({}, state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    const firstDay = moment(dateContext).startOf('month').format('d');

    return updateObject(state, {
        dateContext: dateContext,
        month: dateContext.month(),
        year: dateContext.format("Y"),
        daysInMonth: dateContext.daysInMonth(),
        firstDayOfMonth: firstDay,
    })
}

const setMonthlyDataStart = state => {

    return updateObject(state, {
        isFetchingData: true,
    })
}

const setMonthlyDataSuccess = (state, actions) => {

    let data = [...state.monthlyTargetsAchieved]
    const monthlyData = actions.monthlyData
    monthlyData.map(d => {
        const noOfTargets = d.noOfTargets
        const noOfTargetsAchieved = d.noOfTargetsAcheived
        const styleNumber = (noOfTargetsAchieved / noOfTargets) * 3
        data.splice(d.date, 1, styleNumber)
        return 0;
    })
    localStorage.setItem('monthlyTargetsAchieved', JSON.stringify(data))
    return updateObject(state, {
        monthlyData: actions.monthlyData,
        monthlyTargetsAchieved: data,
        isFetchingData: false
    })
}

const setMonthlyDataFail = (state, actions) => {
    return updateObject(state, {
        isFetchingData: false,
        error: actions.error
    })
}

const setAllMonthlyData = (state, actions) => {
    if (actions.monthlyTargetsAchieved === null) {

        const monthlyTargetsAchieved = new Array(state.daysInMonth + 1).fill(null)

        localStorage.setItem('monthlyTargetsAchieved', JSON.stringify(monthlyTargetsAchieved))
        return updateObject(state, {
            monthlyData: actions.monthlyData,
            monthlyTargetsAchieved: monthlyTargetsAchieved
        })
    } else {
        localStorage.setItem('monthlyTargetsAchieved', JSON.stringify(actions.monthlyTargetsAchieved))
        return updateObject(state, {
            monthlyData: actions.monthlyData,
            monthlyTargetsAchieved: actions.monthlyTargetsAchieved
        })
    }
}

const setMonthlyDateData = (state, actions) => {
    if (actions.monthlyDateData) {
        return updateObject(state, {
            monthlyDateData: actions.monthlyDateData
        })
    } else {
        return state
    }
}

const setPrevMonthDateData = (state, actions) => {
    if (actions.prevMonthDateData) {
        return updateObject(state, {
            prevMonthDateData: actions.prevMonthDateData
        })
    } else {
        return state
    }
}

const initCalendar = state => {

    let dateContext = moment();
    const firstDay = moment(dateContext).startOf('month').format('d');

    return updateObject(state, {
        dateContext: dateContext,
        month: dateContext.month(),
        year: dateContext.format("Y"),
        daysInMonth: dateContext.daysInMonth(),
        currentDateContext: dateContext,
        currentDate: dateContext.get("date"),
        currentMonth: dateContext.month(),
        currentYear: dateContext.format("Y"),
        firstDayOfMonth: firstDay,
    })
}

const reducer = (state = initialState, actions) => {

    switch (actions.type) {
        case actionTypes.SET_NEXT_MONTH:
            return setNextMonth(state);
        case actionTypes.SET_PREV_MONTH:
            return setPrevMonth(state);
        case actionTypes.INIT_CALENDAR :
            return initCalendar(state);
        case actionTypes.SET_MONTHLY_DATA_START:
            return setMonthlyDataStart(state)
        case actionTypes.SET_MONTHLY_DATA_SUCCESS:
            return setMonthlyDataSuccess(state, actions)
        case actionTypes.SET_MONTHLY_DATA_FAIL:
            return setMonthlyDataFail(state, actions)
        case actionTypes.SET_ALL_MONTHLY_DATA:
            return setAllMonthlyData(state, actions)
        case actionTypes.SET_MONTHLY_DATE_DATA:
            return setMonthlyDateData(state, actions)
        case actionTypes.SET_PREV_MONTH_DATE_DATA:
            return setPrevMonthDateData(state, actions)
        default:
            return state;
    }
}

export default reducer;
