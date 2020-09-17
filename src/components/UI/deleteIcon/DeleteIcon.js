import React, {useState} from "react";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import {makeStyles} from "@material-ui/core/styles";

const DeleteIcon = (props) => {

    const useStyles = makeStyles(theme => ({
        deleteIcon: {
            display: props.display ? props.display : "inline-block",
            position: "relative",
            right: (props.right) ? props.right : 0,
            top: (props.top) ? props.top : 30,
            cursor: "pointer"
        },
    }))

    const classes = useStyles()

    let deleteIcon;

    const [toggleDeleteIcon, setToggleDeleteIcon] = useState(true)

    if (toggleDeleteIcon) {
        deleteIcon = <CancelTwoToneIcon
            onClick={props.deleteTargetInput}
            className={classes.deleteIcon}/>
    } else {
        deleteIcon = <CancelRoundedIcon
            onClick={props.deleteTargetInput}
            className={classes.deleteIcon}/>
    }

    const handleToggleDeleteIcon = () => {
        setToggleDeleteIcon(prevState => !prevState)
    }

    return (
        <span onMouseEnter={handleToggleDeleteIcon} onMouseLeave={handleToggleDeleteIcon}>
            {deleteIcon}
        </span>
    )
}

export default DeleteIcon
