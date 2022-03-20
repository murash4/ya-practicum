import React from 'react'
import { ProtectedRoute } from '../protected-route'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  IngredientsConstructorPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  Page404
} from '../../pages';
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
          <Route path="/reset-password">
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
