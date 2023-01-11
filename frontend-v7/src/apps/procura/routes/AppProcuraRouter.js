/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from '../../../routes/PrivateRoute'
// import PrivateAdminRoute from '../../../routes/PrivateAdminRoute'

import classNames from 'classnames'
import { MenuProcura } from '../components/MenuProcura'

import { ConfigContext } from '../../../contexts/ConfigContext'

import '../styles/stylesProcura.css'

import { HomeProura } from '../pages/HomeProura'
import ReporteCargaGOMInfoCard from '../../Control/components/ReporteCargaGOMInfoCard'
import { ProyectoAuxPage } from '../pages/ProyectoAuxPage'
import { GanadorPage } from '../pages/GanadorPage'

export default function appProcuraRouter() {
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
    'layout-static-sidebar-inactive': true && layoutMode === 'static',
    'layout-overlay-sidebar-active': true && layoutMode === 'static',
    'layout-mobile-sidebar-active': true,
    'p-input-filled': inputStyle === 'filled',
    'p-ripple-disabled': ripple === false,
    'layout-theme-light': layoutColorMode === 'light'
  })
  return (
    <div className={wrapperClass}>
      {/* <div className="layout-sidebar">
        <MenuProcura />
      </div> */}
      <div className="layout-main-container">
        <div className="layout-main">
          <Switch>
            <PrivateRoute exact path="/apps/procura" component={HomeProura} />
            <PrivateRoute
              exact
              path="/apps/procura/proyectoaux"
              component={ProyectoAuxPage}
            />
            <PrivateRoute
              exact
              path="/apps/procura/ganador"
              component={GanadorPage}
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
