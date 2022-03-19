import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function ProtectedRoute({ children, ...rest }) {
  const user = useSelector(state => state.user)

  return (
    <Route
      {...rest}
      render={
        ({ location }) => user.data ?
          children :
          (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
      }
    />
  )
}
