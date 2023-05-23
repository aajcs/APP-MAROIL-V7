/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect, useRef } from 'react'
import { ProformaContext } from '../contexts/ProformaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { classNames } from 'primereact/utils'
// import { InputNumber } from 'primereact/inputnumber'
// import { InputTextarea } from 'primereact/inputtextarea'
// import { Calendar } from 'primereact/calendar'
import moment from 'moment'
import { DominioContext } from '../contexts/DominioContext'
import { DivisionContext } from '../contexts/DivisionContext'
const ProformaForm = (props) => {
  const initialProformaForm = {
    id: null,

    codigoProforma: '',
    proveedorId: '',
    numeroControlProforma: '',
    fechaControlProforma: '',
    dominioId: '',
    divisionId: '',
    dependenciaId: '',
    subDependenciaId: '',
    actividadAsociadaId: '',
    clasificacionServicioId: '',
    ingresoProforma: '',
    egresoProforma: '',
    descripcionProforma: '',
    estatusProforma: '',
    userCreatorId: '',
    creadoProforma: moment(),
    modificadoProforma: moment()
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
  const { createProforma, editProforma, updateProforma } =
    useContext(ProformaContext)
  const { dominios } = useContext(DominioContext)
  const { divisions } = useContext(DivisionContext)

  const { isVisible, setIsVisible } = props
  const [selectedProforma, setSelectedProforma] = useState(null)
  const [proformaData, setProformaData] = useState(initialProformaForm)
  const [selectedDominio, setSelectedDominio] = useState(null)
  const [selectedDivision, setSelectedDivision] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const estadoProforma = [
    { estatusProforma: 'OPERATIVO' },
    { estatusProforma: 'INOPERATIVO' }
  ]
  const onEstatusProforma = (e) => {
    setSelectedProforma(e.value)
    updateField(e.value.estatusProforma, 'estatusProforma')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editProforma) {
      setProformaData(editProforma)
      setSelectedProforma({
        estatusProforma: editProforma.estatusProforma
      })
    }
  }, [editProforma])
  const onDominio = (e) => {
    e.value
      ? (setSelectedDominio(e.value), updateField(e.value.id, 'dominioId'))
      : (setSelectedDominio(null), updateField(null, 'dominioId'))
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
  const onDivision = (e) => {
    e.value
      ? (setSelectedDivision(e.value), updateField(e.value.id, 'divisionId'))
      : (setSelectedDivision(null), updateField(null, 'divisionId'))
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
  const updateField = (data, field) => {
    setProformaData({
      ...proformaData,
      [field]: data
    })
  }

  const saveProforma = () => {
    setSubmitted(true)
    if (!editProforma) {
      createProforma(proformaData)
    } else {
      updateProforma({
        ...proformaData,
        ProformaModificado: moment()
      })
    }
    setProformaData(initialProformaForm)
    setIsVisible(false)
    setSelectedProforma('')
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveProforma} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setProformaData(initialProformaForm)
    setSelectedProforma('')
  }
  const selectedestatusProformaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusProforma}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusProformaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusProforma}</div>
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
        header="Detalles de la Proforma"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid">
            <div className="field col-12 md:col-6  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedDominio}
                  options={dominios}
                  onChange={onDominio}
                  optionLabel="nombreDominio"
                  showClear
                  filter
                  filterBy="nombreDominio"
                  className={classNames({
                    'p-invalid': submitted && !selectedDominio
                  })}
                />
                {submitted && !selectedDominio && (
                  <small className="p-invalid">Dominio es requerido.</small>
                )}
                <label htmlFor="dropdown">Seleccione Dominio*</label>
              </span>
            </div>
            <div className="field col-12 md:col-6  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedDivision}
                  options={divisions}
                  onChange={onDivision}
                  optionLabel="nombreDivision"
                  showClear
                  filter
                  filterBy="nombreDivision"
                  className={classNames({
                    'p-invalid': submitted && !selectedDivision
                  })}
                />
                {submitted && !selectedDivision && (
                  <small className="p-invalid">Division es requerido.</small>
                )}
                <label htmlFor="dropdown">Seleccione Division*</label>
              </span>
            </div>
            <div className="field col-12 md:col-6  mt-3 ">
              {/* <span className="p-float-label ">
                <Dropdown
                  value={selectedSubProyecto}
                  options={subProyecto}
                  onChange={onSubProyecto}
                  optionLabel="nombreSubProyecto"
                  showClear
                  filter
                  filterBy="nombrePresupuesto"
                  disabled={!selectedProyecto}
                  className={classNames({
                    'p-invalid': submitted && !DataPresupuestoData.subProyectoId
                  })}
                />
                {submitted && !DataPresupuestoData.subProyectoId && (
                  <small className="p-invalid">
                    Sub Proyecto es requerido.
                  </small>
                )}
                <label htmlFor="dropdown">Seleccione Sub Proyecto*</label>
              </span> */}
            </div>
            <div className="field col-12 md:col-6 mt-3 ">
              {/* <span className="p-float-label ">
                <Dropdown
                  value={selectedPresupuesto}
                  options={presupuesto}
                  onChange={onPresupuesto}
                  optionLabel="nombrePresupuesto"
                  showClear
                  filter
                  filterBy="nombrePresupuesto"
                  disabled={!selectedSubProyecto}
                  className={classNames({
                    'p-invalid': submitted && !DataPresupuestoData.subProyectoId
                  })}
                />
                <label htmlFor="dropdown">Seleccione Presupuesto*</label>
              </span> */}
            </div>

            <div className="p-float-label col-12 md:col-6 mt-3 ">
              {/* <InputText
                value={DataPresupuestoData.nombreDataPresupuesto}
                onChange={(e) =>
                  updateField(e.target.value, 'nombreDataPresupuesto')
                }
                className={classNames({
                  'p-invalid':
                    submitted && !DataPresupuestoData.nombreDataPresupuesto
                })}
              />
              {submitted && !DataPresupuestoData.nombreDataPresupuesto && (
                <small className="p-invalid">Nombre es requerido.</small>
              )}
              <label>Nombre:*</label> */}
            </div>

            <div className="p-float-label col-12 md:col-12 mt-3 ">
              {/* <InputTextarea
                id="description"
                value={DataPresupuestoData.descripcionDataPresupuesto}
                onChange={(e) =>
                  updateField(e.target.value, 'descripcionDataPresupuesto')
                }
                rows={3}
                cols={20}
              />

              <label>Descripción:</label> */}
            </div>
            <br />
            <div className="field col-6 p-col-2 mt-4">
              {/* <span className="p-float-label ">
                <InputNumber
                  inputId="cantidadDataPresupuesto"
                  value={DataPresupuestoData.cantidadDataPresupuesto}
                  onValueChange={(e) =>
                    updateField(e.target.value, 'cantidadDataPresupuesto')
                  }
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  className={classNames({
                    'p-invalid':
                      submitted && !DataPresupuestoData.cantidadDataPresupuesto
                  })}
                />

                {submitted && !DataPresupuestoData.cantidadDataPresupuesto && (
                  <small className="p-invalid">Cantidad es requerido.</small>
                )}
                <label htmlFor="cantidadDataPresupuesto">Cantidad</label>
              </span> */}
            </div>
            <div className="field col-12 md:col-6 mt-4">
              {/* <span className="p-float-label ">
                <Dropdown
                  value={selectedUnidadDataPresupuesto}
                  options={unidadDataPresupuesto}
                  onChange={onUnidadDataPresupuesto}
                  optionLabel="unidadDataPresupuesto"
                  // placeholder="Seleccione unidad"
                  className={classNames({
                    'p-invalid':
                      submitted && !DataPresupuestoData.unidadDataPresupuesto
                  })}
                />
                {submitted && !DataPresupuestoData.unidadDataPresupuesto && (
                  <small className="p-invalid">Unidad es requerido.</small>
                )}
                <label>Unidad</label>{' '}
              </span> */}
            </div>
            <div className="field col-6 mt-4">
              {/* <span className="p-float-label ">
                <InputNumber
                  inputId="valuacionCantidadDataPresupuesto"
                  value={DataPresupuestoData.valuacionCantidadDataPresupuesto}
                  onValueChange={(e) =>
                    updateField(
                      e.target.value,
                      'valuacionCantidadDataPresupuesto'
                    )
                  }
                  minFractionDigits={2}
                  maxFractionDigits={5}
                />

                <label htmlFor="valuacionCantidadDataPresupuesto">
                  Valuación Cantidad
                </label>
              </span> */}
            </div>
            <div className="field col-6 mt-4">
              {/* <span className="p-float-label ">
                <InputNumber
                  inputId="precioUnitarioDataPresupuesto"
                  value={DataPresupuestoData.precioUnitarioDataPresupuesto}
                  onValueChange={(e) =>
                    updateField(e.target.value, 'precioUnitarioDataPresupuesto')
                  }
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  className={classNames({
                    'p-invalid':
                      submitted &&
                      !DataPresupuestoData.precioUnitarioDataPresupuesto
                  })}
                />
                {submitted &&
                  !DataPresupuestoData.precioUnitarioDataPresupuesto && (
                    <small className="p-invalid">Precio es requerido.</small>
                  )}
                <label htmlFor="precioUnitarioDataPresupuesto">
                  Precio Unitario
                </label>
              </span> */}
            </div>
            <div className="field col-6 mt-4">
              {/* <span className="p-float-label ">
                <InputNumber
                  inputId="valuacionPrecioUnitarioDataPresupuesto"
                  value={
                    DataPresupuestoData.valuacionPrecioUnitarioDataPresupuesto
                  }
                  onValueChange={(e) =>
                    updateField(
                      e.target.value,
                      'valuacionPrecioUnitarioDataPresupuesto'
                    )
                  }
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />

                <label htmlFor="valuacionPrecioUnitarioDataPresupuesto">
                  Valuacion Precio Unitario
                </label>
              </span> */}
            </div>

            <div className="field col-12 md:col-6 mt-3">
              {/* <span className="p-float-label ">
                <Dropdown
                  value={selectedDataPresupuesto}
                  options={estadoDataPresupuesto}
                  onChange={onEstatusDataPresupuesto}
                  optionLabel="estatusDataPresupuesto"
                  className={classNames({
                    'p-invalid':
                      submitted && !DataPresupuestoData.estatusDataPresupuesto
                  })}
                />
                {submitted && !DataPresupuestoData.estatusDataPresupuesto && (
                  <small className="p-invalid">Unidad es requerido.</small>
                )}
                <label>Selecione Estado</label>
              </span> */}
            </div>

            <div className="field col-12 md:col-6 mt-3">
              {/* <span className="p-float-label ">
                <Calendar
                  // className="p-datepicker-today"
                  id="time24"
                  value={dateInicio !== null && dateInicio}
                  onChange={(e) => {
                    setDateInicio(e.value)
                    updateField(e.target.value, 'fechaInicioDataPresupuesto')
                  }}
                  showTime
                  locale="es"
                  // hourFormat="12"
                  showButtonBar
                  className={classNames(
                    {
                      'p-invalid':
                        submitted &&
                        !DataPresupuestoData.fechaInicioDataPresupuesto
                    },
                    'p-datepicker-today'
                  )}
                />{' '}
                {submitted &&
                  !DataPresupuestoData.fechaInicioDataPresupuesto && (
                    <small className="p-invalid">Fecha es requerido.</small>
                  )}
                <label>Fecha Inicio </label>
              </span> */}
            </div>
            <div className="field col-12 md:col-6 mt-3">
              {/* <span className="p-float-label ">
                <Calendar
                  // className="p-datepicker-today"
                  id="time24"
                  value={dateFinal !== null && dateFinal}
                  onChange={(e) => {
                    setDateFinal(e.value)
                    updateField(e.target.value, 'fechaFinalDataPresupuesto')
                  }}
                  showTime
                  locale="es"
                  // hourFormat="12"
                  showButtonBar
                  className={classNames(
                    {
                      'p-invalid':
                        submitted &&
                        !DataPresupuestoData.fechaFinalDataPresupuesto
                    },
                    'p-datepicker-today'
                  )}
                />{' '}
                {submitted &&
                  !DataPresupuestoData.fechaFinalDataPresupuesto && (
                    <small className="p-invalid">Fecha es requerido.</small>
                  )}
                <label>Fecha Final</label>
              </span> */}
            </div>
          </div>
        </div>
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={proformaData.codigoProforma}
              onChange={(e) => updateField(e.target.value, 'codigoProforma')}
            />
            <label>codigoProforma:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={proformaData.nombreProforma}
              onChange={(e) => updateField(e.target.value, 'nombreProforma')}
            />
            <label>Nombre del Proforma:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={proformaData.descripcionProforma}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionProforma')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedProforma}
                options={estadoProforma}
                onChange={onEstatusProforma}
                optionLabel="estatusProforma"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusProformaTemplate}
                itemTemplate={estatusProformaOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default ProformaForm
