
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home.js';
import LoginPage from './components/LoginPage/LoginPage.js';
import Admin from './components/Admin/Admin.js';


export default (
    <Switch>
        
        <Route exact path='/' component={ Home } />
        <Route exact path='/login' component={ LoginPage } />
        <Route exact path='/admin' component={ Admin } />

    </Switch>
)
