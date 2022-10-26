/* eslint-disable prefer-const */

/* eslint-disable react/prop-types */

import React, { useRef } from 'react'
import { Toast } from 'primereact/toast'
import { TabView, TabPanel } from 'primereact/tabview'

import AuthUse from '../../../auth/AuthUse'
import IngresoGastoList from './IngresoGastoList'

const CargaInformacionPanel = () => {
  const auth = AuthUse()
  // const token = auth.user.token

  const toast = useRef(null)

  return (
    <>
      <h5>Operaciones de Carga de Datos</h5>
      <TabView className="tabview-custom">
        <TabPanel
          header="Carga de Gastos e Ingresos Mensuales"
          leftIcon="pi pi-user"
        >
          <IngresoGastoList />
        </TabPanel>
        <TabPanel header="Carga de =>>>>" leftIcon="pi pi-user">
          <h2>listo3</h2>
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
