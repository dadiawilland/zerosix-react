import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Route from './Router';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Home} isPrivate/>
                <Route path="/login" exact component={Login} isPrivate/>
                <Route path="/register" exact component={Register} isPrivate />
                <Route component={Login} />
            </Switch>
        );
    }
}