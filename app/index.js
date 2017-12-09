import React from 'react';
import ReactDOM from "react-dom";
import {HashRouter as Router,Redirect, Switch, Route} from 'react-router-dom';
import 'antd/dist/antd.less';
import {Button} from 'antd';

import {Main} from './main/main.js';
import {Signin} from './signin.js';
import {NotFound} from './notfound';

ReactDOM.render((
    <Router>
        <Switch>
            <Redirect exact from='/' to='/main'/>
            <Route path="/signin" component={Signin}/>
            <Route path="/main" component={Main}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
), document.getElementById('root'));


