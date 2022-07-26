/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { VolumetriaContext } from '../contexts/VolumetriaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'
import { RadioButton } from 'primereact/radiobutton'

import moment from 'moment'
import { BarcoContext } from '../contexts/BarcoContext'

const VolumetriaForm = (props) => {
  const initialVolumetriaForm = {
    id: null,
    barcoID: '',
    terminalAuxId: '',
    centroDeCostoAuxId: '',
    blFinalVolumetria: 0,
    fechaBlFinalVolumetria: moment(),
    volumetriaCreado: moment(),
    volumetriaModificado: moment()
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
  const categories = [
    { name: 'PUESTO-1', key: 'A' },
    { name: 'PUESTO-2', key: 'M' },
    { name: 'PUESTO-3', key: 'B' }
    // { name: 'Production', key: 'P' },
    // { name: 'Research', key: 'R' }
  ]
  const { Volumetrias, createVolumetria, editVolumetria, updateVolumetria } =
    useContext(VolumetriaContext)
  const { barcos } = useContext(BarcoContext)
  const { isVisible, setIsVisible } = props
  const [selecteBarcoIDGOM, setSelectedBarcoIDGOM] = useState(null)
  const [Volumetria, setVolumetria] = useState(Volumetrias)
  const [selectedterminalAuxIdVolumetria, setSelectedterminalAuxIdVolumetria] =
    useState(null)
  const [
    selectedcentroDeCostoAuxIdVolumetria,
    setSelectedcentroDeCostoAuxIdVolumetria
  ] = useState(null)
  const [VolumetriaData, setVolumetriaData] = useState(initialVolumetriaForm)
  const [isPuestoTerminalVisible, setPuestoTerminalIsVisible] = useState(false)
  const [selectedPuestoTerminal, setSelectedPuestoTerminal] = useState(null)

  const onPuestoTerminal = (e) => {
    setSelectedPuestoTerminal(e.value)
    updateField(e.value.name, 'puestoTerminal')
  }
  const barcoIDGOM = barcos

  const terminalAuxIdVolumetria = [
    { name: 'MAROIL TERMINAL' },
    { name: 'PETRO CEDENO' },
    { name: 'PETRO SAN FELIX' }
  ]
  const centroDeCostoAuxIdVolumetria = [
    { name: 'MAROIL TERMINAL' },
    { name: 'PETRO CEDENO' },
    { name: 'PETRO SAN FELIX' }
  ]
  const onuBarcoIDGOM = (e) => {
    setSelectedBarcoIDGOM(e.value)
    updateField(e.value.id, 'barcoID')
    Volumetrias.map((p) =>
      e.value.id === p.barcoID.id ? reporteNuevoUltimo(p) : ''
    )
  }
  const reporteNuevoUltimo = (p) => {
    setSelectedterminalAuxIdVolumetria({
      name: p.terminalAuxId
    })
    setVolumetriaData({
      ...VolumetriaData,
      barcoID: p.barcoID.id,
      terminalAuxId: p.terminalAuxId,
      toneladasCargadasGOM: p.toneladasCargadasGOM,
      tasaDeCargaGOM: p.tasaDeCargaGOM,
      etc: p.etc,
      comentariosGOM: p.comentariosGOM,
      observacionesGOM: p.observacionesGOM,
      puestoTerminal: p.puestoTerminal
    })
    if (p.terminalAuxId === 'MAROIL TERMINAL') {
      setPuestoTerminalIsVisible(true)
      // p.puestoTerminal === 'PUESTO-2'
      //   ? setSelectedPuestoTerminal(categories[1])
      //   : setSelectedPuestoTerminal(categories[0])
      p.puestoTerminal === 'PUESTO-2'
        ? setSelectedPuestoTerminal(categories[1])
        : p.puestoTerminal === 'PUESTO-3'
        ? setSelectedPuestoTerminal(categories[2])
        : setSelectedPuestoTerminal(categories[0])
    } else {
      setPuestoTerminalIsVisible(false)
    }

    // setVolumetriaData(p)
  }

  const onterminalAuxIdVolumetria = (e) => {
    setSelectedterminalAuxIdVolumetria(e.value)
    updateField(e.value.name, 'terminalAuxId')
  }
  const oncentroDeCostoAuxIdVolumetria = (e) => {
    setSelectedcentroDeCostoAuxIdVolumetria(e.value)
    updateField(e.value.name, 'centroDeCostoAuxId')
  }
  const toast = useRef(null)

  useEffect(() => {
    if (editVolumetria) {
      setVolumetriaData(editVolumetria)
      setSelectedterminalAuxIdVolumetria({
        name: editVolumetria.terminalAuxId
      })
    }
  }, [editVolumetria])

  const updateField = (data, field) => {
    setVolumetriaData({
      ...VolumetriaData,
      [field]: data
    })
  }

  const saveVolumetria = () => {
    if (!editVolumetria) {
      createVolumetria(VolumetriaData)
    } else {
      const { id } = VolumetriaData.barcoID
      updateVolumetria({
        ...VolumetriaData,
        barcoID: id,
        VolumetriaModificado: moment()
      })
    }
    setVolumetriaData(initialVolumetriaForm)
    setSelectedBarcoIDGOM(null)
    setSelectedterminalAuxIdVolumetria(null)
    setIsVisible(false)
    setPuestoTerminalIsVisible(false)
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveVolumetria} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setVolumetriaData(initialVolumetriaForm)
    setSelectedBarcoIDGOM(null)
    setSelectedterminalAuxIdVolumetria(null)
    setPuestoTerminalIsVisible(false)
  }
  const selectedUbicacionBuqueTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.name}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const terminalAuxIdOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
      </div>
    )
  }
  const selectedCentroDeCostoAuxIdTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.name}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const centroDeCostoAuxIdOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
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
        header="Detalles de la Volumetria"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <Dropdown
              value={selecteBarcoIDGOM}
              options={barcoIDGOM}
              onChange={onuBarcoIDGOM}
              optionLabel="nombreBarco"
              placeholder="Seleccione el Barco"
              filter
            />
          </div>
          <br />
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <h5>Ubicacion Buque</h5>
              <Dropdown
                value={selectedterminalAuxIdVolumetria}
                options={terminalAuxIdVolumetria}
                onChange={onterminalAuxIdVolumetria}
                optionLabel="name"
                placeholder="Seleccione terminalAuxId"
                valueTemplate={selectedUbicacionBuqueTemplate}
                itemTemplate={terminalAuxIdOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-6">
              <h5>centroDeCostoAuxId</h5>
              <Dropdown
                value={selectedcentroDeCostoAuxIdVolumetria}
                options={centroDeCostoAuxIdVolumetria}
                onChange={oncentroDeCostoAuxIdVolumetria}
                optionLabel="name"
                placeholder="Seleccione centroDeCostoAuxId"
                valueTemplate={selectedCentroDeCostoAuxIdTemplate}
                itemTemplate={centroDeCostoAuxIdOptionTemplate}
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-12 p-col-2 p-md-1 md:col-6">
              <label htmlFor="toneladasCargadasGOM">
                Toneladas Cargadas GOM
              </label>
              <InputNumber
                inputId="toneladasCargadasGOM"
                value={VolumetriaData.toneladasCargadasGOM}
                onValueChange={(e) =>
                  updateField(e.target.value, 'toneladasCargadasGOM')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                // mode="decimal"
                // minFractionDigits={3}
                // maxFractionDigits={5}
                suffix=" TM"
              />
            </div>{' '}
            <div className="field col-12 p-col-2 p-md-1 md:col-6">
              <label htmlFor="tasaDeCargaGOM">Tasa De Carga GOM</label>
              <InputNumber
                inputId="tasaDeCargaGOM"
                value={VolumetriaData.tasaDeCargaGOM}
                onValueChange={(e) =>
                  updateField(e.target.value, 'tasaDeCargaGOM')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                suffix=" TM/hr"
              />
            </div>
          </div>
          <div className="p-float-label">
            <InputText
              value={VolumetriaData.etc}
              onChange={(e) => updateField(e.target.value, 'etc')}
            />
            <label>etc:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={VolumetriaData.comentariosGOM}
              onChange={(e) => updateField(e.target.value, 'comentariosGOM')}
            />
            <label>Comentarios GOM:</label>
          </div>{' '}
          <br />
          <div className="p-float-label">
            <InputText
              value={VolumetriaData.observacionesGOM}
              onChange={(e) => updateField(e.target.value, 'observacionesGOM')}
            />
            <label>Observaciones GOM:</label>
          </div>
          <br />
        </div>
      </Dialog>
    </div>
  )
}

export default VolumetriaForm
