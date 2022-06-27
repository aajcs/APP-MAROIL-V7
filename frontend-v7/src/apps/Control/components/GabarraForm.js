/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { GabarraContext } from '../contexts/GabarraContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'

import moment from 'moment'

const GabarraForm = (props) => {
  const initialGabarraState = {
    id: null,
    nombreGabarra: '',
    descripcion: '',
    toneladasCapacidad: 0,
    toneladasActual: 0,
    toneladasRemanente: 0,
    trenesCapacidad: 0,
    trenesActual: 0,
    gabarraCreado: moment(),
    gabarraModificado: moment(),
    estatusGabarra: ''
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
  const { createGabarra, editGabarra, updateGabarra } =
    useContext(GabarraContext)
  const { isVisible, setIsVisible } = props
  const [selectedGabarra, setSelectedGabarra] = useState(null)
  const [gabarraData, setGabarraData] = useState(initialGabarraState)
  const cboEstatus = [
    { name: 'Cargando' },
    { name: 'Descargando' },
    { name: 'Fondeada con Carga' },
    { name: 'Fondeada sin Carga' }
  ]
  const onEstatusGabarra = (e) => {
    setSelectedGabarra(e.value)
    updateField(e.value.name, 'estatusGabarra')
  }
  const [date, setDate] = useState(null)
  const toast = useRef(null)

  useEffect(() => {
    if (editGabarra) setGabarraData(editGabarra)
  }, [editGabarra])

  const updateField = (data, field) => {
    setGabarraData({
      ...gabarraData,
      [field]: data
    })
  }

  const saveGabarra = () => {
    if (!editGabarra) {
      createGabarra(gabarraData)
    } else {
      updateGabarra({ ...gabarraData, gabarraModificado: moment() })
    }
    setGabarraData(initialGabarraState)
    setIsVisible(false)
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveGabarra} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setGabarraData(initialGabarraState)
  }

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '30vw' }}
        header="Detalles de la Gabarra"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={gabarraData.nombre}
              onChange={(e) => updateField(e.target.value, 'nombreGabarra')}
            />

            <label>nombreGabarra:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={gabarraData.descripcion}
              onChange={(e) => updateField(e.target.value, 'descripcion')}
            />
            <label>Descripcion:</label>
          </div>
          <br />
          <div className="formgrid grid">
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="toneladasCapacidad">toneladas Capacidad</label>
              <InputNumber
                inputId="toneladasCapacidad"
                value={gabarraData.toneladasCapacidad}
                onValueChange={(e) =>
                  updateField(e.target.value, 'toneladasCapacidad')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                suffix=" TM"
              />
            </div>
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="toneladasActual">toneladas Actual</label>
              <InputNumber
                inputId="toneladasActual"
                value={gabarraData.toneladasActual}
                onValueChange={(e) =>
                  updateField(e.target.value, 'toneladasActual')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                suffix=" TM"
              />
            </div>{' '}
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="toneladasRemanente">toneladas Remanente</label>
              <InputNumber
                inputId="toneladasRemanente"
                value={gabarraData.toneladasRemanente}
                onValueChange={(e) =>
                  updateField(e.target.value, 'toneladasRemanente')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                suffix=" TM"
              />
            </div>
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="trenesCapacidad">trenes Capacidad</label>
              <InputNumber
                inputId="trenesCapacidad"
                value={gabarraData.trenesCapacidad}
                onValueChange={(e) =>
                  updateField(e.target.value, 'trenesCapacidad')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
              />
            </div>
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="trenesActual">trenes Actual</label>
              <InputNumber
                inputId="trenesActual"
                value={gabarraData.trenesActual}
                onValueChange={(e) =>
                  updateField(e.target.value, 'trenesActual')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
              />
            </div>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <h5>Estado</h5>
              <Dropdown
                value={selectedGabarra}
                options={cboEstatus}
                onChange={onEstatusGabarra}
                optionLabel="name"
                placeholder="Seleccione Estado"
              />
            </div>
            <div className="field col-12 md:col-6">
              <h5>Fecha</h5>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={date}
                onChange={(e) => setDate(e.value)}
                showTime
                locale="es"
                // hourFormat="12"
                showButtonBar
              />
            </div>
          </div>
          <br />
        </div>
      </Dialog>
    </div>
  )
}

export default GabarraForm
