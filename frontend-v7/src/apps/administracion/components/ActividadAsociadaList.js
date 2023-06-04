import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { ActividadAsociadaContext } from '../contexts/ActividadAsociadaContext'
import moment from 'moment'

import ActividadAsociadaForm from './ActividadAsociadaForm'
import AuthUse from '../../../auth/AuthUse'
const ActividadAsociadaList = () => {
  const auth = AuthUse()
  const {
    actividadAsociadas,
    findActividadAsociada,
    deleteActividadAsociada,
    loading
  } = useContext(ActividadAsociadaContext)

  const [actividadAsociada, setActividadAsociada] = useState(actividadAsociadas)
  const [deleteActividadAsociadaDialog, setDeleteActividadAsociadaDialog] =
    useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveActividadAsociada = (id) => {
    findActividadAsociada(id)
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

  const fechaActividadAsociadaCreado = (rowData) => {
    const fecha = moment(rowData.ActividadAsociadaCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaActividadAsociadaModificado = (rowData) => {
    const fecha = moment(rowData.actividadAsociadaModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarActividadAsociada = () => {
    deleteActividadAsociada(actividadAsociada.id)
    setDeleteActividadAsociadaDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'ActividadAsociada Eliminado',
      life: 3000
    })
  }

  const deleteActividadAsociadaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteActividadAsociadaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarActividadAsociada()}
      />
    </>
  )

  const confirmDeleteActividadAsociada = (actividadAsociadas) => {
    setActividadAsociada(actividadAsociadas)
    setDeleteActividadAsociadaDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveActividadAsociada(rowData.id)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteActividadAsociada(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">ActividadAsociada</h5>
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
    setDeleteActividadAsociadaDialog(false)
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
        value={actividadAsociadas}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} ActividadAsociadas"
        globalFilter={globalFilter}
        emptyMessage="No hay ActividadAsociada."
        header={header}
        sortField="ActividadAsociadaCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column field="id" header="id" />

        <Column
          field="codigoActividadAsociada"
          header="codigoActividadAsociada"
        />
        <Column
          field="nombreActividadAsociada"
          header="nombreActividadAsociada"
        />
        <Column
          field="descripcionActividadAsociada"
          header="descripcionActividadAsociada"
        />
        <Column
          field="estatusActividadAsociada"
          header="estatusActividadAsociada"
        />
        <Column
          field="actividadAsociadaCreado"
          body={fechaActividadAsociadaCreado}
          header="actividadAsociadaCreado"
          dataType="date"
        />
        <Column
          field="actividadAsociadaModificado"
          body={fechaActividadAsociadaModificado}
          header="actividadAsociadaModificado"
          dataType="date"
        />
      </DataTable>

      <ActividadAsociadaForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <Dialog
        visible={deleteActividadAsociadaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteActividadAsociadaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {actividadAsociada && (
            <span>
              Esta seguro que quiere eliminar la ActividadAsociada{' '}
              <b>{actividadAsociada.nombreActividadAsociada}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default ActividadAsociadaList
