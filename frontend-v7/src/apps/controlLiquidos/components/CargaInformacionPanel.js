/* eslint-disable prefer-const */

/* eslint-disable react/prop-types */

import React, { useRef } from 'react'
import { Toast } from 'primereact/toast'
import { TabView, TabPanel } from 'primereact/tabview'

import AuthUse from '../../../auth/AuthUse'
import CargaInformacionList from './CargaInformacionList'
import { CargaInformacionTanqueList } from './CargaInformacionTanqueList'
import GastosOperacionaleList from './GastosOperacionaleList'
import BuqueList from './BuqueList'
import ReporteCargaBuqueList from './ReporteCargaBuqueList'

const CargaInformacionPanel = () => {
  const auth = AuthUse()
  // const token = auth.user.token

  const toast = useRef(null)

  return (
    <>
      <h5>Operaciones de Carga de Viajes</h5>
      <TabView className="tabview-custom">
        <TabPanel header="Carga de Buque" leftIcon="pi pi-user">
          <BuqueList />
        </TabPanel>
        <TabPanel header="Carga de Feeder" leftIcon="pi pi-user">
          <ReporteCargaBuqueList />
        </TabPanel>
        <TabPanel header="Carga de Viajes" leftIcon="pi pi-user">
          <CargaInformacionList />
        </TabPanel>
        <TabPanel header="Carga de Tanques" leftIcon="pi pi-user">
          <CargaInformacionTanqueList />
        </TabPanel>
        {(auth.user.faidUser.roles[0] === 'ADMIN' ||
          auth.user.faidUser.roles[0] === 'SUPERADMIN') && (
          <TabPanel header="Carga de Gastos" leftIcon="pi pi-user">
            <GastosOperacionaleList />
          </TabPanel>
        )}
      </TabView>

      <Toast ref={toast} />
    </>
  )
}

export default CargaInformacionPanel
