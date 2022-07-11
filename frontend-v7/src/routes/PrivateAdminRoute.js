/* eslint-disable react/prop-types */
import { Redirect, Route } from 'react-router-dom'
import AuthUse from '../auth/AuthUse'

export default function PrivateAdminRoute({ hasRole: role, ...rest }) {
  const { isLogged, user } = AuthUse()

  if (user.faidUser.roles[0] !== 'ADMIN') return <Redirect to="/login" />
  if (!isLogged()) return <Redirect to="/login" />
  return (
    <div>
      <Route {...rest} />
    </div>
  )
}
