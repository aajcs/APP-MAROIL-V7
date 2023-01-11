/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect, useRef } from 'react'
import { GastosOperacionaleContext } from '../contexts/GastosOperacionaleContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { InputNumber } from 'primereact/inputnumber'

import moment from 'moment'
import { EmbarcacionContext } from '../contexts/EmbarcacionContext'
import { RemolcadorContext } from '../contexts/RemolcadorContext'
import { ViajeContext } from '../contexts/ViajeContext'
import { Calendar } from 'primereact/calendar'

const GastosOperacionaleForm = (props) => {
  const initialGastosOperacionaleForm = {
    id: null,
    nombreGastosOperacionale: '',
    montoGastosOperacionale: 0,
    descripcionGastosOperacionale: '',
    fechaGastosOperacionale: '',
    estatusGastosOperacionale: '',
    embarcacion: null,
    remolcador: null,
    viaje: null,
    gastosOperacionaleCreado: moment(),
    gastosOperacionaleModificado: moment()
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
    createGastosOperacionale,
    editGastosOperacionale,
    updateGastosOperacionale,
    createBodegaGastosOperacionale1
  } = useContext(GastosOperacionaleContext)
  const { embarcacions } = useContext(EmbarcacionContext)
  const { remolcadors } = useContext(RemolcadorContext)
  const { viajes } = useContext(ViajeContext)
  const { isVisible, setIsVisible } = props
  const [selectedGastosOperacionale, setSelectedGastosOperacionale] =
    useState(null)

  const [
    selectedNombreGastosOperacionale,
    setSelectedNombreGastosOperacionale
  ] = useState(null)
  const [GastosOperacionaleData, setGastosOperacionaleData] = useState(
    initialGastosOperacionaleForm
  )

  const [selectedEmbarcacion, setSelectedEmbarcacion] = useState(null)
  const [selectedRemolcador, setSelectedRemolcador] = useState(null)
  const [selectedViaje, setSelectedViaje] = useState(null)
  const [dateFechaGasto, setDateFechaGasto] = useState(null)
  const estadoGastosOperacionale = [
    { estatusGastosOperacionale: 'NEGADO' },
    { estatusGastosOperacionale: 'VERIFICACION' },
    { estatusGastosOperacionale: 'APROBADO' }
  ]
  const nombreGastosOperacionaleList = [
    { nombreGastosOperacionale: 'PERSONAL' },
    { nombreGastosOperacionale: 'COMBUSTIBLE' },
    { nombreGastosOperacionale: 'AGUA' },
    { nombreGastosOperacionale: 'SERVICO' },
    { nombreGastosOperacionale: 'VIVERES' },
    { nombreGastosOperacionale: 'OTROS' }
  ]
  const onEstatusGastosOperacionale = (e) => {
    setSelectedGastosOperacionale(e.value)
    updateField(e.value.estatusGastosOperacionale, 'estatusGastosOperacionale')
  }

  const onNombreGastosOperacionale = (e) => {
    setSelectedNombreGastosOperacionale(e.value)
    updateField(e.value.nombreGastosOperacionale, 'nombreGastosOperacionale')
  }
  const onEmbacacion = (e) => {
    e.value
      ? (setSelectedEmbarcacion(e.value),
        updateField(e.value.id, 'embarcacion'))
      : (setSelectedEmbarcacion(null), updateField(null, 'embarcacion'))
  }

  const onRemolcador = (e) => {
    e.value
      ? (setSelectedRemolcador(e.value), updateField(e.value.id, 'remolcador'))
      : (setSelectedRemolcador(null), updateField(null, 'remolcador'))
  }
  const onViaje = (e) => {
    e.value
      ? (setSelectedViaje(e.value), updateField(e.value.id, 'viaje'))
      : (setSelectedViaje(null), updateField(null, 'viaje'))
  }
  const toast = useRef(null)

  useEffect(() => {
    if (editGastosOperacionale) {
      setGastosOperacionaleData({
        ...editGastosOperacionale,
        viaje: editGastosOperacionale.viaje && editGastosOperacionale.viaje.id,
        embarcacion:
          editGastosOperacionale.embarcacion &&
          editGastosOperacionale.embarcacion.id,
        remolcador:
          editGastosOperacionale.remolcador &&
          editGastosOperacionale.remolcador.id
      })

      const embarcacionSelecEdit =
        editGastosOperacionale.embarcacion &&
        embarcacions.find((p) => p.id === editGastosOperacionale.embarcacion.id)

      setSelectedEmbarcacion(embarcacionSelecEdit)
      const remolcadorSelecEdit =
        editGastosOperacionale.remolcador &&
        remolcadors.find((p) => p.id === editGastosOperacionale.remolcador.id)

      setSelectedRemolcador(remolcadorSelecEdit)
      const viajeSelecEdit =
        editGastosOperacionale.viaje &&
        viajes.find((p) => p.id === editGastosOperacionale.viaje.id)

      setSelectedViaje(viajeSelecEdit)
      setSelectedGastosOperacionale({
        estatusGastosOperacionale:
          editGastosOperacionale.estatusGastosOperacionale
      })

      setSelectedNombreGastosOperacionale({
        nombreGastosOperacionale:
          editGastosOperacionale.nombreGastosOperacionale
      })
      setDateFechaGasto(
        editGastosOperacionale.fechaGastosOperacionale &&
          moment(editGastosOperacionale.fechaGastosOperacionale)._d
      )
    }
  }, [editGastosOperacionale])
  useEffect(() => {
    if (createBodegaGastosOperacionale1) {
      createBodegaGastosOperacionale(createBodegaGastosOperacionale1)
    }
  }, [createBodegaGastosOperacionale1])
  const createBodegaGastosOperacionale = (saveGastosOperacionale) => {
    const cargaBodega = {
      GastosOperacionaleID: saveGastosOperacionale.id,
      nombreBodega: '',
      estatusBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveGastosOperacionale.cantidadBodegas)
    for (let i = 1; i <= saveGastosOperacionale.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`

      // createCargaBodega(cargaBodega)
    }
    // GastosOperacionaleService.create(CargaBodega, token).then((data) => {
    //   setGastosOperacionales([...GastosOperacionales, data.saveGastosOperacionale])
    //   console.log('GastosOperacionale creado', data.saveGastosOperacionale)
    // })
  }

  const updateField = (data, field) => {
    setGastosOperacionaleData({
      ...GastosOperacionaleData,
      [field]: data
    })
  }

  const saveGastosOperacionale = () => {
    if (!editGastosOperacionale) {
      createGastosOperacionale(GastosOperacionaleData)
    } else {
      updateGastosOperacionale({
        ...GastosOperacionaleData,
        GastosOperacionaleModificado: moment()
      })
    }
    setGastosOperacionaleData(initialGastosOperacionaleForm)
    setIsVisible(false)
    setSelectedGastosOperacionale('')
    setSelectedNombreGastosOperacionale('')
    setDateFechaGasto(null)
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
        onClick={saveGastosOperacionale}
      />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setGastosOperacionaleData(initialGastosOperacionaleForm)
    setSelectedGastosOperacionale('')
    setSelectedNombreGastosOperacionale('')
    setDateFechaGasto(null)
  }
  const selectedestatusGastosOperacionaleTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusGastosOperacionale}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusGastosOperacionaleOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusGastosOperacionale}</div>
      </div>
    )
  }

  const selectedNombreGastosOperacionaleTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.nombreGastosOperacionale}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const nombreGastosOperacionaleOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.nombreGastosOperacionale}</div>
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
  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '40vw' }}
        header="Detalles de la GastosOperacionale"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label ">
            <InputText
              value={GastosOperacionaleData.descripcionGastosOperacionale}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionGastosOperacionale')
              }
            />
            <label>Descripcion :</label>
          </div>
          <div className="formgrid grid mt-3">
            {' '}
            <div className="field col-12 md:col-6">
              <label>Nombre del Gastos</label>
              <Dropdown
                value={selectedNombreGastosOperacionale}
                options={nombreGastosOperacionaleList}
                onChange={onNombreGastosOperacionale}
                optionLabel="nombreGastosOperacionale"
                placeholder="Seleccione Nombre"
                valueTemplate={selectedNombreGastosOperacionaleTemplate}
                itemTemplate={nombreGastosOperacionaleOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Viaje Asociado</label>
              <Dropdown
                value={selectedViaje}
                options={viajes}
                onChange={onViaje}
                optionLabel="nombreViaje"
                placeholder="Seleccione Viaje"
                valueTemplate={selectedViajeTemplate}
                itemTemplate={viajeOptionTemplate}
                showClear
                filter
                filterBy="nombreViaje"
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Embacacion Asociada</label>
              <Dropdown
                value={selectedEmbarcacion}
                options={embarcacions}
                onChange={onEmbacacion}
                optionLabel="nombreEmbarcacion"
                placeholder="Seleccione Embarcacion"
                valueTemplate={selectedEmbarcacionTemplate}
                itemTemplate={embarcacionOptionTemplate}
                showClear
                filter
                filterBy="nombreEmbarcacion"
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Remolcador Asociado</label>
              <Dropdown
                value={selectedRemolcador}
                options={remolcadors}
                onChange={onRemolcador}
                optionLabel="nombreRemolcador"
                placeholder="Seleccione remolcador"
                valueTemplate={selectedRemolcadorTemplate}
                itemTemplate={remolcadorOptionTemplate}
                showClear
                filter
                filterBy="nombreEmbarcacion"
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="integeronly">Monto del Gasto</label>
              <InputNumber
                inputId="integeronly"
                value={GastosOperacionaleData.montoGastosOperacionale}
                onValueChange={(e) =>
                  updateField(e.target.value, 'montoGastosOperacionale')
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedGastosOperacionale}
                options={estadoGastosOperacionale}
                onChange={onEstatusGastosOperacionale}
                optionLabel="estatusGastosOperacionale"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusGastosOperacionaleTemplate}
                itemTemplate={estatusGastosOperacionaleOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label>Fecha FechaGasto Carga</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateFechaGasto !== null && dateFechaGasto}
                onChange={(e) => {
                  setDateFechaGasto(e.value)
                  updateField(e.target.value, 'fechaGastosOperacionale')
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

export default GastosOperacionaleForm
