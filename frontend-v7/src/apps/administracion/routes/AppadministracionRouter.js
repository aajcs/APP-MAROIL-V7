/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from '../../../routes/PrivateRoute'
// import PrivateAdminRoute from '../../../routes/PrivateAdminRoute'

import classNames from 'classnames'

import { ConfigContext } from '../../../contexts/ConfigContext'

import '../styles/stylesAdministracion.css'

import { ProyectoAuxPage } from '../pages/ProyectoAuxPage'
import { MenuAdministracion } from '../components/MenuAdministracion'
import { ActivoPage } from '../pages/ActivoPage'
import { CentroDeCostoAuxPage } from '../pages/CentroDeCostoAuxPage'
import { FacturaPage } from '../pages/FacturaPage'
import { IngresoGastoPage } from '../pages/IngresoGastoPage'
import { ProveedorPage } from '../pages/ProveedorPage'
import { PresupuestoPage } from '../pages/PresupuestoPage'
import { ProcesoAuxPage } from '../pages/ProcesoAuxPage'
import { ConceptoAuxPage } from '../pages/ConceptoAuxPage'
import { HomeAdministracionPage } from '../pages/HomeAdministracionPage'
import { CargaInformacionPage } from '../pages/CargaInformacionPage'
import { MensualidadOpMesPage } from '../pages/MensualidadOpMesPage'
import { CostoTmMesPage } from '../pages/CostoTmMesPage'

export default function appadministracionRouter() {
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
        <MenuAdministracion />
      </div>
      <div className="layout-main-container">
        <div className="layout-main">
          <Switch>
            <PrivateRoute
              exact
              path="/apps/administracion"
              component={HomeAdministracionPage}
            />
            <PrivateRoute
              exact
              path="/apps/administracion/proyectoaux"
              component={ProyectoAuxPage}
            />
            <PrivateRoute
              exact
              path="/apps/administracion/activo"
              component={ActivoPage}
            />
            <PrivateRoute
              exact
              path="/apps/administracion/CentroDeCostoAux"
              component={CentroDeCostoAuxPage}
            />
            <PrivateRoute
              exact
              path="/apps/administracion/ProcesoAux"
              component={ProcesoAuxPage}
            />
            <PrivateRoute
              exact
              path="/apps/administracion/ConceptoAux"
              component={ConceptoAuxPage}
            />
            <PrivateRoute
              exact
              path="/apps/administracion/MensualidadOpMes"
              component={MensualidadOpMesPage}
            />
            <PrivateRoute
              exact
              path="/apps/administracion/CostoTmMes"
              component={CostoTmMesPage}
            />
            <PrivateRoute
              exact
              path="/apps/administracion/Factura"
              component={FacturaPage}
            />
            <PrivateRoute
              exact
              path="/apps/administracion/IngresoGasto"
              component={IngresoGastoPage}
            />
            <PrivateRoute
              exact
              path="/apps/administracion/proveedor"
              component={ProveedorPage}
            />
            <PrivateRoute
              exact
              path="/apps/administracion/cargaInformacion"
              component={CargaInformacionPage}
            />
            <PrivateRoute
              exact
              path="/apps/administracion/presupuesto"
              component={PresupuestoPage}
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
