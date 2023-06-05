/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable dot-notation */
import React, { useState, useRef } from 'react'
import { classNames } from 'primereact/utils'

import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'

import { InputNumber } from 'primereact/inputnumber'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

const CargaItemsProformaFrom = ({
  itemDialog,
  setItemDialog,
  item,
  setItem,
  items,
  setItems
}) => {
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
  console.log(items)
  const [submitted, setSubmitted] = useState(false)
  const toast = useRef(null)

  const hideDialog = () => {
    setSubmitted(false)
    setItemDialog(false)
  }

  const saveItem = () => {
    setSubmitted(true)

    if (item.itemDescripcion.trim()) {
      console.log('aqui')
      let _items = [...items]
      let _item = { ...item }

      if (item.itemId) {
        const index = findIndexById(item.itemId)
        console.log(index)
        _items[index] = _item
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Updated',
          life: 3000
        })
      } else {
        _item.itemId = createId()
        _items.push(_item)
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Created',
          life: 3000
        })
      }

      setItems(_items)
      setItemDialog(false)
      setItem(emptyItem)
    }
  }

  const findIndexById = (itemId) => {
    let index = -1

    for (let i = 0; i < items.length; i++) {
      if (items[i].itemId === itemId) {
        index = i
        break
      }
    }

    return index
  }

  const createId = () => {
    let id = ''
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return id
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || ''
    let _item = { ...item }

    _item[`${name}`] = val

    setItem(_item)
  }

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0
    let _item = { ...item }

    _item[`${name}`] = val

    setItem(_item)
  }

  const itemDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveItem} />
    </React.Fragment>
  )

  return (
    <div>
      <Toast ref={toast} />

      <Dialog
        visible={itemDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Item Details"
        modal
        className="p-fluid"
        footer={itemDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="itemDescripcion" className="font-bold">
            itemDescripcion
          </label>
          <InputText
            id="itemDescripcion"
            value={item.itemDescripcion}
            onChange={(e) => onInputChange(e, 'itemDescripcion')}
            required
            autoFocus
            className={classNames({
              'p-invalid': submitted && !item.itemDescripcion
            })}
          />
          {submitted && !item.itemDescripcion && (
            <small className="p-error">itemDescripcion is required.</small>
          )}
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price" className="font-bold">
              Price
            </label>
            <InputNumber
              id="price"
              value={item.price}
              onValueChange={(e) => onInputNumberChange(e, 'price')}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>
          <div className="field col">
            <label htmlFor="quantity" className="font-bold">
              Quantity
            </label>
            <InputNumber
              id="quantity"
              value={item.quantity}
              onValueChange={(e) => onInputNumberChange(e, 'quantity')}
            />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
export default CargaItemsProformaFrom
