import React, {useCallback, useEffect, Suspense} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import * as actions from './store/actions/index'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import Calendar from "./containers/Calendar/Calender";
import Signin from "./containers/Auth/signin/Signin";
import Logout from "./containers/Auth/logout/Logout";
import PendingTargetsReminder from "./components/pendingTargetsReminder/PendingTargetsReminder";
import Aux from "./hoc/Aux";
import Dashboard from "./containers/Dashboard/Dashboard";

const App = () => {

    const Register = React.lazy(() => {
        return import("./containers/Auth/register/Register")
    })

    const userId = useSelector(state => state.auth.userId)

    const dispatch = useDispatch();
    const initCalendar = useCallback(() => dispatch(actions.initCalendar()), [dispatch])
    const authCheck = useCallback(() => dispatch(actions.authCheckStatus()), [dispatch])
    const getTargetForm = useCallback((userId) => dispatch(actions.onGetTargetForm(userId)), [dispatch])
    const getMonthlyData = useCallback((userId) => dispatch(actions.onGetMonthlyData(userId)), [dispatch])
    const getPersonalDetails = useCallback((userId) => dispatch(actions.onGetPersonalDetails(userId)), [dispatch])
    const isAuthenticated = useSelector(state => state.auth.tokenId !== null)

    useEffect(() => {
        initCalendar()
        authCheck()
    }, [authCheck, initCalendar])

    useEffect(() => {
        getMonthlyData(userId)
    }, [userId, getMonthlyData])

    useEffect(() => {
        getPersonalDetails(userId)
    }, [userId, getPersonalDetails])

    useEffect(() => {
        getTargetForm(userId)
    }, [userId, getTargetForm])

    let routes = <Switch>
        <Route path={'/signin'} component={Signin}/>
        <Route path={'/register'} render={(props => <Register {...props}/>)}/>
        <Route path={'/dashboard'} component={Dashboard}/>
        <Route path={'/'} exact component={Calendar}/>
        <Redirect to={'/'}/>
    </Switch>

    if (isAuthenticated) {
        routes = <Switch>
            <Route path={'/register'} render={(props => <Register {...props}/>)}/>
            <Route path={'/logout'} component={Logout}/>
            <Route path={'/dashboard'} component={Dashboard}/>
            <Route path={'/'} exact component={Calendar}/>
            <Redirect to={'/'}/>
        </Switch>
    }

    return (
        <Aux>
            <PendingTargetsReminder/>
            <Suspense fallback={<h3>Loading...</h3>}>
                {routes}
            </Suspense>
        </Aux>
    );
}

export default withRouter(App);
