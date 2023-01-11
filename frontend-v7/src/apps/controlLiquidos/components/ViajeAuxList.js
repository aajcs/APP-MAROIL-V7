import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { ViajeAuxContext } from '../contexts/ViajeAuxContext'
import moment from 'moment'

import ViajeAuxForm from './ViajeAuxForm'

const ViajeAuxList = () => {
  const { viajeAuxs, findViajeAux, deleteViajeAux, loading } =
    useContext(ViajeAuxContext)
  const [viajeAux, setViajeAux] = useState(viajeAuxs)
  const [deleteViajeAuxDialog, setDeleteViajeAuxDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveViajeAux = (id) => {
    findViajeAux(id)
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

  const fechaViajeAuxCreado = (rowData) => {
    const fecha = moment(rowData.viajeAuxCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaViajeAuxModificado = (rowData) => {
    const fecha = moment(rowData.viajeAuxModificado)
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

  const eliminarViajeAux = () => {
    deleteViajeAux(viajeAux.id)
    setDeleteViajeAuxDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'ViajeAux Eliminado',
      life: 3000
    })
  }

  const deleteViajeAuxDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteViajeAuxDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarViajeAux()}
      />
    </>
  )

  const confirmDeleteViajeAux = (viajeAuxs) => {
    setViajeAux(viajeAuxs)
    setDeleteViajeAuxDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
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
          onClick={() => confirmDeleteViajeAux(rowData)}
        />
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">ViajeAuxs</h5>
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
    setDeleteViajeAuxDialog(false)
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
        value={viajeAuxs}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} ViajeAuxs"
        globalFilter={globalFilter}
        emptyMessage="No hay viajeAuxs."
        header={header}
        sortField="viajeAuxCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
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
        <Column field="viaje.nombreViaje" header="Viaje Asociado" />
        <Column
          field="viajeAuxCreado"
          body={fechaViajeAuxCreado}
          header="ViajeAux Creado"
          dataType="date"
        />
        <Column
          field="viajeAuxModificado"
          body={fechaViajeAuxModificado}
          header="ViajeAux Modificado"
          dataType="date"
        />
        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <ViajeAuxForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteViajeAuxDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteViajeAuxDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {viajeAux && (
            <span>
              Esta seguro que quiere eliminar la viajeAux{' '}
              <b>{viajeAux.nombreViajeAux}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default ViajeAuxList
