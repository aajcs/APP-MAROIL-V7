import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { SubDependenciaContext } from '../contexts/SubDependenciaContext'
import moment from 'moment'

import SubDependenciaForm from './SubDependenciaForm'
import AuthUse from '../../../auth/AuthUse'
const SubDependenciaList = () => {
  const auth = AuthUse()
  const { subDependencias, findSubDependencia, deleteSubDependencia, loading } =
    useContext(SubDependenciaContext)

  const [subDependencia, setSubDependencia] = useState(subDependencias)
  const [deleteSubDependenciaDialog, setDeleteSubDependenciaDialog] =
    useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveSubDependencia = (id) => {
    findSubDependencia(id)
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

  const fechaSubDependenciaCreado = (rowData) => {
    const fecha = moment(rowData.SubDependenciaCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaSubDependenciaModificado = (rowData) => {
    const fecha = moment(rowData.subDependenciaModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarSubDependencia = () => {
    deleteSubDependencia(subDependencia.id)
    setDeleteSubDependenciaDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'SubDependencia Eliminado',
      life: 3000
    })
  }

  const deleteSubDependenciaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteSubDependenciaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarSubDependencia()}
      />
    </>
  )

  const confirmDeleteSubDependencia = (subDependencias) => {
    setSubDependencia(subDependencias)
    setDeleteSubDependenciaDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveSubDependencia(rowData.id)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteSubDependencia(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">SubDependencia</h5>
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
    setDeleteSubDependenciaDialog(false)
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
        value={subDependencias}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} SubDependencias"
        globalFilter={globalFilter}
        emptyMessage="No hay SubDependencia."
        header={header}
        sortField="SubDependenciaCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column
          field="dependenciaId.nombreDependencia"
          header="dependenciaId"
        />

        <Column field="id" header="id" />
        <Column field="nombreSubDependencia" header="nombreSubDependencia" />
        <Column
          field="descripcionSubDependencia"
          header="descripcionSubDependencia"
        />
        <Column field="estatusSubDependencia" header="estatusSubDependencia" />
        <Column
          field="subDependenciaCreado"
          body={fechaSubDependenciaCreado}
          header="subDependenciaCreado"
          dataType="date"
        />
        <Column
          field="subDependenciaModificado"
          body={fechaSubDependenciaModificado}
          header="subDependenciaModificado"
          dataType="date"
        />
      </DataTable>

      <SubDependenciaForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteSubDependenciaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteSubDependenciaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {subDependencia && (
            <span>
              Esta seguro que quiere eliminar la SubDependencia{' '}
              <b>{subDependencia.nombreSubDependencia}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default SubDependenciaList
