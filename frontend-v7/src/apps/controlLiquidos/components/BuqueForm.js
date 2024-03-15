/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { BuqueContext } from '../contexts/BuqueContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'

import moment from 'moment'
// import { CargaBodegaContext } from '../contexts/CargaBodegaContext'
import flagplaceholder from '../assetsControlLiquidos/flagplaceholder.png'

const BuqueForm = (props) => {
  const initialBuqueForm = {
    id: null,
    nombreBuque: '',
    descripcionBuque: '',
    clienteBuque: '',
    clienteVentaBuque: '',
    paisDestinoBuque: '',
    capacidadBuque: 0,
    capacidadNominadaBuque: 0,
    capacidadActualBuque: 0,
    blFinalBuque: 0,
    totalGabarras: 0,
    cantidadBodegas: 0,
    tiempoDemora: 0,
    costoDemora: 0,
    cantidadGruasBuque: 0,
    fechaAtracoBuque: '',
    fechaInicioCargaBuque: '',
    fechaFinalCargaBuque: '',
    estatusBuque: '',
    etcBuque: '',
    reporteCargaBuque: [],
    reporteCargaGOMBuque: [],
    cargaBodegaBuque: [],
    volumetriaIdBuque: []
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
  const { createBuque, editBuque, updateBuque, createBodegaBuque1 } =
    useContext(BuqueContext)
  // const { createCargaBodega } = useContext(CargaBodegaContext)
  const { isVisible, setIsVisible } = props
  const [selectedBuque, setSelectedBuque] = useState(null)
  const [selectedBuqueCliente, setSelectedBuqueCliente] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [buqueData, setBuqueData] = useState(initialBuqueForm)
  const estadoBuque = [
    { estatusBuque: 'OPERATIVO' },
    { estatusBuque: 'CULMINADO' }
  ]
  const onEstatusBuque = (e) => {
    setSelectedBuque(e.value)
    updateField(e.value.estatusBuque, 'estatusBuque')
  }
  const clienteBuque = [{ clienteBuque: 'MAROIL' }, { clienteBuque: 'PDVSA' }]
  const onBuqueCliente = (e) => {
    setSelectedBuqueCliente(e.value)
    updateField(e.value.clienteBuque, 'clienteBuque')
  }
  const countries = [
    { name: 'Turkey', code: 'TR' },
    { name: 'Iran', code: 'IR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'China', code: 'CN' },
    { name: 'India', code: 'IN' },
    { name: 'Jordania', code: 'JO' },
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
    updateField(e.value.code, 'paisDestinoBuque')
  }
  const [date, setDate] = useState(null)
  const [dateAtraco, setDateAtraco] = useState(null)
  const [dateInicio, setDateInicio] = useState(null)
  const [dateFinal, setDateFinal] = useState(null)
  const toast = useRef(null)

  useEffect(() => {
    if (editBuque) {
      const { reporteCargaGOMBuque, ...rest } = editBuque
      setBuqueData(rest)
      setSelectedBuque({ estatusBuque: editBuque.estatusBuque })
      setSelectedBuqueCliente({ clienteBuque: editBuque.clienteBuque })
      setDate(moment(editBuque.buqueCreado)._d)
      setDateAtraco(
        editBuque.fechaAtracoBuque && moment(editBuque.fechaAtracoBuque)._d
      )
      setDateInicio(
        editBuque.fechaInicioCargaBuque &&
          moment(editBuque.fechaInicioCargaBuque)._d
      )
      setDateFinal(
        editBuque.fechaFinalCargaBuque &&
          moment(editBuque.fechaFinalCargaBuque)._d
      )
    }
  }, [editBuque])
  useEffect(() => {
    if (createBodegaBuque1) {
      createBodegaBuque(createBodegaBuque1)
    }
  }, [createBodegaBuque1])
  const createBodegaBuque = (saveBuque) => {
    const cargaBodega = {
      buqueID: saveBuque.id,
      nombreBodega: '',
      estatusBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveBuque.cantidadBodegas)
    // for (let i = 1; i <= saveBuque.cantidadBodegas; i++) {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`

    //   createCargaBodega(cargaBodega)
    // }
    // buqueService.create(CargaBodega, token).then((data) => {
    //   setBuques([...buques, data.saveBuque])
    //   console.log('buque creado', data.saveBuque)
    // })
  }

  const updateField = (data, field) => {
    setBuqueData({
      ...buqueData,
      [field]: data
    })
  }

  const saveBuque = () => {
    if (!editBuque) {
      createBuque(buqueData)
    } else {
      updateBuque({
        ...buqueData,
        buqueModificado: moment()
      })
    }
    setBuqueData(initialBuqueForm)
    setIsVisible(false)
    setSelectedBuque('')
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
      <Button label="Guardar" icon="pi pi-check" onClick={saveBuque} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setBuqueData(initialBuqueForm)
    setSelectedBuque('')
    setDateAtraco(null)
    setDateInicio(null)
    setDateFinal(null)
  }
  const selectedestatusBuqueTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusBuque}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusBuqueOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusBuque}</div>
      </div>
    )
  }
  const selectedBuqueClienteTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.clienteBuque}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const clienteBuqueOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.clienteBuque}</div>
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
        style={{ width: '35vw' }}
        header="Detalles de la Buque"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={buqueData.nombreBuque}
              onChange={(e) => updateField(e.target.value, 'nombreBuque')}
            />
            <label>Nombre del Buque:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={buqueData.descripcionBuque}
              onChange={(e) => updateField(e.target.value, 'descripcionBuque')}
            />
            <label>Descripcion:</label>
          </div>
          <div className="formgrid grid">
            <div className="field col-12 md:col-6 mt-3 mb-0 ">
              <Dropdown
                value={selectedBuqueCliente}
                options={clienteBuque}
                onChange={onBuqueCliente}
                optionLabel="estatusclienteBuque"
                placeholder="Seleccione Cliente"
                valueTemplate={selectedBuqueClienteTemplate}
                itemTemplate={clienteBuqueOptionTemplate}
                showClear
              />
            </div>
            <div className="field col-12  md:col-6 mt-3">
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
            <div className="field col-12  md:col-6 p-col-2 p-md-1">
              <label htmlFor="capacidadBuque">capacidadBuque</label>
              <InputNumber
                inputId="capacidadBuque"
                value={buqueData.capacidadBuque}
                onValueChange={(e) =>
                  updateField(e.target.value, 'capacidadBuque')
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

            <div className="field col-12  md:col-6 p-col-2 p-md-1">
              <label htmlFor="capacidadNominadaBuque">
                capacidadNominadaBuque
              </label>
              <InputNumber
                inputId="capacidadNominadaBuque"
                value={buqueData.capacidadNominadaBuque}
                onValueChange={(e) =>
                  updateField(e.target.value, 'capacidadNominadaBuque')
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
            <div className="field col-12  md:col-6 p-col-2 p-md-1">
              <label htmlFor="capacidadActualBuque">capacidadActualBuque</label>
              <InputNumber
                inputId="capacidadActualBuque"
                value={buqueData.capacidadActualBuque}
                onValueChange={(e) =>
                  updateField(e.target.value, 'capacidadActualBuque')
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
            <div className="field col-12  md:col-6 p-col-2 p-md-1">
              <label htmlFor="blFinalBuque">BL Draft Final</label>
              <InputNumber
                inputId="blFinalBuque"
                value={buqueData.blFinalBuque}
                onValueChange={(e) =>
                  updateField(e.target.value, 'blFinalBuque')
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
            <div className="field col-12  md:col-6 p-col-2 p-md-1">
              <label htmlFor="totalGabarras">Total Gabarras</label>
              <InputNumber
                inputId="totalGabarras"
                value={buqueData.totalGabarras}
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
            <div className="field col-12  md:col-6 p-col-2 p-md-1">
              <label htmlFor="cantidadBodegas">Cantidad Bodegas</label>
              <InputNumber
                inputId="cantidadBodegas"
                value={buqueData.cantidadBodegas}
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
            <div className="field col-12  md:col-6 p-col-2 p-md-1">
              <label htmlFor="cantidadGruas">Cantidad Gruas</label>
              <InputNumber
                inputId="cantidadGruas"
                value={buqueData.cantidadGruas}
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
            <div className="field col-12  md:col-6 p-col-2 p-md-1">
              <label>etc:</label>
              <InputText
                value={buqueData.etcBuque}
                onChange={(e) => updateField(e.target.value, 'etcBuque')}
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-12  md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedBuque}
                options={estadoBuque}
                onChange={onEstatusBuque}
                optionLabel="estatusBuque"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusBuqueTemplate}
                itemTemplate={estatusBuqueOptionTemplate}
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
                  updateField(e.target.value, 'fechaAtracoBuque')
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
                  updateField(e.target.value, 'fechaInicioCargaBuque')
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
                  updateField(e.target.value, 'fechaFinalCargaBuque')
                }}
                showTime
                locale="es"
                // hourFormat="12"
                showButtonBar
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default BuqueForm
