import React, {useState} from "react";
import moment from "moment";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import TargetsList from "../targetsList/TargetsList";
import Aux from '../../hoc/Aux'
import Date from "./Date";
import * as actions from "../../store/actions";
import AlertDialogBox from "../targetsList/AlertDialogBox";
import OldTargetList from "../targetsList/OldTargetList"
import SnackBar from "../UI/snackBar/SnackBar";
import Typography from "@material-ui/core/Typography";

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontSize: 24
    },
    body: {
        fontSize: 20
    },
}))(TableCell);

const useStyles = makeStyles(theme => ({
    root: {
        userSelect: "none",
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 400,
    },
}));

const weekdays = moment.weekdays();

const DatesAndDays = (props) => {

    const dispatch = useDispatch();

    const error = useSelector(state => state.cal.error)
    const month = useSelector(state => state.cal.month)
    const year = useSelector(state => state.cal.year)
    const currentMonth = useSelector(state => state.cal.currentMonth)
    const currentYear = useSelector(state => state.cal.currentYear)
    const currentDate = useSelector(state => state.cal.currentDate)
    const firstDayOfMonth = useSelector(state => state.cal.firstDayOfMonth)
    const daysInMonth = useSelector(state => state.cal.daysInMonth)
    const monthlyTargetsAchieved = useSelector(state => state.cal.monthlyTargetsAchieved)
    const monthlyData = useSelector(state => state.cal.monthlyData)

    const openTargetList = useSelector(state => state.tl.open)
    const isSubmitting = useSelector(state => state.tl.isSubmitting)
    const isSubmitted = useSelector(state => state.tl.isSubmitted)

    const setMonthlyTargetsAchieved = localData => dispatch(actions.setAllMonthlyData(localData, monthlyData))
    const saveTargetForm = updatedTargetForm => dispatch(actions.saveTargetForm(updatedTargetForm))

    const [selectedDate, setSelectedDate] = useState(currentDate)
    const [openAlert, setOpenAlert] = useState(false)
    const [openOldForm, setOpenOldForm] = useState(false)

    const classes = useStyles();

    let blanks = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        blanks.push("");
    }

    let dates = [];
    for (let i = 0; i < daysInMonth; i++) {
        dates.push(i + 1);
    }

    const totalSlots = [...blanks, ...dates];

    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row)
        } else {
            const insertRow = cells.slice();
            rows.push(insertRow);
            cells = [];
            cells.push(row)
        }
        if (i === totalSlots.length - 1) {
            const insertRow = cells.slice();
            rows.push(insertRow)
        }
    })

    const onDateClick = (d) => {
        if (!isSubmitting) {
            const dateClicked = moment([year, month, d])
            const todayDate = moment([currentYear, currentMonth, currentDate])
            const diff = dateClicked.diff(todayDate, "days")
            setSelectedDate(d)
            if (diff === 0) {
                dispatch(actions.openTargetList())
            } else if (diff > 0) {
                setOpenAlert(true)
            } else {
                setOpenOldForm(true)
            }
        }
    }

    const getStyle = (n) => {
        if (n === null) {
            return "date"
        } else if (n >= 0 && n <= 1) {
            return "low"
        } else if (n > 1 && n <= 2) {
            return "medium"
        } else if (n > 2 && n < 3) {
            return "high"
        } else if (n === 3) {
            return "allDone"
        }
    }

    if (isSubmitted) {
        const noOfTargetsAcheived = localStorage.getItem("noOfTargetsAchieved")
        const noOfTargets = localStorage.getItem("noOfTargets")
        const existingTargetList = JSON.parse(localStorage.getItem("existingTargetList"))
        const localData = [...monthlyTargetsAchieved]
        const styleNumber = (noOfTargetsAcheived / noOfTargets) * 3
        localData.splice(currentDate, 1, styleNumber)
        setMonthlyTargetsAchieved(localData)
        saveTargetForm(existingTargetList)
        dispatch(actions.resetSubmission())
        localStorage.removeItem("existingTargetList")
        localStorage.removeItem("noOfTargetsAchieved")
        localStorage.removeItem("noOfTargets")
    }

    let errorMessage = null;
    if (error) {
        errorMessage = <Typography align={"center"} variant={"subtitle1"} color={"secondary"}>
            {error.message}
        </Typography>
    }

    return (
        <Aux>
            {errorMessage}
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {weekdays.map(day => (
                                <StyledTableCell key={day} align={"center"}>{day}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={Math.random()}>
                                {row.map(d => {
                                    const n = monthlyTargetsAchieved[d]
                                    let style = getStyle(n)
                                    return (
                                        <Aux key={Math.random()}>
                                            <StyledTableCell
                                                onClick={() => onDateClick(d)}
                                                align={"center"}>
                                                <Date date={d}
                                                      styled={style}
                                                />
                                            </StyledTableCell>
                                        </Aux>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <SnackBar/>
            {openTargetList ?
                <TargetsList
                    {...props}
                    date={selectedDate}/>
                : null}
            {openAlert ? <AlertDialogBox
                    open={openAlert}
                    closeAlert={() => setOpenAlert(false)}/>
                : null}
            {openOldForm ?
                <OldTargetList
                    openOldForm={openOldForm}
                    date={selectedDate}
                    closeOldForm={() => setOpenOldForm(false)}/>
                : null}
        </Aux>
    );
}

export default DatesAndDays
