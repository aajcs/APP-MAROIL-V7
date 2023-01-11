import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { ViajeContext } from '../contexts/ViajeContext'
import moment from 'moment'

import ViajeForm from './ViajeForm'
import { ViajeAuxContext } from '../contexts/ViajeAuxContext'
import { CargaViajeContext } from '../contexts/CargaViajeContext'
import ViajeAuxForm from './ViajeAuxForm'
import CargaViajeForm from './CargaViajeForm'

const CargaInformacionList = () => {
  const { viajes, findViaje, deleteViaje, loading } = useContext(ViajeContext)
  const { viajeAuxs, findViajeAux } = useContext(ViajeAuxContext)
  const { cargaViajes, findCargaViaje } = useContext(CargaViajeContext)
  const [viaje, setViaje] = useState(viajes)
  const [deleteViajeDialog, setDeleteViajeDialog] = useState(false)
  const [expandedRows, setExpandedRows] = useState(null)
  const [expandedRows1, setExpandedRows1] = useState(null)

  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleViajeAux, setIsVisibleViajeAux] = useState(false)
  const [isVisibleCargaViaje, setIsVisibleCargaViaje] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveViaje = (id) => {
    findViaje(id)
    setIsVisible(true)
  }
  const saveViajeAux = (id) => {
    findViajeAux(id)
    setIsVisibleViajeAux(true)
  }
  const saveCargaViaje = (id) => {
    findCargaViaje(id)
    setIsVisibleCargaViaje(true)
  }

  // cabecera de la tabla
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2 ">
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={() => setIsVisible(true)}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
          />
        </div>
      </React.Fragment>
    )
  }
  const leftToolbarTemplateViajeAux = () => {
    return (
      <React.Fragment>
        <div className="my-2 ">
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={() => setIsVisibleViajeAux(true)}
          />
        </div>
      </React.Fragment>
    )
  }
  const leftToolbarTemplateCargaViaje = () => {
    return (
      <React.Fragment>
        <div className="my-2 ">
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={() => setIsVisibleCargaViaje(true)}
          />
        </div>
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    )
  }
  const exportCSV = () => {
    dt.current.exportCSV()
  }

  const fechaViajeCreado = (rowData) => {
    const fecha = moment(rowData.viajeCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaViajeModificado = (rowData) => {
    const fecha = moment(rowData.viajeModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaFechaArriboViajeAux = (rowData) => {
    const fecha = moment(rowData.fechaArriboViajeAux)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaFechaZarpeViajeAux = (rowData) => {
    const fecha = moment(rowData.fechaZarpeViajeAux)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const eliminarViaje = () => {
    deleteViaje(viaje.id)
    setDeleteViajeDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Viaje Eliminado',
      life: 3000
    })
  }

  const deleteViajeDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteViajeDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarViaje()}
      />
    </>
  )

  const confirmDeleteViaje = (viajes) => {
    setViaje(viajes)
    setDeleteViajeDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveViaje(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded  p-button-danger"
          onClick={() => confirmDeleteViaje(rowData)}
        />
      </div>
    )
  }
  const actionBodyTemplateViajeAux = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveViajeAux(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded  p-button-danger"
          onClick={() => confirmDeleteViaje(rowData)}
        />
      </div>
    )
  }
  const actionBodyTemplateCargaViaje = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveCargaViaje(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded  p-button-danger"
          onClick={() => confirmDeleteViaje(rowData)}
        />
      </div>
    )
  }
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Viajes</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  )
  const headerViajeAux = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Bitácora de viaje</h5>
      {leftToolbarTemplateViajeAux()}
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  )
  const headerCargaViaje = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Opeacion en Puerto </h5>
      {leftToolbarTemplateCargaViaje()}
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  )
  const clearSelected = () => {
    setDeleteViajeDialog(false)
  }
  const tableViajeAux = (data) => {
    const viajeAux = viajeAuxs.filter((p) => p.viaje.id === data.id && p)
    // const probando = viajeAuxs.map((p) => console.log(p.viaje.id))

    return (
      <div className="orders-subtable">
        <DataTable
          value={viajeAux}
          expandedRows={expandedRows1}
          onRowToggle={(e) => setExpandedRows1(e.data)}
          onRowExpand={onRowExpand1}
          onRowCollapse={onRowCollapse1}
          responsiveLayout="scroll"
          rowExpansionTemplate={tablaCargaViaje}
          dataKey="id"
          header={headerViajeAux}
          globalFilter={globalFilter}
          sortField="estatusBarco"
          sortOrder={-1}
          loading={loading}
          ref={dt}
          breakpoint="960px"
          rowClassName={rowClassViajeAux}
        >
          <Column expander style={{ width: '3em' }} />
          <Column body={actionBodyTemplateViajeAux}></Column>
          <Column field="paisViajeAux" header="Pais" />
          <Column field="descripcionViajeAux" header="Descripción" />
          <Column field="estatusViajeAux" header="Estatus" />
          <Column
            field="fechaArriboViajeAux"
            header="Fecha Arribo"
            body={fechaFechaArriboViajeAux}
            dataType="date"
          />
          <Column
            field="fechaZarpeViajeAux"
            header="Fecha Zarpe"
            body={fechaFechaZarpeViajeAux}
            dataType="date"
          />
        </DataTable>
      </div>
    )
  }
  const tablaCargaViaje = (data) => {
    const cargaViaje = cargaViajes.filter((p) => p.viajeAux.id === data.id && p)
    // const probando = viajeAuxs.map((p) => console.log(p.viaje.id))

    return (
      <div className="orders-subtable">
        <DataTable
          value={cargaViaje}
          responsiveLayout="scroll"
          sortField="data.reporteCargaGOMModificado"
          sortOrder={-1}
          header={headerCargaViaje}
          rowClassName={rowClassCargaViaje}
        >
          <Column body={actionBodyTemplateCargaViaje}></Column>
          <Column field="descripcionCargaViaje" header="Descripción" />
          <Column field="productoCargaViaje" header="Producto" />
          <Column field="estatusCargaViaje" header="Estatus" />
          <Column field="puertoCargaViaje" header="Puerto Asociado" />
          <Column field="tipoCargaViaje" header="Tipo de Operacion" />
          <Column field="viajeAux.paisViajeAux" header="Pais Asociado" />
          <Column field="rataCargaViaje" header="Rata de Operacion" />
          <Column field="catidadPruductoCargaViaje" header="Catidad Pruducto" />
          <Column field="catidadActualCargaViaje" header="Catidad Actual" />
        </DataTable>
      </div>
    )
  }
  const onRowExpand = (event) => {
    toast.current.show({
      severity: 'info',
      summary: 'Grupo de filas ampliado',
      detail: 'Buque: ' + event.data.nombreBarco,
      life: 3000
    })
  }
  const onRowCollapse = (event) => {
    toast.current.show({
      severity: 'success',
      summary: 'Product Collapsed',
      detail: event.data.name,
      life: 3000
    })
  }
  const onRowExpand1 = (event) => {
    toast.current.show({
      severity: 'info',
      summary: 'Grupo de filas ampliado',
      detail: 'Buque: ' + event.data.nombreBarco,
      life: 3000
    })
  }
  const onRowCollapse1 = (event) => {
    toast.current.show({
      severity: 'success',
      summary: 'Product Collapsed',
      detail: event.data.name,
      life: 3000
    })
  }

  const rowClass = (data) => {
    return {
      'row-accessories': data.destinoViaje
    }
  }
  const rowClassViajeAux = (data) => {
    return {
      'row-accessoriesViajeAux': data.id
    }
  }
  const rowClassCargaViaje = (data) => {
    return {
      'row-accessoriesargaViaje': data.id
    }
  }
  return (
    <>
      <Toast ref={toast} />
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      <div className="datatable-style-demo">
        <DataTable
          value={viajes}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          responsiveLayout="scroll"
          rowExpansionTemplate={tableViajeAux}
          dataKey="id"
          header={header}
          globalFilter={globalFilter}
          sortField="viajeCreado"
          sortOrder={-1}
          loading={loading}
          ref={dt}
          breakpoint="960px"
          rowClassName={rowClass}
        >
          <Column expander style={{ width: '3em' }} />
          <Column field="nombreViaje" header="Viaje" />
          <Column field="descripcionViaje" header="Descripción" />
          <Column field="estatusViaje" header="Estatus" />
          <Column field="destinoViaje" header="Destino" />
          <Column
            field="embarcacion.nombreEmbarcacion"
            header="Embarcacion Asociado"
          />
          <Column
            field="remolcador[0].nombreRemolcador"
            header="Remolcador Asociado"
          />

          <Column
            field="viajeCreado"
            body={fechaViajeCreado}
            header="Viaje Creado"
            dataType="date"
            sortable
          />
          <Column
            field="viajeModificado"
            body={fechaViajeModificado}
            header="Viaje Modificado"
            dataType="date"
          />

          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
      <ViajeForm isVisible={isVisible} setIsVisible={setIsVisible} />
      <ViajeAuxForm
        isVisible={isVisibleViajeAux}
        setIsVisible={setIsVisibleViajeAux}
      />
      <CargaViajeForm
        isVisible={isVisibleCargaViaje}
        setIsVisible={setIsVisibleCargaViaje}
      />
      <Dialog
        visible={deleteViajeDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteViajeDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {viaje && (
            <span>
              Esta seguro que quiere eliminar la viaje{' '}
              <b>{viaje.nombreViaje}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default CargaInformacionList
