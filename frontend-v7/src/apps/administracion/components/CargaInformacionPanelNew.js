/* eslint-disable prefer-const */

/* eslint-disable react/prop-types */

import React, { useRef } from 'react'
import { Toast } from 'primereact/toast'
import { TabView, TabPanel } from 'primereact/tabview'

import AuthUse from '../../../auth/AuthUse'

import CargaProformaList from './CargaProformaList'
import DivisionList from './DivisionList'
import DominioList from './DominioList'
import DependenciaList from './DependenciaList'
import SubDependenciaList from './SubDependenciaList'
import ActividadAsociadaList from './ActividadAsociadaList'
import ClasificacionServicioList from './ClasificacionServicioList'
import Clasificacion3erNivelList from './Clasificacion3erNivelList'
import Clasificacion4toNivelList from './Clasificacion4toNivelList'

const CargaInformacionPanelNew = () => {
  const auth = AuthUse()
  // const token = auth.user.token

  const toast = useRef(null)

  return (
    <>
      <h5>Operaciones de Carga de Datos</h5>
      <TabView className="tabview-custom">
        <TabPanel header="Proformas" leftIcon="pi pi-user">
          <CargaProformaList />
        </TabPanel>
        <TabPanel header="Proformas Estimadas" leftIcon="pi pi-user">
          <CargaProformaList />
        </TabPanel>

        <TabPanel header="Dominio" leftIcon="pi pi-user">
          <DominioList />
        </TabPanel>
        <TabPanel header="Division" leftIcon="pi pi-user">
          <DivisionList />
        </TabPanel>
        <TabPanel header="Dependencia" leftIcon="pi pi-user">
          <DependenciaList />
        </TabPanel>
        <TabPanel header="Sub Depencia" leftIcon="pi pi-user">
          <SubDependenciaList />
        </TabPanel>
        <TabPanel header="Actividad Asociada" leftIcon="pi pi-user">
          <ActividadAsociadaList />
        </TabPanel>
        <TabPanel header="Clasificacion Servicio" leftIcon="pi pi-user">
          <ClasificacionServicioList />
        </TabPanel>
        <TabPanel header="Clasificacion 3er Nivel" leftIcon="pi pi-user">
          <Clasificacion3erNivelList />
        </TabPanel>
        <TabPanel header="Clasificacion 4to Nivel" leftIcon="pi pi-user">
          <Clasificacion4toNivelList />
        </TabPanel>
        {(auth.user.faidUser.roles[0] === 'ADMIN' ||
          auth.user.faidUser.roles[0] === 'SUPERADMIN') && (
          <TabPanel header="Carga de =>>>>" leftIcon="pi pi-user">
            <h1>listo3</h1>
          </TabPanel>
        )}
      </TabView>

      <Toast ref={toast} />
    </>
  )
}

export default CargaInformacionPanelNew
