import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import * as actions from '../../store/actions/index'
import Zoom from "@material-ui/core/Zoom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    typo: {
        margin: theme.spacing(2)
    },
}))

const PendingTargetsReminder = () => {

    const dispatch = useDispatch()

    const classes = useStyles()

    const prevDayPendingTargets = useSelector(state => state.tl.prevDayPendingTargets)
    const formId = localStorage.getItem("formId")

    const [pendingTargets, setPendingTargets] = useState([])

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if(prevDayPendingTargets.length && !formId){
            setPendingTargets(prevDayPendingTargets)
            setOpen(true)
        }
    }, [prevDayPendingTargets, formId])

    const handleClose = () => {
        setOpen(false)
    };

    const handleAgree = () => {
        localStorage.setItem("agreedOnAddingPrevPendingTargets", true)
        setOpen(false)
        dispatch(actions.openTargetList())
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>Previous day remaining targets</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    If you want you can add your remaining targets from previous day to the today's targets:
                </DialogContentText>
                {pendingTargets.map((t, i) => (
                    <Typography
                        key={t.value}
                        className={classes.typo}
                        variant={"subtitle1"}
                    >
                        &nbsp;&nbsp;&nbsp;{i + 1}.&nbsp;{t.value}
                    </Typography>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleAgree} color="primary">
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PendingTargetsReminder
