import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { EmbarcacionContext } from '../contexts/EmbarcacionContext'
import moment from 'moment'

import EmbarcacionForm from './EmbarcacionForm'

const EmbarcacionList = () => {
  const { embarcacions, findEmbarcacion, deleteEmbarcacion, loading } =
    useContext(EmbarcacionContext)
  const [embarcacion, setEmbarcacion] = useState(embarcacions)
  const [deleteEmbarcacionDialog, setDeleteEmbarcacionDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveEmbarcacion = (id) => {
    findEmbarcacion(id)
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

  const fechaEmbarcacionCreado = (rowData) => {
    const fecha = moment(rowData.embarcacionCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaEmbarcacionModificado = (rowData) => {
    const fecha = moment(rowData.embarcacionModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarEmbarcacion = () => {
    deleteEmbarcacion(embarcacion.id)
    setDeleteEmbarcacionDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Embarcacion Eliminado',
      life: 3000
    })
  }

  const deleteEmbarcacionDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteEmbarcacionDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarEmbarcacion()}
      />
    </>
  )

  const confirmDeleteEmbarcacion = (embarcacions) => {
    setEmbarcacion(embarcacions)
    setDeleteEmbarcacionDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveEmbarcacion(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded  p-button-danger"
          onClick={() => confirmDeleteEmbarcacion(rowData)}
        />
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Embarcacions</h5>
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
    setDeleteEmbarcacionDialog(false)
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
        value={embarcacions}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Embarcacions"
        globalFilter={globalFilter}
        emptyMessage="No hay embarcacions."
        header={header}
        sortField="embarcacionCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column field="nombreEmbarcacion" header="Embarcacion" />
        <Column field="descripcionEmbarcacion" header="Descripción" />
        <Column field="estatusEmbarcacion" header="Estatus" />
        <Column field="ubicacionEmbarcacion" header="Actividad" />
        <Column
          field="combustibleActualEmbarcacion"
          header="Combustible Actual"
        />
        <Column
          field="combustibleCapacidadEmbarcacion"
          header="combustible Capacidad"
        />

        <Column
          field="embarcacionCreado"
          body={fechaEmbarcacionCreado}
          header="Embarcacion Creado"
          dataType="date"
        />
        <Column
          field="embarcacionModificado"
          body={fechaEmbarcacionModificado}
          header="Embarcacion Modificado"
          dataType="date"
        />

        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <EmbarcacionForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteEmbarcacionDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteEmbarcacionDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {embarcacion && (
            <span>
              Esta seguro que quiere eliminar la embarcacion{' '}
              <b>{embarcacion.nombreEmbarcacion}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default EmbarcacionList
