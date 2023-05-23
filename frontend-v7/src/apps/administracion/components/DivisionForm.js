/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { DivisionContext } from '../contexts/DivisionContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import moment from 'moment'

const DivisionForm = (props) => {
  const initialDivisionForm = {
    id: null,

    codigoDivision: '',
    nombreDivision: '',
    descripcionDivision: '',
    estatusDivision: '',
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
  const { createDivision, editDivision, updateDivision } =
    useContext(DivisionContext)

  const { isVisible, setIsVisible } = props
  const [selectedDivision, setSelectedDivision] = useState(null)
  const [divisionData, setDivisionData] = useState(initialDivisionForm)
  const estadoDivision = [
    { estatusDivision: 'OPERATIVO' },
    { estatusDivision: 'INOPERATIVO' }
  ]
  const onEstatusDivision = (e) => {
    setSelectedDivision(e.value)
    updateField(e.value.estatusDivision, 'estatusDivision')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editDivision) {
      setDivisionData(editDivision)
      setSelectedDivision({
        estatusDivision: editDivision.estatusDivision
      })
    }
  }, [editDivision])

  const updateField = (data, field) => {
    setDivisionData({
      ...divisionData,
      [field]: data
    })
  }

  const saveDivision = () => {
    if (!editDivision) {
      createDivision(divisionData)
    } else {
      updateDivision({
        ...divisionData,
        DivisionModificado: moment()
      })
    }
    setDivisionData(initialDivisionForm)
    setIsVisible(false)
    setSelectedDivision('')
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveDivision} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setDivisionData(initialDivisionForm)
    setSelectedDivision('')
  }
  const selectedestatusDivisionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusDivision}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusDivisionOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusDivision}</div>
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
        header="Detalles de la Division"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={divisionData.codigoDivision}
              onChange={(e) => updateField(e.target.value, 'codigoDivision')}
            />
            <label>codigoDivision:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={divisionData.nombreDivision}
              onChange={(e) => updateField(e.target.value, 'nombreDivision')}
            />
            <label>Nombre del Division:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={divisionData.descripcionDivision}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionDivision')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedDivision}
                options={estadoDivision}
                onChange={onEstatusDivision}
                optionLabel="estatusDivision"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusDivisionTemplate}
                itemTemplate={estatusDivisionOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default DivisionForm
