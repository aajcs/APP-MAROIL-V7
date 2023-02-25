import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import Apps from '../pages/Apps'
import appControlRouter from '../apps/Control/routes/AppControlRouter'
import appControlLiquidosRouter from '../apps/controlLiquidos/routes/AppControlLiquidosRouter'
import { HomeAIT } from '../apps/ait/pages/HomeAIT'
import ConfigProvider from '../apps/Control/contexts/ConfigProvider'
import appProcuraRouter from '../apps/procura/routes/AppProcuraRouter'
import appReporteGerenciaRouter from '../apps/reporteGerencia/routes/AppreporteGerenciaRouter'
import appPlanificacionMaritimaRouter from '../apps/planificacionMaritima/routes/AppPlanificacionMaritimaRouter'
import appadministracionRouter from '../apps/administracion/routes/AppadministracionRouter'
import appAlmacenRouter from '../apps/almacen/routes/AppAlmacenRouter'

export default function appRouter() {
  return (
    <>
      <Switch>
        <PrivateRoute exact path="/apps" component={Apps} />
        <ConfigProvider>
          <PrivateRoute path="/apps/control" component={appControlRouter} />
          <PrivateRoute
            path="/apps/controlLiquidos"
            component={appControlLiquidosRouter}
          />
          <PrivateRoute
            path="/apps/reportegerencia"
            component={appReporteGerenciaRouter}
          />
          <PrivateRoute path="/apps/procura" component={appProcuraRouter} />
          <PrivateRoute
            path="/apps/administracion"
            component={appadministracionRouter}
          />
          <PrivateRoute
            path="/apps/planificacionMaritima"
            component={appPlanificacionMaritimaRouter}
          />
          <PrivateRoute path="/apps/almacen" component={appAlmacenRouter} />
        </ConfigProvider>
        <PrivateRoute exact path="/apps/AIT" component={HomeAIT} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>
  )
}
