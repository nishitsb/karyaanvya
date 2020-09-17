import React from "react";
import Box from "@material-ui/core/Box";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from "../UI/addIcon/AddIcon";
import DeleteIcon from "../UI/deleteIcon/DeleteIcon";
import Aux from "../../hoc/Aux";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    inputField: {
        width: `75%`
    },
    error: {
        margin: 10
    }
}))

const TargetFormInDialog = (props) => {

    let {lengthOfExistingTargetList} = props

    lengthOfExistingTargetList = lengthOfExistingTargetList ? lengthOfExistingTargetList : 0

    const onInputChangeHandler = (event, index) => {
        const inputs = [...props.inputFields]
        const input = inputs[index]
        input.value = event.target.value
        inputs.splice(index, 1, input)
        props.targetFormChange(inputs)
    }

    const onAddTargetInput = () => {
        const newInput = {
            name: "Target",
            value: "",
            checked: false
        }
        const inputs = [...props.inputFields]
        inputs.push(newInput)
        props.targetFormChange(inputs)
    }

    const onDeleteTargetInput = (index) => {
        const inputs = [...props.inputFields]
        inputs.splice(index, 1)
        props.targetFormChange(inputs)
    }

    const classes = useStyles()

    let errorMessage = null;
    if (props.error) {
        errorMessage = <Typography
            className={classes.error}
            align={"center"}
            variant={"subtitle1"}
            color={"secondary"}>
            {props.error.message}
        </Typography>
    }

    return (
        <Aux>
            {errorMessage}
            <FormGroup>
                {props.inputFields.map((input, i) => (
                    <Box key={`${input.name} ${i + 1}`}>
                        <TextField
                            autoFocus
                            className={classes.inputField}
                            margin={"normal"}
                            label={`${input.name} ${i + lengthOfExistingTargetList + 1}`}
                            value={input.value}
                            onChange={(event) => onInputChangeHandler(event, i)}/>

                        <DeleteIcon deleteTargetInput={() => onDeleteTargetInput(i)}/>

                    </Box>
                ))}
            </FormGroup>

            <AddIcon addTargetInput={onAddTargetInput}/>

        </Aux>

    )
}

export default TargetFormInDialog
