import React, {useState} from "react";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    editIcon: {
        color: "black",
        fontSize: 25,
        cursor: "pointer"
    },
}))

const EditIcon = (props) => {

    const classes = useStyles()

    let editIcon;

    const [toggleEditIcon, setToggleEditIcon] = useState(true)

    if (toggleEditIcon) {
        editIcon = <EditTwoToneIcon
            className={classes.editIcon}/>
    } else {
        editIcon = <EditRoundedIcon
            className={classes.editIcon}/>
    }

    const handleToggleEditIcon = () => {
        setToggleEditIcon(prevState => !prevState)
    }

    return (
        <span onMouseEnter={handleToggleEditIcon} onMouseLeave={handleToggleEditIcon}>
            {editIcon}
        </span>
    )
}

export default EditIcon
