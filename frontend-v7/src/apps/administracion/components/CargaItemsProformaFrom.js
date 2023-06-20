/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable dot-notation */
import React, { useState, useRef, useContext, useEffect } from 'react'
import { classNames } from 'primereact/utils'

import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'

import { InputNumber } from 'primereact/inputnumber'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { ClasificacionServicioContext } from '../contexts/ClasificacionServicioContext'
import { Clasificacion3erNivelContext } from '../contexts/Clasificacion3erNivelContext'
import { Clasificacion4toNivelContext } from '../contexts/Clasificacion4toNivelContext'

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
  const { clasificacionServicios } = useContext(ClasificacionServicioContext)
  const { clasificacion3erNivels } = useContext(Clasificacion3erNivelContext)
  const { clasificacion4toNivels } = useContext(Clasificacion4toNivelContext)
  const [selectedClasificacionServicio, setSelectedClasificacionServicio] =
    useState(null)
  const [selectedClasificacion3erNivel, setSelectedClasificacion3erNivel] =
    useState(null)
  const [clasificacion3erNivel, setClasificacion3erNivel] = useState(
    clasificacion3erNivels
  )
  const [clasificacion4toNivel, setClasificacion4toNivel] = useState(
    clasificacion4toNivels
  )
  const [selectedClasificacion4toNivel, setSelectedClasificacion4toNivel] =
    useState(null)
  const [selectedUnidadItemsProforma, setSelectedUnidadItemsProforma] =
    useState(null)
  const [submitted, setSubmitted] = useState(false)
  const toast = useRef(null)
  const itemUnidad = [
    { itemUnidad: 'M' },
    { itemUnidad: 'M2' },
    { itemUnidad: 'M3' },
    { itemUnidad: 'Kg' },
    { itemUnidad: 'Sem' },
    { itemUnidad: 'Viaje' },
    { itemUnidad: 'sco' },
    { itemUnidad: 'Kgf' },
    { itemUnidad: 'Pza' },
    { itemUnidad: 'Und' },
    { itemUnidad: 'ML' },
    { itemUnidad: 'Sg' }
  ]
  useEffect(() => {
    if (item.itemId) {
      setSelectedUnidadItemsProforma({ itemUnidad: item.itemUnidad })
    }
  }, [item])
  const updateField = (data, field) => {
    setItem({
      ...item,
      [field]: data
    })
  }
  const updateField2 = (data, field, data2, field2) => {
    setItem({
      ...item,
      [field]: data,
      [field2]: data2
    })
  }
  const onClasificacionServicio = (e) => {
    // e.value
    //   ? (setSelectedClasificacionServicio(e.value),
    //     updateField(
    //       e.value.nombreClasificacionServicio,
    //       'itemClasificacionServicio'
    //     ))
    //   : (setSelectedClasificacionServicio(null),
    //     updateField(null, 'itemClasificacionServicio'))
    if (e.value) {
      const clasificacion3erNivelFilter = clasificacion3erNivels.filter(
        (p) => p.clasificacionServicioId?.id === e.value.id
      )
      setSelectedClasificacionServicio(e.value)
      updateField(
        e.value.nombreClasificacionServicio,
        'itemClasificacionServicio'
      )

      setClasificacion3erNivel(clasificacion3erNivelFilter)
    } else {
      setSelectedClasificacionServicio(null)
      updateField(null, 'itemClasificacionServicio')
      setClasificacion3erNivel(null)
      setClasificacion4toNivel(null)
    }
  }
  const onClasificacion3erNivel = (e) => {
    // e.value
    //   ? (setSelectedClasificacion3erNivel(e.value),
    //     updateField(
    //       e.value.nombreClasificacion3erNivel,
    //       'itemClasificacion3erNivel'
    //     ))
    //   : (setSelectedClasificacion3erNivel(null),
    //     updateField(null, 'itemClasificacion3erNivel'))
    if (e.value) {
      const clasificacion4toNivelFilter = clasificacion4toNivels.filter(
        (p) => p.clasificacion3erNivelId?.id === e.value.id
      )
      setSelectedClasificacion3erNivel(e.value)
      setClasificacion4toNivel(clasificacion4toNivelFilter)
      updateField(
        e.value.nombreClasificacion3erNivel,
        'itemClasificacion3erNivel'
      )
    } else {
      setSelectedClasificacion3erNivel(null)
      updateField(null, 'itemClasificacion3erNivel')
      setClasificacion4toNivel(null)
    }
  }
  const onClasificacion4toNivel = (e) => {
    e.value
      ? (setSelectedClasificacion4toNivel(e.value),
        updateField2(
          e.value.codigoClasificacion4toNivel,
          'itemClasificacion4toNivel',
          e.value.nombreClasificacion4toNivel,
          'itemDescripcion'
        ))
      : (setSelectedClasificacion4toNivel(null),
        updateField(null, 'itemClasificacion4toNivel'))
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
  const onUnidadItemsProforma = (e) => {
    setSelectedUnidadItemsProforma(e.value)
    updateField(e.value.itemUnidad, 'itemUnidad')
  }
  const saveItem = () => {
    setSubmitted(true)

    if (
      item.itemClasificacionServicio !== null &&
      item.itemClasificacion3erNivel !== null &&
      item.itemClasificacion4toNivel !== null &&
      item.itemDescripcion.trim() &&
      item.itemUnidad !== null &&
      item.itemCantidad !== 0 &&
      item.itemPrecioUnitario !== 0
    ) {
      let _items = [...items]
      let _item = { ...item }

      if (item.itemId) {
        const index = findIndexById(item.itemId)
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
      clearSelected()
    }
  }
  const clearSelected = () => {
    setItemDialog(false)
    setItem(emptyItem)
    setSubmitted(false)
    setClasificacion3erNivel(null)
    setClasificacion4toNivel(null)
    setSelectedClasificacionServicio(null)

    setSelectedClasificacion3erNivel(null)
    setSelectedClasificacion4toNivel(null)
    setSelectedUnidadItemsProforma(null)
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

  const itemDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-raised p-button-secondary "
        onClick={() => clearSelected()}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        onClick={saveItem}
        className="p-button-raised "
      />
    </React.Fragment>
  )
  const selectedClasificacionServicioTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>
            {option.codigoClasificacionServicio}-
            {option.nombreClasificacionServicio}
          </div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const clasificacionServicioOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>
          {option.codigoClasificacionServicio}-
          {option.nombreClasificacionServicio}
        </div>
      </div>
    )
  }
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
  const selectedClasificacion4toNivelTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>
            {option.codigoClasificacion4toNivel}-
            {option.nombreClasificacion4toNivel}
          </div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const clasificacion4toNivelOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>
          {option.codigoClasificacion4toNivel}-
          {option.nombreClasificacion4toNivel}
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
        header="Item Datalle"
        modal
        className="p-fluid"
        footer={itemDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="formgrid grid">
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
                style={{ 'min-height': '2.5rem' }}
                valueTemplate={selectedClasificacionServicioTemplate}
                itemTemplate={clasificacionServicioOptionTemplate}
                className={classNames({
                  'p-invalid': submitted && !selectedClasificacionServicio
                })}
              />
              {submitted && !selectedClasificacionServicio && (
                <small className="p-invalid">
                  ClasificacionServicio es requerido.
                </small>
              )}
              <label htmlFor="dropdown">Clasificacion Servicio*</label>
            </span>
          </div>
          <div className="field col-12 md:col-6  mt-3">
            <span className="p-float-label">
              <Dropdown
                inputId="dropdown"
                value={selectedClasificacion3erNivel}
                options={clasificacion3erNivel}
                onChange={onClasificacion3erNivel}
                optionLabel="nombreClasificacion3erNivel"
                showClear
                filter
                style={{ 'min-height': '2.5rem' }}
                filterBy="nombreClasificacion3erNivel"
                disabled={clasificacion3erNivel === null}
                valueTemplate={selectedClasificacion3erNivelTemplate}
                itemTemplate={clasificacion3erNivelOptionTemplate}
                className={classNames({
                  'p-invalid':
                    (submitted && !selectedClasificacion3erNivel) ||
                    clasificacion3erNivel === null
                })}
              />
              {submitted && !selectedClasificacion3erNivel && (
                <small className="p-invalid">
                  Clasificacion3erNivel es requerido.
                </small>
              )}
              <label htmlFor="dropdown">Clasificacion 3erNivel*</label>
            </span>
          </div>
          <div className="field col-12 md:col-6  mt-3">
            <span className="p-float-label">
              <Dropdown
                inputId="dropdown"
                value={selectedClasificacion4toNivel}
                options={clasificacion4toNivel}
                onChange={onClasificacion4toNivel}
                optionLabel="nombreClasificacion4toNivel"
                showClear
                filter
                style={{ 'min-height': '2.5rem' }}
                filterBy="nombreClasificacion4toNivel"
                disabled={clasificacion4toNivel === null}
                valueTemplate={selectedClasificacion4toNivelTemplate}
                itemTemplate={clasificacion4toNivelOptionTemplate}
                className={classNames({
                  'p-invalid':
                    (submitted && !selectedClasificacion4toNivel) ||
                    clasificacion4toNivel === null
                })}
              />
              {submitted && !selectedClasificacion4toNivel && (
                <small className="p-invalid">
                  Clasificacion4toNivel es requerido.
                </small>
              )}
              <label htmlFor="dropdown">Clasificacion 4toNivel*</label>
            </span>
          </div>

          <div className="field col-12 p-col-2 mt-3">
            <span className="p-float-label ">
              <InputText
                value={item.itemDescripcion}
                onChange={(e) => updateField(e.target.value, 'itemDescripcion')}
                className={classNames({
                  'p-invalid': submitted && !item.itemDescripcion
                })}
              />

              {submitted && !item.itemDescripcion && (
                <small className="p-invalid">Descripcion es requerido.</small>
              )}
              <label htmlFor="itemDescripcion">
                Descripcion Proforma Control
              </label>
            </span>
          </div>
          <div className="field col-12 md:col-6  mt-3">
            <span className="p-float-label ">
              <Dropdown
                value={selectedUnidadItemsProforma}
                options={itemUnidad}
                onChange={onUnidadItemsProforma}
                optionLabel="itemUnidad"
                // placeholder="Seleccione unidad"
                className={classNames({
                  'p-invalid': submitted && !item.itemUnidad
                })}
              />
              {submitted && !item.itemUnidad && (
                <small className="p-invalid">Unidad es requerido.</small>
              )}
              <label>Unidad</label>{' '}
            </span>
          </div>
          <div className="field col-12 md:col-6 p-col-2 mt-3">
            <span className="p-float-label ">
              <InputNumber
                inputId="itemCantidad"
                value={item.itemCantidad}
                onValueChange={(e) =>
                  updateField(e.target.value, 'itemCantidad')
                }
                minFractionDigits={2}
                maxFractionDigits={5}
                className={classNames({
                  'p-invalid': submitted && !item.itemCantidad
                })}
              />

              {submitted && !item.itemCantidad && (
                <small className="p-invalid">Cantidad es requerido.</small>
              )}
              <label htmlFor="itemCantidad">Cantidad Proforma</label>
            </span>
          </div>
          <div className="field col-12 md:col-6 p-col-2 mt-3">
            <span className="p-float-label ">
              <InputNumber
                inputId="itemPrecioUnitario"
                value={item.itemPrecioUnitario}
                onValueChange={(e) =>
                  updateField(e.target.value, 'itemPrecioUnitario')
                }
                minFractionDigits={2}
                maxFractionDigits={5}
                mode="currency"
                currency="USD"
                locale="de-DE"
                className={classNames({
                  'p-invalid': submitted && !item.itemPrecioUnitario
                })}
              />

              {submitted && !item.itemPrecioUnitario && (
                <small className="p-invalid">
                  Precio unitario es requerido.
                </small>
              )}
              <label htmlFor="itemPrecioUnitario">
                Precio unitario Proforma
              </label>
            </span>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
export default CargaItemsProformaFrom
