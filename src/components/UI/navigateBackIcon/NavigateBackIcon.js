import React, {useState} from "react";
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateBeforeTwoToneIcon from '@material-ui/icons/NavigateBeforeTwoTone';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    NavigateBackIcon: {
        position:"relative",
        top: 3,
        right: 1,
        color: "black",
        fontSize: 25,
        cursor: "pointer"
    },
}))

const NavigateBackIcon = (props) => {

    const classes = useStyles()

    let NavigateBackIcon;

    const [toggleNavigateBackIcon, setToggleNavigateBackIcon] = useState(true)

    if (toggleNavigateBackIcon) {
        NavigateBackIcon = <NavigateBeforeTwoToneIcon
            className={classes.NavigateBackIcon}/>
    } else {
        NavigateBackIcon = <NavigateBeforeRoundedIcon
            className={classes.NavigateBackIcon}/>
    }

    const handleToggleNavigateBackIcon = () => {
        setToggleNavigateBackIcon(prevState => !prevState)
    }

    return (
        <span onMouseEnter={handleToggleNavigateBackIcon} onMouseLeave={handleToggleNavigateBackIcon}>
            {NavigateBackIcon}
        </span>
    )
}

export default NavigateBackIcon
