import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions'
import {Grid, Typography, Box} from '@material-ui/core';
import Aux from '../../hoc/Aux';
import moment from "moment";

const MonthSelector = () => {

    const dispatch = useDispatch();

    const userId = useSelector(state => state.auth.userId);
    const month = useSelector(state => state.cal.month)
    const year = useSelector(state => state.cal.year)

    const isSubmitting = useSelector(state => state.tl.isSubmitting)

    const onPrevMonth = (year, month) => dispatch(actions.onPrevMonth(userId, year, month));
    const onNextMonth = (year, month) => dispatch(actions.onNextMonth(userId, year, month));

    const prevMonthHandler = (year, month) => {
        if (!isSubmitting) {
            let y = year
            let m = month
            if (month === 0) {
                m = 11
                y = y - 1
            } else {
                m = m - 1
            }
            onPrevMonth(y, m)
        }
    }

    const nextMonthHandler = (year, month) => {
        if (!isSubmitting) {
            let y = year
            let m = month
            if (month === 11) {
                m = 0
                y = y + 1
            } else {
                m = m + 1
            }
            onNextMonth(y, m)
        }
    }

    const months = moment.months();

    return (
        <Aux>
            <Box mt={2}>
                <Grid container justify={"center"}>
                    <Grid item>
                        <svg
                            style={{cursor: "pointer"}}
                            onClick={() => prevMonthHandler(year, month)}
                            xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="7 3 18 18">
                            <path
                                d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/>
                        </svg>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" align={"center"} style={{userSelect: "none", minWidth: 180}}>
                            {months[month]}&nbsp;{year}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <svg
                            style={{cursor: "pointer"}}
                            onClick={() => nextMonthHandler(year, month)}
                            xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 3 18 18">
                            <path
                                d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"/>
                        </svg>
                    </Grid>
                </Grid>
            </Box>
        </Aux>
    )
}

export default MonthSelector;
