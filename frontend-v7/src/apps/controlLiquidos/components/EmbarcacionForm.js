/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect, useRef } from 'react'
import { EmbarcacionContext } from '../contexts/EmbarcacionContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { InputNumber } from 'primereact/inputnumber'

import moment from 'moment'
// import { CargaBodegaContext } from '../contexts/CargaBodegaContext'
// import flagplaceholder from '../assetsControl/flagplaceholder.png'

const EmbarcacionForm = (props) => {
  const initialEmbarcacionForm = {
    id: null,
    nombreEmbarcacion: '',
    descripcionEmbarcacion: '',
    estatusEmbarcacion: '',
    ubicacionEmbarcacion: '',
    EmbarcacionCreado: moment(),
    EmbarcacionModificado: moment()
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
    createEmbarcacion,
    editEmbarcacion,
    updateEmbarcacion,
    createBodegaEmbarcacion1
  } = useContext(EmbarcacionContext)
  // const { createCargaBodega } = useContext(CargaBodegaContext)
  const { isVisible, setIsVisible } = props
  const [selectedEmbarcacion, setSelectedEmbarcacion] = useState(null)
  const [selectedUbicacionEmbarcacion, setSelectedUbicacionEmbarcacion] =
    useState(null)
  const [EmbarcacionData, setEmbarcacionData] = useState(initialEmbarcacionForm)
  const estadoEmbarcacion = [
    { estatusEmbarcacion: 'OPERATIVO' },
    { estatusEmbarcacion: 'CULMINADO' }
  ]
  const ubicacionEmbarcacionList = [
    { ubicacionEmbarcacion: 'FONDEADO' },
    { ubicacionEmbarcacion: 'MANTENIMIENTO' },
    { ubicacionEmbarcacion: 'CARGANDO' },
    { ubicacionEmbarcacion: 'DESCARGANDO' },
    { ubicacionEmbarcacion: 'TRAVESIA' }
  ]
  const onEstatusEmbarcacion = (e) => {
    setSelectedEmbarcacion(e.value)
    updateField(e.value.estatusEmbarcacion, 'estatusEmbarcacion')
  }
  const onUbicacionEmbarcacion = (e) => {
    setSelectedUbicacionEmbarcacion(e.value)
    updateField(e.value.ubicacionEmbarcacion, 'ubicacionEmbarcacion')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editEmbarcacion) {
      setEmbarcacionData(editEmbarcacion)
      setSelectedEmbarcacion({
        estatusEmbarcacion: editEmbarcacion.estatusEmbarcacion
      })
      setSelectedUbicacionEmbarcacion({
        ubicacionEmbarcacion: editEmbarcacion.ubicacionEmbarcacion
      })
    }
  }, [editEmbarcacion])
  useEffect(() => {
    if (createBodegaEmbarcacion1) {
      createBodegaEmbarcacion(createBodegaEmbarcacion1)
    }
  }, [createBodegaEmbarcacion1])
  const createBodegaEmbarcacion = (saveEmbarcacion) => {
    const cargaBodega = {
      EmbarcacionID: saveEmbarcacion.id,
      nombreBodega: '',
      estatusBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveEmbarcacion.cantidadBodegas)
    for (let i = 1; i <= saveEmbarcacion.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`

      // createCargaBodega(cargaBodega)
    }
    // EmbarcacionService.create(CargaBodega, token).then((data) => {
    //   setEmbarcacions([...Embarcacions, data.saveEmbarcacion])
    //   console.log('Embarcacion creado', data.saveEmbarcacion)
    // })
  }

  const updateField = (data, field) => {
    setEmbarcacionData({
      ...EmbarcacionData,
      [field]: data
    })
  }

  const saveEmbarcacion = () => {
    if (!editEmbarcacion) {
      createEmbarcacion(EmbarcacionData)
    } else {
      updateEmbarcacion({
        ...EmbarcacionData,
        EmbarcacionModificado: moment()
      })
    }
    setEmbarcacionData(initialEmbarcacionForm)
    setIsVisible(false)
    setSelectedEmbarcacion('')
    setSelectedUbicacionEmbarcacion('')
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveEmbarcacion} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setEmbarcacionData(initialEmbarcacionForm)
    setSelectedEmbarcacion('')
    setSelectedUbicacionEmbarcacion('')
  }
  const selectedestatusEmbarcacionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusEmbarcacion}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusEmbarcacionOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusEmbarcacion}</div>
      </div>
    )
  }
  const selectedUbicacionEmbarcacionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.ubicacionEmbarcacion}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const ubicacionEmbarcacionOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.ubicacionEmbarcacion}</div>
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
        header="Detalles de la Embarcacion"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={EmbarcacionData.nombreEmbarcacion}
              onChange={(e) => updateField(e.target.value, 'nombreEmbarcacion')}
            />
            <label>Nombre Embarcacion:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={EmbarcacionData.descripcionEmbarcacion}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionEmbarcacion')
              }
            />
            <label>Descripcion :</label>
          </div>

          <div className="formgrid grid mt-3">
            <div className="field col-12 md:col-6">
              <label htmlFor="integeronly">Combustible Actual</label>
              <InputNumber
                inputId="integeronly"
                value={EmbarcacionData.combustibleActualEmbarcacion}
                onValueChange={(e) =>
                  updateField(e.target.value, 'combustibleActualEmbarcacion')
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="integeronly">Combustible Capacidad</label>
              <InputNumber
                inputId="integeronly"
                value={EmbarcacionData.combustibleCapacidadEmbarcacion}
                onValueChange={(e) =>
                  updateField(e.target.value, 'combustibleCapacidadEmbarcacion')
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedEmbarcacion}
                options={estadoEmbarcacion}
                onChange={onEstatusEmbarcacion}
                optionLabel="estatusEmbarcacion"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusEmbarcacionTemplate}
                itemTemplate={estatusEmbarcacionOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Actividad</label>
              <Dropdown
                value={selectedUbicacionEmbarcacion}
                options={ubicacionEmbarcacionList}
                onChange={onUbicacionEmbarcacion}
                optionLabel="ubicacionEmbarcacion"
                placeholder="Seleccione Ubicacion"
                valueTemplate={selectedUbicacionEmbarcacionTemplate}
                itemTemplate={ubicacionEmbarcacionOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default EmbarcacionForm
