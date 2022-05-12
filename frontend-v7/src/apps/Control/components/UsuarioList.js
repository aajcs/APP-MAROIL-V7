/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { UsuarioContext } from '../contexts/UsuarioContext'
import moment from 'moment'

import UsuarioForm from './UsuarioForm'

const UsuarioList = () => {
  const { usuarios, findUsuario, deleteUsuario, loading } =
    useContext(UsuarioContext)
  const [usuario, setUsuario] = useState(usuarios)
  const [deleteUsuarioDialog, setDeleteUsuarioDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveUsuario = (id) => {
    findUsuario(id)
    setIsVisible(true)
  }

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
  const fechausuarioCreado = (rowData) => {
    const fecha = moment(rowData.usuariocreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechausuarioModificado = (rowData) => {
    const fecha = moment(rowData.usuariomodificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const EliminarUsuario = () => {
    deleteUsuario(usuario.id)
    setDeleteUsuarioDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Usuario Eliminado',
      life: 3000
    })
  }

  const deleteUsuarioDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteUsuarioDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => EliminarUsuario()}
      />
    </>
  )
  const confirmDeleteUsuario = (usuarios) => {
    setUsuario(usuarios)
    setDeleteUsuarioDialog(true)
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => saveUsuario(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteUsuario(rowData)}
        />
      </div>
    )
  }
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Usuarios</h5>
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
    setDeleteUsuarioDialog(false)
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
        value={usuarios}
        onSelectionChange={(e) => setSelectedProducts(e.value_id)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Usuarios"
        globalFilter={globalFilter}
        emptyMessage="No hay usuarios."
        header={header}
        sortField="usuariocreado"
        sortOrder={-1}
        loading={loading}
      >
        <Column field="nombre" header="Nombre" />
        <Column field="correo" header="correo" />
        <Column field="user" header="Usuario" />
        {/* <Column field="password" header="Contraseña" /> */}
        <Column field="roles" header="Roles" />
        <Column field="apps" header="Apps" />
        <Column
          field="usuariocreado"
          body={fechausuarioCreado}
          header="usuariocreado"
          dataType="date"
        />
        <Column
          field="usuariomodificado"
          body={fechausuarioModificado}
          header="usuariomodificado"
          dataType="date"
        />
        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <UsuarioForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteUsuarioDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteUsuarioDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {usuario && (
            <span>
              Esta seguro que quiere eliminar la usuario <b>{usuario.nombre}</b>
              ?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default UsuarioList
