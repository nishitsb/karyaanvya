import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";

const Date = (props) => {

    const {styled} = props

    const useStyles = makeStyles(theme => ({

        date: {
            "&:hover": {
                cursor: "pointer",
                border: `1px solid rgb(201, 201, 201, 0.6)`,
                borderRadius: `100%`,
                padding: 10,
                backgroundColor: `rgb(201, 201, 201, 0.6)`,
            }
        },

        currentDate: {
            border: `2px solid rgb(128,0,128)`,
            borderRadius: `100%`,
            padding: 10,
        },

        low: {
            cursor: "pointer",
            borderRadius: `100%`,
            padding: 10,
            backgroundColor: `rgb(255, 0, 0, 0.5)`
        },

        medium: {
            cursor: "pointer",
            // border: `1px solid rgb(255,165,0, 0.5)`,
            borderRadius: `100%`,
            padding: 10,
            backgroundColor: `rgb(255,165,0, 0.5)`
        },

        high: {
            cursor: "pointer",
            borderRadius: `100%`,
            padding: 10,
            backgroundColor: `rgb(0,128,0, 0.5)`
        },

        allDone: {
            cursor: "pointer",
            borderRadius: `100%`,
            padding: 10,
            backgroundColor: "#2e7d32",
            color: "white",
            fontWeight: "bold"
        }
    }))

    const classes = useStyles()

    const currentDate = useSelector(state => state.cal.currentDate)

    let currentDateStyle = ""
    if(currentDate === props.date){
        currentDateStyle = "currentDate"
    }

    return (
        <span
            className={classes[styled] + " " + classes[currentDateStyle]}>
            {props.date}
        </span>
    )
}

export default Date
