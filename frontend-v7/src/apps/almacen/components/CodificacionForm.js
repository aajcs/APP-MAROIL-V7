/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { CodificacionContext } from '../contexts/CodificacionContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { InputTextarea } from 'primereact/inputtextarea'
import moment from 'moment'
import { classNames } from 'primereact/utils'
import { EmbarcacionContext } from '../../controlLiquidos/contexts/EmbarcacionContext'
import { CascadeSelect } from 'primereact/cascadeselect'

const CodificacionForm = (props) => {
  const initialCodificacionForm = {
    id: null,
    nombreCodificacion: '',
    descripcionCodificacion: '',
    totalCodificacion: 0,
    avanceCodificacion: 0,
    fechaInicioCodificacion: '',
    fechaFinalCodificacion: '',
    estatusCodificacion: '',
    embarcacionId: null,
    creadoCodificacion: moment(),
    modificadoCodificacion: moment()
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

  const { createCodificacion, editCodificacion, updateCodificacion } =
    useContext(CodificacionContext)
  const { embarcacions } = useContext(EmbarcacionContext)
  console.log(embarcacions)
  const { isVisible, setIsVisible } = props
  const [selectedCodificacion, setSelectedCodificacion] = useState(null)
  const [selectedEmbarcacion, setSelectedEmbarcacion] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [actividadData, setCodificacionData] = useState(initialCodificacionForm)
  const [selectedProceso, setSelectedProceso] = useState(null)
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
  const estadoCodificacion = [
    { estatusCodificacion: 'OPERATIVO' },
    { estatusCodificacion: 'CULMINADO' }
  ]
  const onEstatusCodificacion = (e) => {
    setSelectedCodificacion(e.value)
    updateField(e.value.estatusCodificacion, 'estatusCodificacion')
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
    if (editCodificacion) {
      setCodificacionData(editCodificacion)
      setSelectedCodificacion({
        estatusCodificacion: editCodificacion.estatusCodificacion
      })
    }
  }, [editCodificacion])

  const updateField = (data, field) => {
    setCodificacionData({
      ...actividadData,
      [field]: data
    })
  }

  const saveCodificacion = () => {
    setSubmitted(true)
    if (
      actividadData.nombreCodificacion.trim() &&
      actividadData.estatusCodificacion.trim()
    ) {
      if (!editCodificacion) {
        createCodificacion(actividadData)
      } else {
        updateCodificacion({
          ...actividadData,
          CodificacionModificado: moment()
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
      <Button label="Guardar" icon="pi pi-check" onClick={saveCodificacion} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setCodificacionData(initialCodificacionForm)
    setSelectedCodificacion('')
    setSubmitted(false)
  }
  const selectedestatusCodificacionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusCodificacion}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusCodificacionOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusCodificacion}</div>
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
        header="Detalles de la Codificacion"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid">
            <div className="field col-12 lg:col-6 xl:col-4">
              <span className="p-float-label">
                <InputText
                  value={actividadData.codigoCodificacion}
                  onChange={(e) =>
                    updateField(e.target.value, 'codigoCodificacion')
                  }
                  className={classNames({
                    'p-invalid': submitted && !actividadData.codigoCodificacion
                  })}
                />
                {submitted && !actividadData.codigoCodificacion && (
                  <small className="p-invalid">Codigo es requerido.</small>
                )}
                <label>Codigo de la Codificacion:*</label>
              </span>
            </div>
            <div className="field  mb-4 col-12 lg:col-6 xl:col-4 ">
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
                  <small className="p-invalid">Proyecto es requerido.</small>
                )}
                <label htmlFor="dropdown">Seleccione Proyecto*</label>
              </span>
            </div>
            <div className="field  mb-4 col-12 lg:col-6 xl:col-4">
              <span className="p-float-label">
                <CascadeSelect
                  value={selectedProceso}
                  onChange={(e) => setSelectedProceso(e.value)}
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
            <div className="p-float-label col-12 lg:col-6 xl:col-4">
              <Dropdown
                value={selectedCodificacion}
                options={estadoCodificacion}
                onChange={onEstatusCodificacion}
                optionLabel="estatusCodificacion"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusCodificacionTemplate}
                itemTemplate={estatusCodificacionOptionTemplate}
                className={classNames({
                  'p-invalid': submitted && !actividadData.estatusCodificacion
                })}
              />
              {submitted && !actividadData.estatusCodificacion && (
                <small className="p-invalid">Estatus es requerido.</small>
              )}
            </div>{' '}
            <div className="p-float-label col-12 lg:col-12 xl:col-12">
              <InputTextarea
                id="description"
                value={actividadData.descripcionCodificacion}
                onChange={(e) =>
                  updateField(e.target.value, 'descripcionCodificacion')
                }
                rows={3}
                cols={20}
              />

              <label>Descripcion:</label>
            </div>
            <div className="p-float-label">
              <InputText
                value={actividadData.nombreCodificacion}
                onChange={(e) =>
                  updateField(e.target.value, 'nombreCodificacion')
                }
                className={classNames({
                  'p-invalid': submitted && !actividadData.nombreCodificacion
                })}
              />
              {submitted && !actividadData.nombreCodificacion && (
                <small className="p-invalid">Nombre es requerido.</small>
              )}
              <label>Nombre del Codificacion:*</label>
            </div>
            <br />
            <br />
            <div className="p-float-label ">
              <Dropdown
                value={selectedCodificacion}
                options={estadoCodificacion}
                onChange={onEstatusCodificacion}
                optionLabel="estatusCodificacion"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusCodificacionTemplate}
                itemTemplate={estatusCodificacionOptionTemplate}
                className={classNames({
                  'p-invalid': submitted && !actividadData.estatusCodificacion
                })}
              />
              {submitted && !actividadData.estatusCodificacion && (
                <small className="p-invalid">Estatus es requerido.</small>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default CodificacionForm
