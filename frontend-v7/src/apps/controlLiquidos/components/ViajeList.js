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

const ViajeList = () => {
  const { viajes, findViaje, deleteViaje, loading } = useContext(ViajeContext)
  const [viaje, setViaje] = useState(viajes)
  const [deleteViajeDialog, setDeleteViajeDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveViaje = (id) => {
    findViaje(id)
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

  const fechaViajeCreado = (rowData) => {
    const fecha = moment(rowData.viajeCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaViajeModificado = (rowData) => {
    const fecha = moment(rowData.viajeModificado)
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
  const clearSelected = () => {
    setDeleteViajeDialog(false)
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
        value={viajes}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Viajes"
        globalFilter={globalFilter}
        emptyMessage="No hay viajes."
        header={header}
        sortField="viajeCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
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
        />
        <Column
          field="viajeModificado"
          body={fechaViajeModificado}
          header="Viaje Modificado"
          dataType="date"
        />

        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <ViajeForm isVisible={isVisible} setIsVisible={setIsVisible} />

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

export default ViajeList
