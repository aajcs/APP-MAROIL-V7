/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from '../../../routes/PrivateRoute'
// import PrivateAdminRoute from '../../../routes/PrivateAdminRoute'

import classNames from 'classnames'
import {
  MenuControlL,
  MenuControlLiquidos
} from '../components/MenuControlLiquidos'

import { ConfigContext } from '../../../contexts/ConfigContext'

import '../styles/stylesControlLiquidos.css'

import { HomeControlLiquidosPage } from '../pages/HomeControlLiquidosPage'
import ReporteCargaGOMInfoCard from '../../Control/components/ReporteCargaGOMInfoCard'
import { EmbarcacionPage } from '../pages/EmbarcacionPage'
import { RemolcadorPage } from '../pages/RemolcadorPage'
import { EmbarcacionInfoPage } from '../pages/EmbarcacionInfoPage'
import { RemolcadorInfoPage } from '../pages/RemolcadorInfoPage'
import { ViajePage } from '../pages/ViajePage'
import { ViajeInfoPage } from '../pages/ViajeInfoPage'

export default function AppControlLiquidosRouter() {
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
        <MenuControlLiquidos />
      </div>
      <div className="layout-main-container">
        <div className="layout-main">
          <Switch>
            <PrivateRoute
              exact
              path="/apps/controlLiquidos"
              component={HomeControlLiquidosPage}
            />

            <PrivateRoute
              exact
              path="/apps/controlLiquidos/embarcacion"
              component={EmbarcacionPage}
            />
            <PrivateRoute
              exact
              path="/apps/controlLiquidos/remolcador"
              component={RemolcadorPage}
            />
            <PrivateRoute
              exact
              path="/apps/controlLiquidos/embarcacioninfo"
              component={EmbarcacionInfoPage}
            />
            <PrivateRoute
              exact
              path="/apps/controlLiquidos/remolcadorinfo"
              component={RemolcadorInfoPage}
            />
            <PrivateRoute
              exact
              path="/apps/controlLiquidos/viaje"
              component={ViajePage}
            />
            <PrivateRoute
              exact
              path="/apps/controlLiquidos/viajeinfo"
              component={ViajeInfoPage}
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
