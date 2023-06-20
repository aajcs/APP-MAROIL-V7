/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable dot-notation */
import React, { useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ColumnGroup } from 'primereact/columngroup'
import { Row } from 'primereact/row'
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
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })
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
    return formatCurrency(rowData.itemCantidad * rowData.itemPrecioUnitario)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-raised p-button-info  p-button-text "
          onClick={() => editItem(rowData)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-raised p-button-danger p-button-text"
          onClick={() => confirmDeleteItem(rowData)}
        />
      </React.Fragment>
    )
  }

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <Button
        icon="pi pi-plus"
        className="p-button-rounded p-button-raised p-button-success  p-button-text "
        onClick={openNew}
        tooltip="Agregar Item"
        tooltipOptions={{ position: 'top' }}
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
  const totalDataPresupuestoSuma = () => {
    // let cantidad = 0
    // let precioUnitario = 0
    let total = 0
    for (const unitario of items) {
      // precioUnitario += unitario.precioUnitarioDataPresupuesto
      // cantidad += unitario.cantidadDataPresupuesto
      total += unitario.itemCantidad * unitario.itemPrecioUnitario
    }

    return formatCurrency(total)
  }
  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          className=" pt-0 pb-0"
          footer="Total:"
          colSpan={7}
          footerStyle={{ textAlign: 'right' }}
        />
        <Column className=" pt-0 pb-0" footer={totalDataPresupuestoSuma} />
      </Row>
    </ColumnGroup>
  )

  return (
    <div>
      <Toast ref={toast} />
      <div className="card ">
        <DataTable
          ref={dt}
          value={items}
          selection={selectedItems}
          onSelectionChange={(e) => setSelectedItems(e.value)}
          dataKey="id"
          responsiveLayout="scroll"
          className="datatable-responsive"
          emptyMessage="Agregue un Item."
          footerColumnGroup={footerGroup}
        >
          <Column
            body={actionBodyTemplate}
            header={header}
            exportable={false}
            className=" p-0"
            style={{ minWidth: '6rem' }}
          ></Column>
          <Column
            field="itemId"
            header="itemId"
            className=" pt-0 pb-0"
            hidden={true}
          ></Column>

          <Column
            field="itemClasificacionServicio"
            header="Clasificacion Servicio"
            className=" pt-0 pb-0"
          ></Column>
          <Column
            field="itemClasificacion3erNivel"
            header="itemClasificacion3erNivel"
            className=" pt-0 pb-0"
            hidden={true}
          ></Column>
          <Column
            field="itemClasificacion4toNivel"
            header="Codigo"
            className=" pt-0 pb-0"
          ></Column>
          <Column
            field="itemDescripcion"
            header="Descripcion"
            className=" pt-0 pb-0"
          ></Column>
          <Column
            field="itemUnidad"
            header="Unidad"
            className=" pt-0 pb-0"
          ></Column>
          <Column
            field="itemCantidad"
            header="Cantidad"
            className=" pt-0 pb-0"
          ></Column>

          <Column
            field="itemPrecioUnitario"
            header="Precio Unitario"
            body={itemPrecioUnitarioBodyTemplate}
            className=" pt-0 pb-0"
          ></Column>
          <Column
            field="itemPrecioTotal"
            header="Precio Total"
            body={itemPrecioTotalBodyTemplate}
            className=" pt-0 pb-0"
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
