import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { ProveedorContext } from '../contexts/ProveedorContext'
import moment from 'moment'

import ProveedorForm from './ProveedorForm'

const ProveedorList = () => {
  const { proveedors, findProveedor, deleteProveedor, loading } =
    useContext(ProveedorContext)
  const [proveedor, setProveedor] = useState(proveedors)
  const [deleteBarcoDialog, setDeleteBarcoDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveBarco = (id) => {
    findProveedor(id)
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

  const fechaProveedorCreado = (rowData) => {
    const fecha = moment(rowData.proveedorCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaProveedorModificado = (rowData) => {
    const fecha = moment(rowData.proveedorModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarBarco = () => {
    deleteProveedor(proveedor.id)
    setDeleteBarcoDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Barco Eliminado',
      life: 3000
    })
  }

  const deleteBarcoDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteBarcoDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarBarco()}
      />
    </>
  )

  const confirmDeleteBarco = (proveedor) => {
    setProveedor(proveedor)
    setDeleteBarcoDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveBarco(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded  p-button-danger"
          onClick={() => confirmDeleteBarco(rowData)}
        />
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Proveedor</h5>
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
    setDeleteBarcoDialog(false)
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
        value={proveedors}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Proveedor"
        globalFilter={globalFilter}
        emptyMessage="No hay datos."
        header={header}
        sortField="barcoCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column field="id" header="id" />
        <Column field="codigoProveedor" header="codigoProveedor" />
        <Column field="nombreProveedor" header="nombreProveedor" />
        <Column field="rifProveedor" header="rifProveedor" />
        <Column field="direccionProveedor" header="direccionProveedor" />

        <Column field="estatusProveedor" header="estatusProveedor" />

        <Column
          field="proveedorCreado"
          body={fechaProveedorCreado}
          header="proveedorCreado"
          dataType="date"
        />
        <Column
          field="proveedorModificado"
          body={fechaProveedorModificado}
          header="proveedorModificado"
          dataType="date"
        />
      </DataTable>

      <ProveedorForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteBarcoDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteBarcoDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {proveedor && (
            <span>
              Esta seguro que quiere eliminar el proveedor{' '}
              <b>{proveedor.nombreProyecto}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default ProveedorList
