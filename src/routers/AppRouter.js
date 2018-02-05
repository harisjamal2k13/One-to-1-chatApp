import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import DashboardPage from '../components/DashboardPage';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import SignupPage from '../components/SignupPage';
import Chat from '../components/Chat';

export const history = createHistory()

const AppRouter = () => {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <PublicRoute path="/" component={LoginPage} exact={true} />
                    <PublicRoute path="/signup" component={SignupPage} exact={true} />                    
                    <PrivateRoute path="/dashboard" component={DashboardPage} />
                    <PrivateRoute path="/chat/:FUID" component={Chat} />                    
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;