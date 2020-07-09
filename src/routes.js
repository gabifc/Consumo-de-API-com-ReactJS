import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from './Components/pages/Main'
import Biography from './Components/pages/Biography'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/biographies/:id" component={Biography} />
        </Switch>
    </BrowserRouter>
)

export default Routes