/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { ItemsProformaContext } from '../contexts/ItemsProformaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { classNames } from 'primereact/utils'
import { Calendar } from 'primereact/calendar'

import moment from 'moment'

const ItemsProformaForm = (props) => {
  const initialItemsProformaForm = {
    id: null,

    codigoItemsProforma: '',

    descripcionItemsProforma: '',
    usoFondoItemsProforma: '',
    fechaInicioItemsProforma: '',
    fechaFinItemsProforma: '',
    unidadItemsProforma: '',
    cantidadItemsProforma: '',
    precioUnitarioItemsProforma: '',
    precioTotalItemsProforma: '',
    estatus1ItemsProforma: '',
    estatus2ItemsProforma: '',
    creadoItemsProforma: moment(),
    modificadoItemsProforma: moment(),
    proformaId: null
  }

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado'
    ],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ],
    monthNamesShort: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic'
    ],
    today: 'Hoy',
    clear: 'Limpiar'
  })
  const { createItemsProforma, editItemsProforma, updateItemsProforma } =
    useContext(ItemsProformaContext)

  const { isVisible, setIsVisible } = props
  const [selectedItemsProforma, setSelectedItemsProforma] = useState(null)
  const [selectedusoFondoItemsProforma, setSelectedusoFondoItemsProforma] =
    useState(null)
  const [selectedUnidadDataPresupuesto, setSelectedUnidadDataPresupuesto] =
    useState(null)
  const [itemsProformaData, setItemsProformaData] = useState(
    initialItemsProformaForm
  )
  const [submitted, setSubmitted] = useState(false)
  const [dateInicio, setDateInicio] = useState()
  const [dateFin, setDateFin] = useState()

  const estadoItemsProforma = [
    { estatusItemsProforma: 'OPERATIVO' },
    { estatusItemsProforma: 'INOPERATIVO' }
  ]
  const itemsUsoFondoItemsProforma = [
    { itemsUsoFondoItemsProforma: 'CONTINUIDAD OPERATIVA' },
    { itemsUsoFondoItemsProforma: 'INVERSION' }
  ]
  const unidadDataPresupuesto = [
    { unidadDataPresupuesto: 'M' },
    { unidadDataPresupuesto: 'M2' },
    { unidadDataPresupuesto: 'M3' },
    { unidadDataPresupuesto: 'Kg' },
    { unidadDataPresupuesto: 'Sem' },
    { unidadDataPresupuesto: 'Viaje' },
    { unidadDataPresupuesto: 'sco' },
    { unidadDataPresupuesto: 'Kgf' },
    { unidadDataPresupuesto: 'Pza' },
    { unidadDataPresupuesto: 'Und' },
    { unidadDataPresupuesto: 'ML' },
    { unidadDataPresupuesto: 'Sg' }
  ]
  const onEstatusItemsProforma = (e) => {
    setSelectedItemsProforma(e.value)
    updateField(e.value.estatusItemsProforma, 'estatusItemsProforma')
  }
  const onUsoFondoItemsProforma = (e) => {
    setSelectedusoFondoItemsProforma(e.value)
    updateField(e.value.itemsUsoFondoItemsProforma, 'usoFondoItemsProforma')
  }
  const onUnidadDataPresupuesto = (e) => {
    setSelectedUnidadDataPresupuesto(e.value)
    updateField(e.value.unidadDataPresupuesto, 'unidadDataPresupuesto')
  }
  const toast = useRef(null)

  useEffect(() => {
    if (editItemsProforma) {
      setItemsProformaData(editItemsProforma)
      setSelectedItemsProforma({
        estatusItemsProforma: editItemsProforma.estatusItemsProforma
      })
    }
  }, [editItemsProforma])

  const updateField = (data, field) => {
    setItemsProformaData({
      ...itemsProformaData,
      [field]: data
    })
  }

  const saveItemsProforma = () => {
    setSubmitted(true)
    if (!editItemsProforma) {
      createItemsProforma(itemsProformaData)
    } else {
      updateItemsProforma({
        ...itemsProformaData,
        ItemsProformaModificado: moment()
      })
    }
    setItemsProformaData(initialItemsProformaForm)
    setIsVisible(false)
    setSelectedItemsProforma('')
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveItemsProforma} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setItemsProformaData(initialItemsProformaForm)
    setSelectedItemsProforma('')
  }
  const selectedestatusItemsProformaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusItemsProforma}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusItemsProformaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusItemsProforma}</div>
      </div>
    )
  }

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '80vw' }}
        header="Detalles de la ItemsProforma"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="field col-6 p-col-2 mt-3">
            <span className="p-float-label ">
              <InputText
                value={itemsProformaData.codigoItemsProforma}
                onChange={(e) =>
                  updateField(e.target.value, 'codigoItemsProforma')
                }
                className={classNames({
                  'p-invalid':
                    submitted && !itemsProformaData.codigoItemsProforma
                })}
              />

              {submitted && !itemsProformaData.codigoItemsProforma && (
                <small className="p-invalid">Codigo = es requerido.</small>
              )}
              <label htmlFor="codigoItemsProforma">Codigo</label>
            </span>
          </div>
          <div className="field col-6 p-col-2 mt-3">
            <span className="p-float-label ">
              <InputText
                value={itemsProformaData.descripcionItemsProforma}
                onChange={(e) =>
                  updateField(e.target.value, 'descripcionItemsProforma')
                }
                className={classNames({
                  'p-invalid':
                    submitted && !itemsProformaData.descripcionItemsProforma
                })}
              />

              {submitted && !itemsProformaData.descripcionItemsProforma && (
                <small className="p-invalid">Descripcion es requerido.</small>
              )}
              <label htmlFor="descripcionItemsProforma">Descripcion</label>
            </span>
          </div>
          <div className="field col-12 md:col-6  mt-3">
            <span className="p-float-label">
              <Dropdown
                inputId="dropdown"
                value={selectedusoFondoItemsProforma}
                options={itemsUsoFondoItemsProforma}
                onChange={onUsoFondoItemsProforma}
                optionLabel="itemsUsoFondoItemsProforma"
                showClear
                filter
                filterBy="itemsUsoFondoItemsProforma"
                className={classNames({
                  'p-invalid': submitted && !selectedusoFondoItemsProforma
                })}
              />
              {submitted && !selectedusoFondoItemsProforma && (
                <small className="p-invalid">Uso de fondo es requerido.</small>
              )}
              <label htmlFor="dropdown">Seleccione Uso de fondo*</label>
            </span>
          </div>
          <div className="field col-12 md:col-6 mt-3">
            <span className="p-float-label ">
              <Calendar
                // className="p-datepicker-today"
                id="time24"
                value={dateInicio !== null && dateInicio}
                onChange={(e) => {
                  setDateInicio(e.value)
                  updateField(e.target.value, 'fechaInicioItemsProforma')
                }}
                showTime
                locale="es"
                // hourFormat="12"
                showButtonBar
                className={classNames(
                  {
                    'p-invalid':
                      submitted && !itemsProformaData.fechaInicioItemsProforma
                  },
                  'p-datepicker-today'
                )}
              />{' '}
              {submitted && !itemsProformaData.fechaInicioItemsProforma && (
                <small className="p-invalid">Fecha inicio es requerido.</small>
              )}
              <label>Fecha Inicio </label>
            </span>
          </div>
          <div className="field col-12 md:col-6 mt-3">
            <span className="p-float-label ">
              <Calendar
                // className="p-datepicker-today"
                id="time24"
                value={dateFin !== null && dateFin}
                onChange={(e) => {
                  setDateFin(e.value)
                  updateField(e.target.value, 'fechaFinItemsProforma')
                }}
                showTime
                locale="es"
                // hourFormat="12"
                showButtonBar
                className={classNames(
                  {
                    'p-invalid':
                      submitted && !itemsProformaData.fechaFinItemsProforma
                  },
                  'p-datepicker-today'
                )}
              />{' '}
              {submitted && !itemsProformaData.fechaFinItemsProforma && (
                <small className="p-invalid">Fecha fin es requerido.</small>
              )}
              <label>Fecha fin </label>
            </span>
          </div>
          <div className="field col-12 md:col-6 mt-4">
            <span className="p-float-label ">
              <Dropdown
                value={selectedUnidadDataPresupuesto}
                options={unidadDataPresupuesto}
                onChange={onUnidadDataPresupuesto}
                optionLabel="unidadDataPresupuesto"
                // placeholder="Seleccione unidad"
                className={classNames({
                  'p-invalid':
                    submitted && !itemsProformaData.unidadDataPresupuesto
                })}
              />
              {submitted && !itemsProformaData.unidadDataPresupuesto && (
                <small className="p-invalid">Unidad es requerido.</small>
              )}
              <label>Unidad</label>{' '}
            </span>
          </div>
          <div className="p-float-label">
            <InputText
              value={itemsProformaData.codigoItemsProforma}
              onChange={(e) =>
                updateField(e.target.value, 'codigoItemsProforma')
              }
            />
            <label>codigoItemsProforma:</label>
          </div>

          <div className="p-float-label">
            <InputText
              value={itemsProformaData.nombreItemsProforma}
              onChange={(e) =>
                updateField(e.target.value, 'nombreItemsProforma')
              }
            />
            <label>Nombre del ItemsProforma:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={itemsProformaData.descripcionItemsProforma}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionItemsProforma')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedItemsProforma}
                options={estadoItemsProforma}
                onChange={onEstatusItemsProforma}
                optionLabel="estatusItemsProforma"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusItemsProformaTemplate}
                itemTemplate={estatusItemsProformaOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default ItemsProformaForm
