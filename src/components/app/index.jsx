import React from 'react'
import { ProtectedRoute } from '../protected-route'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  IngredientsConstructorPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage
} from '../../pages';
import AppHeader from '../app-header'

function App () {

  return (
    <div className="content">
      <Router>
        <AppHeader />
        <Switch>
          <ProtectedRoute path="/" exact={true}>
            <IngredientsConstructorPage />
          </ProtectedRoute>
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
        </Switch>
      </Router>
    </div>
  )
}

export default App;
