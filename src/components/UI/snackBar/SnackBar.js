import React from "react";
import {toJS} from "mobx"
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert"
import * as actions from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";

const SnackBar = () => {

    const dispatch = useDispatch()

    const removeSnackbar = () => dispatch(actions.removeSnackbar())

    const open = toJS(useSelector(state => state.snk.open))
    const message = toJS(useSelector(state => state.snk.message))
    const severity = toJS(useSelector(state => state.snk.severity))
    const autoHideDuration = toJS(useSelector(state => state.snk.autoHideDuration))

    return (
        <Snackbar open={open}
                  autoHideDuration={autoHideDuration ? autoHideDuration : 1000}
                  onClose={removeSnackbar}>
            <MuiAlert
                elevation={6}
                variant={"filled"}
                onClose={removeSnackbar}
                severity={(severity !== "") ? severity : "info"}>
                {message}
            </MuiAlert>
        </Snackbar>
    )
}

export default SnackBar
