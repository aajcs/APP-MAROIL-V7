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
import { InputNumber } from 'primereact/inputnumber'
// import { InputTextarea } from 'primereact/inputtextarea'
import { Calendar } from 'primereact/calendar'
import moment from 'moment'
import { DominioContext } from '../contexts/DominioContext'
import { DivisionContext } from '../contexts/DivisionContext'
import { DependenciaContext } from '../contexts/DependenciaContext'
import { SubDependenciaContext } from '../contexts/SubDependenciaContext'
import { ProveedorContext } from '../contexts/ProveedorContext'
import { ActividadAsociadaContext } from '../contexts/ActividadAsociadaContext'
import { ClasificacionServicioContext } from '../contexts/ClasificacionServicioContext'
import CargaItemsProformaList from './CargaItemsProformaList'
const CargaProformaForm = (props) => {
  const initialProformaForm = {
    id: null,

    codigoProforma: '',
    proveedorId: null,
    numeroControlProforma: '',
    fechaControlProforma: '',
    dominioId: null,
    divisionId: null,
    dependenciaId: null,
    subDependenciaId: null,
    actividadAsociadaId: null,
    clasificacionServicioId: null,
    usoFondoProforma: null,
    ingresoProforma: 0,
    egresoProforma: 0,
    totalProforma: 0,
    descripcionProforma: '',
    estatusProforma: '',
    userCreatorId: null,
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
  const { dependencias } = useContext(DependenciaContext)
  const { subDependencias } = useContext(SubDependenciaContext)
  const { proveedors } = useContext(ProveedorContext)
  const { actividadAsociadas } = useContext(ActividadAsociadaContext)
  const { clasificacionServicios } = useContext(ClasificacionServicioContext)

  const { isVisible, setIsVisible } = props
  const [selectedProforma, setSelectedProforma] = useState(null)
  const [proformaData, setProformaData] = useState(initialProformaForm)
  const [selectedDominio, setSelectedDominio] = useState(null)
  const [selectedDivision, setSelectedDivision] = useState(null)
  const [selectedDependencia, setSelectedDependencia] = useState(null)
  const [selectedSubDependencia, setSelectedSubDependencia] = useState(null)
  const [selectedProveedor, setSelectedProveedor] = useState(null)
  const [selectedActividadAsociada, setSelectedActividadAsociada] =
    useState(null)
  const [selectedClasificacionServicio, setSelectedClasificacionServicio] =
    useState(null)
  const [selectedusoFondoProforma, setSelectedusoFondoProforma] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [dateInicio, setDateInicio] = useState()
  const estadoProforma = [
    { estatusProforma: 'OPERATIVO' },
    { estatusProforma: 'INOPERATIVO' }
  ]
  const usoFondoProforma = [
    { usoFondoProforma: 'CONTINUIDAD OPERATIVA' },
    { usoFondoProforma: 'INVERSION' }
  ]
  const onEstatusProforma = (e) => {
    setSelectedProforma(e.value)
    updateField(e.value.estatusProforma, 'estatusProforma')
  }
  const onUsoFondoProforma = (e) => {
    setSelectedusoFondoProforma(e.value)
    updateField(e.value.usoFondoProforma, 'usoFondoProforma')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editProforma) {
      setProformaData({
        ...editProforma,
        dominioId: editProforma.dominioId?.id,
        divisionId: editProforma.divisionId?.id,
        dependenciaId: editProforma.dependenciaId?.id,
        subDependenciaId: editProforma.subDependenciaId?.id,
        proveedorId: editProforma.proveedorId?.id,
        actividadAsociadaId: editProforma.actividadAsociadaId?.id,
        clasificacionServicioId: editProforma.clasificacionServicioId?.id
      })
      setSelectedProforma({
        estatusProforma: editProforma.estatusProforma
      })
      const dominioSelecEdit =
        editProforma.dominioId &&
        dominios.find((p) => p.id === editProforma.dominioId.id)
      setSelectedDominio(dominioSelecEdit)
      const divisionSelecEdit =
        editProforma.divisionId &&
        divisions.find((p) => p.id === editProforma.divisionId.id)
      setSelectedDivision(divisionSelecEdit)
      const dependenciaSelecEdit =
        editProforma.dependenciaId &&
        dependencias.find((p) => p.id === editProforma.dependenciaId.id)
      setSelectedDependencia(dependenciaSelecEdit)
      const subDependenciaSelecEdit =
        editProforma.subDependenciaId &&
        subDependencias.find((p) => p.id === editProforma.subDependenciaId.id)
      setSelectedSubDependencia(subDependenciaSelecEdit)
      const proveedorSelecEdit =
        editProforma.proveedorId &&
        proveedors.find((p) => p.id === editProforma.proveedorId.id)
      setSelectedProveedor(proveedorSelecEdit)
      const actividadAsociadaSelecEdit =
        editProforma.actividadAsociadaId &&
        actividadAsociadas.find(
          (p) => p.id === editProforma.actividadAsociadaId.id
        )
      setSelectedActividadAsociada(actividadAsociadaSelecEdit)
      const clasificacionServicioSelecEdit =
        editProforma.clasificacionServicioId &&
        clasificacionServicios.find(
          (p) => p.id === editProforma.clasificacionServicioId.id
        )
      setSelectedClasificacionServicio(clasificacionServicioSelecEdit)
      setDateInicio(
        editProforma.fechaControlProforma &&
          moment(editProforma.fechaControlProforma)._d
      )
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
  const onDependencia = (e) => {
    e.value
      ? (setSelectedDependencia(e.value),
        updateField(e.value.id, 'dependenciaId'))
      : (setSelectedDependencia(null), updateField(null, 'dependenciaId'))
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
  const onSubDependencia = (e) => {
    e.value
      ? (setSelectedSubDependencia(e.value),
        updateField(e.value.id, 'subDependenciaId'))
      : (setSelectedSubDependencia(null), updateField(null, 'subDependenciaId'))
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
  const onProveedor = (e) => {
    e.value
      ? (setSelectedProveedor(e.value), updateField(e.value.id, 'proveedorId'))
      : (setSelectedProveedor(null), updateField(null, 'proveedorId'))
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
  const onActividadAsociada = (e) => {
    e.value
      ? (setSelectedActividadAsociada(e.value),
        updateField(e.value.id, 'actividadAsociadaId'))
      : (setSelectedActividadAsociada(null),
        updateField(null, 'actividadAsociadaId'))
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
  const onClasificacionServicio = (e) => {
    e.value
      ? (setSelectedClasificacionServicio(e.value),
        updateField(e.value.id, 'clasificacionServicioId'))
      : (setSelectedClasificacionServicio(null),
        updateField(null, 'clasificacionServicioId'))
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
    console.log(proformaData)
  }

  const saveProforma = () => {
    setSubmitted(true)
    if (!editProforma) {
      console.log(proformaData)
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
    clearSelected()
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

    setSelectedProforma(null)

    setSelectedDominio(null)
    setSelectedDivision(null)
    setSelectedDependencia(null)
    setSelectedSubDependencia(null)
    setSelectedProveedor(null)
    setSelectedActividadAsociada(null)
    setSelectedClasificacionServicio(null)

    setDateInicio(null)
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
            <div className="field col-12 md:col-3  mt-3">
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
            <div className="field col-12 md:col-3  mt-3">
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
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedDependencia}
                  options={dependencias}
                  onChange={onDependencia}
                  optionLabel="nombreDependencia"
                  showClear
                  filter
                  filterBy="nombreDependencia"
                  className={classNames({
                    'p-invalid': submitted && !selectedDependencia
                  })}
                />
                {submitted && !selectedDependencia && (
                  <small className="p-invalid">Dependencia es requerido.</small>
                )}
                <label htmlFor="dropdown">Seleccione Dependencia*</label>
              </span>
            </div>
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedSubDependencia}
                  options={subDependencias}
                  onChange={onSubDependencia}
                  optionLabel="nombreSubDependencia"
                  showClear
                  filter
                  filterBy="nombreSubDependencia"
                  className={classNames({
                    'p-invalid': submitted && !selectedSubDependencia
                  })}
                />
                {submitted && !selectedSubDependencia && (
                  <small className="p-invalid">
                    SubDependencia es requerido.
                  </small>
                )}
                <label htmlFor="dropdown">Seleccione SubDependencia*</label>
              </span>
            </div>
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedProveedor}
                  options={proveedors}
                  onChange={onProveedor}
                  optionLabel="nombreProveedor"
                  showClear
                  filter
                  filterBy="nombreProveedor"
                  className={classNames({
                    'p-invalid': submitted && !selectedProveedor
                  })}
                />
                {submitted && !selectedProveedor && (
                  <small className="p-invalid">Proveedor es requerido.</small>
                )}
                <label htmlFor="dropdown">Seleccione Proveedor*</label>
              </span>
            </div>
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedActividadAsociada}
                  options={actividadAsociadas}
                  onChange={onActividadAsociada}
                  optionLabel="nombreActividadAsociada"
                  showClear
                  filter
                  filterBy="nombreActividadAsociada"
                  className={classNames({
                    'p-invalid': submitted && !selectedActividadAsociada
                  })}
                />
                {submitted && !selectedActividadAsociada && (
                  <small className="p-invalid">
                    ActividadAsociada es requerido.
                  </small>
                )}
                <label htmlFor="dropdown">Seleccione ActividadAsociada*</label>
              </span>
            </div>
            <div className="field col-12 md:col-3  mt-3">
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
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedusoFondoProforma}
                  options={usoFondoProforma}
                  onChange={onUsoFondoProforma}
                  optionLabel="usoFondoProforma"
                  showClear
                  filter
                  filterBy="usoFondoProforma"
                  className={classNames({
                    'p-invalid': submitted && !selectedusoFondoProforma
                  })}
                />
                {submitted && !selectedusoFondoProforma && (
                  <small className="p-invalid">
                    Uso de fondo es requerido.
                  </small>
                )}
                <label htmlFor="dropdown">Seleccione Uso de fondo*</label>
              </span>
            </div>
            <div className="field col-3 p-col-2 mt-3">
              <span className="p-float-label ">
                <InputText
                  value={proformaData.numeroControlProforma}
                  onChange={(e) =>
                    updateField(e.target.value, 'numeroControlProforma')
                  }
                  className={classNames({
                    'p-invalid':
                      submitted && !proformaData.numeroControlProforma
                  })}
                />

                {submitted && !proformaData.numeroControlProforma && (
                  <small className="p-invalid">
                    Numero Control es requerido.
                  </small>
                )}
                <label htmlFor="numeroControlProforma">Numero Control</label>
              </span>
            </div>
            <div className="field col-12 md:col-3 mt-3">
              <span className="p-float-label ">
                <Calendar
                  // className="p-datepicker-today"
                  id="time24"
                  value={dateInicio !== null && dateInicio}
                  onChange={(e) => {
                    setDateInicio(e.value)
                    updateField(e.target.value, 'fechaControlProforma')
                  }}
                  showTime
                  locale="es"
                  // hourFormat="12"
                  showButtonBar
                  className={classNames(
                    {
                      'p-invalid':
                        submitted && !proformaData.fechaControlProforma
                    },
                    'p-datepicker-today'
                  )}
                />{' '}
                {submitted && !proformaData.fechaControlProforma && (
                  <small className="p-invalid">Fecha es requerido.</small>
                )}
                <label>Fecha Control </label>
              </span>
            </div>{' '}
            <div className="field col-3 p-col-2 mt-3">
              <span className="p-float-label ">
                <InputText
                  value={proformaData.codigoProforma}
                  onChange={(e) =>
                    updateField(e.target.value, 'codigoProforma')
                  }
                  className={classNames({
                    'p-invalid': submitted && !proformaData.codigoProforma
                  })}
                />

                {submitted && !proformaData.codigoProforma && (
                  <small className="p-invalid">
                    Codigo Proforma es requerido.
                  </small>
                )}
                <label htmlFor="codigoProforma">Codigo Proforma Control</label>
              </span>
            </div>
            <div className="field col-12 p-col-2 mt-3">
              <CargaItemsProformaList />
            </div>
            <div className="field col-3 p-col-2 mt-3">
              <span className="p-float-label ">
                <InputNumber
                  inputId="cantidadDataPresupuesto"
                  value={proformaData.totalProforma}
                  onValueChange={(e) =>
                    updateField(e.target.value, 'totalProforma')
                  }
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  className={classNames({
                    'p-invalid': submitted && !proformaData.totalProforma
                  })}
                />

                {submitted && !proformaData.totalProforma && (
                  <small className="p-invalid">
                    Total Proforma es requerido.
                  </small>
                )}
                <label htmlFor="totalProforma">Total Proforma</label>
              </span>
            </div>
          </div>
        </div>

        <div className="p-grid p-fluid">
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

export default CargaProformaForm
