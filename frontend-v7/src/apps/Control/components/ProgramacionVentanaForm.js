/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { ProgramacionVentanaContext } from '../contexts/ProgramacionVentanaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'

import moment from 'moment'
import { CargaBodegaContext } from '../contexts/CargaBodegaContext'
import flagplaceholder from '../assetsControl/flagplaceholder.png'

const ProgramacionVentanaForm = (props) => {
  const initialProgramacionVentanaForm = {
    id: null,
    nombreBuque: '',
    descripcion: '',
    terminalBuque: '',
    buqueCliente: '',
    buquePaisDestino: '',
    toneladasNominadas: 0,
    fechaInicioVentana: '',
    fechaFinVentana: '',
    programacionVentanaCreado: moment(),
    programacionVentanaModificado: moment()
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
    createProgramacionVentana,
    editProgramacionVentana,
    updateProgramacionVentana,
    createBodegaProgramacionVentana1
  } = useContext(ProgramacionVentanaContext)
  const { isVisible, setIsVisible } = props
  const [selectedProgramacionVentana, setSelectedProgramacionVentana] =
    useState(null)
  const [selectedBuqueCliente, setSelectedBuqueCliente] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedTerminalBuque, setSelectTerminalBuque] = useState(null)
  const TerminalBuque = [
    { name: 'MAROIL TERMINAL 1' },
    { name: 'MAROIL TERMINAL 2' },
    { name: 'MAROIL TERMINAL 3' },
    { name: 'PETRO SAN FELIX' },
    { name: 'PETRO CEDENO' }
  ]
  const onTerminalBuque = (e) => {
    setSelectTerminalBuque(e.value)
    updateField(e.value.name, 'terminalBuque')
  }
  const [programacionVentanaData, setProgramacionVentanaData] = useState(
    initialProgramacionVentanaForm
  )

  const estadoProgramacionVentana = [
    { estatusProgramacionVentana: 'OPERATIVO' },
    { estatusProgramacionVentana: 'CULMINADO' }
  ]
  const onEstatusProgramacionVentana = (e) => {
    setSelectedProgramacionVentana(e.value)
    updateField(
      e.value.estatusProgramacionVentana,
      'estatusProgramacionVentana'
    )
  }
  const buqueCliente = [
    { buqueCliente: 'MAROIL' },
    { buqueCliente: 'PDVSA' },
    { buqueCliente: 'MANTENIMIENTO' }
  ]
  const onBuqueCliente = (e) => {
    setSelectedBuqueCliente(e.value)
    updateField(e.value.buqueCliente, 'buqueCliente')
  }
  const countries = [
    { name: 'Turkey', code: 'TR' },
    { name: 'Iran', code: 'IR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'China', code: 'CN' },
    { name: 'India', code: 'IN' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Australia', code: 'AU' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
  ]
  const onCountryChange = (e) => {
    setSelectedCountry(e.value)
    updateField(e.value.code, 'buquePaisDestino')
  }
  const [dateInicioVentana, setDateInicioVentana] = useState(null)
  const [dateFinVentana, setDateFinVentana] = useState(null)

  const toast = useRef(null)

  useEffect(() => {
    if (editProgramacionVentana) {
      setProgramacionVentanaData(editProgramacionVentana)
      setSelectedProgramacionVentana({
        estatusProgramacionVentana:
          editProgramacionVentana.estatusProgramacionVentana
      })
      setSelectedBuqueCliente({
        buqueCliente: editProgramacionVentana.buqueCliente
      })
      setSelectTerminalBuque({
        name: editProgramacionVentana.terminalBuque
      })
      setDateInicioVentana(
        editProgramacionVentana.fechaInicioVentana &&
          moment(editProgramacionVentana.fechaInicioVentana)._d
      )
      setDateFinVentana(
        editProgramacionVentana.fechaFinVentana &&
          moment(editProgramacionVentana.fechaFinVentana)._d
      )
    }
  }, [editProgramacionVentana])
  useEffect(() => {
    if (createBodegaProgramacionVentana1) {
      createBodegaProgramacionVentana(createBodegaProgramacionVentana1)
    }
  }, [createBodegaProgramacionVentana1])
  const createBodegaProgramacionVentana = (saveProgramacionVentana) => {
    const cargaBodega = {
      programacionVentanaID: saveProgramacionVentana.id,
      nombreBodega: '',
      estatusBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }
  }

  const updateField = (data, field) => {
    setProgramacionVentanaData({
      ...programacionVentanaData,
      [field]: data
    })
  }

  const saveProgramacionVentana = () => {
    if (!editProgramacionVentana) {
      createProgramacionVentana(programacionVentanaData)
    } else {
      updateProgramacionVentana({
        ...programacionVentanaData,
        programacionVentanaModificado: moment()
      })
    }
    setProgramacionVentanaData(initialProgramacionVentanaForm)
    setIsVisible(false)
    setSelectedProgramacionVentana('')
    setDateInicioVentana(null)
    setDateFinVentana(null)
    setSelectTerminalBuque(null)
    setSelectedBuqueCliente(null)
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
        onClick={saveProgramacionVentana}
      />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setProgramacionVentanaData(initialProgramacionVentanaForm)
    setSelectedProgramacionVentana('')
    setDateInicioVentana(null)
    setDateFinVentana(null)
    setSelectTerminalBuque(null)
    setSelectedBuqueCliente(null)
  }
  const selectedestatusProgramacionVentanaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusProgramacionVentana}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusProgramacionVentanaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusProgramacionVentana}</div>
      </div>
    )
  }
  const selectedBuqueClienteTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.buqueCliente}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const buqueClienteOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.buqueCliente}</div>
      </div>
    )
  }
  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <img
            alt={option.name}
            src={flagplaceholder}
            onError={(e) =>
              (e.target.src =
                'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
            }
            className={`flag flag-${option.code.toLowerCase()}`}
          />
          <span
            style={{ marginLeft: '.5em', verticalAlign: 'middle' }}
            className="image-text"
          >
            {option.name}
          </span>
          {/* <div>{option.name}</div> */}
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const countryOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <img
          alt={option.name}
          src={flagplaceholder}
          onError={(e) =>
            (e.target.src =
              'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
          }
          className={`flag flag-${option.code.toLowerCase()}`}
        />
        <span
          style={{ marginLeft: '.5em', verticalAlign: 'middle' }}
          className="image-text"
        >
          {option.name}
        </span>
        {/* <div>{option.name}</div> */}
      </div>
    )
  }
  const selectedTerminalBuqueTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.name}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const TerminalBuqueOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
      </div>
    )
  }
  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '40vw' }}
        header="Detalles de la ProgramacionVentana"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={programacionVentanaData.nombreBuque}
              onChange={(e) => updateField(e.target.value, 'nombreBuque')}
            />
            <label>Nombre del Buque</label>
          </div>
          <br />

          <div className="formgrid grid">
            <div className="field col-12 md:col-6  mb-0 ">
              <label htmlFor="toneladasNominadas">Consignatario</label>
              <Dropdown
                value={selectedBuqueCliente}
                options={buqueCliente}
                onChange={onBuqueCliente}
                optionLabel="estatusbuqueCliente"
                placeholder="Seleccione Cliente"
                valueTemplate={selectedBuqueClienteTemplate}
                itemTemplate={buqueClienteOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Terminal</label>
              <Dropdown
                value={selectedTerminalBuque}
                options={TerminalBuque}
                onChange={onTerminalBuque}
                optionLabel="name"
                placeholder="Seleccione ubicacionBuque"
                valueTemplate={selectedTerminalBuqueTemplate}
                itemTemplate={TerminalBuqueOptionTemplate}
              />
            </div>
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="toneladasNominadas">Toneladas Nominadas</label>
              <InputNumber
                inputId="toneladasNominadas"
                value={programacionVentanaData.toneladasNominadas}
                onValueChange={(e) =>
                  updateField(e.target.value, 'toneladasNominadas')
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
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label> Inicio de Ventana</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateInicioVentana !== null && dateInicioVentana}
                onChange={(e) => {
                  setDateInicioVentana(e.target.value)
                  updateField(e.target.value, 'fechaInicioVentana')
                }}
                showTime
                locale="es"
                hourFormat="12"
                showButtonBar
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Fin de Ventana</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateFinVentana !== null && dateFinVentana}
                onChange={(e) => {
                  setDateFinVentana(e.value)
                  updateField(e.target.value, 'fechaFinVentana')
                }}
                showTime
                locale="es"
                hourFormat="12"
                showButtonBar
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default ProgramacionVentanaForm
