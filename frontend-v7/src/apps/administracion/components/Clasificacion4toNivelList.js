import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Clasificacion4toNivelContext } from '../contexts/Clasificacion4toNivelContext'
import moment from 'moment'

import Clasificacion4toNivelForm from './Clasificacion4toNivelForm'
import AuthUse from '../../../auth/AuthUse'
const Clasificacion4toNivelList = () => {
  const auth = AuthUse()
  const {
    clasificacion4toNivels,
    findClasificacion4toNivel,
    deleteClasificacion4toNivel,
    loading
  } = useContext(Clasificacion4toNivelContext)

  const [clasificacion4toNivel, setClasificacion4toNivel] = useState(
    clasificacion4toNivels
  )
  const [
    deleteClasificacion4toNivelDialog,
    setDeleteClasificacion4toNivelDialog
  ] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveClasificacion4toNivel = (id) => {
    findClasificacion4toNivel(id)
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

  const fechaClasificacion4toNivelCreado = (rowData) => {
    const fecha = moment(rowData.Clasificacion4toNivelCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaClasificacion4toNivelModificado = (rowData) => {
    const fecha = moment(rowData.clasificacion4toNivelModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarClasificacion4toNivel = () => {
    deleteClasificacion4toNivel(clasificacion4toNivel.id)
    setDeleteClasificacion4toNivelDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Clasificacion4toNivel Eliminado',
      life: 3000
    })
  }

  const deleteClasificacion4toNivelDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteClasificacion4toNivelDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarClasificacion4toNivel()}
      />
    </>
  )

  const confirmDeleteClasificacion4toNivel = (clasificacion4toNivels) => {
    setClasificacion4toNivel(clasificacion4toNivels)
    setDeleteClasificacion4toNivelDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveClasificacion4toNivel(rowData.id)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteClasificacion4toNivel(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Clasificacion4toNivel</h5>
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
    setDeleteClasificacion4toNivelDialog(false)
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
        value={clasificacion4toNivels}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Clasificacion4toNivels"
        globalFilter={globalFilter}
        emptyMessage="No hay Clasificacion4toNivel."
        header={header}
        sortField="Clasificacion4toNivelCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column
          field="clasificacion3erNivelId.nombreClasificacion3erNivel"
          header="clasificacion3erNivelId"
        />
        <Column field="id" header="id" />

        <Column
          field="codigoClasificacion4toNivel"
          header="codigoClasificacion4toNivel"
        />
        <Column
          field="nombreClasificacion4toNivel"
          header="nombreClasificacion4toNivel"
        />
        <Column
          field="descripcionClasificacion4toNivel"
          header="descripcionClasificacion4toNivel"
        />
        <Column
          field="estatusClasificacion4toNivel"
          header="estatusClasificacion4toNivel"
        />
        <Column
          field="clasificacion4toNivelCreado"
          body={fechaClasificacion4toNivelCreado}
          header="clasificacion4toNivelCreado"
          dataType="date"
        />
        <Column
          field="clasificacion4toNivelModificado"
          body={fechaClasificacion4toNivelModificado}
          header="clasificacion4toNivelModificado"
          dataType="date"
        />
      </DataTable>

      <Clasificacion4toNivelForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <Dialog
        visible={deleteClasificacion4toNivelDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteClasificacion4toNivelDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {clasificacion4toNivel && (
            <span>
              Esta seguro que quiere eliminar la Clasificacion4toNivel{' '}
              <b>{clasificacion4toNivel.nombreClasificacion4toNivel}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default Clasificacion4toNivelList
