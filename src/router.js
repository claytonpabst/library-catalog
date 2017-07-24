
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home.js';
import LoginPage from './components/LoginPage/LoginPage.js';
import Admin from './components/Admin/Admin.js';


export default (
    <Switch>
        
        <Route component={ Home } path='/' exact />
        <Route component={ LoginPage } path='/login' />
        <Route component={ Admin } path='/admin' />

    </Switch>
)
