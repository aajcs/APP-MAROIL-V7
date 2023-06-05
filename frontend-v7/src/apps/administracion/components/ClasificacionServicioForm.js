/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { ClasificacionServicioContext } from '../contexts/ClasificacionServicioContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { classNames } from 'primereact/utils'

import moment from 'moment'
import { ActividadAsociadaContext } from '../contexts/ActividadAsociadaContext'

const ClasificacionServicioForm = (props) => {
  const initialClasificacionServicioForm = {
    id: null,

    codigoClasificacionServicio: '',
    nombreClasificacionServicio: '',
    descripcionClasificacionServicio: '',
    estatusClasificacionServicio: '',
    conceptoAuxCreado: moment(),
    conceptoAuxModificado: moment()
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
  const {
    createClasificacionServicio,
    editClasificacionServicio,
    updateClasificacionServicio
  } = useContext(ClasificacionServicioContext)
  const { actividadAsociadas } = useContext(ActividadAsociadaContext)

  const { isVisible, setIsVisible } = props
  const [selectedClasificacionServicio, setSelectedClasificacionServicio] =
    useState(null)
  const [clasificacionServicioData, setClasificacionServicioData] = useState(
    initialClasificacionServicioForm
  )
  const [selectedActividadAsociada, setSelectedActividadAsociada] =
    useState(null)
  const [submitted, setSubmitted] = useState(false)

  const estadoClasificacionServicio = [
    { estatusClasificacionServicio: 'OPERATIVO' },
    { estatusClasificacionServicio: 'INOPERATIVO' }
  ]
  const onEstatusClasificacionServicio = (e) => {
    setSelectedClasificacionServicio(e.value)
    updateField(
      e.value.estatusClasificacionServicio,
      'estatusClasificacionServicio'
    )
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editClasificacionServicio) {
      setClasificacionServicioData({
        ...editClasificacionServicio,
        actividadAsociadaId: editClasificacionServicio.actividadAsociadaId?.id
      })
      setSelectedClasificacionServicio({
        estatusClasificacionServicio:
          editClasificacionServicio.estatusClasificacionServicio
      })
      const actividadAsociadaSelecEdit =
        editClasificacionServicio.actividadAsociadaId &&
        actividadAsociadas.find(
          (p) => p.id === editClasificacionServicio.actividadAsociadaId.id
        )
      setSelectedActividadAsociada(actividadAsociadaSelecEdit)
    }
  }, [editClasificacionServicio])
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
  const updateField = (data, field) => {
    setClasificacionServicioData({
      ...clasificacionServicioData,
      [field]: data
    })
  }

  const saveClasificacionServicio = () => {
    setSubmitted(true)
    if (!editClasificacionServicio) {
      createClasificacionServicio(clasificacionServicioData)
    } else {
      updateClasificacionServicio({
        ...clasificacionServicioData,
        ClasificacionServicioModificado: moment()
      })
    }
    clearSelected()
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        onClick={saveClasificacionServicio}
      />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setClasificacionServicioData(initialClasificacionServicioForm)
    setSelectedClasificacionServicio('')
    setSelectedActividadAsociada(null)
  }
  const selectedestatusClasificacionServicioTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusClasificacionServicio}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusClasificacionServicioOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusClasificacionServicio}</div>
      </div>
    )
  }

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '30vw' }}
        header="Detalles de la ClasificacionServicio"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="field col-12 md:col-12  mt-3">
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
          <br />
          <div className="p-float-label">
            <InputText
              value={clasificacionServicioData.codigoClasificacionServicio}
              onChange={(e) =>
                updateField(e.target.value, 'codigoClasificacionServicio')
              }
            />
            <label>codigoClasificacionServicio:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={clasificacionServicioData.nombreClasificacionServicio}
              onChange={(e) =>
                updateField(e.target.value, 'nombreClasificacionServicio')
              }
            />
            <label>Nombre del ClasificacionServicio:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={clasificacionServicioData.descripcionClasificacionServicio}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionClasificacionServicio')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedClasificacionServicio}
                options={estadoClasificacionServicio}
                onChange={onEstatusClasificacionServicio}
                optionLabel="estatusClasificacionServicio"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusClasificacionServicioTemplate}
                itemTemplate={estatusClasificacionServicioOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default ClasificacionServicioForm
