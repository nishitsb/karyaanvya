import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "../UI/deleteIcon/DeleteIcon";
import FormGroup from "@material-ui/core/FormGroup";
import {useDispatch, useSelector} from "react-redux";
import AddIcon from "../UI/addIcon/AddIcon";
import {makeStyles} from "@material-ui/core/styles";
import * as actions from '../../store/actions/index'

const useStyles = makeStyles(theme => ({
    inputField: {
        width: `75%`
    },
    error: {
        margin: 10
    }
}))

const EditTargetForm = (props) => {

    const {tentativeList} = props

    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.userId)
    const currentDate = useSelector(state => state.cal.currentDate)
    const onEditTargetForm = (noOfTargetsAchieved, noOfTargets) => dispatch(actions.onEditTargetForm(userId, inputFields, noOfTargetsAchieved, noOfTargets))

    const [inputFields, setInputFields] = useState([]);
    const [disableEditButton, setDisableEditButton] = useState(true)

    useEffect(() => {
        if (inputFields.length) {
            let c = 0;
            inputFields.map(ip => {
                if(ip.value){
                    c++;
                }
                if(c === inputFields.length){
                    setDisableEditButton(false)
                }else{
                    setDisableEditButton(true)
                }
                return 0
            })

        } else {
            setDisableEditButton(true)
        }
    }, [inputFields])

    useEffect(() => {
        setInputFields(tentativeList)
    }, [tentativeList])

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

    const handleClose = () => {
        props.setEditTargetListClose();
    };

    const handleEditClickHandler = () => {

        const data = JSON.parse(localStorage.getItem("monthlyData"))
        let noOfTargetsAchieved = 0
        for(let key in data){
            if(data[key].date === currentDate){
                noOfTargetsAchieved = data[key].noOfTargetsAcheived
            }
        }
        const noOfTargets = inputFields.length

        onEditTargetForm(noOfTargetsAchieved, noOfTargets)

        props.setEditTargetListClose()
    }

    const classes = useStyles()

    return (
        <div>
            <Dialog open={props.editTargetListOpen} onClose={handleClose} fullWidth>
                <DialogTitle>Edit-Target-Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Refined targets may refine you!
                    </DialogContentText>
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

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleEditClickHandler}
                        disabled={disableEditButton}
                        color="primary"
                        variant={"contained"}>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditTargetForm
