/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { DependenciaContext } from '../contexts/DependenciaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import moment from 'moment'

const DependenciaForm = (props) => {
  const initialDependenciaForm = {
    id: null,

    codigoDependencia: '',
    nombreDependencia: '',
    descripcionDependencia: '',
    estatusDependencia: '',
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
  const { createDependencia, editDependencia, updateDependencia } =
    useContext(DependenciaContext)

  const { isVisible, setIsVisible } = props
  const [selectedDependencia, setSelectedDependencia] = useState(null)
  const [dependenciaData, setDependenciaData] = useState(initialDependenciaForm)
  const estadoDependencia = [
    { estatusDependencia: 'OPERATIVO' },
    { estatusDependencia: 'INOPERATIVO' }
  ]
  const onEstatusDependencia = (e) => {
    setSelectedDependencia(e.value)
    updateField(e.value.estatusDependencia, 'estatusDependencia')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editDependencia) {
      setDependenciaData(editDependencia)
      setSelectedDependencia({
        estatusDependencia: editDependencia.estatusDependencia
      })
    }
  }, [editDependencia])

  const updateField = (data, field) => {
    setDependenciaData({
      ...dependenciaData,
      [field]: data
    })
  }

  const saveDependencia = () => {
    if (!editDependencia) {
      createDependencia(dependenciaData)
    } else {
      updateDependencia({
        ...dependenciaData,
        DependenciaModificado: moment()
      })
    }
    setDependenciaData(initialDependenciaForm)
    setIsVisible(false)
    setSelectedDependencia('')
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveDependencia} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setDependenciaData(initialDependenciaForm)
    setSelectedDependencia('')
  }
  const selectedestatusDependenciaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusDependencia}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusDependenciaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusDependencia}</div>
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
        header="Detalles de la Dependencia"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={dependenciaData.codigoDependencia}
              onChange={(e) => updateField(e.target.value, 'codigoDependencia')}
            />
            <label>codigoDependencia:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={dependenciaData.nombreDependencia}
              onChange={(e) => updateField(e.target.value, 'nombreDependencia')}
            />
            <label>Nombre del Dependencia:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={dependenciaData.descripcionDependencia}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionDependencia')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedDependencia}
                options={estadoDependencia}
                onChange={onEstatusDependencia}
                optionLabel="estatusDependencia"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusDependenciaTemplate}
                itemTemplate={estatusDependenciaOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default DependenciaForm
