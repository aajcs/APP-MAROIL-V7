/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
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
import { InputNumber } from 'primereact/inputnumber'

import moment from 'moment'
import { ProformaContext } from '../contexts/ProformaContext'

const ItemsProformaForm = (props) => {
  const initialItemsProformaForm = {
    id: null,

    codigoItemsProforma: '',

    descripcionItemsProforma: '',

    fechaInicioItemsProforma: '',
    fechaFinItemsProforma: '',
    unidadItemsProforma: '',
    cantidadItemsProforma: 0,
    precioUnitarioItemsProforma: 0,
    precioTotalItemsProforma: 0,
    estatus1ItemsProforma: null,
    estatus2ItemsProforma: null,
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
  const { proformas } = useContext(ProformaContext)

  const { isVisible, setIsVisible } = props
  const [selectedProforma, setSelectedProforma] = useState(null)

  const [selectedUnidadItemsProforma, setSelectedUnidadItemsProforma] =
    useState(null)
  const [selectedEstatus1ItemsProforma, setSelectedEstatus1ItemsProforma] =
    useState(null)
  const [selectedEstatus2ItemsProforma, setSelectedEstatus2ItemsProforma] =
    useState(null)
  const [itemsProformaData, setItemsProformaData] = useState(
    initialItemsProformaForm
  )

  const [submitted, setSubmitted] = useState(false)
  const [dateInicio, setDateInicio] = useState()
  const [dateFin, setDateFin] = useState()

  const estatus1ItemsProforma = [
    { estatus1ItemsProforma: 'estatus1' },
    { estatus1ItemsProforma: 'estatus12' }
  ]
  const estatus2ItemsProforma = [
    { estatus2ItemsProforma: 'estatus2' },
    { estatus2ItemsProforma: 'estatus22' }
  ]

  const unidadItemsProforma = [
    { unidadItemsProforma: 'M' },
    { unidadItemsProforma: 'M2' },
    { unidadItemsProforma: 'M3' },
    { unidadItemsProforma: 'Kg' },
    { unidadItemsProforma: 'Sem' },
    { unidadItemsProforma: 'Viaje' },
    { unidadItemsProforma: 'sco' },
    { unidadItemsProforma: 'Kgf' },
    { unidadItemsProforma: 'Pza' },
    { unidadItemsProforma: 'Und' },
    { unidadItemsProforma: 'ML' },
    { unidadItemsProforma: 'Sg' }
  ]

  const onEstatus1ItemsProforma = (e) => {
    setSelectedEstatus1ItemsProforma(e.value)
    updateField(e.value.estatus1ItemsProforma, 'estatus1ItemsProforma')
  }
  const onEstatus2ItemsProforma = (e) => {
    setSelectedEstatus2ItemsProforma(e.value)
    updateField(e.value.estatus2ItemsProforma, 'estatus2ItemsProforma')
  }

  const onUnidadItemsProforma = (e) => {
    setSelectedUnidadItemsProforma(e.value)
    updateField(e.value.unidadItemsProforma, 'unidadItemsProforma')
  }
  const toast = useRef(null)
  const onProforma = (e) => {
    e.value
      ? (setSelectedProforma(e.value), updateField(e.value.id, 'proformaId'))
      : (setSelectedProforma(null), updateField(null, 'proformaId'))
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

  useEffect(() => {
    if (editItemsProforma) {
      setItemsProformaData({
        ...editItemsProforma,
        proformaId: editItemsProforma.proformaId?.id
      })

      setSelectedUnidadItemsProforma({
        unidadItemsProforma: editItemsProforma.unidadItemsProforma
      })
      setSelectedEstatus1ItemsProforma({
        estatus1ItemsProforma: editItemsProforma.estatus1ItemsProforma
      })
      setSelectedEstatus2ItemsProforma({
        estatus2ItemsProforma: editItemsProforma.estatus2ItemsProforma
      })
      setDateInicio(
        editItemsProforma.fechaInicioItemsProforma &&
          moment(editItemsProforma.fechaInicioItemsProforma)._d
      )
      setDateFin(
        editItemsProforma.fechaFinItemsProforma &&
          moment(editItemsProforma.fechaFinItemsProforma)._d
      )
      const proformaIdSelecEdit =
        editItemsProforma.proformaId &&
        proformas.find((p) => p.id === editItemsProforma.proformaId.id)
      setSelectedProforma(proformaIdSelecEdit)
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
  }
  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div className="mr-3">{option.codigoProforma}</div>{' '}
          <div>{option.proveedorId.nombreProveedor}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const countryOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div className="mr-3">{option.codigoProforma}</div>{' '}
        <div>{option.proveedorId.nombreProveedor}</div>
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
          <div className="formgrid grid">
            <div className="field col-12 md:col-6  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedProforma}
                  options={proformas}
                  onChange={onProforma}
                  optionLabel="codigoProforma"
                  showClear
                  filter
                  filterBy="codigoProforma"
                  className={classNames({
                    'p-invalid': submitted && !selectedProforma,
                    'h-full md:h-2rem': false
                  })}
                  valueTemplate={selectedCountryTemplate}
                  itemTemplate={countryOptionTemplate}
                />
                {submitted && !selectedProforma && (
                  <small className="p-invalid">Proforma es requerido.</small>
                )}
                <label htmlFor="dropdown">Seleccione Proforma*</label>
              </span>
            </div>
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
                  <small className="p-invalid">
                    Fecha inicio es requerido.
                  </small>
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
                  value={selectedUnidadItemsProforma}
                  options={unidadItemsProforma}
                  onChange={onUnidadItemsProforma}
                  optionLabel="unidadItemsProforma"
                  // placeholder="Seleccione unidad"
                  className={classNames({
                    'p-invalid':
                      submitted && !itemsProformaData.unidadItemsProforma
                  })}
                />
                {submitted && !itemsProformaData.unidadItemsProforma && (
                  <small className="p-invalid">Unidad es requerido.</small>
                )}
                <label>Unidad</label>{' '}
              </span>
            </div>
            <div className="field col-6 p-col-2 mt-3">
              <span className="p-float-label ">
                <InputNumber
                  inputId="cantidadItemsProforma"
                  value={itemsProformaData.cantidadItemsProforma}
                  onValueChange={(e) => {
                    updateField(e.target.value, 'cantidadItemsProforma')
                  }}
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  className={classNames({
                    'p-invalid':
                      submitted && !itemsProformaData.cantidadItemsProforma
                  })}
                />

                {submitted && !itemsProformaData.cantidadItemsProforma && (
                  <small className="p-invalid">
                    Cantidad Proforma es requerido.
                  </small>
                )}
                <label htmlFor="cantidadItemsProforma">Cantidad Proforma</label>
              </span>
            </div>
            <div className="field col-6 p-col-2 mt-3">
              <span className="p-float-label ">
                <InputNumber
                  inputId="precioUnitarioItemsProforma"
                  value={itemsProformaData.precioUnitarioItemsProforma}
                  onValueChange={(e) => {
                    updateField(e.target.value, 'precioUnitarioItemsProforma')
                    // updateField(
                    //   e.target.value * itemsProformaData.cantidadItemsProforma,
                    //   'precioTotalItemsProforma'
                    // )
                  }}
                  // onBlur={(e) => {
                  //   console.log(Number(e.target.ariaValueNow))
                  //   updateField(
                  //     Number(e.target.ariaValueNow) *
                  //       itemsProformaData.cantidadItemsProforma,
                  //     'precioTotalItemsProforma'
                  //   )
                  // }}
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  className={classNames({
                    'p-invalid':
                      submitted &&
                      !itemsProformaData.precioUnitarioItemsProforma
                  })}
                />

                {submitted &&
                  !itemsProformaData.precioUnitarioItemsProforma && (
                    <small className="p-invalid">
                      Precio Unitario es requerido.
                    </small>
                  )}
                <label htmlFor="precioUnitarioItemsProforma">
                  Precio Unitario
                </label>
              </span>
            </div>
            <div className="field col-6 p-col-2 mt-3">
              <span className="p-float-label ">
                <InputNumber
                  inputId="precioTotalItemsProforma"
                  value={itemsProformaData.precioTotalItemsProforma}
                  onValueChange={(e) =>
                    updateField(e.target.value, 'precioTotalItemsProforma')
                  }
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  className={classNames({
                    'p-invalid':
                      submitted && !itemsProformaData.precioTotalItemsProforma
                  })}
                />

                {submitted && !itemsProformaData.precioTotalItemsProforma && (
                  <small className="p-invalid">
                    Precio Total es requerido.
                  </small>
                )}
                <label htmlFor="precioTotalItemsProforma">Precio Total</label>
              </span>
            </div>
            <div className="field col-12 md:col-6 mt-4">
              <span className="p-float-label ">
                <Dropdown
                  value={selectedEstatus1ItemsProforma}
                  options={estatus1ItemsProforma}
                  onChange={onEstatus1ItemsProforma}
                  optionLabel="estatus1ItemsProforma"
                  // placeholder="Seleccione unidad"
                  className={classNames({
                    'p-invalid':
                      submitted && !itemsProformaData.estatus1ItemsProforma
                  })}
                />
                {submitted && !itemsProformaData.estatus1ItemsProforma && (
                  <small className="p-invalid">estatus1 es requerido.</small>
                )}
                <label>estatus1</label>{' '}
              </span>
            </div>
            <div className="field col-12 md:col-6 mt-4">
              <span className="p-float-label ">
                <Dropdown
                  value={selectedEstatus2ItemsProforma}
                  options={estatus2ItemsProforma}
                  onChange={onEstatus2ItemsProforma}
                  optionLabel="estatus2ItemsProforma"
                  // placeholder="Seleccione estatus2"
                  className={classNames({
                    'p-invalid':
                      submitted && !itemsProformaData.estatus2ItemsProforma
                  })}
                />
                {submitted && !itemsProformaData.estatus2ItemsProforma && (
                  <small className="p-invalid">Estatus2 es requerido.</small>
                )}
                <label>estatus2</label>{' '}
              </span>
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default ItemsProformaForm
