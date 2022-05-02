import { Redirect, Route } from 'react-router-dom'
import AuthUse from '../auth/AuthUse'

export default function PublicRoute(props) {
  // const user= null
  const { isLogged } = AuthUse()

  if (isLogged()) return <Redirect to="/apps" />

  return (
    <div>
      <Route {...props} />
    </div>
  )
}
