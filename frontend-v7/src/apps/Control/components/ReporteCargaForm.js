/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { ReporteCargaContext } from '../contexts/ReporteCargaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'

import moment from 'moment'

const ReporteCargaForm = (props) => {
  const initialReporteCargaState = {
    id: null,
    barcoID: '',
    gabarraID: '',
    trenCargados: 0,
    trenTotales: 0,
    toneladasCargadas: 0,
    toneladasRemanente: 0,
    toneladasTotales: 0,
    reporteCargaCreado: moment(),
    reporteCargaModificado: moment()
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
  const { createReporteCarga, editReporteCarga, updateReporteCarga } =
    useContext(ReporteCargaContext)
  const [selectedReporteCarga, setSelectedReporteCarga] = useState(null)
  const { isVisible, setIsVisible } = props

  const cboEstatus = [
    { name: 'Cargando' },
    { name: 'Descargando' },
    { name: 'Fondeada con Carga' },
    { name: 'Fondeada sin Carga' }
  ]
  const [date, setDate] = useState(null)
  const toast = useRef(null)

  const [ReporteCargaData, setReporteCargaData] = useState(
    initialReporteCargaState
  )

  useEffect(() => {
    if (editReporteCarga) setReporteCargaData(editReporteCarga)
  }, [editReporteCarga])

  const updateField = (data, field) => {
    setReporteCargaData({
      ...ReporteCargaData,
      [field]: data
    })
  }

  const saveReporteCarga = () => {
    if (!editReporteCarga) {
      createReporteCarga(ReporteCargaData)
    } else {
      ReporteCargaData.fecha_modificado = Date()

      updateReporteCarga({
        ...ReporteCargaData,
        reporteCargaModificado: moment()
      })
    }
    setReporteCargaData(initialReporteCargaState)
    setIsVisible(false)
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveReporteCarga} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setReporteCargaData(initialReporteCargaState)
  }

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '30vw' }}
        header="Detalles de la ReporteCarga"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={ReporteCargaData.barcoID}
              onChange={(e) => updateField(e.target.value, 'barcoID')}
            />

            <label>barcoID:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={ReporteCargaData.gabarraID}
              onChange={(e) => updateField(e.target.value, 'gabarraID')}
            />
            <label>gabarraID:</label>
          </div>
          <br />
          <div className="formgrid grid">
            <div className="field col-6 p-col-2 p-md-3">
              <label htmlFor="trenCargados">trenCargados</label>
              <InputNumber
                inputId="trenCargados"
                value={ReporteCargaData.trenCargados}
                onValueChange={(e) =>
                  updateField(e.target.value, 'trenCargados')
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

            <div className="field col-6 p-col-2 p-md-3">
              <label htmlFor="trenTotales">trenTotales</label>
              <InputNumber
                inputId="trenTotales"
                value={ReporteCargaData.trenTotales}
                onValueChange={(e) =>
                  updateField(e.target.value, 'trenTotales')
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
            <div className="field col-6 p-col-2 p-md-3">
              <label htmlFor="toneladasCargadas">toneladasCargadas</label>
              <InputNumber
                inputId="toneladasCargadas"
                value={ReporteCargaData.toneladasCargadas}
                onValueChange={(e) =>
                  updateField(e.target.value, 'toneladasCargadas')
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
            <div className="field col-6 p-col-2 p-md-3">
              <label htmlFor="toneladasRemanente">toneladasRemanente</label>
              <InputNumber
                inputId="toneladasRemanente"
                value={ReporteCargaData.toneladasRemanente}
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
            <div className="field col-6 p-col-2 p-md-3">
              <label htmlFor="toneladasTotales">toneladasTotales</label>
              <InputNumber
                inputId="toneladasTotales"
                value={ReporteCargaData.toneladasTotales}
                onValueChange={(e) =>
                  updateField(e.target.value, 'toneladasTotales')
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
          </div>
          <div className="p-float-label">
            <InputText
              value={moment().format('DD/MM/YYYY HH:mm')}
              onChange={(e) => updateField(e.target.value, 'fecha_creado')}
            />
            <Calendar
              id="time24"
              value={date}
              onChange={(e) => setDate(e.value)}
              showTime
              dateFormat="dd/mm/yy"
              showButtonBar
            />
            <label>fecha_creado:</label>
          </div>
          <br />

          <br />
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default ReporteCargaForm
