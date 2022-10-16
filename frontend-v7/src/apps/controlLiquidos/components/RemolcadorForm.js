/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect, useRef } from 'react'
import { RemolcadorContext } from '../contexts/RemolcadorContext'
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

const RemolcadorForm = (props) => {
  const initialRemolcadorForm = {
    id: null,
    nombreRemolcador: '',
    descripcionRemolcador: '',
    estatusRemolcador: '',
    ubicacionRemolcador: '',
    combustibleActualRemolcador: 0,
    combustibleCapacidadRemolcador: 0,
    RemolcadorCreado: moment(),
    RemolcadorModificado: moment()
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
    createRemolcador,
    editRemolcador,
    updateRemolcador,
    createBodegaRemolcador1
  } = useContext(RemolcadorContext)
  // const { createCargaBodega } = useContext(CargaBodegaContext)
  const { isVisible, setIsVisible } = props
  const [selectedRemolcador, setSelectedRemolcador] = useState(null)
  const [selectedUbicacionRemolcador, setSelectedUbicacionRemolcador] =
    useState(null)
  const [RemolcadorData, setRemolcadorData] = useState(initialRemolcadorForm)
  const estadoRemolcador = [
    { estatusRemolcador: 'OPERATIVO' },
    { estatusRemolcador: 'CULMINADO' }
  ]
  const ubicacionRemolcadorList = [
    { ubicacionRemolcador: 'OPERATIVO2' },
    { ubicacionRemolcador: 'CULMINADO2' }
  ]
  const onEstatusRemolcador = (e) => {
    setSelectedRemolcador(e.value)
    updateField(e.value.estatusRemolcador, 'estatusRemolcador')
  }
  const onUbicacionRemolcador = (e) => {
    setSelectedUbicacionRemolcador(e.value)
    updateField(e.value.ubicacionRemolcador, 'ubicacionRemolcador')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editRemolcador) {
      setRemolcadorData(editRemolcador)
      setSelectedRemolcador({
        estatusRemolcador: editRemolcador.estatusRemolcador
      })
      setSelectedUbicacionRemolcador({
        ubicacionRemolcador: editRemolcador.ubicacionRemolcador
      })
    }
  }, [editRemolcador])
  useEffect(() => {
    if (createBodegaRemolcador1) {
      createBodegaRemolcador(createBodegaRemolcador1)
    }
  }, [createBodegaRemolcador1])
  const createBodegaRemolcador = (saveRemolcador) => {
    const cargaBodega = {
      RemolcadorID: saveRemolcador.id,
      nombreBodega: '',
      estatusBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveRemolcador.cantidadBodegas)
    for (let i = 1; i <= saveRemolcador.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`

      // createCargaBodega(cargaBodega)
    }
    // RemolcadorService.create(CargaBodega, token).then((data) => {
    //   setRemolcadors([...Remolcadors, data.saveRemolcador])
    //   console.log('Remolcador creado', data.saveRemolcador)
    // })
  }

  const updateField = (data, field) => {
    setRemolcadorData({
      ...RemolcadorData,
      [field]: data
    })
  }

  const saveRemolcador = () => {
    if (!editRemolcador) {
      createRemolcador(RemolcadorData)
    } else {
      updateRemolcador({
        ...RemolcadorData,
        RemolcadorModificado: moment()
      })
    }
    setRemolcadorData(initialRemolcadorForm)
    setIsVisible(false)
    setSelectedRemolcador('')
    setSelectedUbicacionRemolcador('')
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveRemolcador} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setRemolcadorData(initialRemolcadorForm)
    setSelectedRemolcador('')
    setSelectedUbicacionRemolcador('')
  }
  const selectedestatusRemolcadorTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusRemolcador}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusRemolcadorOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusRemolcador}</div>
      </div>
    )
  }
  const selectedUbicacionRemolcadorTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.ubicacionRemolcador}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const ubicacionRemolcadorOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.ubicacionRemolcador}</div>
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
        header="Detalles de la Remolcador"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={RemolcadorData.nombreRemolcador}
              onChange={(e) => updateField(e.target.value, 'nombreRemolcador')}
            />
            <label>Nombre Remolcador:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={RemolcadorData.descripcionRemolcador}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionRemolcador')
              }
            />
            <label>Descripcion :</label>
          </div>

          <div className="formgrid grid mt-3">
            <div className="field col-12 md:col-6">
              <label htmlFor="integeronly">Combustible Actual</label>
              <InputNumber
                inputId="integeronly"
                value={RemolcadorData.combustibleActualRemolcador}
                onValueChange={(e) =>
                  updateField(e.target.value, 'combustibleActualRemolcador')
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="integeronly">Combustible Capacidad</label>
              <InputNumber
                inputId="integeronly"
                value={RemolcadorData.combustibleCapacidadRemolcador}
                onValueChange={(e) =>
                  updateField(e.target.value, 'combustibleCapacidadRemolcador')
                }
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedRemolcador}
                options={estadoRemolcador}
                onChange={onEstatusRemolcador}
                optionLabel="estatusRemolcador"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusRemolcadorTemplate}
                itemTemplate={estatusRemolcadorOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Actividad</label>
              <Dropdown
                value={selectedUbicacionRemolcador}
                options={ubicacionRemolcadorList}
                onChange={onUbicacionRemolcador}
                optionLabel="ubicacionRemolcador"
                placeholder="Seleccione Ubicacion"
                valueTemplate={selectedUbicacionRemolcadorTemplate}
                itemTemplate={ubicacionRemolcadorOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default RemolcadorForm
