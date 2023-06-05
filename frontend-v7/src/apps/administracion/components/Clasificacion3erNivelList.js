import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Clasificacion3erNivelContext } from '../contexts/Clasificacion3erNivelContext'
import moment from 'moment'

import Clasificacion3erNivelForm from './Clasificacion3erNivelForm'
import AuthUse from '../../../auth/AuthUse'
const Clasificacion3erNivelList = () => {
  const auth = AuthUse()
  const {
    clasificacion3erNivels,
    findClasificacion3erNivel,
    deleteClasificacion3erNivel,
    loading
  } = useContext(Clasificacion3erNivelContext)
  console.log(clasificacion3erNivels)
  const [clasificacion3erNivel, setClasificacion3erNivel] = useState(
    clasificacion3erNivels
  )
  const [
    deleteClasificacion3erNivelDialog,
    setDeleteClasificacion3erNivelDialog
  ] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveClasificacion3erNivel = (id) => {
    findClasificacion3erNivel(id)
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

  const fechaClasificacion3erNivelCreado = (rowData) => {
    const fecha = moment(rowData.Clasificacion3erNivelCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaClasificacion3erNivelModificado = (rowData) => {
    const fecha = moment(rowData.clasificacion3erNivelModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarClasificacion3erNivel = () => {
    deleteClasificacion3erNivel(clasificacion3erNivel.id)
    setDeleteClasificacion3erNivelDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Clasificacion3erNivel Eliminado',
      life: 3000
    })
  }

  const deleteClasificacion3erNivelDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteClasificacion3erNivelDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarClasificacion3erNivel()}
      />
    </>
  )

  const confirmDeleteClasificacion3erNivel = (clasificacion3erNivels) => {
    setClasificacion3erNivel(clasificacion3erNivels)
    setDeleteClasificacion3erNivelDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveClasificacion3erNivel(rowData.id)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteClasificacion3erNivel(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Clasificacion3erNivel</h5>
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
    setDeleteClasificacion3erNivelDialog(false)
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
        value={clasificacion3erNivels}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Clasificacion3erNivels"
        globalFilter={globalFilter}
        emptyMessage="No hay Clasificacion3erNivel."
        header={header}
        sortField="Clasificacion3erNivelCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column
          field="clasificacionServicioId.nombreClasificacionServicio"
          header="clasificacionServicioId"
        />
        <Column field="id" header="id" />

        <Column
          field="codigoClasificacion3erNivel"
          header="codigoClasificacion3erNivel"
        />
        <Column
          field="nombreClasificacion3erNivel"
          header="nombreClasificacion3erNivel"
        />
        <Column
          field="descripcionClasificacion3erNivel"
          header="descripcionClasificacion3erNivel"
        />
        <Column
          field="estatusClasificacion3erNivel"
          header="estatusClasificacion3erNivel"
        />
        <Column
          field="clasificacion3erNivelCreado"
          body={fechaClasificacion3erNivelCreado}
          header="clasificacion3erNivelCreado"
          dataType="date"
        />
        <Column
          field="clasificacion3erNivelModificado"
          body={fechaClasificacion3erNivelModificado}
          header="clasificacion3erNivelModificado"
          dataType="date"
        />
      </DataTable>

      <Clasificacion3erNivelForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <Dialog
        visible={deleteClasificacion3erNivelDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteClasificacion3erNivelDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {clasificacion3erNivel && (
            <span>
              Esta seguro que quiere eliminar la Clasificacion3erNivel{' '}
              <b>{clasificacion3erNivel.nombreClasificacion3erNivel}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default Clasificacion3erNivelList
