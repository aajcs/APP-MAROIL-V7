/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from '../../../routes/PrivateRoute'
import PrivateAdminRoute from '../../../routes/PrivateAdminRoute'
import { HomeControl } from '../pages/HomeControl'

import classNames from 'classnames'
import { MenuControl } from '../components/MenuControl'
import { BarcoPage } from '../pages/BarcoPage'
import { GabarraPage } from '../pages/GabarraPage'
import { ReporteCargaPage } from '../pages/ReporteCargaPage'
import { UsuariosPage } from '../pages/UsuariosPage'
import { EstatusGabarraPage } from '../pages/EstatusGabarraPage'
import { Barco3DPage } from '../pages/Barco3DPage'
import { ReporteCargaGOMPage } from '../pages/ReporteCargaGOMPage'
import { ReporteCargaGOMInfoPage } from '../pages/ReporteCargaGOMInfoPage'
import { ConfigContext } from '../../../contexts/ConfigContext'
import { OperacionesGOMPAGE } from '../pages/OperacionesGOMPAGE'
import { CargaBodegaPage } from '../pages/CargaBodegaPage'
import { AgenciasMaritimas } from '../pages/AgenciasMaritimas'
import { BuquesPorCliente } from '../pages/BuquesPorCliente'

import '../styles/stylesControl.css'
import { MapaEstadisticoPage } from '../pages/MapaEstadisticoPage'
import { ProgramacionVentana } from '../pages/ProgramacionVentanaPage'
import { ModeladoOperacionPage } from '../pages/ModeladoOperacionPage'
import { ProgramacionVentanaAgendaPage } from '../pages/ProgramacionVentanaAgendaPage'
import { ReporteCargaGOMInfoPageCrec10 } from '../pages/ReporteCargaGOMInfoPageCrec10'

export default function appControlRouter() {
  const { staticMenuInactive, onToggleMenuClick } = useContext(ConfigContext)
  const [layoutMode, setLayoutMode] = useState('static')
  const [overlayMenuActive, setOverlayMenuActive] = useState(false)
  const [inputStyle, setInputStyle] = useState('outlined')
  const [ripple, setRipple] = useState(false)
  const [layoutColorMode, setLayoutColorMode] = useState('dark')
  const [mobileMenuActive, setMobileMenuActive] = useState(true)

  const wrapperClass = classNames('layout-wrapper', {
    'layout-overlay': layoutMode === 'overlay',
    'layout-static': layoutMode === 'static',
    'layout-static-sidebar-inactive':
      staticMenuInactive && layoutMode === 'static',
    'layout-overlay-sidebar-active':
      staticMenuInactive && layoutMode === 'static',
    'layout-mobile-sidebar-active': staticMenuInactive,
    'p-input-filled': inputStyle === 'filled',
    'p-ripple-disabled': ripple === false,
    'layout-theme-light': layoutColorMode === 'light'
  })
  return (
    <div className={wrapperClass}>
      <div className="layout-sidebar">
        <MenuControl />
      </div>
      <div className="layout-main-container">
        <div className="layout-main">
          <Switch>
            <PrivateRoute
              exact
              path="/apps/control"
              component={ReporteCargaGOMInfoPage}
            />
            <PrivateRoute
              exact
              path="/apps/control/barco"
              component={BarcoPage}
            />
            <PrivateRoute
              exact
              path="/apps/control/gabarra"
              component={GabarraPage}
            />
            <PrivateRoute
              exact
              path="/apps/control/reportecarga"
              component={ReporteCargaPage}
            />
            <PrivateRoute
              exact
              path="/apps/control/cargabodega"
              component={CargaBodegaPage}
            />
            <PrivateRoute
              exact
              path="/apps/control/reportecargaGOM"
              component={ReporteCargaGOMPage}
            />
            <PrivateRoute
              exact
              path="/apps/control/reportecargaGOMInfo"
              component={ReporteCargaGOMInfoPage}
            />
            <PrivateRoute
              exact
              path="/apps/control/reportecargaGOMInfoCrec10"
              component={ReporteCargaGOMInfoPageCrec10}
            />
            <PrivateRoute
              exact
              path="/apps/control/gabarraestatus"
              component={EstatusGabarraPage}
            />
            <PrivateRoute
              exact
              path="/apps/control/OperacionesGOM"
              component={OperacionesGOMPAGE}
            />
            <PrivateRoute
              exact
              path="/apps/control/barco3d"
              component={Barco3DPage}
            />
            <PrivateRoute
              exact
              path="/apps/control/Modeladooperacion"
              component={ModeladoOperacionPage}
            />
            <PrivateRoute
              exact
              path="/apps/control/mapaestadistica"
              component={MapaEstadisticoPage}
            />
            <PrivateRoute
              exact
              path="/apps/control/usuarios"
              component={UsuariosPage}
            />
            <PrivateRoute
              exact
              path="/apps/control/agenciamasritimas"
              component={AgenciasMaritimas}
            />{' '}
            <PrivateRoute
              exact
              path="/apps/control/programacionVentana"
              component={ProgramacionVentana}
            />
            <PrivateAdminRoute
              exact
              path="/apps/control/programacionventanaAgendaPage"
              component={ProgramacionVentanaAgendaPage}
            />
            <PrivateAdminRoute
              exact
              path="/apps/control/BuquesPorCliente"
              component={BuquesPorCliente}
            />
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}
