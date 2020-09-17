import React, {useState} from "react";
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import {makeStyles} from "@material-ui/core/styles";

const AddIcon = (props) => {

    const useStyles = makeStyles(theme => ({
        addIcon: {
            display: props.display ? props.display : "inline-block",
            marginTop: 10,
            cursor: "pointer"
        },
        span: {
            height: 40,
            width: 30
        }
    }))

    const classes = useStyles()

    let addIcon;

    const [toggleAddIcon, setToggleAddIcon] = useState(true)

    if (toggleAddIcon) {
        addIcon = <AddCircleTwoToneIcon
            className={classes.addIcon}
            onClick={props.addTargetInput}
            fontSize={"large"}/>
    } else {
        addIcon = <AddCircleRoundedIcon
            className={classes.addIcon}
            onClick={props.addTargetInput}
            fontSize={"large"}/>
    }

    const handleToggle = () => {
        setToggleAddIcon(prevState => !prevState)
    }

    return (
        <span className={classes.span} onMouseEnter={handleToggle} onMouseLeave={handleToggle}>
            {addIcon}
        </span>
    )
}

export default AddIcon
