/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { ProcesoAuxContext } from '../contexts/ProcesoAuxContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import moment from 'moment'

const ProcesoAuxForm = (props) => {
  const initialProcesoAuxForm = {
    id: null,

    codigoProceso: '',
    nombreProceso: '',
    descripcionProceso: '',
    estatusProceso: '',
    ProcesoCreado: moment(),
    ProcesoModificado: moment()
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
  const { createProcesoAux, editProcesoAux, updateProcesoAux } =
    useContext(ProcesoAuxContext)

  const { isVisible, setIsVisible } = props
  const [selectedProceso, setSelectedProceso] = useState(null)
  const [procesoAuxData, setProcesoAuxData] = useState(initialProcesoAuxForm)
  const estadoProceso = [
    { estatusProceso: 'OPERATIVO' },
    { estatusProceso: 'INOPERATIVO' }
  ]
  const onEstatusProceso = (e) => {
    setSelectedProceso(e.value)
    updateField(e.value.estatusProceso, 'estatusProceso')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editProcesoAux) {
      setProcesoAuxData(editProcesoAux)
      setSelectedProceso({
        estatusProceso: editProcesoAux.estatusProceso
      })
    }
  }, [editProcesoAux])

  const updateField = (data, field) => {
    setProcesoAuxData({
      ...procesoAuxData,
      [field]: data
    })
  }

  const saveProcesoAux = () => {
    if (!editProcesoAux) {
      createProcesoAux(procesoAuxData)
    } else {
      updateProcesoAux({
        ...procesoAuxData,
        ProcesoModificado: moment()
      })
    }
    setProcesoAuxData(initialProcesoAuxForm)
    setIsVisible(false)
    setSelectedProceso('')
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveProcesoAux} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setProcesoAuxData(initialProcesoAuxForm)
    setSelectedProceso('')
  }
  const selectedestatusProcesoTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusProceso}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusProcesoOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusProceso}</div>
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
        header="Detalles de la Proceso"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={procesoAuxData.codigoProceso}
              onChange={(e) => updateField(e.target.value, 'codigoProceso')}
            />
            <label>codigoProceso:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={procesoAuxData.nombreProceso}
              onChange={(e) => updateField(e.target.value, 'nombreProceso')}
            />
            <label>Nombre del Proceso:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={procesoAuxData.descripcionProceso}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionProceso')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedProceso}
                options={estadoProceso}
                onChange={onEstatusProceso}
                optionLabel="estatusProceso"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusProcesoTemplate}
                itemTemplate={estatusProcesoOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default ProcesoAuxForm
