import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { DependenciaContext } from '../contexts/DependenciaContext'
import moment from 'moment'

import DependenciaForm from './DependenciaForm'
import AuthUse from '../../../auth/AuthUse'
const DependenciaList = () => {
  const auth = AuthUse()
  const { dependencias, findDependencia, deleteDependencia, loading } =
    useContext(DependenciaContext)

  const [dependencia, setDependencia] = useState(dependencias)
  const [deleteDependenciaDialog, setDeleteDependenciaDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveDependencia = (id) => {
    findDependencia(id)
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

  const fechaDependenciaCreado = (rowData) => {
    const fecha = moment(rowData.DependenciaCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaDependenciaModificado = (rowData) => {
    const fecha = moment(rowData.dependenciaModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarDependencia = () => {
    deleteDependencia(dependencia.id)
    setDeleteDependenciaDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Dependencia Eliminado',
      life: 3000
    })
  }

  const deleteDependenciaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteDependenciaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarDependencia()}
      />
    </>
  )

  const confirmDeleteDependencia = (dependencias) => {
    setDependencia(dependencias)
    setDeleteDependenciaDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveDependencia(rowData.id)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteDependencia(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Dependencia</h5>
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
    setDeleteDependenciaDialog(false)
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
        value={dependencias}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Dependencias"
        globalFilter={globalFilter}
        emptyMessage="No hay Dependencia."
        header={header}
        sortField="DependenciaCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column field="divisionId.nombreDivision" header="divisionId" />
        <Column field="id" header="id" />
        <Column field="codigoDependencia" header="codigoDependencia" />

        <Column field="nombreDependencia" header="nombreDependencia" />
        <Column
          field="descripcionDependencia"
          header="descripcionDependencia"
        />
        <Column field="estatusDependencia" header="estatusDependencia" />
        <Column
          field="dependenciaCreado"
          body={fechaDependenciaCreado}
          header="dependenciaCreado"
          dataType="date"
        />
        <Column
          field="dependenciaModificado"
          body={fechaDependenciaModificado}
          header="dependenciaModificado"
          dataType="date"
        />
      </DataTable>

      <DependenciaForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteDependenciaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteDependenciaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {dependencia && (
            <span>
              Esta seguro que quiere eliminar la Dependencia{' '}
              <b>{dependencia.nombreDependencia}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default DependenciaList
