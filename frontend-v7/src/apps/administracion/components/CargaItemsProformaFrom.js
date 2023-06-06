/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable dot-notation */
import React, { useState, useRef, useContext } from 'react'
import { classNames } from 'primereact/utils'

import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'

import { InputNumber } from 'primereact/inputnumber'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { ClasificacionServicioContext } from '../contexts/ClasificacionServicioContext'
import { Clasificacion3erNivelContext } from '../contexts/Clasificacion3erNivelContext'

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
  console.log(item)
  const { clasificacionServicios } = useContext(ClasificacionServicioContext)
  const { clasificacion3erNivels } = useContext(Clasificacion3erNivelContext)
  const [selectedClasificacionServicio, setSelectedClasificacionServicio] =
    useState(null)
  const [selectedClasificacion3erNivel, setSelectedClasificacion3erNivel] =
    useState(null)
  const [submitted, setSubmitted] = useState(false)
  const toast = useRef(null)

  const hideDialog = () => {
    setSubmitted(false)
    setItemDialog(false)
  }
  const updateField = (data, field) => {
    setItem({
      ...item,
      [field]: data
    })
  }
  const onClasificacionServicio = (e) => {
    console.log(e.value)
    e.value
      ? (setSelectedClasificacionServicio(e.value),
        updateField(
          e.value.nombreClasificacionServicio,
          'itemClasificacionServicio'
        ))
      : (setSelectedClasificacionServicio(null),
        updateField(null, 'itemClasificacionServicio'))
    // if (e.value) {
    //   const subProyectoFilter = subProyectos.filter(
    //     (p) => p.proyectoId?.id === e.value.id
    //   )
    //   setSelectedProyecto(e.value)
    //   setSubProyecto(subProyectoFilter)
    // } else {
    //   setSelectedProyecto(null)
    //   setSubProyecto(null)
    //   setSelectedSubProyecto(null)
    //   setSelectedPresupuesto(null)
    // }
  }
  const onClasificacion3erNivel = (e) => {
    e.value
      ? (setSelectedClasificacion3erNivel(e.value),
        updateField(
          e.value.nombreClasificacion3erNivel,
          'itemClasificacion3erNivel'
        ))
      : (setSelectedClasificacion3erNivel(null),
        updateField(null, 'itemClasificacion3erNivel'))
    // if (e.value) {
    //   const subProyectoFilter = subProyectos.filter(
    //     (p) => p.proyectoId?.id === e.value.id
    //   )
    //   setSelectedProyecto(e.value)
    //   setSubProyecto(subProyectoFilter)
    // } else {
    //   setSelectedProyecto(null)
    //   setSubProyecto(null)
    //   setSelectedSubProyecto(null)
    //   setSelectedPresupuesto(null)
    // }
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
  const selectedClasificacion3erNivelTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>
            {option.codigoClasificacion3erNivel}-
            {option.nombreClasificacion3erNivel}
          </div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const clasificacion3erNivelOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>
          {option.codigoClasificacion3erNivel}-
          {option.nombreClasificacion3erNivel}
        </div>
      </div>
    )
  }
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
          <div className="field col-12 md:col-6  mt-3">
            <span className="p-float-label">
              <Dropdown
                inputId="dropdown"
                value={selectedClasificacionServicio}
                options={clasificacionServicios}
                onChange={onClasificacionServicio}
                optionLabel="nombreClasificacionServicio"
                showClear
                filter
                filterBy="nombreClasificacionServicio"
                className={classNames({
                  'p-invalid': submitted && !selectedClasificacionServicio
                })}
              />
              {submitted && !selectedClasificacionServicio && (
                <small className="p-invalid">
                  ClasificacionServicio es requerido.
                </small>
              )}
              <label htmlFor="dropdown">
                Seleccione ClasificacionServicio*
              </label>
            </span>
          </div>
          <div className="field col-12 md:col-12  mt-3">
            <span className="p-float-label">
              <Dropdown
                inputId="dropdown"
                value={selectedClasificacion3erNivel}
                options={clasificacion3erNivels}
                onChange={onClasificacion3erNivel}
                optionLabel="nombreClasificacion3erNivel"
                showClear
                filter
                filterBy="nombreClasificacion3erNivel"
                valueTemplate={selectedClasificacion3erNivelTemplate}
                itemTemplate={clasificacion3erNivelOptionTemplate}
                className={classNames({
                  'p-invalid': submitted && !selectedClasificacion3erNivel
                })}
              />
              {submitted && !selectedClasificacion3erNivel && (
                <small className="p-invalid">
                  Clasificacion3erNivel es requerido.
                </small>
              )}
              <label htmlFor="dropdown">
                Seleccione Clasificacion3erNivel*
              </label>
            </span>
          </div>
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
