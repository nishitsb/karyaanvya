import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../../store/actions'
import Aux from "../../../hoc/Aux";
import Loading from "../../../components/UI/loading/Loading";
import SnackBar from "../../../components/UI/snackBar/SnackBar";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 10,
    },
    heading: {
        fontWeight: "bold",
        margin: 15
    },
    formControl: {
        margin: 10,
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
    },
    error: {
        margin: 10
    }
}))

const Signup = props => {

    const {onNextClick} = props

    const dispatch = useDispatch();

    const onSignup = () => dispatch(actions.auth(email, password, true, name, gender))

    const isAuthenticated = useSelector(state => state.auth.tokenId !== null)
    const error = useSelector(state => state.auth.error)
    const loading = useSelector(state => state.auth.loading)

    useEffect(() => {
        if (isAuthenticated) {
            onNextClick()
        }
    }, [isAuthenticated, onNextClick])

    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const nameChangeHandler = (event) => {
        setName(event.target.value)
    }

    const genderChangeHandler = (event) => {
        setGender(event.target.value)
    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }

    const showPasswordHandler = () => {
        setShowPassword(prevState => !prevState)
    }

    const onNextClickHandler = () => {
        onSignup()
    }

    const classes = useStyles()

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

    let signupForm;
    if (loading) {
        signupForm = <Loading timer={10}/>
    } else {
        signupForm =
            <Aux>
                <FormGroup>
                    <FormControl className={classes.formControl} variant={"outlined"}>
                        <InputLabel htmlFor="outlined-adornment-Email">Full name</InputLabel>
                        <OutlinedInput
                            type={"text"}
                            value={name}
                            onChange={nameChangeHandler}
                            labelWidth={100}/>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            value={gender}
                            onChange={genderChangeHandler}
                            label="Gender"
                        >
                            <MenuItem value={'others'}><em>others</em></MenuItem>
                            <MenuItem value={'male'}>M</MenuItem>
                            <MenuItem value={'female'}>F</MenuItem>
                        </Select>
                    </FormControl>
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
                </FormGroup>
                <Box align={"center"} my={1}>
                    <Button
                        onClick={onNextClickHandler}
                        variant={"contained"}
                        color={"primary"}>Signup</Button>
                </Box>
            </Aux>
    }

    return (
        <Aux>
            <Box
                maxWidth={550}
                minHeight={400}
                mx={"auto"}
                p={3}>
                <Paper elevation={1} className={classes.paper}>
                    <Typography
                        className={classes.heading}
                        variant={"h4"}
                        color={"primary"}
                        align={"center"}>
                        Sign-up
                    </Typography>

                    {errorMessage}
                    {signupForm}

                </Paper>
            </Box>
           <SnackBar/>
        </Aux>
    )
}

export default Signup
