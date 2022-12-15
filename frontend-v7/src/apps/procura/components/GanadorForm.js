/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { BarcoContext } from '../contexts/BarcoContext'
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

const GanadorForm = (props) => {
  const initialBarcoForm = {
    id: null,
    nombreBarco: '',
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
    estatusBarco: '',
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
  const { createBarco, editBarco, updateBarco, createBodegaBarco1 } =
    useContext(BarcoContext)
  const { createCargaBodega } = useContext(CargaBodegaContext)
  const { isVisible, setIsVisible } = props
  const [selectedBarco, setSelectedBarco] = useState(null)
  const [selectedBuqueCliente, setSelectedBuqueCliente] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [barcoData, setBarcoData] = useState(initialBarcoForm)
  const estadoBarco = [
    { estatusBarco: 'OPERATIVO' },
    { estatusBarco: 'CULMINADO' }
  ]
  const onEstatusBarco = (e) => {
    setSelectedBarco(e.value)
    updateField(e.value.estatusBarco, 'estatusBarco')
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
    { name: 'Dominica', code: 'DM' },
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
    if (editBarco) {
      setBarcoData(editBarco)
      setSelectedBarco({ estatusBarco: editBarco.estatusBarco })
      setSelectedBuqueCliente({ buqueCliente: editBarco.buqueCliente })
      setDate(moment(editBarco.barcoCreado)._d)
      setDateAtraco(editBarco.fechaAtraco && moment(editBarco.fechaAtraco)._d)
      setDateInicio(
        editBarco.fechaInicioCarga && moment(editBarco.fechaInicioCarga)._d
      )
      setDateFinal(
        editBarco.fechaFinalCarga && moment(editBarco.fechaFinalCarga)._d
      )
    }
  }, [editBarco])
  useEffect(() => {
    if (createBodegaBarco1) {
      createBodegaBarco(createBodegaBarco1)
    }
  }, [createBodegaBarco1])
  const createBodegaBarco = (saveBarco) => {
    const cargaBodega = {
      barcoID: saveBarco.id,
      nombreBodega: '',
      estatusBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveBarco.cantidadBodegas)
    for (let i = 1; i <= saveBarco.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`

      createCargaBodega(cargaBodega)
    }
    // barcoService.create(CargaBodega, token).then((data) => {
    //   setBarcos([...barcos, data.saveBarco])
    //   console.log('barco creado', data.saveBarco)
    // })
  }

  const updateField = (data, field) => {
    setBarcoData({
      ...barcoData,
      [field]: data
    })
  }

  const saveBarco = () => {
    if (!editBarco) {
      createBarco(barcoData)
    } else {
      updateBarco({
        ...barcoData,
        barcoModificado: moment()
      })
    }
    setBarcoData(initialBarcoForm)
    setIsVisible(false)
    setSelectedBarco('')
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
      <Button label="Guardar" icon="pi pi-check" onClick={saveBarco} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setBarcoData(initialBarcoForm)
    setSelectedBarco('')
    setDateAtraco(null)
    setDateInicio(null)
    setDateFinal(null)
  }
  const selectedestatusBarcoTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusBarco}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusBarcoOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusBarco}</div>
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
        header="Detalles de la Barco"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={barcoData.nombreBarco}
              onChange={(e) => updateField(e.target.value, 'nombreBarco')}
            />
            <label>Nombre del Barco:</label>
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
                showClear
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
                value={selectedBarco}
                options={estadoBarco}
                onChange={onEstatusBarco}
                optionLabel="estatusBarco"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusBarcoTemplate}
                itemTemplate={estatusBarcoOptionTemplate}
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
                // hourFormat="12"
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
                // hourFormat="12"
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
                // hourFormat="12"
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
                // hourFormat="12"
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

export default GanadorForm
