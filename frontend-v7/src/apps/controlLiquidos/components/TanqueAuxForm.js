/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect, useRef } from 'react'
import { TanqueAuxContext } from '../contexts/TanqueAuxContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { InputNumber } from 'primereact/inputnumber'

import moment from 'moment'
import { EmbarcacionContext } from '../contexts/EmbarcacionContext'
// import { CargaBodegaContext } from '../contexts/CargaBodegaContext'
// import flagplaceholder from '../assetsControl/flagplaceholder.png'

const TanqueAuxForm = (props) => {
  const initialTanqueAuxForm = {
    id: null,
    nombreTanqueAux: '',
    descripcionTanqueAux: '',
    estatusTanqueAux: '',
    ubicacionTanqueAux: '',
    volumenActualTanqueAux: 0,
    volumenCapacidadTanqueAux: 0,
    tipoCargaTanqueAux: '',
    embarcacion: '',
    tanqueAuxCreado: moment(),
    tanqueAuxModificado: moment()
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
    createTanqueAux,
    editTanqueAux,
    updateTanqueAux,
    createBodegaTanqueAux1
  } = useContext(TanqueAuxContext)
  const { embarcacions } = useContext(EmbarcacionContext)

  // const { createCargaBodega } = useContext(CargaBodegaContext)
  const { isVisible, setIsVisible } = props
  const [selectedTanqueAux, setSelectedTanqueAux] = useState(null)
  const [selectedUbicacionTanqueAux, setSelectedUbicacionTanqueAux] =
    useState(null)
  const [selectedTipoCargaTanqueAux, setSelectedTipoCargaTanqueAux] =
    useState(null)
  const [tanqueAuxData, setTanqueAuxData] = useState(initialTanqueAuxForm)
  const [selectedEmbarcacion, setSelectedEmbarcacion] = useState(null)
  const estadoTanqueAux = [
    { estatusTanqueAux: 'OPERATIVO' },
    { estatusTanqueAux: 'CULMINADO' }
  ]
  const ubicacionTanqueAuxList = [
    { ubicacionTanqueAux: 'BABOR' },
    { ubicacionTanqueAux: 'ESTRIBOR' }
  ]
  const tipoCargaTanqueAuxlist = [
    { tipoCargaTanqueAux: 'GASOLINA' },
    { tipoCargaTanqueAux: 'DIESEL' }
  ]
  const onEstatusTanqueAux = (e) => {
    setSelectedTanqueAux(e.value)
    updateField(e.value.estatusTanqueAux, 'estatusTanqueAux')
  }
  const onUbicacionTanqueAux = (e) => {
    setSelectedUbicacionTanqueAux(e.value)
    updateField(e.value.ubicacionTanqueAux, 'ubicacionTanqueAux')
  }
  const onEmbacacion = (e) => {
    setSelectedEmbarcacion(e.value)
    updateField(e.value.id, 'embarcacion')
  }
  const onTipoCargaTanqueAux = (e) => {
    setSelectedTipoCargaTanqueAux(e.value)
    updateField(e.value.tipoCargaTanqueAux, 'tipoCargaTanqueAux')
  }
  const toast = useRef(null)

  useEffect(() => {
    if (editTanqueAux) {
      setTanqueAuxData(editTanqueAux)
      setSelectedEmbarcacion(editTanqueAux.embarcacion)
      setSelectedTanqueAux({
        estatusTanqueAux: editTanqueAux.estatusTanqueAux
      })
      setSelectedUbicacionTanqueAux({
        ubicacionTanqueAux: editTanqueAux.ubicacionTanqueAux
      })
      setSelectedTipoCargaTanqueAux({
        tipoCargaTanqueAux: editTanqueAux.tipoCargaTanqueAux
      })
    }
  }, [editTanqueAux])
  useEffect(() => {
    if (createBodegaTanqueAux1) {
      createBodegaTanqueAux(createBodegaTanqueAux1)
    }
  }, [createBodegaTanqueAux1])
  const createBodegaTanqueAux = (saveTanqueAux) => {
    const cargaBodega = {
      TanqueAuxID: saveTanqueAux.id,
      nombreBodega: '',
      estatusBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveTanqueAux.cantidadBodegas)
    for (let i = 1; i <= saveTanqueAux.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`

      // createCargaBodega(cargaBodega)
    }
    // TanqueAuxService.create(CargaBodega, token).then((data) => {
    //   setTanqueAuxs([...TanqueAuxs, data.saveTanqueAux])
    //   console.log('TanqueAux creado', data.saveTanqueAux)
    // })
  }

  const updateField = (data, field) => {
    setTanqueAuxData({
      ...tanqueAuxData,
      [field]: data
    })
  }

  const saveTanqueAux = () => {
    if (!editTanqueAux) {
      createTanqueAux(tanqueAuxData)
    } else {
      updateTanqueAux({
        ...tanqueAuxData,
        embarcacion: tanqueAuxData.embarcacion.id,
        TanqueAuxModificado: moment()
      })
    }
    setTanqueAuxData(initialTanqueAuxForm)
    setIsVisible(false)
    setSelectedTanqueAux('')
    setSelectedUbicacionTanqueAux('')
    setSelectedTipoCargaTanqueAux('')
    setSelectedEmbarcacion('')
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveTanqueAux} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setTanqueAuxData(initialTanqueAuxForm)
    setSelectedTanqueAux('')
    setSelectedUbicacionTanqueAux('')
    setSelectedTipoCargaTanqueAux('')
    setSelectedEmbarcacion('')
  }
  const selectedestatusTanqueAuxTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusTanqueAux}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusTanqueAuxOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusTanqueAux}</div>
      </div>
    )
  }
  const selectedUbicacionTanqueAuxTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.ubicacionTanqueAux}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const ubicacionTanqueAuxOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.ubicacionTanqueAux}</div>
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
  const selectedTipoCargaTanqueAuxTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.tipoCargaTanqueAux}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const tipoCargaTanqueAuxTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.tipoCargaTanqueAux}</div>
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
        header="Detalles de la TanqueAux"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={tanqueAuxData.nombreTanqueAux}
              onChange={(e) => updateField(e.target.value, 'nombreTanqueAux')}
            />
            <label>Nombre TanqueAux:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={tanqueAuxData.descripcionTanqueAux}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionTanqueAux')
              }
            />
            <label>Descripcion :</label>
          </div>
          <div className="grid mt-3">
            <div className="field col-12 md:col-4">
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
            </div>{' '}
            <div className="field col-12 md:col-4">
              <label>Estado</label>
              <Dropdown
                value={selectedTanqueAux}
                options={estadoTanqueAux}
                onChange={onEstatusTanqueAux}
                optionLabel="estatusTanqueAux"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusTanqueAuxTemplate}
                itemTemplate={estatusTanqueAuxOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-4">
              <label>Ubicacion</label>
              <Dropdown
                value={selectedUbicacionTanqueAux}
                options={ubicacionTanqueAuxList}
                onChange={onUbicacionTanqueAux}
                optionLabel="ubicacionTanqueAux"
                placeholder="Seleccione Ubicacion"
                valueTemplate={selectedUbicacionTanqueAuxTemplate}
                itemTemplate={ubicacionTanqueAuxOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-4">
              <label>tipoCargaViaje</label>
              <Dropdown
                value={selectedTipoCargaTanqueAux}
                options={tipoCargaTanqueAuxlist}
                onChange={onTipoCargaTanqueAux}
                optionLabel="estatusTipoCargaViaje"
                placeholder="Seleccione Tipo Carga"
                valueTemplate={selectedTipoCargaTanqueAuxTemplate}
                itemTemplate={tipoCargaTanqueAuxTemplate}
              />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="integeronly">Combustible Actual</label>
              <InputNumber
                inputId="integeronly"
                value={tanqueAuxData.volumenActualTanqueAux}
                onValueChange={(e) =>
                  updateField(e.target.value, 'volumenActualTanqueAux')
                }
              />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="integeronly">Combustible Capacidad</label>
              <InputNumber
                inputId="integeronly"
                value={tanqueAuxData.volumenCapacidadTanqueAux}
                onValueChange={(e) =>
                  updateField(e.target.value, 'volumenCapacidadTanqueAux')
                }
              />
            </div>{' '}
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default TanqueAuxForm
