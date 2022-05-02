/* eslint-disable react/prop-types */
import { Redirect, Route } from 'react-router-dom'
import AuthUse from '../auth/AuthUse'

export default function PrivateRoute({ hasRole: role, ...rest }) {
  const { isLogged } = AuthUse()

  if (!isLogged()) return <Redirect to="/login" />
  return (
    <div>
      <Route {...rest} />
    </div>
  )
}
