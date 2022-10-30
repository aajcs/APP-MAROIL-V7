/* eslint-disable prefer-const */

/* eslint-disable react/prop-types */

import React, { useRef } from 'react'
import { Toast } from 'primereact/toast'
import { TabView, TabPanel } from 'primereact/tabview'

import AuthUse from '../../../auth/AuthUse'
import IngresoGastoList from './IngresoGastoList'
import CostoTmMesList from './CostoTmMesList'
import MensualidadOpMesList from './MensualidadOpMesList'
import ConceptoAuxList from './ConceptoAuxList'
import ProcesoAuxList from './ProcesoAuxList'
import CentroDeCostoAuxList from './CentroDeCostoAuxList'

const CargaInformacionPanel = () => {
  const auth = AuthUse()
  // const token = auth.user.token

  const toast = useRef(null)

  return (
    <>
      <h5>Operaciones de Carga de Datos</h5>
      <TabView className="tabview-custom">
        <TabPanel header="Gastos e Ingresos" leftIcon="pi pi-user">
          <IngresoGastoList />
        </TabPanel>
        <TabPanel header="Costo Tm Mes" leftIcon="pi pi-user">
          <CostoTmMesList />
        </TabPanel>

        <TabPanel header="Mensualidad Op" leftIcon="pi pi-user">
          <MensualidadOpMesList />
        </TabPanel>
        <TabPanel header="Concepto" leftIcon="pi pi-user">
          <ConceptoAuxList />
        </TabPanel>
        <TabPanel header="Proceso" leftIcon="pi pi-user">
          <ProcesoAuxList />
        </TabPanel>
        <TabPanel header="Centro de Costo " leftIcon="pi pi-user">
          <CentroDeCostoAuxList />
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

export default CargaInformacionPanel
