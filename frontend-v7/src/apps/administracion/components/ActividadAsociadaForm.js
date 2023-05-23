/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { ActividadAsociadaContext } from '../contexts/ActividadAsociadaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import moment from 'moment'

const ActividadAsociadaForm = (props) => {
  const initialActividadAsociadaForm = {
    id: null,

    codigoActividadAsociada: '',
    nombreActividadAsociada: '',
    descripcionActividadAsociada: '',
    estatusActividadAsociada: '',
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
    createActividadAsociada,
    editActividadAsociada,
    updateActividadAsociada
  } = useContext(ActividadAsociadaContext)

  const { isVisible, setIsVisible } = props
  const [selectedActividadAsociada, setSelectedActividadAsociada] =
    useState(null)
  const [actividadAsociadaData, setActividadAsociadaData] = useState(
    initialActividadAsociadaForm
  )
  const estadoActividadAsociada = [
    { estatusActividadAsociada: 'OPERATIVO' },
    { estatusActividadAsociada: 'INOPERATIVO' }
  ]
  const onEstatusActividadAsociada = (e) => {
    setSelectedActividadAsociada(e.value)
    updateField(e.value.estatusActividadAsociada, 'estatusActividadAsociada')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editActividadAsociada) {
      setActividadAsociadaData(editActividadAsociada)
      setSelectedActividadAsociada({
        estatusActividadAsociada: editActividadAsociada.estatusActividadAsociada
      })
    }
  }, [editActividadAsociada])

  const updateField = (data, field) => {
    setActividadAsociadaData({
      ...actividadAsociadaData,
      [field]: data
    })
  }

  const saveActividadAsociada = () => {
    if (!editActividadAsociada) {
      createActividadAsociada(actividadAsociadaData)
    } else {
      updateActividadAsociada({
        ...actividadAsociadaData,
        ActividadAsociadaModificado: moment()
      })
    }
    setActividadAsociadaData(initialActividadAsociadaForm)
    setIsVisible(false)
    setSelectedActividadAsociada('')
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
        onClick={saveActividadAsociada}
      />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setActividadAsociadaData(initialActividadAsociadaForm)
    setSelectedActividadAsociada('')
  }
  const selectedestatusActividadAsociadaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusActividadAsociada}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusActividadAsociadaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusActividadAsociada}</div>
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
        header="Detalles de la ActividadAsociada"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={actividadAsociadaData.codigoActividadAsociada}
              onChange={(e) =>
                updateField(e.target.value, 'codigoActividadAsociada')
              }
            />
            <label>codigoActividadAsociada:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={actividadAsociadaData.nombreActividadAsociada}
              onChange={(e) =>
                updateField(e.target.value, 'nombreActividadAsociada')
              }
            />
            <label>Nombre del ActividadAsociada:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={actividadAsociadaData.descripcionActividadAsociada}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionActividadAsociada')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedActividadAsociada}
                options={estadoActividadAsociada}
                onChange={onEstatusActividadAsociada}
                optionLabel="estatusActividadAsociada"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusActividadAsociadaTemplate}
                itemTemplate={estatusActividadAsociadaOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default ActividadAsociadaForm
