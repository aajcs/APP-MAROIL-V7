/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { ReporteCargaBuqueContext } from '../contexts/ReporteCargaBuqueContext'
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
import { BuqueContext } from '../contexts/BuqueContext'

const ReporteCargaBuqueForm = (props) => {
  const initialReporteCargaBuqueForm = {
    id: null,
    buqueID: '',
    ubicacionBuque: '',
    puestoTerminal: '',
    toneladasCargadasBuque: 0,
    tasaDeCargaBuque: 0,
    etc: '',
    comentariosBuque: '',
    observacionesBuque: '',
    climaBuque: '',
    vientoBuque: '',
    mareaBuque: '',
    reporteCargaBuqueCreado: moment(),
    reporteCargaBuqueModificado: moment()
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
  const {
    reporteCargaBuques,
    createReporteCargaBuque,
    editReporteCargaBuque,
    updateReporteCargaBuque
  } = useContext(ReporteCargaBuqueContext)
  const { buques } = useContext(BuqueContext)
  const { isVisible, setIsVisible } = props
  const [selecteBuqueIDBuque, setSelectedBuqueIDBuque] = useState(null)
  const [reporteCargaBuque, setReporteCargaBuque] = useState(reporteCargaBuques)
  const [
    selectedubicacionBuqueReporteCargaBuque,
    setSelectedubicacionBuqueReporteCargaBuque
  ] = useState(null)
  const [selectedClimaBuque, setSelectedClimaBuque] = useState(null)
  const [reporteCargaBuqueData, setReporteCargaBuqueData] = useState(
    initialReporteCargaBuqueForm
  )
  const [isPuestoTerminalVisible, setPuestoTerminalIsVisible] = useState(false)
  const [selectedPuestoTerminal, setSelectedPuestoTerminal] = useState(null)

  function secondsToString(diff) {
    const numdays = Math.floor(diff / 86400)
    const numhours = Math.floor((diff % 86400) / 3600)
    const numminutes = Math.floor(((diff % 86400) % 3600) / 60)
    // const numseconds = ((diff % 86400) % 3600) % 60

    return numdays + ' dias ' + numhours + ' horas ' + numminutes + ' minutos '
  }

  const onPuestoTerminal = (e) => {
    setSelectedPuestoTerminal(e.value)
    updateField(e.value.name, 'puestoTerminal')
  }
  const buqueIDBuque = buques.filter((p) => p.estatusBuque === 'OPERATIVO' && p)

  const ubicacionBuqueReporteCargaBuque = [
    { name: 'MAROIL TERMINAL' },
    { name: 'PETRO CEDENO' },
    { name: 'PETRO SAN FELIX' },
    { name: 'BUQUES FONDEADO' },
    { name: 'PROXIMOS BUQUES' }
  ]
  const climaBuqueBuque = [
    { name: 'Parcialmente soleado' },
    { name: 'Mayormente nublado' },
    { name: 'Nublado' },
    { name: 'Vientos Fuertes' },
    { name: 'Despejado' },
    { name: 'Soleado' },
    { name: 'Tormentas aisladas' },
    { name: 'Parcialmente nublado' }
  ]
  const onuBuqueIDBuque = (e) => {
    setSelectedBuqueIDBuque(e.value)
    updateField(e.value.id, 'buqueID')
    reporteCargaBuques.map((p) =>
      e.value.id === p.buqueID.id ? reporteNuevoUltimo(p) : ''
    )
  }

  const reporteNuevoUltimo = (p) => {
    setSelectedubicacionBuqueReporteCargaBuque({
      name: p.ubicacionBuque
    })
    setReporteCargaBuqueData({
      ...reporteCargaBuqueData,
      buqueID: p.buqueID.id,
      ubicacionBuque: p.ubicacionBuque,
      toneladasCargadasBuque: p.toneladasCargadasBuque,
      tasaDeCargaBuque: p.tasaDeCargaBuque,
      etc: p.etc,
      comentariosBuque: p.comentariosBuque,
      observacionesBuque: p.observacionesBuque,
      puestoTerminal: p.puestoTerminal
    })
    if (p.ubicacionBuque === 'MAROIL TERMINAL') {
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

    // setReporteCargaBuqueData(p)
  }

  const onubicacionBuqueReporteCargaBuque = (e) => {
    setSelectedubicacionBuqueReporteCargaBuque(e.value)
    updateField(e.value.name, 'ubicacionBuque')
    e.value.name === 'MAROIL TERMINAL'
      ? setPuestoTerminalIsVisible(true)
      : setPuestoTerminalIsVisible(false)
  }
  const onClimaBuque = (e) => {
    setSelectedClimaBuque(e.value)
    updateField(e.value.name, 'climaBuque')
  }
  const toast = useRef(null)

  useEffect(() => {
    if (editReporteCargaBuque) {
      setReporteCargaBuqueData(editReporteCargaBuque)
      setSelectedubicacionBuqueReporteCargaBuque({
        name: editReporteCargaBuque.ubicacionBuque
      })
      setSelectedClimaBuque({
        name: editReporteCargaBuque.climaBuque
      })
      if (editReporteCargaBuque.ubicacionBuque === 'MAROIL TERMINAL') {
        setPuestoTerminalIsVisible(true)
        editReporteCargaBuque.puestoTerminal === 'PUESTO-2'
          ? setSelectedPuestoTerminal(categories[1])
          : editReporteCargaBuque.puestoTerminal === 'PUESTO-3'
          ? setSelectedPuestoTerminal(categories[2])
          : setSelectedPuestoTerminal(categories[0])
      } else {
        setPuestoTerminalIsVisible(false)
      }
    }
  }, [editReporteCargaBuque])

  const updateField = (data, field) => {
    setReporteCargaBuqueData({
      ...reporteCargaBuqueData,
      [field]: data
    })
  }

  const saveReporteCargaBuque = () => {
    if (!editReporteCargaBuque) {
      createReporteCargaBuque(reporteCargaBuqueData)
    } else {
      const { id } = reporteCargaBuqueData.buqueID
      updateReporteCargaBuque({
        ...reporteCargaBuqueData,
        buqueID: id,
        reporteCargaBuqueModificado: moment()
      })
    }
    setReporteCargaBuqueData(initialReporteCargaBuqueForm)
    setSelectedBuqueIDBuque(null)
    setSelectedubicacionBuqueReporteCargaBuque(null)
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
        onClick={saveReporteCargaBuque}
      />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setReporteCargaBuqueData(initialReporteCargaBuqueForm)
    setSelectedBuqueIDBuque(null)
    setSelectedubicacionBuqueReporteCargaBuque(null)
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
        header="Detalles de la ReporteCargaBuque"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <Dropdown
              value={selecteBuqueIDBuque}
              options={buqueIDBuque}
              onChange={onuBuqueIDBuque}
              optionLabel="nombreBuque"
              placeholder="Seleccione el Buque"
              filter
            />
          </div>
          <br />
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <h5>Ubicacion Buque</h5>
              <Dropdown
                value={selectedubicacionBuqueReporteCargaBuque}
                options={ubicacionBuqueReporteCargaBuque}
                onChange={onubicacionBuqueReporteCargaBuque}
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
            <div className="field col-12 p-col-2 p-md-1 md:col-6">
              <label htmlFor="toneladasCargadasBuque">
                Toneladas Cargadas Buque
              </label>
              <InputNumber
                inputId="toneladasCargadasBuque"
                value={reporteCargaBuqueData.toneladasCargadasBuque}
                onValueChange={(e) =>
                  updateField(e.target.value, 'toneladasCargadasBuque')
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
              <label htmlFor="tasaDeCargaBuque">Tasa De Carga Buque</label>
              <InputNumber
                inputId="tasaDeCargaBuque"
                value={reporteCargaBuqueData.tasaDeCargaBuque}
                onValueChange={(e) =>
                  updateField(e.target.value, 'tasaDeCargaBuque')
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
              value={reporteCargaBuqueData.etc}
              onChange={(e) => updateField(e.target.value, 'etc')}
            />
            <label>etc:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={reporteCargaBuqueData.comentariosBuque}
              onChange={(e) => updateField(e.target.value, 'comentariosBuque')}
            />
            <label>Comentarios Buque:</label>
          </div>{' '}
          <br />
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <h5>Clima</h5>
              <Dropdown
                value={selectedClimaBuque}
                options={climaBuqueBuque}
                onChange={onClimaBuque}
                optionLabel="name"
                placeholder="Seleccione el clima"
              />
            </div>
            <div className="p-float-label field col-12 md:col-6">
              <h5>Viento</h5>
              {/* <InputText
                value={reporteCargaBuqueData.vientoBuque}
                onChange={(e) => updateField(e.target.value, 'vientoBuque')}
              /> */}
              <InputNumber
                value={reporteCargaBuqueData.vientoBuque}
                onValueChange={(e) =>
                  updateField(e.target.value, 'vientoBuque')
                }
                min={0}
                max={63}
              />
            </div>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={reporteCargaBuqueData.observacionesBuque}
              onChange={(e) =>
                updateField(e.target.value, 'observacionesBuque')
              }
            />
            <label>Observaciones Buque:</label>
          </div>
          <br />
        </div>
      </Dialog>
    </div>
  )
}

export default ReporteCargaBuqueForm
