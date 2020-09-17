import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../store/actions/index'
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Aux from "../../hoc/Aux";
import Loading from "../UI/loading/Loading";
import axios from "../../axios";

const useStyles = makeStyles(theme => ({
    typo: {
        margin: theme.spacing(2)
    },
    error: {
        margin: 10
    }
}))

const OldTargetList = (props) => {

    const {openOldForm, date} = props

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [dateData, setDateData] = useState([])

    const isAuthenticated = useSelector(state => state.auth.tokenId !== null)
    const userId = useSelector(state => state.auth.userId)

    const month = useSelector(state => state.cal.month)
    const year = useSelector(state => state.cal.year)

    useEffect(() => {
        setLoading(true)
        axios.get(`${userId}/dateData/${year}/${month}/${date}.json`)
            .then(response => {
                if (response.data !== null) {
                    const oldForm = Object.values(response.data)[0].targetForm
                    setDateData(oldForm)
                    setLoading(false)
                } else {
                    const error = {
                        message: "You have not submitted the targets on this day"
                    }
                    setError(error)
                    setLoading(false)
                }
            }).catch(error => {
            if (error.response) {
                setError(error.response.data.error)
            } else {
                setError("")
                setLoading(false)
                dispatch(actions.setSnackbar("Internet disconnected!", "error"))
            }
        })
    }, [setLoading, setError, setDateData,userId, year, month, date, dispatch])

    const classes = useStyles()

    let targetsAchievedList = []
    let targetsNotAchievedList = []
    dateData.map(data => {
        (data.checked) ? targetsAchievedList.push(data.value) :
            targetsNotAchievedList.push(data.value)
        return 0;
    })

    const handleClose = () => {
        props.closeOldForm()
    };

    let errorMessage = null;
    if (error) {
        errorMessage = <Typography
            className={classes.error}
            align={"center"}
            variant={"subtitle1"}
            color={"secondary"}>
            {isAuthenticated ? error.message : "Please login to see your report!"}
        </Typography>
    }

    let dialogContent
    if (loading) {
        dialogContent = <Loading timer={10}/>
    } else {
        dialogContent = <Aux>
            {errorMessage}
            <Typography
                className={classes.typo}
                variant={"h6"}>
                Targets-Achieved:
            </Typography>
            {targetsAchievedList.map((t, i) => (
                <Typography
                    key={t}
                    className={classes.typo}
                    variant={"subtitle1"}>
                    &nbsp;&nbsp;&nbsp;{i + 1}.&nbsp;{t}
                </Typography>
            ))}
            <Typography
                className={classes.typo}
                variant={"h6"}>
                Targets-NOT-Achieved:
            </Typography>
            {targetsNotAchievedList.map((t, i) => (
                <Typography
                    key={t}
                    className={classes.typo}
                    variant={"subtitle1"}>
                    &nbsp;&nbsp;&nbsp;{i + 1}.&nbsp;{t}
                </Typography>
            ))}
        </Aux>
    }

    return (
        <Dialog open={openOldForm} onClose={handleClose} fullWidth>
            <DialogTitle>Target-List</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    See your targets report on this date
                </DialogContentText>
                {dialogContent}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default OldTargetList
