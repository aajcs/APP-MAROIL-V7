/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { GabarraContext } from '../contexts/GabarraContext'
import moment from 'moment'

import GabarraForm from './GabarraForm'

const GabarraList = () => {
  const { gabarras, findGabarra, deleteGabarra, loading } =
    useContext(GabarraContext)
  const [gabarra, setGabarra] = useState(gabarras)
  const [deleteGabarraDialog, setDeleteGabarraDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveGabarra = (id) => {
    findGabarra(id)
    setIsVisible(true)
  }
  // cabecera de la tabla
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
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
  const fechagabarraCreado = (rowData) => {
    const fecha = moment(rowData.gabarraCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechagabarraModificado = (rowData) => {
    const fecha = moment(rowData.gabarraModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarGabarra = () => {
    deleteGabarra(gabarra.id)
    setDeleteGabarraDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Gabarra Eliminado',
      life: 3000
    })
  }

  const deleteGabarraDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteGabarraDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarGabarra()}
      />
    </>
  )

  const confirmDeleteGabarra = (gabarras) => {
    setGabarra(gabarras)
    setDeleteGabarraDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveGabarra(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteGabarra(rowData)}
        />
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Gabarra</h5>
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
    setDeleteGabarraDialog(false)
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
        value={gabarras}
        onSelectionChange={(e) => setSelectedProducts(e.value_id)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Gabarras"
        globalFilter={globalFilter}
        emptyMessage="No hay gabarras."
        header={header}
        sortField="gabarraCreado"
        sortOrder={-1}
        loading={loading}
      >
        <Column field="nombreGabarra" header="nombre Gabarra" />
        <Column field="descripcion" header="descripcion" />
        <Column field="toneladasCapacidad" header="toneladas Capacidad" />
        <Column field="toneladasActual" header="toneladas Actual" />
        <Column field="toneladasRemanente" header="toneladas Remanente" />
        <Column field="trenesCapacidad" header="trenes Capacidad" />
        <Column field="trenesActual" header="trenes Actual" />
        <Column
          field="gabarraCreado"
          body={fechagabarraCreado}
          header="gabarra Creado"
          dataType="date"
        />
        <Column
          field="gabarraModificado"
          body={fechagabarraModificado}
          header="gabarra Modificado"
          dataType="date"
        />
        <Column field="estatusGabarra" header="estatusGabarra" />
        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <GabarraForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteGabarraDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteGabarraDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {gabarra && (
            <span>
              Esta seguro que quiere eliminar la gabarra{' '}
              <b>{gabarra.nombreGabarra}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default GabarraList
