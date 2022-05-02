/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { CargaBodegaContext } from '../contexts/CargaBodegaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'

import moment from 'moment'
import { BarcoContext } from '../contexts/BarcoContext'

const CargaBodegaForm = (props) => {
  const initialCargaBodegaForm = {
    id: null,
    barcoID: '',
    nombreBodega: '',
    toneladasCargadasBodega: 0,
    toneladasCapacidadBodega: 0,
    estatusBodega: '',
    tasaDeCarga: '',
    cargaBodegaCreado: moment(),
    cargaBodegaModificado: moment()
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
  const { createCargaBodega, editCargaBodega, updateCargaBodega } =
    useContext(CargaBodegaContext)
  const { barcos } = useContext(BarcoContext)
  const { isVisible, setIsVisible } = props
  const [selecteBarcoIDGOM, setSelectedBarcoIDGOM] = useState(null)
  const [selectedestatusBodega, setSelectedestatusBodega] = useState(null)
  const [selectednombreBodegaCargaBodega, setSelectednombreBodegaCargaBodega] =
    useState(null)
  const [reporteCargaGOMData, setCargaBodegaData] = useState(
    initialCargaBodegaForm
  )
  const barcoIDGOM = barcos

  const estatusBodega = [
    { estatusBodega: 'CARGANDO' },
    { estatusBodega: 'PARADO' }
  ]
  const nombreBodegaCargaBodega = [
    { nombreBodega: 'BODEGA 1' },
    { nombreBodega: 'BODEGA 2' },
    { nombreBodega: 'BODEGA 3' },
    { nombreBodega: 'BODEGA 4' },
    { nombreBodega: 'BODEGA 5' },
    { nombreBodega: 'BODEGA 6' },
    { nombreBodega: 'BODEGA 7' },
    { nombreBodega: 'BODEGA 8' },
    { nombreBodega: 'BODEGA 9' }
  ]
  const onuBarcoIDGOM = (e) => {
    setSelectedBarcoIDGOM(e.value)
    updateField(e.value.id, 'barcoID')
  }
  const onestatusBodega = (e) => {
    setSelectedestatusBodega(e.value)
    updateField(e.value.estatusBodega, 'estatusBodega')
  }
  const onnombreBodegaCargaBodega = (e) => {
    setSelectednombreBodegaCargaBodega(e.value)
    updateField(e.value.nombreBodega, 'nombreBodega')
  }
  const toast = useRef(null)

  useEffect(() => {
    if (editCargaBodega) {
      setCargaBodegaData(editCargaBodega)
      setSelectedestatusBodega({
        estatusBodega: editCargaBodega.estatusBodega
      })
      setSelectednombreBodegaCargaBodega({
        nombreBodega: editCargaBodega.nombreBodega
      })
    }
  }, [editCargaBodega])

  const updateField = (data, field) => {
    setCargaBodegaData({
      ...reporteCargaGOMData,
      [field]: data
    })
  }

  const saveCargaBodega = () => {
    if (!editCargaBodega) {
      createCargaBodega(reporteCargaGOMData)
    } else {
      const { id } = reporteCargaGOMData.barcoID
      updateCargaBodega({
        ...reporteCargaGOMData,
        barcoID: id,
        reporteCargaGOMModificado: moment()
      })
    }
    setCargaBodegaData(initialCargaBodegaForm)
    setSelectedBarcoIDGOM(null)
    setSelectedestatusBodega(null)
    setIsVisible(false)
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveCargaBodega} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setCargaBodegaData(initialCargaBodegaForm)
    setSelectedBarcoIDGOM(null)
    setSelectedestatusBodega(null)
  }
  const selectednombreBodegaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.nombreBodega}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const nombreBodegaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.nombreBodega}</div>
      </div>
    )
  }
  const selectedestatusBodegaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusBodega}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusBodegaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusBodega}</div>
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
        header="Detalles de la CargaBodega"
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
              <h5>nombreBodega</h5>
              <Dropdown
                value={selectednombreBodegaCargaBodega}
                options={nombreBodegaCargaBodega}
                onChange={onnombreBodegaCargaBodega}
                optionLabel="reporteCargaGOMData"
                placeholder="Seleccione nombreBodega"
                valueTemplate={selectednombreBodegaTemplate}
                itemTemplate={nombreBodegaOptionTemplate}
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="toneladasCargadasBodega">
                toneladasCargadasBodega
              </label>
              <InputNumber
                inputId="toneladasCargadasBodega"
                value={reporteCargaGOMData.toneladasCargadasBodega}
                onValueChange={(e) =>
                  updateField(e.target.value, 'toneladasCargadasBodega')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                suffix=" TM"
              />
            </div>
          </div>{' '}
          <div className="formgrid grid">
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="toneladasCapacidadBodega">
                toneladasCapacidadBodega
              </label>
              <InputNumber
                inputId="toneladasCapacidadBodega"
                value={reporteCargaGOMData.toneladasCapacidadBodega}
                onValueChange={(e) =>
                  updateField(e.target.value, 'toneladasCapacidadBodega')
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                suffix=" TM"
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <h5>estatus</h5>
              <Dropdown
                value={selectedestatusBodega}
                options={estatusBodega}
                onChange={onestatusBodega}
                optionLabel="name"
                placeholder="Seleccione estatus"
                valueTemplate={selectedestatusBodegaTemplate}
                itemTemplate={estatusBodegaOptionTemplate}
              />
            </div>
          </div>
          <br />
        </div>
      </Dialog>
    </div>
  )
}

export default CargaBodegaForm
