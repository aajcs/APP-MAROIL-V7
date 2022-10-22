/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { ConceptoAuxContext } from '../contexts/ConceptoAuxContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import moment from 'moment'

const ConceptoAuxForm = (props) => {
  const initialConceptoAuxForm = {
    id: null,

    codigoConceptoAux: '',
    nombreConceptoAux: '',
    descripcionConceptoAux: '',
    estatusConceptoAux: '',
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
  const { createConceptoAux, editConceptoAux, updateConceptoAux } =
    useContext(ConceptoAuxContext)

  const { isVisible, setIsVisible } = props
  const [selectedConceptoAux, setSelectedConceptoAux] = useState(null)
  const [procesoAuxData, setConceptoAuxData] = useState(initialConceptoAuxForm)
  const estadoConceptoAux = [
    { estatusConceptoAux: 'OPERATIVO' },
    { estatusConceptoAux: 'INOPERATIVO' }
  ]
  const onEstatusConceptoAux = (e) => {
    setSelectedConceptoAux(e.value)
    updateField(e.value.estatusConceptoAux, 'estatusConceptoAux')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editConceptoAux) {
      setConceptoAuxData(editConceptoAux)
      setSelectedConceptoAux({
        estatusConceptoAux: editConceptoAux.estatusConceptoAux
      })
    }
  }, [editConceptoAux])

  const updateField = (data, field) => {
    setConceptoAuxData({
      ...procesoAuxData,
      [field]: data
    })
  }

  const saveConceptoAux = () => {
    if (!editConceptoAux) {
      createConceptoAux(procesoAuxData)
    } else {
      updateConceptoAux({
        ...procesoAuxData,
        ConceptoAuxModificado: moment()
      })
    }
    setConceptoAuxData(initialConceptoAuxForm)
    setIsVisible(false)
    setSelectedConceptoAux('')
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveConceptoAux} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setConceptoAuxData(initialConceptoAuxForm)
    setSelectedConceptoAux('')
  }
  const selectedestatusConceptoAuxTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusConceptoAux}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusConceptoAuxOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusConceptoAux}</div>
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
        header="Detalles de la ConceptoAux"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={procesoAuxData.codigoConceptoAux}
              onChange={(e) => updateField(e.target.value, 'codigoConceptoAux')}
            />
            <label>codigoConceptoAux:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={procesoAuxData.nombreConceptoAux}
              onChange={(e) => updateField(e.target.value, 'nombreConceptoAux')}
            />
            <label>Nombre del ConceptoAux:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={procesoAuxData.descripcionConceptoAux}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionConceptoAux')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedConceptoAux}
                options={estadoConceptoAux}
                onChange={onEstatusConceptoAux}
                optionLabel="estatusConceptoAux"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusConceptoAuxTemplate}
                itemTemplate={estatusConceptoAuxOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default ConceptoAuxForm
