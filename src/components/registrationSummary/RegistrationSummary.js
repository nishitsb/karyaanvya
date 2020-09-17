import React, {useCallback, useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import * as actions from '../../store/actions/index'
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Loading from "../UI/loading/Loading";
import Aux from "../../hoc/Aux";

const useStyles = makeStyles(theme => ({
    typo: {
        margin: theme.spacing(2)
    },
    paper: {
        padding: 20
    },
    button: {
        marginRight: theme.spacing(1)
    }
}))

const RegistrationSummary = (props) => {

    const {onFinishClick, history} = props

    const dispatch = useDispatch()

    const [termsAndConditionsChecked, setTermsAndConditionsChecked] = useState(false)

    const userId = useSelector(state => state.auth.userId)
    const name = useSelector(state => state.register.name)
    const gender = useSelector(state => state.register.gender)
    const email = useSelector(state => state.register.email)
    const isTargetFormPosted = useSelector(state => state.tl.isTargetFormPosted)
    const loading = useSelector(state => state.tl.loading)
    const error = useSelector(state => state.tl.error)
    const targetForm = useSelector(state => state.tl.targetForm)

    const postTargetForm = () => dispatch(actions.onPostTargetForm(userId, targetForm))
    const setMonthlyTargetsAchieved = useCallback(() => dispatch(actions.setAllMonthlyData(null)), [dispatch])

    useEffect(() => {
        if (isTargetFormPosted) {
            setMonthlyTargetsAchieved()
            onFinishClick()
            history.push('/')
        }
    }, [isTargetFormPosted, onFinishClick, history, setMonthlyTargetsAchieved])

    const onFinishClickHandler = () => {
        if (targetForm.length === 0 && termsAndConditionsChecked) {
            onFinishClick()
            history.push('/')
        } else {
            postTargetForm()
        }
    }

    const onCheckBoxChecked = () => {
        setTermsAndConditionsChecked(prevState => !prevState)
    }

    const onBackClickHandler = () => {
        props.onBackClick()
    }

    const classes = useStyles();

    let errorMessage = null;
    if (error) {
        errorMessage = <Typography
            className={classes.error}
            align={"center"}
            variant={"subtitle1"}
            color={"secondary"}>
            {error.message}
        </Typography>
    }

    let registrationDetails;
    if (loading) {
        registrationDetails = <Loading timer={10}/>
    } else {
        registrationDetails = <Aux>
            <Typography
                className={classes.typo}
                variant={"h6"}
            >
                Name: {name}
            </Typography>
            <Typography
                className={classes.typo}
                variant={"h6"}>
                Gender: {gender}
            </Typography>
            <Typography
                className={classes.typo}
                variant={"h6"}>
                E-mail: {email}
            </Typography>
            <Typography
                className={classes.typo}
                variant={"h6"}>
                Targets:
            </Typography>
            {targetForm.map((t, i) => (
                <Typography
                    key={i}
                    className={classes.typo}
                    variant={"subtitle1"}>
                    &nbsp;&nbsp;&nbsp;{i + 1}.&nbsp;{t.value}
                </Typography>
            ))}
            <FormControlLabel
                control={<Checkbox
                    checked={termsAndConditionsChecked}
                    onChange={onCheckBoxChecked}
                    name={"termsAndConditionsChecked"}/>}
                label="I hereby accept all the Terms and Conditions."
            />
            <Box align={"center"} my={1}>
                <Button
                    className={classes.button}
                    onClick={onBackClickHandler}
                    variant={"contained"}
                >Back</Button>
                <Button
                    className={classes.button}
                    disabled={!termsAndConditionsChecked}
                    onClick={onFinishClickHandler}
                    variant={"contained"}
                    color={"primary"}>Finish</Button>
            </Box>
        </Aux>
    }

    return (
        <Box
            maxWidth={550}
            minHeight={400}
            mx={"auto"}
            p={3}>
            <Paper elevation={1} className={classes.paper}>
                <Typography
                    className={classes.typo}
                    align={"center"}
                    variant={"h5"}
                    color={"primary"}>
                    Registration Details
                </Typography>

                {errorMessage}
                {registrationDetails}

            </Paper>
        </Box>
    )
}

export default RegistrationSummary
