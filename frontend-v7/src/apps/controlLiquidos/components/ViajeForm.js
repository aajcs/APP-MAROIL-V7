/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect, useRef } from 'react'
import { ViajeContext } from '../contexts/ViajeContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { Calendar } from 'primereact/calendar'

import moment from 'moment'
import { EmbarcacionContext } from '../contexts/EmbarcacionContext'
import { RemolcadorContext } from '../contexts/RemolcadorContext'
// import { CargaBodegaContext } from '../contexts/CargaBodegaContext'
// import flagplaceholder from '../assetsControl/flagplaceholder.png'

const ViajeForm = (props) => {
  const initialViajeForm = {
    id: null,
    nombreViaje: '',
    descripcionViaje: '',
    estatusViaje: '',
    destinoViaje: '',
    fechaInicioViaje: '',
    fechaFinViaje: '',
    embarcacion: '',
    remolcador: '',
    viajeCreado: moment(),
    viajeModificado: moment()
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
  const { createViaje, editViaje, updateViaje, createBodegaViaje1 } =
    useContext(ViajeContext)
  const { embarcacions } = useContext(EmbarcacionContext)
  const { remolcadors } = useContext(RemolcadorContext)
  const { isVisible, setIsVisible } = props
  const [selectedViaje, setSelectedViaje] = useState(null)
  const [selectedEmbarcacion, setSelectedEmbarcacion] = useState(null)
  const [selectedRemolcador, setSelectedRemolcador] = useState(null)
  const [selectedDestinoViaje, setSelectedDestinoViaje] = useState(null)

  const [dateFinal, setDateFinal] = useState(null)
  const [dateInicio, setDateInicio] = useState(null)
  const [viajeData, setViajeData] = useState(initialViajeForm)
  const estadoViaje = [
    { estatusViaje: 'INICIADO' },
    { estatusViaje: 'CULMINADO' }
  ]
  // const embarcacionlist = [
  //   { embarcacion: 'NASCA 1' },
  //   { embarcacion: 'INMACULADA' }
  // ]
  // const remolcadorlist = [
  //   { remolcador: 'MARE' },
  //   { remolcador: 'UMAY' },
  //   { remolcador: 'MOROCOTO' }
  // ]
  const destinoViajelist = [
    { destinoViaje: 'VENEZUELA' },
    { destinoViaje: 'DOMINICA' },
    { destinoViaje: 'SANTA LUCIA' },
    { destinoViaje: 'SAN VICENTE DE LAS GRANADINAS' },
    { destinoViaje: 'ST KITT AND NIEVES' }
  ]

  const onEstatusViaje = (e) => {
    setSelectedViaje(e.value)
    updateField(e.value.estatusViaje, 'estatusViaje')
  }
  const onEmbacacion = (e) => {
    setSelectedEmbarcacion(e.value)

    updateField(e.value.id, 'embarcacion')
  }

  const onRemolcador = (e) => {
    setSelectedRemolcador(e.value)
    updateField(e.value.id, 'remolcador')
  }
  const onDestinoViaje = (e) => {
    setSelectedDestinoViaje(e.value)
    updateField(e.value.destinoViaje, 'destinoViaje')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editViaje) {
      setViajeData({
        ...editViaje,
        embarcacion: editViaje.embarcacion && editViaje.embarcacion.id,
        remolcador: editViaje.remolcador && editViaje.remolcador[0].id
      })
      setSelectedViaje({
        estatusViaje: editViaje.estatusViaje
      })

      setSelectedEmbarcacion(editViaje.embarcacion)
      setSelectedRemolcador(editViaje.remolcador[0])
      setSelectedDestinoViaje({
        destinoViaje: editViaje.destinoViaje
      })

      setDateInicio(
        editViaje.fechaInicioViaje && moment(editViaje.fechaInicioViaje)._d
      )
      setDateFinal(
        editViaje.fechaFinViaje && moment(editViaje.fechaFinViaje)._d
      )
    }
  }, [editViaje])
  useEffect(() => {
    if (createBodegaViaje1) {
      createBodegaViaje(createBodegaViaje1)
    }
  }, [createBodegaViaje1])
  const createBodegaViaje = (saveViaje) => {
    const cargaBodega = {
      ViajeID: saveViaje.id,
      nombreBodega: '',
      estatusBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveViaje.cantidadBodegas)
    for (let i = 1; i <= saveViaje.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`

      // createCargaBodega(cargaBodega)
    }
    // ViajeService.create(CargaBodega, token).then((data) => {
    //   setViajes([...Viajes, data.saveViaje])
    //   console.log('Viaje creado', data.saveViaje)
    // })
  }

  const updateField = (data, field) => {
    setViajeData({
      ...viajeData,
      [field]: data
    })
  }
  const saveViaje = () => {
    if (!editViaje) {
      createViaje(viajeData)
    } else {
      updateViaje({
        ...viajeData,
        // embarcacion: viajeData.embarcacion.id,
        // remolcador: editViaje.remolcador[0].id,
        viajeModificado: moment()
      })
    }
    setViajeData(initialViajeForm)
    setIsVisible(false)
    setSelectedViaje('')
    setSelectedEmbarcacion('')
    setSelectedRemolcador('')
    setSelectedDestinoViaje('')

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
      <Button label="Guardar" icon="pi pi-check" onClick={saveViaje} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setViajeData(initialViajeForm)
    setSelectedViaje('')
    setSelectedEmbarcacion('')
    setSelectedRemolcador('')
    setSelectedDestinoViaje('')
    setDateInicio(null)
    setDateFinal(null)
  }
  const selectedestatusViajeTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusViaje}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusViajeOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusViaje}</div>
      </div>
    )
  }
  const selectedEmbarcacionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.nombreEmbarcacion}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const embarcacionOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.nombreEmbarcacion}</div>
      </div>
    )
  }
  const selectedRemolcadorTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.nombreRemolcador}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const remolcadorOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.nombreRemolcador}</div>
      </div>
    )
  }
  const selectedDestinoViajeTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.destinoViaje}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const destinoViajeOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.destinoViaje}</div>
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
        header="Detalles de la Viaje"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid">
            <div className="field col-12 md:col-3">
              <label>Nombre Viaje:</label>
              <InputText
                value={viajeData.nombreViaje}
                onChange={(e) => updateField(e.target.value, 'nombreViaje')}
              />
            </div>

            <div className="field col-12 md:col-3">
              <label>Embacacion Asociada</label>
              <Dropdown
                value={selectedEmbarcacion}
                options={embarcacions}
                onChange={onEmbacacion}
                optionLabel="nombreEmbarcacion"
                placeholder="Seleccione Embarcacion"
                valueTemplate={selectedEmbarcacionTemplate}
                itemTemplate={embarcacionOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label>Remolcador Asociado</label>
              <Dropdown
                value={selectedRemolcador}
                options={remolcadors}
                onChange={onRemolcador}
                optionLabel="nombreRemolcador"
                placeholder="Seleccione remolcador"
                valueTemplate={selectedRemolcadorTemplate}
                itemTemplate={remolcadorOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label>Estatus</label>
              <Dropdown
                value={selectedViaje}
                options={estadoViaje}
                onChange={onEstatusViaje}
                optionLabel="estatusViaje"
                placeholder="Seleccione Tipo Carga"
                valueTemplate={selectedestatusViajeTemplate}
                itemTemplate={estatusViajeOptionTemplate}
              />
            </div>
            <div className="field col-12 ">
              <label>Descripcion de Viaje:</label>
              <InputText
                value={viajeData.descripcionViaje}
                onChange={(e) =>
                  updateField(e.target.value, 'descripcionViaje')
                }
              />
            </div>
            <div className="field col-12 md:col-4">
              <label>Destino</label>
              <Dropdown
                value={selectedDestinoViaje}
                options={destinoViajelist}
                onChange={onDestinoViaje}
                optionLabel="estatusDestinoViaje"
                placeholder="Seleccione Destino"
                valueTemplate={selectedDestinoViajeTemplate}
                itemTemplate={destinoViajeOptionTemplate}
              />
            </div>

            <div className="field col-12 md:col-3">
              <label>Fecha Inicio Carga</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateInicio !== null && dateInicio}
                onChange={(e) => {
                  setDateInicio(e.value)
                  updateField(e.target.value, 'fechaInicioViaje')
                }}
                showTime
                locale="es"
                // hourFormat="12"
                showButtonBar
              />
            </div>
            <div className="field col-12 md:col-3">
              <label>Fecha Final Carga</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateFinal !== null && dateFinal}
                onChange={(e) => {
                  setDateFinal(e.value)
                  updateField(e.target.value, 'fechaFinViaje')
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

export default ViajeForm
