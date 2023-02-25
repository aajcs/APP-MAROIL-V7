/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from '../../../routes/PrivateRoute'
// import PrivateAdminRoute from '../../../routes/PrivateAdminRoute'

import classNames from 'classnames'

import { ConfigContext } from '../../../contexts/ConfigContext'

import '../styles/stylesAlmacen.css'

import { MenuAlmacen } from '../components/MenuAlmacen'

import { HomeAlmacenPage } from '../pages/HomeAlmacenPage'
import { ActividadPage, CodificacionPage } from '../pages/CodificacionPage'

export default function appAlmacenRouter() {
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
        <MenuAlmacen />
      </div>
      <div className="layout-main-container">
        <div className="layout-main">
          <Switch>
            <PrivateRoute
              exact
              path="/apps/almacen"
              component={HomeAlmacenPage}
            />
            <PrivateRoute
              exact
              path="/apps/almacen/codificacion"
              component={CodificacionPage}
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
