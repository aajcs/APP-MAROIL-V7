/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { ReporteCargaGOMContext } from '../contexts/ReporteCargaGOMContext'
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

const ReporteCargaGOMForm = (props) => {
  const initialReporteCargaGOMForm = {
    id: null,
    barcoID: '',
    ubicacionBuque: '',
    puestoTerminal: '',
    toneladasCargadasGOM: 0,
    tasaDeCargaGOM: 0,
    etc: '',
    comentariosGOM: '',
    observacionesGOM: '',
    reporteCargaGOMCreado: moment(),
    reporteCargaGOMModificado: moment()
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
    { name: 'PUESTO-2', key: 'M' }
    // { name: 'Production', key: 'P' },
    // { name: 'Research', key: 'R' }
  ]
  const {
    reporteCargaGOMs,
    createReporteCargaGOM,
    editReporteCargaGOM,
    updateReporteCargaGOM
  } = useContext(ReporteCargaGOMContext)
  const { barcos } = useContext(BarcoContext)
  const { isVisible, setIsVisible } = props
  const [selecteBarcoIDGOM, setSelectedBarcoIDGOM] = useState(null)
  const [reporteCargaGOM, setReporteCargaGOM] = useState(reporteCargaGOMs)
  const [
    selectedubicacionBuqueReporteCargaGOM,
    setSelectedubicacionBuqueReporteCargaGOM
  ] = useState(null)
  const [reporteCargaGOMData, setReporteCargaGOMData] = useState(
    initialReporteCargaGOMForm
  )
  const [isPuestoTerminalVisible, setPuestoTerminalIsVisible] = useState(false)
  const [selectedPuestoTerminal, setSelectedPuestoTerminal] = useState(null)

  const onPuestoTerminal = (e) => {
    setSelectedPuestoTerminal(e.value)
    updateField(e.value.name, 'puestoTerminal')
  }
  const barcoIDGOM = barcos

  const ubicacionBuqueReporteCargaGOM = [
    { name: 'MAROIL TERMINAL' },
    { name: 'PETRO CEDENO' },
    { name: 'PETRO SAN FELIX' },
    { name: 'BUQUES FONDEADO' },
    { name: 'PROXIMOS BUQUES' }
  ]
  const onuBarcoIDGOM = (e) => {
    setSelectedBarcoIDGOM(e.value)
    updateField(e.value.id, 'barcoID')
    reporteCargaGOMs.map((p) =>
      e.value.id === p.barcoID.id ? reporteNuevoUltimo(p) : ''
    )
  }
  const reporteNuevoUltimo = (p) => {
    setSelectedubicacionBuqueReporteCargaGOM({
      name: p.ubicacionBuque
    })
    setReporteCargaGOMData({
      ...reporteCargaGOMData,
      barcoID: p.barcoID.id,
      ubicacionBuque: p.ubicacionBuque,
      toneladasCargadasGOM: p.toneladasCargadasGOM,
      tasaDeCargaGOM: p.tasaDeCargaGOM,
      etc: p.etc,
      comentariosGOM: p.comentariosGOM,
      observacionesGOM: p.observacionesGOM,
      puestoTerminal: p.puestoTerminal
    })
    if (p.ubicacionBuque === 'MAROIL TERMINAL') {
      setPuestoTerminalIsVisible(true)
      p.puestoTerminal === 'PUESTO-2'
        ? setSelectedPuestoTerminal(categories[1])
        : setSelectedPuestoTerminal(categories[0])
    } else {
      setPuestoTerminalIsVisible(false)
    }

    // setReporteCargaGOMData(p)
  }

  const onubicacionBuqueReporteCargaGOM = (e) => {
    setSelectedubicacionBuqueReporteCargaGOM(e.value)
    updateField(e.value.name, 'ubicacionBuque')
    e.value.name === 'MAROIL TERMINAL'
      ? setPuestoTerminalIsVisible(true)
      : setPuestoTerminalIsVisible(false)
  }
  const toast = useRef(null)

  useEffect(() => {
    if (editReporteCargaGOM) {
      setReporteCargaGOMData(editReporteCargaGOM)
      setSelectedubicacionBuqueReporteCargaGOM({
        name: editReporteCargaGOM.ubicacionBuque
      })
      if (editReporteCargaGOM.ubicacionBuque === 'MAROIL TERMINAL') {
        setPuestoTerminalIsVisible(true)
        editReporteCargaGOM.puestoTerminal === 'PUESTO-2'
          ? setSelectedPuestoTerminal(categories[1])
          : setSelectedPuestoTerminal(categories[0])
      } else {
        setPuestoTerminalIsVisible(false)
      }
    }
  }, [editReporteCargaGOM])

  const updateField = (data, field) => {
    setReporteCargaGOMData({
      ...reporteCargaGOMData,
      [field]: data
    })
  }

  const saveReporteCargaGOM = () => {
    if (!editReporteCargaGOM) {
      createReporteCargaGOM(reporteCargaGOMData)
    } else {
      const { id } = reporteCargaGOMData.barcoID
      updateReporteCargaGOM({
        ...reporteCargaGOMData,
        barcoID: id,
        reporteCargaGOMModificado: moment()
      })
    }
    setReporteCargaGOMData(initialReporteCargaGOMForm)
    setSelectedBarcoIDGOM(null)
    setSelectedubicacionBuqueReporteCargaGOM(null)
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
      <Button
        label="Guardar"
        icon="pi pi-check"
        onClick={saveReporteCargaGOM}
      />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setReporteCargaGOMData(initialReporteCargaGOMForm)
    setSelectedBarcoIDGOM(null)
    setSelectedubicacionBuqueReporteCargaGOM(null)
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

  const ubicacionBuqueOptionTemplate = (option) => {
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
        header="Detalles de la ReporteCargaGOM"
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
              <h5>ubicacionBuque</h5>
              <Dropdown
                value={selectedubicacionBuqueReporteCargaGOM}
                options={ubicacionBuqueReporteCargaGOM}
                onChange={onubicacionBuqueReporteCargaGOM}
                optionLabel="name"
                placeholder="Seleccione ubicacionBuque"
                valueTemplate={selectedUbicacionBuqueTemplate}
                itemTemplate={ubicacionBuqueOptionTemplate}
              />
            </div>
            {isPuestoTerminalVisible && (
              <div className="field col-12 md:col-6">
                <h5>Puesto</h5>
                {/* me gusta esto para map de objero pilas */}
                <div className="field col-12 md:col-12 flex">
                  {categories.map((Puesto) => {
                    return (
                      <div key={Puesto.key} className="field-radiobutton ml-2">
                        <RadioButton
                          inputId={Puesto.key}
                          name="Puesto"
                          value={Puesto}
                          onChange={onPuestoTerminal}
                          checked={
                            selectedPuestoTerminal &&
                            selectedPuestoTerminal.key === Puesto.key
                          }
                          disabled={Puesto.key === 'R'}
                        />
                        <label htmlFor={Puesto.key}>{Puesto.name}</label>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="formgrid grid">
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="toneladasCargadasGOM">toneladasCargadasGOM</label>
              <InputNumber
                inputId="toneladasCargadasGOM"
                value={reporteCargaGOMData.toneladasCargadasGOM}
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
                suffix=" TM"
              />
            </div>{' '}
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="tasaDeCargaGOM">tasaDeCargaGOM</label>
              <InputNumber
                inputId="tasaDeCargaGOM"
                value={reporteCargaGOMData.tasaDeCargaGOM}
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
              value={reporteCargaGOMData.etc}
              onChange={(e) => updateField(e.target.value, 'etc')}
            />
            <label>etc:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={reporteCargaGOMData.comentariosGOM}
              onChange={(e) => updateField(e.target.value, 'comentariosGOM')}
            />
            <label>comentariosGOM:</label>
          </div>{' '}
          <br />
          <div className="p-float-label">
            <InputText
              value={reporteCargaGOMData.observacionesGOM}
              onChange={(e) => updateField(e.target.value, 'observacionesGOM')}
            />
            <label>observacionesGOM:</label>
          </div>
          <br />
        </div>
      </Dialog>
    </div>
  )
}

export default ReporteCargaGOMForm
