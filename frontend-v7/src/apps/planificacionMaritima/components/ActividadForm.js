/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { ActividadContext } from '../contexts/ActividadContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
// import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { InputTextarea } from 'primereact/inputtextarea'
import moment from 'moment'
import { classNames } from 'primereact/utils'
import { EmbarcacionContext } from '../../controlLiquidos/contexts/EmbarcacionContext'
import { Calendar } from 'primereact/calendar'
import { CascadeSelect } from 'primereact/cascadeselect'

const ActividadForm = (props) => {
  const initialActividadForm = {
    id: null,
    codigoActividad: '',
    embarcacionId: null,
    procesoActividad: '',
    nivelPrioridadActividad: '',
    descripcionActividad: '',
    estatusActividad: '',
    imagenDefectoActividad: null,
    imagenAvanceActividad: null,
    fechaInicioActividad: '',

    creadoActividad: moment(),
    modificadoActividad: moment(),

    responsableUsuarioId: null,
    presupuestoActididadId: null,
    proveedorId: null,

    fechaFinActividad: ''
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

  const { createActividad, editActividad, updateActividad } =
    useContext(ActividadContext)
  const { embarcacions } = useContext(EmbarcacionContext)

  const { isVisible, setIsVisible } = props
  const [selectedActividad, setSelectedActividad] = useState(null)
  const [selectedResponsableActividad, setSelectedResponsableActividad] =
    useState(null)
  const [selectedNivelPrioridad, setSelectedNivelPrioridad] = useState(null)

  const [selectedEmbarcacion, setSelectedEmbarcacion] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [actividadData, setActividadData] = useState(initialActividadForm)
  const [selectedProceso, setSelectedProceso] = useState(null)
  const [dateInicio, setDateInicio] = useState(null)
  const [dateFinal, setDateFinal] = useState(null)

  const procesosCascade = [
    {
      name: 'Requisicion',
      code: 'AU',
      subName: [
        {
          nameViw: 'Nacional'
        },
        {
          nameViw: 'Internacional'
        }
      ]
    },
    {
      name: 'Mantenimiento',
      code: 'CA',
      subName: [
        {
          nameViw: 'Predictivo'
        },
        {
          nameViw: 'Preventivo'
        },
        {
          nameViw: 'Corretivo'
        }
      ]
    },
    {
      name: 'certificacion',
      code: 'US',
      subName: [
        {
          nameViw: 'Expedicion'
        },
        {
          nameViw: 'Renovacion'
        }
      ]
    }
  ]
  const estadoActividad = [
    { estatusActividad: 'OPERATIVO' },
    { estatusActividad: 'EN PROCESO' },
    { estatusActividad: 'NEGADA' }
  ]
  const responsableActividad = [
    { responsableUsuarioId: 'OPERATIVO' },
    { responsableUsuarioId: 'EN PROCESO' },
    { responsableUsuarioId: 'NEGADA' }
  ]
  const optionsNivelPrioridad = [
    { nivelPrioridadActividad: 'MAXIMA' },
    { nivelPrioridadActividad: 'ALTA' },
    { nivelPrioridadActividad: 'MEDIA' },
    { nivelPrioridadActividad: 'BAJA' }
  ]
  const onEstatusActividad = (e) => {
    setSelectedActividad(e.value)
    updateField(e.value.estatusActividad, 'estatusActividad')
  }
  const onResponsableActividad = (e) => {
    setSelectedResponsableActividad(e.value)
    updateField(e.value.responsableUsuarioId, 'responsableUsuarioId')
  }
  const onProcesoActividad = (e) => {
    console.log(e.value)
    setSelectedProceso(e.value)
    updateField(e.value.nameViw, 'procesoActividad')
  }
  const onNivelPrioridad = (e) => {
    setSelectedNivelPrioridad(e.value)
    updateField(e.value.nivelPrioridadActividad, 'nivelPrioridadActividad')
  }
  const onEmbarcacion = (e) => {
    if (e.value) {
      setSelectedEmbarcacion(e.value)
      updateField(e.value.id, 'embarcacionId')
    } else {
      setSelectedEmbarcacion(null)
      updateField(null, 'embarcacionId')
    }
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editActividad) {
      setActividadData(editActividad)
      setSelectedActividad({
        estatusActividad: editActividad.estatusActividad
      })
    }
  }, [editActividad])

  const updateField = (data, field) => {
    console.log(data)
    setActividadData({
      ...actividadData,
      [field]: data
    })
  }

  const saveActividad = () => {
    setSubmitted(true)
    if (actividadData.estatusActividad.trim()) {
      if (!editActividad) {
        const {
          embarcacionId,
          responsableUsuarioId,
          presupuestoActididadId,
          proveedorId,
          ...actividadDataRest
        } = actividadData
        createActividad(actividadDataRest)
      } else {
        updateActividad({
          ...actividadData,
          ActividadModificado: moment()
        })
      }
      clearSelected()
    }
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveActividad} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setActividadData(initialActividadForm)
    setSelectedActividad('')
    setSubmitted(false)
    setSelectedNivelPrioridad(null)
    setSelectedEmbarcacion(null)
    setSelectedProceso(null)
    setDateInicio(null)
    setDateFinal(null)
    setSelectedResponsableActividad(null)
  }

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '80vw' }}
        header="Detalles de la Actividad"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid ">
            <div className="field  col-12 lg:col-6 xl:col-4 mt-3 ">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedEmbarcacion}
                  options={embarcacions}
                  onChange={onEmbarcacion}
                  optionLabel="nombreEmbarcacion"
                  // placeholder="Seleccione Proyecto*"
                  // valueTemplate={selectedconceptoIngresoGastoTemplate}
                  // itemTemplate={conceptoIngresoGastoOptionTemplate}
                  showClear
                  filter
                  filterBy="nombrePresupuesto"
                  className={classNames({
                    'p-invalid': submitted && !actividadData.proyectoId
                  })}
                />
                {submitted && !actividadData.proyectoId && (
                  <small className="p-invalid">Embarcacion es requerido.</small>
                )}
                <label htmlFor="dropdown">Seleccione Embarcacion*</label>
              </span>
            </div>
            <div className="field  col-12 lg:col-6 xl:col-4 mt-3">
              <span className="p-float-label">
                <CascadeSelect
                  value={selectedProceso}
                  onChange={onProcesoActividad}
                  options={procesosCascade}
                  optionLabel="nameViw"
                  optionGroupLabel="name"
                  optionGroupChildren={['subName']}
                  // className="w-full md:w-14rem"
                  breakpoint="767px"
                  className={classNames({
                    'p-invalid': submitted && !actividadData.proyectoId
                  })}
                />
                {submitted && !actividadData.proyectoId && (
                  <small className="p-invalid">Proceso es requerido.</small>
                )}
                <label htmlFor="dropdown">Seleccione Proceso*</label>
              </span>
            </div>
            <div className="field col-12 lg:col-6 xl:col-4 mt-3">
              <span className="p-float-label">
                <Dropdown
                  value={selectedNivelPrioridad}
                  options={optionsNivelPrioridad}
                  onChange={onNivelPrioridad}
                  optionLabel="nivelPrioridadActividad"
                  className={classNames({
                    'p-invalid':
                      submitted && !actividadData.nivelPrioridadActividad
                  })}
                />
                {submitted && !actividadData.nivelPrioridadActividad && (
                  <small className="p-invalid">
                    Nivel de prioridad es requerido.
                  </small>
                )}
                <label>Nivel de prioridad:</label>{' '}
              </span>
            </div>
            <div className="field col-12 lg:col-12 xl:col-12 mt-3 ">
              <span className="p-float-label">
                <InputTextarea
                  id="description"
                  value={actividadData.descripcionActividad}
                  onChange={(e) =>
                    updateField(e.target.value, 'descripcionActividad')
                  }
                  rows={3}
                  cols={20}
                />
                <label>Descripcion:</label>{' '}
              </span>
            </div>
            <div className="field col-6 lg:col-6 xl:col-4 mt-3">
              <span className="p-float-label">
                <Dropdown
                  value={selectedActividad}
                  options={estadoActividad}
                  onChange={onEstatusActividad}
                  optionLabel="estatusActividad"
                  className={classNames({
                    'p-invalid': submitted && !actividadData.estatusActividad
                  })}
                />
                {submitted && !actividadData.estatusActividad && (
                  <small className="p-invalid">Estatus es requerido.</small>
                )}
                <label>Estatus:</label>{' '}
              </span>
            </div>
            <div className="card col-6 lg:col-6 xl:col-4">
              Cargar imagen del defecto
              <input
                type="file"
                onChange={(e) =>
                  updateField(e.target.files[0], 'imagenDefectoActividad')
                }
              />
            </div>{' '}
            <div className="card col-6 lg:col-6 xl:col-4">
              Cargar imagen del avance
              <input
                type="file"
                onChange={(e) =>
                  updateField(e.target.files[0], 'imagenAvanceActividad')
                }
              />
            </div>
            {/* <div className="p-float-label">
              <InputText
                value={actividadData.nombreActividad}
                onChange={(e) => updateField(e.target.value, 'nombreActividad')}
                className={classNames({
                  'p-invalid': submitted && !actividadData.nombreActividad
                })}
              />
              {submitted && !actividadData.nombreActividad && (
                <small className="p-invalid">Nombre es requerido.</small>
              )}
              <label>Nombre del Actividad:*</label>
            </div> */}
            <div className="field col-6 lg:col-6 xl:col-4 mt-3">
              <span className="p-float-label">
                <Dropdown
                  value={selectedResponsableActividad}
                  options={responsableActividad}
                  onChange={onResponsableActividad}
                  optionLabel="responsableUsuarioId"
                  className={classNames({
                    'p-invalid':
                      submitted && !actividadData.ResponsableActividad
                  })}
                />
                {submitted && !actividadData.estatusActividad && (
                  <small className="p-invalid">Estatus es requerido.</small>
                )}
                <label>Responsable:</label>{' '}
              </span>
            </div>
            <div className="field col-12 md:col-6 xl:col-4 mt-3">
              <span className="p-float-label ">
                <Calendar
                  // className="p-datepicker-today"
                  id="time24"
                  value={dateInicio !== null && dateInicio}
                  onChange={(e) => {
                    setDateInicio(e.value)
                    updateField(e.target.value, 'fechaInicioActividad')
                  }}
                  showTime
                  locale="es"
                  // hourFormat="12"
                  showButtonBar
                  className={classNames(
                    {
                      'p-invalid':
                        submitted && !actividadData.fechaInicioActividad
                    },
                    'p-datepicker-today'
                  )}
                />{' '}
                {submitted && !actividadData.fechaInicioActividad && (
                  <small className="p-invalid">Fecha es requerido.</small>
                )}
                <label>Fecha Inicio </label>
              </span>
            </div>
            <div className="field col-12 md:col-6 xl:col-4 mt-3">
              <span className="p-float-label ">
                <Calendar
                  // className="p-datepicker-today"
                  id="time24"
                  value={dateFinal !== null && dateFinal}
                  onChange={(e) => {
                    setDateFinal(e.value)
                    updateField(e.target.value, 'fechaFinActividad')
                  }}
                  showTime
                  locale="es"
                  // hourFormat="12"
                  showButtonBar
                  className={classNames(
                    {
                      'p-invalid': submitted && !actividadData.fechaFinActividad
                    },
                    'p-datepicker-today'
                  )}
                />{' '}
                {submitted && !actividadData.fechaFinActividad && (
                  <small className="p-invalid">Fecha es requerido.</small>
                )}
                <label>Fecha Final</label>
              </span>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default ActividadForm
