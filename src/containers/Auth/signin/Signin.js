import React, {useEffect, useState} from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../../store/actions'
import Button from "@material-ui/core/Button";
import Appbar from "../../../components/appbar/Appbar";
import Aux from "../../../hoc/Aux";
import Loading from "../../../components/UI/loading/Loading";
import SnackBar from "../../../components/UI/snackBar/SnackBar";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 10,
        minHeight: 300
    },
    heading: {
        fontWeight: "bold",
        margin: 15
    },
    formControl: {
        margin: 15,
        minWidth: 200
    },
    register: {
        color: "secondary",
        cursor: "pointer",
        "&:hover": {
            color: "#ad1457"
        }
    },
    newUser: {
        margin: 10
    }
}))

const Signin = (props) => {

    const {history} = props

    const dispatch = useDispatch()

    const onSignin = (email, password) => dispatch(actions.auth(email, password, false))

    const isAuthenticated = useSelector(state => state.auth.tokenId !== null)
    const loading = useSelector(state => state.auth.loading)
    const error = useSelector(state => state.auth.error)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }
    }, [isAuthenticated, history])

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }

    const showPasswordHandler = () => {
        setShowPassword(prevState => !prevState)
    }

    const onRegisterClickHandler = () => {
        props.history.push('/register');
    }

    const classes = useStyles()

    let errorMessage = null;
    if (error) {
        errorMessage = <Typography align={"center"} variant={"subtitle1"} color={"secondary"}>
            {error.message}
        </Typography>
    }

    return <Aux>
        <Appbar {...props}/>
        <Box
            maxWidth={500}
            mx={"auto"}
            mt={10}
            p={3}>
            <Paper elevation={2} className={classes.paper}>
                <Typography
                    className={classes.heading}
                    variant={"h4"}
                    color={"primary"}
                    align={"center"}>
                    Login
                </Typography>
                {errorMessage}
                {loading ? <Loading timer={10}/> :
                    <FormGroup>
                        <FormControl className={classes.formControl} variant={"outlined"}>
                            <InputLabel htmlFor="outlined-adornment-Email">E-mail</InputLabel>
                            <OutlinedInput
                                type={"text"}
                                value={email}
                                onChange={emailChangeHandler}
                                labelWidth={100}/>
                        </FormControl>
                        <FormControl className={classes.formControl} variant={"outlined"}>
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={passwordChangeHandler}
                                labelWidth={100}
                                endAdornment={
                                    <InputAdornment position={"end"}>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={showPasswordHandler}
                                            edge={"end"}>
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>}
                            />
                        </FormControl>
                    </FormGroup>}
                {loading ? null :
                    <Box align={"center"} my={1} mb={3}>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={() => onSignin(email, password)}>Login</Button>
                    </Box>}

                <Typography
                    className={classes.newUser}
                    align={"center"}
                    variant={"h6"}
                    color={"secondary"}>
                    <i>New user ? </i><span
                    onClick={onRegisterClickHandler}
                    className={classes.register}><u>Register</u></span>
                </Typography>
            </Paper>
        </Box>
        <SnackBar/>
    </Aux>
}

export default Signin
