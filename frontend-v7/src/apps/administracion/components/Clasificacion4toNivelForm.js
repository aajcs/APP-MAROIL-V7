/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { Clasificacion4toNivelContext } from '../contexts/Clasificacion4toNivelContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { classNames } from 'primereact/utils'

import moment from 'moment'
import { Clasificacion3erNivelContext } from '../contexts/Clasificacion3erNivelContext'

const Clasificacion4toNivelForm = (props) => {
  const initialClasificacion4toNivelForm = {
    id: null,

    codigoClasificacion4toNivel: '',
    nombreClasificacion4toNivel: '',
    descripcionClasificacion4toNivel: '',
    estatusClasificacion4toNivel: '',
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
    createClasificacion4toNivel,
    editClasificacion4toNivel,
    updateClasificacion4toNivel
  } = useContext(Clasificacion4toNivelContext)
  const { clasificacion3erNivels } = useContext(Clasificacion3erNivelContext)

  const { isVisible, setIsVisible } = props
  const [selectedClasificacion4toNivel, setSelectedClasificacion4toNivel] =
    useState(null)
  const [clasificacion4toNivelData, setClasificacion4toNivelData] = useState(
    initialClasificacion4toNivelForm
  )
  const [selectedClasificacion3erNivel, setSelectedClasificacion3erNivel] =
    useState(null)
  const [submitted, setSubmitted] = useState(false)

  const estadoClasificacion4toNivel = [
    { estatusClasificacion4toNivel: 'OPERATIVO' },
    { estatusClasificacion4toNivel: 'INOPERATIVO' }
  ]
  const onEstatusClasificacion4toNivel = (e) => {
    setSelectedClasificacion4toNivel(e.value)
    updateField(
      e.value.estatusClasificacion4toNivel,
      'estatusClasificacion4toNivel'
    )
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editClasificacion4toNivel) {
      setClasificacion4toNivelData({
        ...editClasificacion4toNivel,
        clasificacion3erNivelId:
          editClasificacion4toNivel.clasificacion3erNivelId?.id
      })
      setSelectedClasificacion4toNivel({
        estatusClasificacion4toNivel:
          editClasificacion4toNivel.estatusClasificacion4toNivel
      })
      const clasificacion3erNivelSelecEdit =
        editClasificacion4toNivel.clasificacion3erNivelId &&
        clasificacion3erNivels.find(
          (p) => p.id === editClasificacion4toNivel.clasificacion3erNivelId.id
        )
      setSelectedClasificacion3erNivel(clasificacion3erNivelSelecEdit)
    }
  }, [editClasificacion4toNivel])
  const onClasificacion3erNivel = (e) => {
    e.value
      ? (setSelectedClasificacion3erNivel(e.value),
        updateField(e.value.id, 'clasificacion3erNivelId'))
      : (setSelectedClasificacion3erNivel(null),
        updateField(null, 'clasificacion3erNivelId'))
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
    setClasificacion4toNivelData({
      ...clasificacion4toNivelData,
      [field]: data
    })
  }

  const saveClasificacion4toNivel = () => {
    setSubmitted(true)
    if (!editClasificacion4toNivel) {
      createClasificacion4toNivel(clasificacion4toNivelData)
    } else {
      updateClasificacion4toNivel({
        ...clasificacion4toNivelData,
        Clasificacion4toNivelModificado: moment()
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
        onClick={saveClasificacion4toNivel}
      />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setClasificacion4toNivelData(initialClasificacion4toNivelForm)
    setSelectedClasificacion4toNivel('')
    setSelectedClasificacion3erNivel(null)
  }
  const selectedestatusClasificacion4toNivelTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusClasificacion4toNivel}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusClasificacion4toNivelOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusClasificacion4toNivel}</div>
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

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '30vw' }}
        header="Detalles de la Clasificacion4toNivel"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
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
          <br />
          <div className="p-float-label">
            <InputText
              value={clasificacion4toNivelData.codigoClasificacion4toNivel}
              onChange={(e) =>
                updateField(e.target.value, 'codigoClasificacion4toNivel')
              }
            />
            <label>codigoClasificacion4toNivel:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={clasificacion4toNivelData.nombreClasificacion4toNivel}
              onChange={(e) =>
                updateField(e.target.value, 'nombreClasificacion4toNivel')
              }
            />
            <label>Nombre del Clasificacion4toNivel:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={clasificacion4toNivelData.descripcionClasificacion4toNivel}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionClasificacion4toNivel')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedClasificacion4toNivel}
                options={estadoClasificacion4toNivel}
                onChange={onEstatusClasificacion4toNivel}
                optionLabel="estatusClasificacion4toNivel"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusClasificacion4toNivelTemplate}
                itemTemplate={estatusClasificacion4toNivelOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default Clasificacion4toNivelForm
