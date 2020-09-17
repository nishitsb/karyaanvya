import React, {useEffect, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../store/actions/index'
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import TargetFormInDialog from "../targetForm/TargetFormInDialog";
import Loading from "../UI/loading/Loading";
import Aux from "../../hoc/Aux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from "../UI/editIcon/EditIcon";
import Box from "@material-ui/core/Box";
import DeleteIcon from "../UI/deleteIcon/DeleteIcon";
import {makeStyles} from "@material-ui/core/styles";
import NavigateBackIcon from "../UI/navigateBackIcon/NavigateBackIcon";

const TargetsList = (props) => {

    const hasTargetList = useSelector(state => state.tl.targetForm.length !== 0)
    const isAuthenticated = useSelector(state => state.auth.tokenId !== null)
    const targetList = useSelector(state => state.tl.targetForm)

    const useStyles = makeStyles(theme => ({
        formControlLabel: {
            width: `75%`,
        },
        box: {
            height: 50,
        }
    }))

    const classes = useStyles()

    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            display: ((!hasTargetList && isAuthenticated) || !isAuthenticated) ? "none" : "inline-block",
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
        },
    });

    const clickBackIconHandler = () => {
        setExitingTargetList([...targetList])
        setEditMode(prevState => !prevState)
    }

    const DialogTitle = withStyles(styles)((props) => {
        const {children, classes, onClose, ...other} = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                <IconButton onClick={clickBackIconHandler} className={classes.closeButton}>
                    {editMode ? <NavigateBackIcon/> : <EditIcon/>}
                </IconButton>
            </MuiDialogTitle>
        );
    });

    const dispatch = useDispatch()

    const open = useSelector(state => state.tl.open)
    const noOfTargets = useSelector(state => state.tl.targetForm.length)
    const loading = useSelector(state => state.tl.loading)
    const isTargetFormPosted = useSelector(state => state.tl.isTargetFormPosted)

    const prevDayPendingTargets = useSelector(state => state.tl.prevDayPendingTargets)

    const userId = useSelector(state => state.auth.userId)

    const id = localStorage.getItem("id")

    const onSubmitTargetList = (noOfTargetsAchieved) => dispatch(actions.onSubmitTargetList(userId, existingTargetList, noOfTargetsAchieved, noOfTargets))
    const onUpdateTargetList = (noOfTargetsAchieved) => dispatch(actions.onUpdateTargetList(userId, existingTargetList, noOfTargetsAchieved, noOfTargets))
    const postTargetForm = () => dispatch(actions.onPostTargetForm(userId, addedTargetList))
    const onEditTargetForm = (editedTargetList, noOfTargetsAchieved, noOfTargets) => dispatch(actions.onEditTargetForm(userId, editedTargetList, noOfTargetsAchieved, noOfTargets))

    const [existingTargetList, setExitingTargetList] = useState([...targetList]);
    const [addedTargetList, setAddedTargetList] = useState([]);
    const [disableSaveButton, setDisableSaveButton] = useState(true)
    const [disableEditButton, setDisableEditButton] = useState(true)
    const [disableSubmitButton, setDisableSubmitButton] = useState(true)
    const [editMode, setEditMode] = useState(false)

    const agreedOnAddingPrevPendingTargets = localStorage.getItem("agreedOnAddingPrevPendingTargets")

    useEffect(() => {
        if (agreedOnAddingPrevPendingTargets) {
            setAddedTargetList([...prevDayPendingTargets])
        }
        return () => {
            localStorage.removeItem("agreedOnAddingPrevPendingTargets")
            setAddedTargetList([])
        }
    }, [agreedOnAddingPrevPendingTargets, prevDayPendingTargets])

    useEffect(() => {
        setExitingTargetList(targetList)
    }, [targetList])

    useEffect(() => {
        if (addedTargetList.length) {
            let c = 0;
            addedTargetList.map(ip => {
                if (ip.value) {
                    c++;
                }
                return 0
            })
            if (c === addedTargetList.length) {
                setDisableSaveButton(false)
            } else {
                setDisableSaveButton(true)
            }
        } else {
            setDisableSaveButton(true)
        }
    }, [addedTargetList])

    useEffect(() => {
        const inputs = [...existingTargetList, ...addedTargetList]
        if (inputs.length) {
            let c = 0;
            inputs.map(ip => {
                if (ip.value) {
                    c++;
                }
                return 0
            })
            if (c === inputs.length) {
                setDisableEditButton(false)
            } else {
                setDisableEditButton(true)
            }
        } else {
            setDisableEditButton(true)
        }
    }, [existingTargetList, addedTargetList])

    useEffect(() => {
        let c = 0;
        existingTargetList.map(ip => {
            if (!ip.checked) {
                c++;
            }
            return 0
        })
        if (c === existingTargetList.length) {
            setDisableSubmitButton(true)
        } else {
            setDisableSubmitButton(false)
        }
    }, [existingTargetList])

    const targetFormChangeHandler = (inputs) => {
        setAddedTargetList(inputs)
    }

    const onCheckedHandler = (index) => {
        const inputs = [...existingTargetList]
        const input = {...inputs[index]}
        input.checked = !input.checked
        inputs.splice(index, 1, input)
        setExitingTargetList(inputs)
    }

    const onDeleteExistingTarget = (index) => {
        const inputs = [...existingTargetList]
        inputs.splice(index, 1)
        setExitingTargetList(inputs)
    }

    const onSubmitHandler = () => {
        let x = 0;
        existingTargetList.map(target => {
            if (target.checked) {
                x++;
            }
            return 0;
        })
        localStorage.setItem("noOfTargetsAchieved", x)
        localStorage.setItem("noOfTargets", existingTargetList.length)
        localStorage.setItem("existingTargetList", JSON.stringify(existingTargetList))
        if (id) {
            onUpdateTargetList(x)
        } else {
            onSubmitTargetList(x);
        }
        dispatch(actions.closeTargetList())
    }

    const onSaveHandler = () => {
        localStorage.removeItem("prevDayPendingTargets")
        postTargetForm()
    }

    const onEditHandler = () => {
        const editedTargetList = [...existingTargetList, ...addedTargetList]
        let noOfTargetsAchieved = 0
        editedTargetList.map(ip => {
            if (ip.checked) {
                noOfTargetsAchieved++;
            }
            return 0
        })
        const noOfTargets = editedTargetList.length
        onEditTargetForm(editedTargetList, noOfTargetsAchieved, noOfTargets)
    }

    const onLoginHandler = () => {
        props.history.push('/signin')
        dispatch(actions.closeTargetList())
    }

    const handleClose = () => {
        dispatch(actions.closeTargetList())
    }

    let form = <FormGroup>
        {existingTargetList.map((target, i) => (
            <Box my={1} key={`${target.name} ${i + 1}`} className={classes.box}>
                <FormControlLabel
                    className={classes.formControlLabel}
                    control={<Checkbox
                        disabled={editMode}
                        checked={target.checked}
                        onChange={() => onCheckedHandler(i)}
                        name={target.value}/>}
                    label={target.value}
                />
                <DeleteIcon
                    display={editMode ? "inline-block" : "none"}
                    deleteTargetInput={() => onDeleteExistingTarget(i)}
                    top={8}
                    right={5}/>
            </Box>
        ))}
        {editMode ? <TargetFormInDialog
            lengthOfExistingTargetList={existingTargetList.length}
            inputFields={addedTargetList}
            targetFormChange={targetFormChangeHandler}/> : null}
    </FormGroup>
    let dialogContentText = "Check your completed task!"
    let button = <Button disabled={disableSubmitButton} onClick={onSubmitHandler} variant={"contained"} color="primary">
        {(id) ? "Update" : "Submit"}
    </Button>

    if (!hasTargetList && isAuthenticated) {
        form = <TargetFormInDialog
            inputFields={addedTargetList}
            targetFormChange={targetFormChangeHandler}/>

        dialogContentText = "Make your to-dos for today!"

        button = <Button disabled={disableSaveButton} variant={"contained"} onClick={onSaveHandler}
                         color="primary">Save</Button>
        if (loading) {
            button = <Loading size={25} thickness={6} timer={50} p={2}/>
        }
    }

    if (editMode) {
        dialogContentText = "Edit your to-do list"

        button = <Button disabled={disableEditButton} variant={"contained"} onClick={onEditHandler}
                         color="primary">Edit</Button>
        if (loading) {
            button = <Loading size={25} thickness={6} timer={50} p={2}/>
        }

        if (isTargetFormPosted) {
            setEditMode(false)
        }
    }

    if (!isAuthenticated) {
        dialogContentText = "Login to see your To-dos"
        button = <Button onClick={onLoginHandler} variant={"contained"} color="primary">Login</Button>
    }

    if (isTargetFormPosted) {
        dispatch(actions.postTargetFormReset())
        setAddedTargetList([])
    }

    return (
        <Aux>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>
                    To-Do List
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogContentText}
                    </DialogContentText>
                    {form}
                </DialogContent>
                <DialogActions>
                    
                    <Button
                        disabled={loading}
                        onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {button}
                </DialogActions>
            </Dialog>
        </Aux>
    )
}

export default TargetsList
