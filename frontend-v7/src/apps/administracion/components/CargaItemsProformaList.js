/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable dot-notation */
import React, { useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'

import { Dialog } from 'primereact/dialog'
import CargaItemsProformaFrom from './CargaItemsProformaFrom'

const CargaItemsProformaList = ({ items, setItems }) => {
  let emptyItem = {
    itemId: null,
    itemClasificacionServicio: null,
    itemClasificacion3erNivel: null,
    itemClasificacion4toNivel: null,
    itemDescripcion: '',
    itemUnidad: null,
    itemCantidad: 0,
    itemPrecioUnitario: 0,
    itemPrecioTotal: 0
  }

  const [itemDialog, setItemDialog] = useState(false)
  const [deleteItemDialog, setDeleteItemDialog] = useState(false)

  const [item, setItem] = useState(emptyItem)
  const [selectedItems, setSelectedItems] = useState(null)
  const toast = useRef(null)
  const dt = useRef(null)

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  const openNew = () => {
    setItem(emptyItem)
    setItemDialog(true)
  }

  const hideDeleteItemDialog = () => {
    setDeleteItemDialog(false)
  }

  const editItem = (item) => {
    setItem({ ...item })
    setItemDialog(true)
  }

  const confirmDeleteItem = (item) => {
    setItem(item)
    setDeleteItemDialog(true)
  }

  const deleteItem = () => {
    let _items = items.filter((val) => val.itemId !== item.itemId)

    setItems(_items)
    setDeleteItemDialog(false)
    setItem(emptyItem)
    toast.current.show({
      severity: 'success',
      summary: 'Exitosa',
      detail: 'Item Eliminado',
      life: 3000
    })
  }

  const itemPrecioUnitarioBodyTemplate = (rowData) => {
    return formatCurrency(rowData.itemPrecioUnitario)
  }
  const itemPrecioTotalBodyTemplate = (rowData) => {
    return formatCurrency(rowData.itemPrecioTotal)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editItem(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteItem(rowData)}
        />
      </React.Fragment>
    )
  }

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <Button
        label="New"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
      />
    </div>
  )

  const deleteItemDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteItemDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteItem}
      />
    </React.Fragment>
  )

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          ref={dt}
          value={items}
          selection={selectedItems}
          onSelectionChange={(e) => setSelectedItems(e.value)}
          dataKey="id"
          header={header}
          responsiveLayout="scroll"
        >
          <Column body={actionBodyTemplate} exportable={false}></Column>
          <Column field="itemId" header="itemId" sortable></Column>

          <Column
            field="itemClasificacionServicio"
            header="itemClasificacionServicio"
            sortable
          ></Column>
          <Column
            field="itemClasificacion3erNivel"
            header="itemClasificacion3erNivel"
            sortable
          ></Column>
          <Column
            field="itemClasificacion4toNivel"
            header="itemClasificacion4toNivel"
            sortable
          ></Column>
          <Column
            field="itemDescripcion"
            header="itemDescripcion"
            sortable
          ></Column>
          <Column field="itemUnidad" header="itemUnidad" sortable></Column>
          <Column field="itemCantidad" header="itemCantidad" sortable></Column>

          <Column
            field="itemPrecioUnitario"
            header="itemPrecioUnitario"
            body={itemPrecioUnitarioBodyTemplate}
            sortable
          ></Column>
          <Column
            field="itemPrecioTotal"
            header="itemPrecioTotal"
            body={itemPrecioTotalBodyTemplate}
            sortable
          ></Column>
        </DataTable>
      </div>
      <CargaItemsProformaFrom
        itemDialog={itemDialog}
        setItemDialog={setItemDialog}
        item={item}
        setItem={setItem}
        items={items}
        setItems={setItems}
      />

      <Dialog
        visible={deleteItemDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deleteItemDialogFooter}
        onHide={hideDeleteItemDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {item && (
            <span>
              Are you sure you want to delete <b>{item.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  )
}
export default CargaItemsProformaList
