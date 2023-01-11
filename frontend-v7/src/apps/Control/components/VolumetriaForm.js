/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { VolumetriaContext } from '../contexts/VolumetriaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'

import moment from 'moment'
import { BarcoContext } from '../contexts/BarcoContext'

const VolumetriaForm = (props) => {
  const initialVolumetriaForm = {
    id: null,
    barcoID: null,
    terminalAuxId: '',
    blFinalVolumetria: 0,
    estatusVolumetria: '',
    fechaBlFinalVolumetria: null,
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

  const {
    createVolumetria,
    setEditVolumetria,
    editVolumetria,
    updateVolumetria
  } = useContext(VolumetriaContext)
  const { barcos } = useContext(BarcoContext)
  const { isVisible, setIsVisible } = props
  const [selecteBarcoIDGOM, setSelectedBarcoIDGOM] = useState(null)
  const [dateFinal, setDateFinal] = useState(null)
  const [selectedterminalAuxIdVolumetria, setSelectedterminalAuxIdVolumetria] =
    useState(null)

  const [volumetriaData, setVolumetriaData] = useState(initialVolumetriaForm)
  const [estatusVolumetria, setEstatusVolumetria] = useState(null)
  const barcoIDGOM = barcos
  const estadoVolumetria = [
    { estatusVolumetria: 'VOLUMETRIA FINAL' },
    { estatusVolumetria: 'VOLUMETRIA ESTIMADA' }
  ]
  const onEstatusVolumetria = (e) => {
    setEstatusVolumetria(e.value)
    updateField(e.value.estatusVolumetria, 'estatusVolumetria')
  }
  const terminalAuxIdVolumetria = [
    { name: 'MAROIL TERMINAL' },
    { name: 'PETRO CEDENO' },
    { name: 'PETRO SAN FELIX' }
  ]

  const onuBarcoIDGOM = (e) => {
    setSelectedBarcoIDGOM(e.value)
    updateField(e.value.id, 'barcoID')
  }

  const onterminalAuxIdVolumetria = (e) => {
    setSelectedterminalAuxIdVolumetria(e.value)
    updateField(e.value.name, 'terminalAuxId')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editVolumetria) {
      setVolumetriaData({
        ...editVolumetria,
        barcoID: editVolumetria.barcoID && editVolumetria.barcoID.id
      })
      setSelectedterminalAuxIdVolumetria({
        name: editVolumetria.terminalAuxId
      })
      const barcoIDSelecEdit =
        editVolumetria.barcoID &&
        barcos.find((p) => p.id === editVolumetria.barcoID.id)

      setSelectedBarcoIDGOM(barcoIDSelecEdit)
      setDateFinal(
        editVolumetria.fechaBlFinalVolumetria &&
          moment(editVolumetria.fechaBlFinalVolumetria)._d
      )
      setEstatusVolumetria({
        estatusVolumetria: editVolumetria.estatusVolumetria
      })
    }
  }, [editVolumetria])

  const updateField = (data, field) => {
    setVolumetriaData({
      ...volumetriaData,
      [field]: data
    })
  }

  const saveVolumetria = () => {
    if (!editVolumetria) {
      createVolumetria(volumetriaData)
    } else {
      updateVolumetria({
        ...volumetriaData,
        volumetriaModificado: moment()
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
      <Button label="Guardar" icon="pi pi-check" onClick={saveVolumetria} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setVolumetriaData(initialVolumetriaForm)
    setSelectedBarcoIDGOM(null)
    setSelectedterminalAuxIdVolumetria(null)
    setEditVolumetria(null)
    setDateFinal(null)
    setEstatusVolumetria(null)
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

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '50vw' }}
        header="Detalles de la Volumetria"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Selecione Buque</label>
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

            <div className="field col-12 md:col-6">
              <label>Selecione Terminal</label>
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

            <div className="field col-12   md:col-6">
              <label htmlFor="toneladasCargadasGOM">blFinalVolumetria</label>

              <InputNumber
                inputId="blFinalVolumetria"
                value={volumetriaData.blFinalVolumetria}
                onValueChange={(e) =>
                  updateField(e.target.value, 'blFinalVolumetria')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                suffix=" TM"
                mode="decimal"
                minFractionDigits={3}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={estatusVolumetria}
                options={estadoVolumetria}
                onChange={onEstatusVolumetria}
                optionLabel="estatusVolumetria"
                placeholder="Seleccione Estado"
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
                  updateField(e.target.value, 'fechaBlFinalVolumetria')
                }}
                showTime
                locale="es"
                // hourFormat="24"
                showButtonBar
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default VolumetriaForm
