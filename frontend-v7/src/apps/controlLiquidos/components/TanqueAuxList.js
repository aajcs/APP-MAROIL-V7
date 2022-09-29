import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { TanqueAuxContext } from '../contexts/TanqueAuxContext'
import moment from 'moment'

import TanqueAuxForm from './TanqueAuxForm'

const TanqueAuxList = () => {
  const { tanqueAuxs, findTanqueAux, deleteTanqueAux, loading } =
    useContext(TanqueAuxContext)
  const [tanqueAux, setTanqueAux] = useState(tanqueAuxs)
  const [deleteTanqueAuxDialog, setDeleteTanqueAuxDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveTanqueAux = (id) => {
    findTanqueAux(id)
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

  const fechaTanqueAuxCreado = (rowData) => {
    const fecha = moment(rowData.tanqueAuxCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaTanqueAuxModificado = (rowData) => {
    const fecha = moment(rowData.tanqueAuxModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarTanqueAux = () => {
    deleteTanqueAux(tanqueAux.id)
    setDeleteTanqueAuxDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'TanqueAux Eliminado',
      life: 3000
    })
  }

  const deleteTanqueAuxDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteTanqueAuxDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarTanqueAux()}
      />
    </>
  )

  const confirmDeleteTanqueAux = (tanqueAuxs) => {
    setTanqueAux(tanqueAuxs)
    setDeleteTanqueAuxDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveTanqueAux(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded  p-button-danger"
          onClick={() => confirmDeleteTanqueAux(rowData)}
        />
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">TanqueAuxs</h5>
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
    setDeleteTanqueAuxDialog(false)
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
        value={tanqueAuxs}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} TanqueAuxs"
        globalFilter={globalFilter}
        emptyMessage="No hay tanqueAuxs."
        header={header}
        sortField="tanqueAuxCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column field="nombreTanqueAux" header="nombre TanqueAux" />
        <Column field="descripcionTanqueAux" header="descripcionTanqueAux" />
        <Column field="estatusTanqueAux" header="estatusTanqueAux" />
        <Column field="ubicacionTanqueAux" header="ubicacionTanqueAux" />
        <Column
          field="embarcacion.nombreEmbarcacion"
          header="embarcacion.nombreEmbarcacion"
        />
        <Column field="tipoCargaTanqueAux" header="tipoCargaTanqueAux" />
        <Column
          field="volumenActualTanqueAux"
          header="volumenActualTanqueAux"
        />
        <Column
          field="volumenCapacidadTanqueAux"
          header="volumenCapacidadTanqueAux"
        />

        <Column
          field="tanqueAuxCreado"
          body={fechaTanqueAuxCreado}
          header="tanqueAux Creado"
          dataType="date"
        />
        <Column
          field="tanqueAuxModificado"
          body={fechaTanqueAuxModificado}
          header="tanqueAux Modificado"
          dataType="date"
        />

        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <TanqueAuxForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteTanqueAuxDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteTanqueAuxDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {tanqueAux && (
            <span>
              Esta seguro que quiere eliminar la tanqueAux{' '}
              <b>{tanqueAux.nombreTanqueAux}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default TanqueAuxList
