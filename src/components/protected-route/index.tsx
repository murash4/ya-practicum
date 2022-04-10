import { FC } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

interface IProtectedRoute {
  path: string
  exact: boolean
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  // @ts-ignore
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

export default ProtectedRoute
