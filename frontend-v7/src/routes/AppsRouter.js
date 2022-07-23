import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import Apps from '../pages/Apps'
import appControlRouter from '../apps/Control/routes/AppControlRouter'
import { HomeAdministracion } from '../apps/administracion/pages/HomeAdministracion'
import { HomeAIT } from '../apps/ait/pages/HomeAIT'
import ConfigProvider from '../apps/Control/contexts/ConfigProvider'
import appProcuraRouter from '../apps/procura/routes/AppProcuraRouter'

export default function appRouter() {
  return (
    <>
      <Switch>
        <PrivateRoute exact path="/apps" component={Apps} />
        <ConfigProvider>
          <PrivateRoute path="/apps/control" component={appControlRouter} />
          <PrivateRoute path="/apps/procura" component={appProcuraRouter} />
        </ConfigProvider>
        <PrivateRoute
          exact
          path="/apps/administracion"
          component={HomeAdministracion}
        />
        <PrivateRoute exact path="/apps/AIT" component={HomeAIT} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>
  )
}
