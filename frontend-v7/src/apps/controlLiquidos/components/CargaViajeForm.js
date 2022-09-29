/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect, useRef } from 'react'
import { CargaViajeContext } from '../contexts/CargaViajeContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { InputNumber } from 'primereact/inputnumber'
import { Calendar } from 'primereact/calendar'

import moment from 'moment'
import { ViajeContext } from '../contexts/ViajeContext'

// import { CargaBodegaContext } from '../contexts/CargaBodegaContext'
// import flagplaceholder from '../assetsControl/flagplaceholder.png'

const CargaViajeForm = (props) => {
  const initialCargaViajeForm = {
    id: null,
    tipoCargaViaje: '',
    productoCargaViaje: '',
    descripcionCargaViaje: '',
    puertoCargaViaje: '',
    estatusCargaViaje: '',
    fechaArriboCargaViaje: '',
    fechaCompletacionCargaViaje: '',
    fechaZarpeCargaViaje: '',
    catidadActualCargaViaje: '',
    catidadPruductoCargaViaje: '',
    rataCargaViaje: '',
    viaje: '',
    fechaInicioCargaViaje: '',
    fechaFinCargaViaje: '',
    cargaViajeCreado: moment(),
    cargaViajeModificado: moment()
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
    createCargaViaje,
    editCargaViaje,
    updateCargaViaje,
    createBodegaCargaViaje1
  } = useContext(CargaViajeContext)
  const { viajes } = useContext(ViajeContext)

  // const { createCargaBodega } = useContext(CargaBodegaContext)
  const { isVisible, setIsVisible } = props
  const [selectedCargaViaje, setSelectedCargaViaje] = useState(null)
  const [selectedViaje, setSelectedViaje] = useState(null)

  const [selectedTipoCargaViaje, setSelectedTipoCargaViaje] = useState(null)
  const [selectedProductoCargaViaje, setSelectedProductoCargaViaje] =
    useState(null)
  const [selectedPuertoCargaViaje, setSelectedPuertoCargaViaje] = useState(null)

  const [dateZarpeCargaViaje, setDateZarpeCargaViaje] = useState(null)
  const [dateArriboCargaViaje, setDateArriboCargaViaje] = useState(null)
  const [dateCompletacionCargaViaje, setDateCompletacionCargaViaje] =
    useState(null)
  const [CargaViajeData, setCargaViajeData] = useState(initialCargaViajeForm)
  const estadoCargaViaje = [
    { estatusCargaViaje: 'INICIADO' },
    { estatusCargaViaje: 'CULMINADO' }
  ]
  // const viajelist = [
  //   { viaje: 'NASCA 1' },
  //   { viaje: 'INMACULADA' }
  // ]
  // const remolcadorlist = [
  //   { remolcador: 'MARE' },
  //   { remolcador: 'UMAY' },
  //   { remolcador: 'MOROCOTO' }
  // ]

  const tipoCargaViajelist = [
    { tipoCargaViaje: 'CARGANDO' },
    { tipoCargaViaje: 'DESCARGANDO' }
  ]
  const productoCargaViajelist = [
    { productoCargaViaje: 'GASOLINA' },
    { productoCargaViaje: 'DIESEL' }
  ]
  const puertoCargaViajelist = [
    { puertoCargaViaje: 'VENEZUELA' },
    { puertoCargaViaje: 'DOMINICA' },
    { puertoCargaViaje: 'SANTA LUCIA' },
    { puertoCargaViaje: 'SAN VICENTE DE LAS GRANADINAS' }
  ]
  const onEstatusCargaViaje = (e) => {
    setSelectedCargaViaje(e.value)
    updateField(e.value.estatusCargaViaje, 'estatusCargaViaje')
  }
  const onViaje = (e) => {
    setSelectedViaje(e.value)
    updateField(e.value.id, 'viaje')
  }

  const onProductoCargaViaje = (e) => {
    setSelectedProductoCargaViaje(e.value)
    updateField(e.value.productoCargaViaje, 'productoCargaViaje')
  }
  const onPuertoCargaViaje = (e) => {
    setSelectedPuertoCargaViaje(e.value)
    updateField(e.value.puertoCargaViaje, 'puertoCargaViaje')
  }
  const onTipoCargaViaje = (e) => {
    setSelectedTipoCargaViaje(e.value)
    updateField(e.value.tipoCargaViaje, 'tipoCargaViaje')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editCargaViaje) {
      console.log(editCargaViaje.viaje.nombreViaje)
      setCargaViajeData(editCargaViaje)
      setSelectedCargaViaje({
        estatusCargaViaje: editCargaViaje.estatusCargaViaje
      })
      setSelectedViaje(editCargaViaje.viaje.nombreViaje)

      setSelectedTipoCargaViaje({
        tipoCargaViaje: editCargaViaje.tipoCargaViaje
      })
      setDateArriboCargaViaje(
        editCargaViaje.fechaArriboCargaViaje &&
          moment(editCargaViaje.fechaArriboCargaViaje)._d
      )
      setDateZarpeCargaViaje(
        editCargaViaje.fechaZarpeCargaViaje &&
          moment(editCargaViaje.fechaZarpeCargaViaje)._d
      )
      setDateCompletacionCargaViaje(
        editCargaViaje.fechaCompletacionCargaViaje &&
          moment(editCargaViaje.fechaCompletacionCargaViaje)._d
      )
    }
  }, [editCargaViaje])
  useEffect(() => {
    if (createBodegaCargaViaje1) {
      createBodegaCargaViaje(createBodegaCargaViaje1)
    }
  }, [createBodegaCargaViaje1])
  const createBodegaCargaViaje = (saveCargaViaje) => {
    const cargaBodega = {
      CargaViajeID: saveCargaViaje.id,
      nombreBodega: '',
      estatusBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveCargaViaje.cantidadBodegas)
    for (let i = 1; i <= saveCargaViaje.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`

      // createCargaBodega(cargaBodega)
    }
    // CargaViajeService.create(CargaBodega, token).then((data) => {
    //   setCargaViajes([...CargaViajes, data.saveCargaViaje])
    //   console.log('CargaViaje creado', data.saveCargaViaje)
    // })
  }

  const updateField = (data, field) => {
    setCargaViajeData({
      ...CargaViajeData,
      [field]: data
    })
  }

  const saveCargaViaje = () => {
    if (!editCargaViaje) {
      createCargaViaje(CargaViajeData)
    } else {
      updateCargaViaje({
        ...CargaViajeData,
        CargaViajeModificado: moment()
      })
    }
    setCargaViajeData(initialCargaViajeForm)
    setIsVisible(false)
    setSelectedCargaViaje('')
    setSelectedViaje('')

    setSelectedTipoCargaViaje('')
    setDateZarpeCargaViaje(null)
    setDateCompletacionCargaViaje(null)
    setDateArriboCargaViaje(null)
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveCargaViaje} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setCargaViajeData(initialCargaViajeForm)
    setSelectedCargaViaje('')
    setSelectedViaje('')
    setSelectedTipoCargaViaje('')
    setDateZarpeCargaViaje(null)
    setDateCompletacionCargaViaje(null)
    setDateArriboCargaViaje(null)
  }
  const selectedestatusCargaViajeTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusCargaViaje}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusCargaViajeOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusCargaViaje}</div>
      </div>
    )
  }
  const selectedViajeTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.nombreViaje}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const viajeOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.nombreViaje}</div>
      </div>
    )
  }

  const selectedProductoCargaViajeTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.productoCargaViaje}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const productoCargaViajeTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.productoCargaViaje}</div>
      </div>
    )
  }
  const selectedPuertoCargaViajeTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.puertoCargaViaje}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const puertoCargaViajeTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.puertoCargaViaje}</div>
      </div>
    )
  }
  const selectedTipoCargaViajeTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.tipoCargaViaje}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const tipoCargaViajeTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.tipoCargaViaje}</div>
      </div>
    )
  }

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '70vw' }}
        header="Detalles de la CargaViaje"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid">
            <div className="field col-12 md:col-3">
              <label>tipoCargaViaje</label>
              <Dropdown
                value={selectedTipoCargaViaje}
                options={tipoCargaViajelist}
                onChange={onTipoCargaViaje}
                optionLabel="estatusTipoCargaViaje"
                placeholder="Seleccione Tipo Carga"
                valueTemplate={selectedTipoCargaViajeTemplate}
                itemTemplate={tipoCargaViajeTemplate}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label>productoCargaViaje</label>
              <Dropdown
                value={selectedProductoCargaViaje}
                options={productoCargaViajelist}
                onChange={onProductoCargaViaje}
                optionLabel="estatusProductoCargaViaje"
                placeholder="Seleccione Tipo Carga"
                valueTemplate={selectedProductoCargaViajeTemplate}
                itemTemplate={productoCargaViajeTemplate}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label>puertoCargaViaje</label>
              <Dropdown
                value={selectedPuertoCargaViaje}
                options={puertoCargaViajelist}
                onChange={onPuertoCargaViaje}
                optionLabel="estatusPuertoCargaViaje"
                placeholder="Seleccione Tipo Carga"
                valueTemplate={selectedPuertoCargaViajeTemplate}
                itemTemplate={puertoCargaViajeTemplate}
              />
            </div>

            <div className="field col-12 md:col-3">
              <label>Viaje Asociada</label>
              <Dropdown
                value={selectedViaje}
                options={viajes}
                onChange={onViaje}
                optionLabel="nombreViaje"
                placeholder="Seleccione Viaje"
                valueTemplate={selectedViajeTemplate}
                itemTemplate={viajeOptionTemplate}
              />
            </div>

            <div className="field col-12 md:col-3">
              <label>Estatus</label>
              <Dropdown
                value={selectedCargaViaje}
                options={estadoCargaViaje}
                onChange={onEstatusCargaViaje}
                optionLabel="estatusCargaViaje"
                placeholder="Seleccione Tipo Carga"
                valueTemplate={selectedestatusCargaViajeTemplate}
                itemTemplate={estatusCargaViajeOptionTemplate}
              />
            </div>
            <div className="field col-12 ">
              <label>Descripcion de CargaViaje:</label>
              <InputText
                value={CargaViajeData.descripcionCargaViaje}
                onChange={(e) =>
                  updateField(e.target.value, 'descripcionCargaViaje')
                }
              />
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="integeronly">Cantidad de Carga</label>
              <InputNumber
                inputId="integeronly"
                value={CargaViajeData.catidadPruductoCargaViaje}
                onValueChange={(e) =>
                  updateField(e.target.value, 'catidadPruductoCargaViaje')
                }
                suffix=" Bbls"
              />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="integeronly">fechaArriboCargaViaje</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateArriboCargaViaje !== null && dateArriboCargaViaje}
                onChange={(e) => {
                  setDateArriboCargaViaje(e.value)
                  updateField(e.target.value, 'fechaArriboCargaViaje')
                }}
                showTime
                locale="es"
                // hourFormat="12"
                showButtonBar
              />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="integeronly">fechaCompletacionCargaViaje</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={
                  dateCompletacionCargaViaje !== null &&
                  dateCompletacionCargaViaje
                }
                onChange={(e) => {
                  setDateCompletacionCargaViaje(e.value)
                  updateField(e.target.value, 'fechaCompletacionCargaViaje')
                }}
                showTime
                locale="es"
                // hourFormat="12"
                showButtonBar
              />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="integeronly">fechaZarpeCargaViaje</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateZarpeCargaViaje !== null && dateZarpeCargaViaje}
                onChange={(e) => {
                  setDateZarpeCargaViaje(e.value)
                  updateField(e.target.value, 'fechaZarpeCargaViaje')
                }}
                showTime
                locale="es"
                // hourFormat="12"
                showButtonBar
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="integeronly">Rata de Carga</label>
              <InputNumber
                inputId="integeronly"
                value={CargaViajeData.rataCargaViaje}
                onValueChange={(e) =>
                  updateField(e.target.value, 'rataCargaViaje')
                }
                suffix=" Bbls"
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="integeronly">Cantidad de Actual de Carga</label>
              <InputNumber
                inputId="integeronly"
                value={CargaViajeData.catidadActualCargaViaje}
                onValueChange={(e) =>
                  updateField(e.target.value, 'catidadActualCargaViaje')
                }
                suffix=" Bbls"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default CargaViajeForm
