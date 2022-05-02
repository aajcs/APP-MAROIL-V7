import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Login from '../pages/Login'
// import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Layout from '../components/Layout'
import AppsRouter from './AppsRouter'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRouter() {
  return (
    <Router>
      <Layout>
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute exact path="/login" component={Login} />
          <Route path="/apps" component={AppsRouter} />
          {/* <Route exact path="/apps" component={Apps} /> */}

          <Route exact path="/404" component={NotFoundPage} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}
