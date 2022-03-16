import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IngredientsConstructorPage, LoginPage, RegisterPage, ForgotPasswordPage } from '../../pages';
import AppHeader from '../app-header'

function App () {

  return (
    <div className="content">
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact={true}>
            <IngredientsConstructorPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
