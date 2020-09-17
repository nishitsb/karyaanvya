import React, {useCallback, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import * as actions from '../../../store/actions/index'
import {useDispatch} from "react-redux";

const Logout = () => {

    const dispatch = useDispatch()
    const onLogout = useCallback(() => dispatch(actions.onLogout(false)), [dispatch])

    useEffect(() => {
        onLogout()
    }, [onLogout])

    return (
        <Redirect to={'/'}/>
    )
}

export default Logout


