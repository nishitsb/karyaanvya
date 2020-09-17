import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../store/actions'
import AddIcon from "../UI/addIcon/AddIcon";
import DeleteIcon from "../UI/deleteIcon/DeleteIcon";

const useStyles = makeStyles(theme => ({
    inputField: {
        width: `75%`
    },
    paper: {
        padding: 20
    },
    heading: {
        color: "#616161"
    },
    button: {
        marginRight: theme.spacing(1)
    }
}))

const TargetForm = (props) => {

    const dispatch = useDispatch()

    const saveTargetForm = () => dispatch(actions.saveTargetForm(inputFields))

    const targetForm = useSelector(state => state.tl.targetForm)

    const [inputFields, setInputFields] = useState(targetForm);
    const [disableNextButton, setDisableNextButton] = useState(true)

    useEffect(() => {
        if (inputFields.length) {
            if (inputFields[0].value) {
                setDisableNextButton(false)
            } else {
                setDisableNextButton(true)
            }
        } else {
            setDisableNextButton(true)
        }
    }, [inputFields])

    const onInputChangeHandler = (event, index) => {
        const inputs = [...inputFields]
        const input = inputs[index]
        input.value = event.target.value
        inputs.splice(index, 1, input)
        setInputFields(inputs)
    }

    const onAddTargetInput = () => {
        const newInput = {
            name: "Target",
            value: "",
            checked: false
        }
        const newInputFields = [...inputFields]
        newInputFields.push(newInput)
        setInputFields(newInputFields)
    }

    const onDeleteTargetInput = (index) => {
        const inputs = [...inputFields]
        inputs.splice(index, 1)
        setInputFields(inputs)
    }

    const onNextClickHandler = () => {
        saveTargetForm();
        props.onNextClick()
    }

    const onSkipClickHandler = () => {
        props.onSkipClick()
    }

    const classes = useStyles()

    return (
        <Box
            maxWidth={550}
            minHeight={400}
            mx={"auto"}
            p={3}
        >
            <Paper elevation={1} className={classes.paper}>
                <Typography variant={"h6"} className={classes.heading}>
                    Set your targets that will make you a better person:
                </Typography>
                <FormGroup>
                    {inputFields.map((input, i) => (
                        <Box key={`${input.name} ${i + 1}`}>
                            <TextField
                                autoFocus
                                className={classes.inputField}
                                margin={"normal"}
                                label={`${input.name} ${i + 1}`}
                                value={input.value}
                                onChange={(event) => onInputChangeHandler(event, i)}/>

                            <DeleteIcon deleteTargetInput={() => onDeleteTargetInput(i)}/>

                        </Box>
                    ))}
                </FormGroup>

                <AddIcon addTargetInput={onAddTargetInput}/>

                <Box
                    align={"center"}
                    my={1}>
                    <Button
                        disabled={!disableNextButton}
                        className={classes.button}
                        onClick={onSkipClickHandler}
                        variant={"contained"}
                        color={"primary"}>Skip</Button>
                    <Button
                        disabled={disableNextButton}
                        className={classes.button}
                        onClick={onNextClickHandler}
                        variant={"contained"}
                        color={"primary"}>Next</Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default TargetForm
