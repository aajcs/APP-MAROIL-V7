/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { MensualidadOpMesContext } from '../contexts/MensualidadOpMesContext'
import { Calendar } from 'primereact/calendar'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import moment from 'moment'
import { InputNumber } from 'primereact/inputnumber'

const MensualidadOpMesForm = (props) => {
  const initialMensualidadOpMesForm = {
    id: null,

    codigoMensualidadOpMes: '',
    nombreMensualidadOpMes: '',
    costoMensualidadOpMes: 0,
    fechaEfectivaMensualidadOpMes: null,
    estatusMensualidadOpMes: '',
    creadoMensualidadOpMes: moment(),
    modificadoMensualidadOpMes: moment()
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
    createMensualidadOpMes,
    editMensualidadOpMes,
    updateMensualidadOpMes
  } = useContext(MensualidadOpMesContext)

  const { isVisible, setIsVisible } = props
  const [selectedMensualidadOpMes, setSelectedMensualidadOpMes] = useState(null)
  const [date, setDate] = useState(null)
  const [mensualidadOpMesData, setMensualidadOpMesData] = useState(
    initialMensualidadOpMesForm
  )
  const estadoMensualidadOpMes = [
    { estatusMensualidadOpMes: 'OPERATIVO' },
    { estatusMensualidadOpMes: 'INOPERATIVO' }
  ]
  const onEstatusMensualidadOpMes = (e) => {
    setSelectedMensualidadOpMes(e.value)
    updateField(e.value.estatusMensualidadOpMes, 'estatusMensualidadOpMes')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editMensualidadOpMes) {
      setMensualidadOpMesData(editMensualidadOpMes)
      setSelectedMensualidadOpMes({
        estatusMensualidadOpMes: editMensualidadOpMes.estatusMensualidadOpMes
      })
      setDate(
        editMensualidadOpMes.fechaEfectivaMensualidadOpMes &&
          moment(editMensualidadOpMes.fechaEfectivaMensualidadOpMes)._d
      )
    }
  }, [editMensualidadOpMes])

  const updateField = (data, field) => {
    setMensualidadOpMesData({
      ...mensualidadOpMesData,
      [field]: data
    })
  }

  const saveMensualidadOpMes = () => {
    if (!editMensualidadOpMes) {
      createMensualidadOpMes(mensualidadOpMesData)
    } else {
      updateMensualidadOpMes({
        ...mensualidadOpMesData,
        MensualidadOpMesModificado: moment()
      })
    }
    setMensualidadOpMesData(initialMensualidadOpMesForm)
    setIsVisible(false)
    setSelectedMensualidadOpMes('')
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
        onClick={saveMensualidadOpMes}
      />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setMensualidadOpMesData(initialMensualidadOpMesForm)
    setSelectedMensualidadOpMes('')
  }
  const selectedestatusMensualidadOpMesTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusMensualidadOpMes}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusMensualidadOpMesOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusMensualidadOpMes}</div>
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
        header="Detalles de la MensualidadOpMes"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={mensualidadOpMesData.codigoMensualidadOpMes}
              onChange={(e) =>
                updateField(e.target.value, 'codigoMensualidadOpMes')
              }
            />
            <label>codigoMensualidadOpMes:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={mensualidadOpMesData.nombreMensualidadOpMes}
              onChange={(e) =>
                updateField(e.target.value, 'nombreMensualidadOpMes')
              }
            />
            <label>Nombre del MensualidadOpMes:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputNumber
              inputId="costoMensualidadOpMes"
              value={mensualidadOpMesData.costoMensualidadOpMes}
              onValueChange={(e) =>
                updateField(e.target.value, 'costoMensualidadOpMes')
              }
              mode="currency"
              currency="USD"
              locale="de-DE"
            />
            <label>costoMensualidadOpMes:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedMensualidadOpMes}
                options={estadoMensualidadOpMes}
                onChange={onEstatusMensualidadOpMes}
                optionLabel="estatusMensualidadOpMes"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusMensualidadOpMesTemplate}
                itemTemplate={estatusMensualidadOpMesOptionTemplate}
              />
            </div>
          </div>
          <div className="field col-12 md:col-6">
            <label>Fecha Efectiva</label>
            <Calendar
              className="p-datepicker-today"
              id="time24"
              value={date !== null && date}
              onChange={(e) => {
                setDate(e.target.value)
                updateField(e.target.value, 'fechaEfectivaMensualidadOpMes')
              }}
              showTime
              locale="es"
              // hourFormat="12"
              showButtonBar
            />
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default MensualidadOpMesForm
