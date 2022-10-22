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
import { ViajeAuxContext } from '../contexts/ViajeAuxContext'

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
    catidadActualCargaViaje: '',
    catidadPruductoCargaViaje: '',
    rataCargaViaje: '',
    viajeAux: '',
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
  const { viajeAuxs } = useContext(ViajeAuxContext)

  // const { createCargaBodega } = useContext(CargaBodegaContext)
  const { isVisible, setIsVisible } = props
  const [selectedCargaViaje, setSelectedCargaViaje] = useState(null)
  const [selectedViaje, setSelectedViaje] = useState(null)
  const [paisViajeAux, setPaisViajeAux] = useState(null)
  const [selectedPaisViajeAux, setSelectedPaisViajeAux] = useState(null)

  const [selectedTipoCargaViaje, setSelectedTipoCargaViaje] = useState(null)
  const [selectedProductoCargaViaje, setSelectedProductoCargaViaje] =
    useState(null)
  const [selectedPuertoCargaViaje, setSelectedPuertoCargaViaje] = useState(null)

  const [dateInicioCargaViaje, setDateInicioCargaViaje] = useState(null)
  const [dateFinCargaViaje, setDateFinCargaViaje] = useState(null)
  const [disabledPaisAsociado, setDisabledPaisAsociado] = useState(true)

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
    { puertoCargaViaje: 'GUARAGUAO' },
    { puertoCargaViaje: 'WOODBRIDGE BAY PORT' },
    { puertoCargaViaje: 'SANTA LUCIA' },
    { puertoCargaViaje: 'SAN VICENTE DE LAS GRANADINAS' },
    { puertoCargaViaje: 'BASSETERRE BAY' }
  ]
  const onEstatusCargaViaje = (e) => {
    setSelectedCargaViaje(e.value)
    updateField(e.value.estatusCargaViaje, 'estatusCargaViaje')
  }
  const onViaje = (e) => {
    setSelectedViaje(e.value)
    updateField(e.value.id, 'viaje')
    setDisabledPaisAsociado(false)
    const viajeAuxFilter = viajeAuxs.filter(
      (p) => p.viaje.id === e.value.id && p
    )
    setPaisViajeAux(viajeAuxFilter)
  }
  const OnPaisViajeAux = (e) => {
    setSelectedPaisViajeAux(e.value)
    updateField(e.value.id, 'viajeAux')
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
      setCargaViajeData({
        ...editCargaViaje,
        viajeAux: editCargaViaje.viajeAux && editCargaViaje.viajeAux.id
      })

      const viajeSelecEdit =
        editCargaViaje.viajeAux &&
        viajeAuxs.find((p) => p.id === editCargaViaje.viajeAux.id)
      setSelectedPaisViajeAux(viajeSelecEdit)
      setSelectedCargaViaje({
        estatusCargaViaje: editCargaViaje.estatusCargaViaje
      })

      setSelectedTipoCargaViaje({
        tipoCargaViaje: editCargaViaje.tipoCargaViaje
      })
      setSelectedPuertoCargaViaje({
        puertoCargaViaje: editCargaViaje.puertoCargaViaje
      })
      setSelectedProductoCargaViaje({
        productoCargaViaje: editCargaViaje.productoCargaViaje
      })
      setDateFinCargaViaje(
        editCargaViaje.fechaFinCargaViaje &&
          moment(editCargaViaje.fechaFinCargaViaje)._d
      )
      setDateInicioCargaViaje(
        editCargaViaje.fechaInicioCargaViaje &&
          moment(editCargaViaje.fechaInicioCargaViaje)._d
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
  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Mensaje de Error',
      detail: 'Selecione el Pais Asociado',
      life: 3000
    })
  }
  const saveCargaViaje = () => {
    if (selectedPaisViajeAux) {
      if (!editCargaViaje) {
        createCargaViaje(CargaViajeData)
      } else {
        updateCargaViaje({
          ...CargaViajeData,
          CargaViajeModificado: moment()
        })
      }
      clearSelected()
    } else {
      showError()
    }
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
    setSelectedCargaViaje(null)
    setSelectedViaje(null)
    setSelectedTipoCargaViaje('')
    setDateInicioCargaViaje(null)

    setDateFinCargaViaje(null)
    setDisabledPaisAsociado(true)

    setPaisViajeAux(null)
    setSelectedPaisViajeAux(null)
    setSelectedProductoCargaViaje(null)
    setSelectedPuertoCargaViaje(null)
    setDateFinCargaViaje(null)
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
  const selectedPaisViajeAuxTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.paisViajeAux}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const paisViajeAuxOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.paisViajeAux}</div>
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
        style={{ width: '50vw' }}
        header="Detalles de la CargaViaje"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid">
            <div className="field col-12 md:col-4">
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
            <div className="field col-12 md:col-4">
              <label>Pais Asociado</label>
              <Dropdown
                value={selectedPaisViajeAux}
                options={paisViajeAux || viajeAuxs}
                onChange={OnPaisViajeAux}
                optionLabel="paisViajeAux"
                placeholder="Seleccione paisViajeAux"
                valueTemplate={selectedPaisViajeAuxTemplate}
                itemTemplate={paisViajeAuxOptionTemplate}
                disabled={disabledPaisAsociado}
                className={disabledPaisAsociado ? 'p-invalid' : ''}
              />
            </div>
            <div className="field col-12 md:col-4">
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
            <div className="field col-12 md:col-4">
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
            <div className="field col-12 md:col-4">
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

            <div className="field col-12 md:col-4">
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
                suffix=" Bbls(GSV)"
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
                suffix=" Bbls(GSV)"
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
                suffix=" Bbls(GSV)"
              />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="integeronly">Fecha Inicio</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateInicioCargaViaje !== null && dateInicioCargaViaje}
                onChange={(e) => {
                  setDateInicioCargaViaje(e.value)
                  updateField(e.target.value, 'fechaInicioCargaViaje')
                }}
                showTime
                locale="es"
                // hourFormat="12"
                showButtonBar
              />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="integeronly">Fecha Fin</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateFinCargaViaje !== null && dateFinCargaViaje}
                onChange={(e) => {
                  setDateFinCargaViaje(e.value)
                  updateField(e.target.value, 'fechaFinCargaViaje')
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

export default CargaViajeForm
