/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { Clasificacion3erNivelContext } from '../contexts/Clasificacion3erNivelContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { classNames } from 'primereact/utils'

import moment from 'moment'
import { ClasificacionServicioContext } from '../contexts/ClasificacionServicioContext'

const Clasificacion3erNivelForm = (props) => {
  const initialClasificacion3erNivelForm = {
    id: null,

    codigoClasificacion3erNivel: '',
    nombreClasificacion3erNivel: '',
    descripcionClasificacion3erNivel: '',
    estatusClasificacion3erNivel: '',
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
    createClasificacion3erNivel,
    editClasificacion3erNivel,
    updateClasificacion3erNivel
  } = useContext(Clasificacion3erNivelContext)
  const { clasificacionServicios } = useContext(ClasificacionServicioContext)

  const { isVisible, setIsVisible } = props
  const [selectedClasificacion3erNivel, setSelectedClasificacion3erNivel] =
    useState(null)
  const [clasificacion3erNivelData, setClasificacion3erNivelData] = useState(
    initialClasificacion3erNivelForm
  )
  const [selectedClasificacionServicio, setSelectedClasificacionServicio] =
    useState(null)
  const [submitted, setSubmitted] = useState(false)

  const estadoClasificacion3erNivel = [
    { estatusClasificacion3erNivel: 'OPERATIVO' },
    { estatusClasificacion3erNivel: 'INOPERATIVO' }
  ]
  const onEstatusClasificacion3erNivel = (e) => {
    setSelectedClasificacion3erNivel(e.value)
    updateField(
      e.value.estatusClasificacion3erNivel,
      'estatusClasificacion3erNivel'
    )
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editClasificacion3erNivel) {
      setClasificacion3erNivelData({
        ...editClasificacion3erNivel,
        clasificacionServicioId:
          editClasificacion3erNivel.clasificacionServicioId?.id
      })
      setSelectedClasificacion3erNivel({
        estatusClasificacion3erNivel:
          editClasificacion3erNivel.estatusClasificacion3erNivel
      })
      const clasificacionServicioSelecEdit =
        editClasificacion3erNivel.clasificacionServicioId &&
        clasificacionServicios.find(
          (p) => p.id === editClasificacion3erNivel.clasificacionServicioId.id
        )
      setSelectedClasificacionServicio(clasificacionServicioSelecEdit)
    }
  }, [editClasificacion3erNivel])
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
    setClasificacion3erNivelData({
      ...clasificacion3erNivelData,
      [field]: data
    })
  }

  const saveClasificacion3erNivel = () => {
    setSubmitted(true)
    if (!editClasificacion3erNivel) {
      createClasificacion3erNivel(clasificacion3erNivelData)
    } else {
      updateClasificacion3erNivel({
        ...clasificacion3erNivelData,
        Clasificacion3erNivelModificado: moment()
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
        onClick={saveClasificacion3erNivel}
      />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setClasificacion3erNivelData(initialClasificacion3erNivelForm)
    setSelectedClasificacion3erNivel('')
    setSelectedClasificacionServicio(null)
  }
  const selectedestatusClasificacion3erNivelTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusClasificacion3erNivel}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusClasificacion3erNivelOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusClasificacion3erNivel}</div>
      </div>
    )
  }
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

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '30vw' }}
        header="Detalles de la Clasificacion3erNivel"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="field col-12 md:col-12  mt-3">
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
              <label htmlFor="dropdown">
                Seleccione ClasificacionServicio*
              </label>
            </span>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={clasificacion3erNivelData.codigoClasificacion3erNivel}
              onChange={(e) =>
                updateField(e.target.value, 'codigoClasificacion3erNivel')
              }
            />
            <label>codigoClasificacion3erNivel:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={clasificacion3erNivelData.nombreClasificacion3erNivel}
              onChange={(e) =>
                updateField(e.target.value, 'nombreClasificacion3erNivel')
              }
            />
            <label>Nombre del Clasificacion3erNivel:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={clasificacion3erNivelData.descripcionClasificacion3erNivel}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionClasificacion3erNivel')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedClasificacion3erNivel}
                options={estadoClasificacion3erNivel}
                onChange={onEstatusClasificacion3erNivel}
                optionLabel="estatusClasificacion3erNivel"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusClasificacion3erNivelTemplate}
                itemTemplate={estatusClasificacion3erNivelOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default Clasificacion3erNivelForm
