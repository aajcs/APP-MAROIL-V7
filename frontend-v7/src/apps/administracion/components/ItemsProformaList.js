import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { ItemsProformaContext } from '../contexts/ItemsProformaContext'
import moment from 'moment'

import ItemsProformaForm from './ItemsProformaForm'
import AuthUse from '../../../auth/AuthUse'
const ItemsProformaList = () => {
  const auth = AuthUse()
  const { itemsProformas, findItemsProforma, deleteItemsProforma, loading } =
    useContext(ItemsProformaContext)

  const [itemsProforma, setItemsProforma] = useState(itemsProformas)
  const [deleteItemsProformaDialog, setDeleteItemsProformaDialog] =
    useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveItemsProforma = (id) => {
    findItemsProforma(id)
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

  const fechaItemsProformaCreado = (rowData) => {
    const fecha = moment(rowData.ItemsProformaCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaItemsProformaModificado = (rowData) => {
    const fecha = moment(rowData.itemsProformaModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarItemsProforma = () => {
    deleteItemsProforma(itemsProforma.id)
    setDeleteItemsProformaDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'ItemsProforma Eliminado',
      life: 3000
    })
  }

  const deleteItemsProformaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteItemsProformaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarItemsProforma()}
      />
    </>
  )

  const confirmDeleteItemsProforma = (itemsProformas) => {
    setItemsProforma(itemsProformas)
    setDeleteItemsProformaDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveItemsProforma(rowData.id)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteItemsProforma(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">ItemsProforma</h5>
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
    setDeleteItemsProformaDialog(false)
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
        value={itemsProformas}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} ItemsProformas"
        globalFilter={globalFilter}
        emptyMessage="No hay ItemsProforma."
        header={header}
        sortField="ItemsProformaCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>

        <Column field="codigoItemsProforma" header="codigoItemsProforma" />
        <Column
          field="descripcionItemsProforma"
          header="descripcionItemsProforma"
        />
        <Column field="usoFondoItemsProforma" header="usoFondoItemsProforma" />
        <Column
          field="fechaInicioItemsProforma"
          header="fechaInicioItemsProforma"
        />
        <Column field="fechaFinItemsProforma" header="fechaFinItemsProforma" />
        <Column field="unidadItemsProforma" header="unidadItemsProforma" />
        <Column field="cantidadItemsProforma" header="cantidadItemsProforma" />
        <Column
          field="precioUnitarioItemsProforma"
          header="precioUnitarioItemsProforma"
        />
        <Column
          field="precioTotalItemsProforma"
          header="precioTotalItemsProforma"
        />
        <Column field="estatus2ItemsProforma" header="estatus2ItemsProforma" />
        <Column field="proformaId" header="proformaId" />

        <Column
          field="itemsProformaCreado"
          body={fechaItemsProformaCreado}
          header="itemsProformaCreado"
          dataType="date"
        />
        <Column
          field="itemsProformaModificado"
          body={fechaItemsProformaModificado}
          header="itemsProformaModificado"
          dataType="date"
        />
      </DataTable>

      <ItemsProformaForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteItemsProformaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteItemsProformaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {itemsProforma && (
            <span>
              Esta seguro que quiere eliminar la ItemsProforma{' '}
              <b>{itemsProforma.nombreItemsProforma}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default ItemsProformaList
