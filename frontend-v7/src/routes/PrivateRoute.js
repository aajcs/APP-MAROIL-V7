/* eslint-disable react/prop-types */
import { Redirect, Route } from 'react-router-dom'
import AuthUse from '../auth/AuthUse'

export default function PrivateRoute({ hasRole: role, ...rest }) {
  const { isLogged, user } = AuthUse()

  if (!isLogged()) return <Redirect to="/login" />
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'CREC 10'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoCrec10" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'ENDECO'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoEndeco" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'UNECA'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoUneca" />
        <Route {...rest} />
      </>
    )
  }
  return (
    <div>
      <Route {...rest} />
    </div>
  )
}
