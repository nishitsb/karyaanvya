import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware, compose, combineReducers} from "redux"
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import App from './App';
import monthSelectorReducer from './store/reducers/calendar'
import targetListReducer from './store/reducers/targetList'
import signinReducer from './store/reducers/auth'
import registerReducer from './store/reducers/registerSummary'
import networkErrorReducer from "./store/reducers/snackbar"

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
    cal: monthSelectorReducer,
    tl: targetListReducer,
    auth: signinReducer,
    register: registerReducer,
    snk: networkErrorReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
