/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect, useRef } from 'react'
import { ViajeAuxContext } from '../contexts/ViajeAuxContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { Calendar } from 'primereact/calendar'

import moment from 'moment'
import { ViajeContext } from '../contexts/ViajeContext'

// import { CargaBodegaContext } from '../contexts/CargaBodegaContext'
// import flagplaceholder from '../assetsControl/flagplaceholder.png'

const ViajeAuxForm = (props) => {
  const initialViajeAuxForm = {
    id: null,
    descripcionViajeAux: '',
    paisViajeAux: '',
    estatusViajeAux: '',
    fechaArriboViajeAux: '',
    fechaZarpeViajeAux: '',
    viaje: null,
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
    createViajeAux,
    editViajeAux,
    updateViajeAux,
    createBodegaViajeAux1
  } = useContext(ViajeAuxContext)
  const { viajes } = useContext(ViajeContext)

  // const { createCargaBodega } = useContext(CargaBodegaContext)
  const { isVisible, setIsVisible } = props
  const [selectedViajeAux, setSelectedViajeAux] = useState(null)
  const [selectedViaje, setSelectedViaje] = useState(null)

  const [selectedPaisViajeAux, setSelectedPaisViajeAux] = useState(null)

  const [dateZarpeViajeAux, setDateZarpeViajeAux] = useState(null)
  const [dateArriboViajeAux, setDateArriboViajeAux] = useState(null)
  const [viajeAuxData, setviajeAuxData] = useState(initialViajeAuxForm)
  const estadoViajeAux = [
    { estatusViajeAux: 'INICIADO' },
    { estatusViajeAux: 'CULMINADO' }
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

  const paisViajeAuxlist = [
    { paisViajeAux: 'VENEZUELA' },
    { paisViajeAux: 'DOMINICA' },
    { paisViajeAux: 'SANTA LUCIA' },
    { paisViajeAux: 'SAN VICENTE DE LAS GRANADINAS' },
    { paisViajeAux: 'ST KITT AND NIEVES' }
  ]
  const onEstatusViajeAux = (e) => {
    setSelectedViajeAux(e.value)
    updateField(e.value.estatusViajeAux, 'estatusViajeAux')
  }
  const onViaje = (e) => {
    // eslint-disable-next-line no-unused-expressions
    e.value
      ? (setSelectedViaje(e.value), updateField(e.value.id, 'viaje'))
      : (setSelectedViaje(null), updateField(null, 'viaje'))
  }

  const onPaisViajeAux = (e) => {
    setSelectedPaisViajeAux(e.value)
    updateField(e.value.paisViajeAux, 'paisViajeAux')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editViajeAux) {
      setviajeAuxData({
        ...editViajeAux,
        viaje: editViajeAux.viaje && editViajeAux.viaje.id
      })

      setSelectedViajeAux({
        estatusViajeAux: editViajeAux.estatusViajeAux
      })
      setSelectedPaisViajeAux({
        paisViajeAux: editViajeAux.paisViajeAux
      })

      const viajeSelecEdit =
        editViajeAux.viaje && viajes.find((p) => p.id === editViajeAux.viaje.id)

      setSelectedViaje(viajeSelecEdit)
      setDateArriboViajeAux(
        editViajeAux.fechaArriboViajeAux &&
          moment(editViajeAux.fechaArriboViajeAux)._d
      )
      setDateZarpeViajeAux(
        editViajeAux.fechaZarpeViajeAux &&
          moment(editViajeAux.fechaZarpeViajeAux)._d
      )
    }
  }, [editViajeAux])
  useEffect(() => {
    if (createBodegaViajeAux1) {
      createBodegaViajeAux(createBodegaViajeAux1)
    }
  }, [createBodegaViajeAux1])
  const createBodegaViajeAux = (saveViajeAux) => {
    const cargaBodega = {
      ViajeAuxID: saveViajeAux.id,
      nombreBodega: '',
      estatusBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveViajeAux.cantidadBodegas)
    for (let i = 1; i <= saveViajeAux.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`

      // createCargaBodega(cargaBodega)
    }
    // ViajeAuxService.create(CargaBodega, token).then((data) => {
    //   setViajeAuxs([...ViajeAuxs, data.saveViajeAux])
    //   console.log('ViajeAux creado', data.saveViajeAux)
    // })
  }

  const updateField = (data, field) => {
    setviajeAuxData({
      ...viajeAuxData,
      [field]: data
    })
  }

  const saveViajeAux = () => {
    if (!editViajeAux) {
      createViajeAux(viajeAuxData)
    } else {
      updateViajeAux({
        ...viajeAuxData,

        ViajeAuxModificado: moment()
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
      <Button label="Guardar" icon="pi pi-check" onClick={saveViajeAux} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setviajeAuxData(initialViajeAuxForm)
    setSelectedViajeAux('')

    setSelectedPaisViajeAux(null)

    setSelectedViaje(null)
    setDateZarpeViajeAux(null)
    setDateArriboViajeAux(null)
  }
  const selectedestatusViajeAuxTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusViajeAux}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusViajeAuxOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusViajeAux}</div>
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

  const paisViajeAuxTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.paisViajeAux}</div>
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
        header="Detalles de la ViajeAux"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid">
            <div className="field col-12 md:col-3">
              <label>paisViajeAux</label>
              <Dropdown
                value={selectedPaisViajeAux}
                options={paisViajeAuxlist}
                onChange={onPaisViajeAux}
                optionLabel="estatusPaisViajeAux"
                placeholder="Seleccione Tipo Carga"
                valueTemplate={selectedPaisViajeAuxTemplate}
                itemTemplate={paisViajeAuxTemplate}
              />
            </div>

            <div className="field col-12 md:col-3">
              <label>Viaje Asociado</label>
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
                value={selectedViajeAux}
                options={estadoViajeAux}
                onChange={onEstatusViajeAux}
                optionLabel="estatusViajeAux"
                placeholder="Seleccione Tipo Carga"
                valueTemplate={selectedestatusViajeAuxTemplate}
                itemTemplate={estatusViajeAuxOptionTemplate}
              />
            </div>
            <div className="field col-12 ">
              <label>Descripcion de ViajeAux:</label>
              <InputText
                value={viajeAuxData.descripcionViajeAux}
                onChange={(e) =>
                  updateField(e.target.value, 'descripcionViajeAux')
                }
              />
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="integeronly">fechaArriboViajeAux</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateArriboViajeAux !== null && dateArriboViajeAux}
                onChange={(e) => {
                  setDateArriboViajeAux(e.value)
                  updateField(e.target.value, 'fechaArriboViajeAux')
                }}
                showTime
                locale="es"
                // hourFormat="12"
                showButtonBar
              />
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="integeronly">fechaZarpeViajeAux</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateZarpeViajeAux !== null && dateZarpeViajeAux}
                onChange={(e) => {
                  setDateZarpeViajeAux(e.value)
                  updateField(e.target.value, 'fechaZarpeViajeAux')
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

export default ViajeAuxForm
