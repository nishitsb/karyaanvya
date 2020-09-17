import React from 'react'
import useHttpErrorHandler from '../../hooks/http-error-handler'
import Aux from "../Aux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

const withErrorHandler = (WrappedComponent, axios) => {

    return props => {

        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Aux>
                <Snackbar open={error} autoHideDuration={6000} onClose={clearError}>
                    <MuiAlert
                        elevation={6}
                        variant={"filled"}
                        onClose={clearError}
                        severity="error">
                        Network error
                    </MuiAlert>
                </Snackbar>
                <WrappedComponent {...props}/>
            </Aux>
        )
    }
}

export default withErrorHandler
