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
    nombreProgramacionVentana: '',
    descripcion: '',
    buqueCliente: '',
    buquePaisDestino: '',
    toneladasCapacidad: 0,
    toneladasNominadas: 0,
    toneladasActual: 0,
    totalGabarras: 0,
    cantidadBodegas: 0,
    cantidadGruas: 0,
    barcoCreado: moment(),
    barcoModificado: moment(),
    fechaAtraco: '',
    fechaInicioCarga: '',
    fechaFinalCarga: '',
    estatusProgramacionVentana: '',
    reporteCarga: []
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
  const [barcoData, setProgramacionVentanaData] = useState(
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
  const buqueCliente = [{ buqueCliente: 'MAROIL' }, { buqueCliente: 'PDVSA' }]
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
  const [date, setDate] = useState(null)
  const [dateAtraco, setDateAtraco] = useState(null)
  const [dateInicio, setDateInicio] = useState(null)
  const [dateFinal, setDateFinal] = useState(null)
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
      setDate(moment(editProgramacionVentana.barcoCreado)._d)
      setDateAtraco(
        editProgramacionVentana.fechaAtraco &&
          moment(editProgramacionVentana.fechaAtraco)._d
      )
      setDateInicio(
        editProgramacionVentana.fechaInicioCarga &&
          moment(editProgramacionVentana.fechaInicioCarga)._d
      )
      setDateFinal(
        editProgramacionVentana.fechaFinalCarga &&
          moment(editProgramacionVentana.fechaFinalCarga)._d
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
      barcoID: saveProgramacionVentana.id,
      nombreBodega: '',
      estatusBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }
  }

  const updateField = (data, field) => {
    setProgramacionVentanaData({
      ...barcoData,
      [field]: data
    })
  }

  const saveProgramacionVentana = () => {
    if (!editProgramacionVentana) {
      createProgramacionVentana(barcoData)
    } else {
      updateProgramacionVentana({
        ...barcoData,
        barcoModificado: moment()
      })
    }
    setProgramacionVentanaData(initialProgramacionVentanaForm)
    setIsVisible(false)
    setSelectedProgramacionVentana('')
    setDateAtraco(null)
    setDateInicio(null)
    setDateFinal(null)
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
    setDateAtraco(null)
    setDateInicio(null)
    setDateFinal(null)
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

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '30vw' }}
        header="Detalles de la ProgramacionVentana"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={barcoData.nombreProgramacionVentana}
              onChange={(e) =>
                updateField(e.target.value, 'nombreProgramacionVentana')
              }
            />
            <label>Nombre del ProgramacionVentana:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={barcoData.descripcion}
              onChange={(e) => updateField(e.target.value, 'descripcion')}
            />
            <label>Descripcion:</label>
          </div>
          <div className="formgrid grid">
            <div className="field col-12 md:col-6 mt-3 mb-0 ">
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
            <div className="field col-12 md:col-6 mt-3">
              <Dropdown
                value={selectedCountry}
                options={countries}
                onChange={onCountryChange}
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                placeholder="Pais de Destino"
                valueTemplate={selectedCountryTemplate}
                itemTemplate={countryOptionTemplate}
              />
            </div>
            <br />
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="toneladasCapacidad">Toneladas Nominadas</label>
              <InputNumber
                inputId="toneladasCapacidad"
                value={barcoData.toneladasCapacidad}
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
              <label htmlFor="toneladasNominadas">Toneladas Solicitadas</label>
              <InputNumber
                inputId="toneladasNominadas"
                value={barcoData.toneladasNominadas}
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
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="toneladasActual">Toneladas Actual</label>
              <InputNumber
                inputId="toneladasActual"
                value={barcoData.toneladasActual}
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
              {/* <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly /> */}
            </div>
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="totalGabarras">Total Gabarras</label>
              <InputNumber
                inputId="totalGabarras"
                value={barcoData.totalGabarras}
                onValueChange={(e) =>
                  updateField(e.target.value, 'totalGabarras')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
              />
              {/* <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly /> */}
            </div>
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="cantidadBodegas">Cantidad Bodegas</label>
              <InputNumber
                inputId="cantidadBodegas"
                value={barcoData.cantidadBodegas}
                onValueChange={(e) =>
                  updateField(e.target.value, 'cantidadBodegas')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
              />
              {/* <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly /> */}
            </div>
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="cantidadGruas">Cantidad Gruas</label>
              <InputNumber
                inputId="cantidadGruas"
                value={barcoData.cantidadGruas}
                onValueChange={(e) =>
                  updateField(e.target.value, 'cantidadGruas')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
              />
              {/* <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly /> */}
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedProgramacionVentana}
                options={estadoProgramacionVentana}
                onChange={onEstatusProgramacionVentana}
                optionLabel="estatusProgramacionVentana"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusProgramacionVentanaTemplate}
                itemTemplate={estatusProgramacionVentanaOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Fecha de Atraque</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateAtraco !== null && dateAtraco}
                onChange={(e) => {
                  setDateAtraco(e.target.value)
                  updateField(e.target.value, 'fechaAtraco')
                }}
                showTime
                locale="es"
                hourFormat="12"
                showButtonBar
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Fecha Inicio Carga</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateInicio !== null && dateInicio}
                onChange={(e) => {
                  setDateInicio(e.value)
                  updateField(e.target.value, 'fechaInicioCarga')
                }}
                showTime
                locale="es"
                hourFormat="12"
                showButtonBar
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Fecha Final Carga</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateFinal !== null && dateFinal}
                onChange={(e) => {
                  setDateFinal(e.value)
                  updateField(e.target.value, 'fechaFinalCarga')
                }}
                showTime
                locale="es"
                hourFormat="12"
                showButtonBar
              />
            </div>
            {/* <div className="field col-12 md:col-6">
              <h5>Fecha</h5>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={date}
                onChange={(e) => setDate(e.value)}
                showTime
                locale="es"
                hourFormat="12"
                showButtonBar
              />
            </div> */}
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default ProgramacionVentanaForm
