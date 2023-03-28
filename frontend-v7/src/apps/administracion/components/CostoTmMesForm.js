/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { CostoTmMesContext } from '../contexts/CostoTmMesContext'
import { Calendar } from 'primereact/calendar'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import moment from 'moment'
import { InputNumber } from 'primereact/inputnumber'

const CostoTmMesForm = (props) => {
  const initialCostoTmMesForm = {
    id: null,

    codigoCostoTmMes: '',
    nombreCostoTmMes: '',
    costoCostoTmMes: 0,
    fechaEfectivaCostoTmMes: null,
    estatusCostoTmMes: '',
    creadoCostoTmMes: moment(),
    modificadoCostoTmMes: moment()
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
  const { createCostoTmMes, editCostoTmMes, updateCostoTmMes } =
    useContext(CostoTmMesContext)

  const { isVisible, setIsVisible } = props
  const [selectedCostoTmMes, setSelectedCostoTmMes] = useState(null)
  const [date, setDate] = useState(null)
  const [costoTmMesData, setCostoTmMesData] = useState(initialCostoTmMesForm)
  const estadoCostoTmMes = [
    { estatusCostoTmMes: 'OPERATIVO' },
    { estatusCostoTmMes: 'INOPERATIVO' }
  ]
  const onEstatusCostoTmMes = (e) => {
    setSelectedCostoTmMes(e.value)
    updateField(e.value.estatusCostoTmMes, 'estatusCostoTmMes')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editCostoTmMes) {
      setCostoTmMesData(editCostoTmMes)
      setSelectedCostoTmMes({
        estatusCostoTmMes: editCostoTmMes.estatusCostoTmMes
      })
      setDate(
        editCostoTmMes.fechaEfectivaCostoTmMes &&
          moment(editCostoTmMes.fechaEfectivaCostoTmMes)._d
      )
    }
  }, [editCostoTmMes])

  const updateField = (data, field) => {
    setCostoTmMesData({
      ...costoTmMesData,
      [field]: data
    })
  }

  const saveCostoTmMes = () => {
    if (!editCostoTmMes) {
      createCostoTmMes(costoTmMesData)
    } else {
      updateCostoTmMes({
        ...costoTmMesData,
        CostoTmMesModificado: moment()
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
      <Button label="Guardar" icon="pi pi-check" onClick={saveCostoTmMes} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setCostoTmMesData(initialCostoTmMesForm)
    setSelectedCostoTmMes('')
    setDate(null)
  }
  const selectedestatusCostoTmMesTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusCostoTmMes}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusCostoTmMesOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusCostoTmMes}</div>
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
        header="Detalles de la CostoTmMes"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={costoTmMesData.codigoCostoTmMes}
              onChange={(e) => updateField(e.target.value, 'codigoCostoTmMes')}
            />
            <label>codigoCostoTmMes:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={costoTmMesData.nombreCostoTmMes}
              onChange={(e) => updateField(e.target.value, 'nombreCostoTmMes')}
            />
            <label>Nombre del CostoTmMes:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputNumber
              inputId="costoCostoTmMes"
              value={costoTmMesData.costoCostoTmMes}
              onValueChange={(e) =>
                updateField(e.target.value, 'costoCostoTmMes')
              }
              mode="currency"
              currency="USD"
              locale="de-DE"
            />
            <label>costoCostoTmMes:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedCostoTmMes}
                options={estadoCostoTmMes}
                onChange={onEstatusCostoTmMes}
                optionLabel="estatusCostoTmMes"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusCostoTmMesTemplate}
                itemTemplate={estatusCostoTmMesOptionTemplate}
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
                updateField(e.target.value, 'fechaEfectivaCostoTmMes')
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

export default CostoTmMesForm
