import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { CargaViajeContext } from '../contexts/CargaViajeContext'
import moment from 'moment'

import CargaViajeForm from './CargaViajeForm'

const CargaViajeList = () => {
  const { cargaViajes, findCargaViaje, deleteCargaViaje, loading } =
    useContext(CargaViajeContext)
  const [cargaViaje, setCargaViaje] = useState(cargaViajes)
  const [deleteCargaViajeDialog, setDeleteCargaViajeDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveCargaViaje = (id) => {
    findCargaViaje(id)
    setIsVisible(true)
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

  const fechaCargaViajeCreado = (rowData) => {
    const fecha = moment(rowData.cargaViajeCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaCargaViajeModificado = (rowData) => {
    const fecha = moment(rowData.cargaViajeModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaFinCargaViaje = (rowData) => {
    const fecha = moment(rowData.fechaFinCargaViaje)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaInicioCargaViaje = (rowData) => {
    const fecha = moment(rowData.fechaInicioCargaViaje)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarCargaViaje = () => {
    deleteCargaViaje(cargaViaje.id)
    setDeleteCargaViajeDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'CargaViaje Eliminado',
      life: 3000
    })
  }

  const deleteCargaViajeDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteCargaViajeDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarCargaViaje()}
      />
    </>
  )

  const confirmDeleteCargaViaje = (cargaViajes) => {
    setCargaViaje(cargaViajes)
    setDeleteCargaViajeDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
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
          onClick={() => confirmDeleteCargaViaje(rowData)}
        />
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">CargaViajes</h5>
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
    setDeleteCargaViajeDialog(false)
  }

  return (
    <>
      <Toast ref={toast} />
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>

      <DataTable
        ref={dt}
        value={cargaViajes}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} CargaViajes"
        globalFilter={globalFilter}
        emptyMessage="No hay cargaViajes."
        header={header}
        sortField="cargaViajeCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column field="descripcionCargaViaje" header="Descripción" />
        <Column field="productoCargaViaje" header="Producto" />
        <Column field="estatusCargaViaje" header="Estatus" />
        <Column field="puertoCargaViaje" header="Puerto Asociado" />
        <Column field="tipoCargaViaje" header="Tipo de Operacion" />
        <Column field="viajeAux.paisViajeAux" header="Pais Asociado" />
        <Column field="rataCargaViaje" header="Rata de Operacion" />
        <Column field="catidadPruductoCargaViaje" header="Catidad Pruducto" />
        <Column field="catidadActualCargaViaje" header="Catidad Actual" />
        <Column
          field="fechaInicioCargaViaje"
          header="Fecha Inicio"
          body={fechaInicioCargaViaje}
          dataType="date"
        />
        <Column
          field="fechaFinCargaViaje"
          header="Fecha Fin"
          body={fechaFinCargaViaje}
          dataType="date"
        />
        <Column
          field="cargaViajeCreado"
          body={fechaCargaViajeCreado}
          header="CargaViaje Creado"
          dataType="date"
        />
        <Column
          field="cargaViajeModificado"
          body={fechaCargaViajeModificado}
          header="CargaViaje Modificado"
          dataType="date"
        />

        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <CargaViajeForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteCargaViajeDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteCargaViajeDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {cargaViaje && (
            <span>
              Esta seguro que quiere eliminar la cargaViaje{' '}
              <b>{cargaViaje.nombreCargaViaje}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default CargaViajeList
