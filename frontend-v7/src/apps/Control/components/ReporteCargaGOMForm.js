/* eslint-disable array-callback-return */
/* eslint-disable indent */
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
import { WhatsappContext } from '../contexts/WhatsappContext'

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
    climaGOM: '',
    vientoGOM: '',
    mareaGOM: '',
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
    { name: 'PUESTO-2', key: 'M' },
    { name: 'PUESTO-3', key: 'B' }
    // { name: 'Production', key: 'P' },
    // { name: 'Research', key: 'R' }
  ]
  const {
    reporteCargaGOMs,
    createReporteCargaGOM,
    editReporteCargaGOM,
    updateReporteCargaGOM
  } = useContext(ReporteCargaGOMContext)
  const { createWhatsappSolicitudFondo } = useContext(WhatsappContext)
  const { barcos } = useContext(BarcoContext)
  const { isVisible, setIsVisible } = props
  const [selecteBarcoIDGOM, setSelectedBarcoIDGOM] = useState(null)
  const [reporteCargaGOM, setReporteCargaGOM] = useState(reporteCargaGOMs)
  const [
    selectedubicacionBuqueReporteCargaGOM,
    setSelectedubicacionBuqueReporteCargaGOM
  ] = useState(null)
  const [selectedClimaGOM, setSelectedClimaGOM] = useState(null)
  const [reporteCargaGOMData, setReporteCargaGOMData] = useState(
    initialReporteCargaGOMForm
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
  const barcoIDGOM = barcos.filter((p) => p.estatusBarco === 'OPERATIVO' && p)

  const ubicacionBuqueReporteCargaGOM = [
    { name: 'MAROIL TERMINAL' },
    { name: 'PETRO CEDENO' },
    { name: 'PETRO SAN FELIX' },
    { name: 'BUQUES FONDEADO' },
    { name: 'PROXIMOS BUQUES' }
  ]
  const climaGOMGOM = [
    { name: 'Parcialmente soleado' },
    { name: 'Mayormente nublado' },
    { name: 'Nublado' },
    { name: 'Vientos Fuertes' },
    { name: 'Despejado' },
    { name: 'Soleado' },
    { name: 'Tormentas aisladas' },
    { name: 'Parcialmente nublado' }
  ]
  const onuBarcoIDGOM = (e) => {
    setSelectedBarcoIDGOM(e.value)
    updateField(e.value.id, 'barcoID')
    reporteCargaGOMs.map((p) =>
      e.value.id === p.barcoID.id ? reporteNuevoUltimo(p) : ''
    )
  }
  const enviarWhatssapSolicitudFondo = async () => {
    const {
      barcoID,
      tasaDeCargaGOM,
      toneladasCargadasGOM,
      ubicacionBuque,
      comentariosGOM
    } = reporteCargaGOMData
    const fecha1 = moment(barcoID.fechaInicioCarga)
    const fecha2 = moment(
      barcoID.fechaFinalCarga ? barcoID.fechaFinalCarga : moment()
    )
    // const fecha3 = moment(fecha1 - fecha2).format('HH:mm')

    // Diff in hours
    const diff = fecha2.diff(fecha1, 'seconds')
    const text = `Buque ${
      barcoID.nombreBarco
    } terminal ${ubicacionBuque}, Toneladas Nominadas ${new Intl.NumberFormat().format(
      barcoID.toneladasNominadas
    )} tm, Toneladas Cargadas ${new Intl.NumberFormat().format(
      toneladasCargadasGOM
    )} Tm, Toneladas por cargar ${new Intl.NumberFormat().format(
      barcoID.toneladasNominadas - toneladasCargadasGOM
    )} TM/hr, observacion ${comentariosGOM},  Tiempo de Carga ${secondsToString(
      diff
    )}`
    const toValor = '584242422547'
    const nameValor = 'embarcacion'
    const textValor = 'Alejandro Perez'
    const textbody = text
    createWhatsappSolicitudFondo(toValor, nameValor, textValor, textbody)
    console.log('Alejandro Perez')
  }
  const enviarWhatssapSolicitudFondoMarcano = async () => {
    const {
      barcoID,
      tasaDeCargaGOM,
      toneladasCargadasGOM,
      ubicacionBuque,
      comentariosGOM
    } = reporteCargaGOMData
    const fecha1 = moment(barcoID.fechaInicioCarga)
    const fecha2 = moment(
      barcoID.fechaFinalCarga ? barcoID.fechaFinalCarga : moment()
    )
    // const fecha3 = moment(fecha1 - fecha2).format('HH:mm')

    // Diff in hours
    const diff = fecha2.diff(fecha1, 'seconds')
    const text = `Buque ${
      barcoID.nombreBarco
    } terminal ${ubicacionBuque}, Toneladas Nominadas ${new Intl.NumberFormat().format(
      barcoID.toneladasNominadas
    )} tm, Toneladas Cargadas ${new Intl.NumberFormat().format(
      toneladasCargadasGOM
    )} Tm, Toneladas por cargar ${new Intl.NumberFormat().format(
      barcoID.toneladasNominadas - toneladasCargadasGOM
    )} TM/hr, observacion ${comentariosGOM},  Tiempo de Carga ${secondsToString(
      diff
    )}`
    const toValor = '584126362918'
    const nameValor = 'embarcacion'
    const textValor = 'Jose Marcano'
    const textbody = text
    createWhatsappSolicitudFondo(toValor, nameValor, textValor, textbody)
    console.log('Jose Marcano')
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

    // setReporteCargaGOMData(p)
  }

  const onubicacionBuqueReporteCargaGOM = (e) => {
    setSelectedubicacionBuqueReporteCargaGOM(e.value)
    updateField(e.value.name, 'ubicacionBuque')
    e.value.name === 'MAROIL TERMINAL'
      ? setPuestoTerminalIsVisible(true)
      : setPuestoTerminalIsVisible(false)
  }
  const onClimaGOM = (e) => {
    setSelectedClimaGOM(e.value)
    updateField(e.value.name, 'climaGOM')
  }
  const toast = useRef(null)

  useEffect(() => {
    if (editReporteCargaGOM) {
      setReporteCargaGOMData(editReporteCargaGOM)
      setSelectedubicacionBuqueReporteCargaGOM({
        name: editReporteCargaGOM.ubicacionBuque
      })
      setSelectedClimaGOM({
        name: editReporteCargaGOM.climaGOM
      })
      if (editReporteCargaGOM.ubicacionBuque === 'MAROIL TERMINAL') {
        setPuestoTerminalIsVisible(true)
        editReporteCargaGOM.puestoTerminal === 'PUESTO-2'
          ? setSelectedPuestoTerminal(categories[1])
          : editReporteCargaGOM.puestoTerminal === 'PUESTO-3'
          ? setSelectedPuestoTerminal(categories[2])
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
    enviarWhatssapSolicitudFondo()
    enviarWhatssapSolicitudFondoMarcano()
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
              <h5>Ubicacion Buque</h5>
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
            <div className="field col-12 p-col-2 p-md-1 md:col-6">
              <label htmlFor="toneladasCargadasGOM">
                Toneladas Cargadas GOM
              </label>
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
            <label>Comentarios GOM:</label>
          </div>{' '}
          <br />
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <h5>Clima</h5>
              <Dropdown
                value={selectedClimaGOM}
                options={climaGOMGOM}
                onChange={onClimaGOM}
                optionLabel="name"
                placeholder="Seleccione el clima"
              />
            </div>
            <div className="p-float-label field col-12 md:col-6">
              <h5>Viento</h5>
              {/* <InputText
                value={reporteCargaGOMData.vientoGOM}
                onChange={(e) => updateField(e.target.value, 'vientoGOM')}
              /> */}
              <InputNumber
                value={reporteCargaGOMData.vientoGOM}
                onValueChange={(e) => updateField(e.target.value, 'vientoGOM')}
                min={0}
                max={63}
              />
            </div>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={reporteCargaGOMData.observacionesGOM}
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

export default ReporteCargaGOMForm
