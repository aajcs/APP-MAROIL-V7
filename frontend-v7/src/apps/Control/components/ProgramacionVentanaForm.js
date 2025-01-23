/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { ProgramacionVentanaContext } from '../contexts/ProgramacionVentanaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'
import emailjs from '@emailjs/browser'
import moment from 'moment'

const ProgramacionVentanaForm = (props) => {
  const initialProgramacionVentanaForm = {
    id: null,
    nombreBuque: '',
    descripcion: '',
    terminalBuque: '',
    buqueCliente: '',
    buqueClienteVenta: '',
    buquePaisDestino: '',
    toneladasNominadas: 0,
    fechaInicioVentana: '',
    fechaFinVentana: '',
    programacionVentanaCreado: moment(),
    programacionVentanaModificado: moment()
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
    createProgramacionVentana,
    editProgramacionVentana,
    updateProgramacionVentana
  } = useContext(ProgramacionVentanaContext)
  const { isVisible, setIsVisible } = props

  const [selectedBuqueCliente, setSelectedBuqueCliente] = useState(null)
  const [selectedBuqueClienteVenta, setSelectedBuqueClienteVenta] =
    useState(null)

  const [selectedTerminalBuque, setSelectTerminalBuque] = useState(null)
  const TerminalBuque = [
    { name: 'Puesto de Espera (Oeste)' },
    { name: 'Puesto de Carga (Centro)' },
    { name: 'Puesto de Carga S.T.S. (Este)' },
    { name: 'PETRO SAN FELIX' },
    { name: 'PETRO CEDENO' },
    { name: 'BUQUES FONDEADOS' }
  ]
  const onTerminalBuque = (e) => {
    setSelectTerminalBuque(e.value)
    updateField(e.value.name, 'terminalBuque')
  }
  const [programacionVentanaData, setProgramacionVentanaData] = useState(
    initialProgramacionVentanaForm
  )
  console.log(editProgramacionVentana)
  console.log(programacionVentanaData)
  const buqueCliente = [
    { buqueCliente: 'MAROIL' },
    { buqueCliente: 'MAROIL PRIORIDAD' },
    { buqueCliente: 'PDVSA' },
    { buqueCliente: 'PDVSA PRIORIDAD' },
    { buqueCliente: 'MANTENIMIENTO' }
  ]
  const buqueClienteVenta = [
    { buqueClienteVenta: 'CREC 10' },
    { buqueClienteVenta: 'ENDECO' },
    { buqueClienteVenta: 'NAKAR 2402' },
    { buqueClienteVenta: 'HK JIN GANG NA MEI' },
    { buqueClienteVenta: 'YIWU WUTING TRADING' },
    { buqueClienteVenta: 'SHANGHAI INTERNATIONAL LOGISTICS' },
    { buqueClienteVenta: 'ARXHK' },
    { buqueClienteVenta: 'LATAM RESOURCE SSUPPLY' },
    { buqueClienteVenta: 'MBENGUE SARL' },
    { buqueClienteVenta: 'GLOBEX WORLDWIDE' },
    { buqueClienteVenta: 'SANEKS' },
    { buqueClienteVenta: 'MERCALIX' },
    { buqueClienteVenta: 'KARAMAN PETROKIMYA ANONIM SIRKETI' },
    { buqueClienteVenta: 'PRAXLAN' },
    { buqueClienteVenta: 'PROTOCOL CAPITAL W. L. L.' },
    { buqueClienteVenta: 'RAC OVERSEAS' },
    { buqueClienteVenta: 'FONTE GLOBAL TRADING AND LOGISTICS' },
    { buqueClienteVenta: 'TTCO VERSEAS' },
    { buqueClienteVenta: 'NORMAN GLOBAL CORPORATION' },
    { buqueClienteVenta: 'MINAS GUSA' },
    { buqueClienteVenta: 'TARDID LIMITED' },
    { buqueClienteVenta: 'GLOBAL CARGO TRADING' },
    { buqueClienteVenta: 'COMET' },
    { buqueClienteVenta: 'FARLE' },
    { buqueClienteVenta: 'EMPRESA DE ASISTENCIAS Y SERVICIOS' },
    { buqueClienteVenta: 'GLOBULK DMCC' },
    { buqueClienteVenta: 'ADENIX GROUP LIMITED' },
    { buqueClienteVenta: 'GRANELES' },
    { buqueClienteVenta: 'SUPERIOR QUANTITY SDN BHD' },
    { buqueClienteVenta: 'REZEL CATALYSTS' },
    { buqueClienteVenta: 'ATLAS OIL' },
    { buqueClienteVenta: 'IRAN GARMENT COMPANY' },
    { buqueClienteVenta: 'UNECA' },
    { buqueClienteVenta: 'INTERNATIONAL MATERIALS' },
    { buqueClienteVenta: 'SHIMSUPA' },
    { buqueClienteVenta: 'ATLAS' },
    { buqueClienteVenta: 'JRD' },
    { buqueClienteVenta: 'BESTIN INDUSTRY DEVELOPMENT' }
  ]
  const onBuqueCliente = (e) => {
    setSelectedBuqueCliente(e.value)
    updateField(e.value.buqueCliente, 'buqueCliente')
  }
  const onBuqueClienteVenta = (e) => {
    setSelectedBuqueClienteVenta(e.value)
    updateField(e.value.buqueClienteVenta, 'buqueClienteVenta')
  }

  const [dateInicioVentana, setDateInicioVentana] = useState(null)
  const [dateFinVentana, setDateFinVentana] = useState(null)

  const toast = useRef(null)

  useEffect(() => {
    if (editProgramacionVentana) {
      setProgramacionVentanaData(editProgramacionVentana)

      setSelectedBuqueCliente({
        buqueCliente: editProgramacionVentana.buqueCliente
      })
      setSelectedBuqueClienteVenta({
        buqueClienteVenta: editProgramacionVentana.buqueClienteVenta
      })
      setSelectTerminalBuque({
        name: editProgramacionVentana.terminalBuque
      })
      setDateInicioVentana(
        editProgramacionVentana.fechaInicioVentana &&
          moment(editProgramacionVentana.fechaInicioVentana)._d
      )
      setDateFinVentana(
        editProgramacionVentana.fechaFinVentana &&
          moment(editProgramacionVentana.fechaFinVentana)._d
      )
    }
  }, [editProgramacionVentana])

  const updateField = (data, field) => {
    setProgramacionVentanaData({
      ...programacionVentanaData,
      [field]: data
    })
  }
  const enviarCorreoModificacion = () => {
    const templateParams = {
      name: 'James',
      notes: 'Check this out!',
      from_name: 'App Maroil Trading',
      to_name: 'Alejandro Perez',
      message: 'aqui va el cuerpo del correo a ver q tal se ve',
      fechaModificacion: moment().format('DD/MM/YY'),

      buqueCliente:
        editProgramacionVentana.buqueCliente ===
        programacionVentanaData.buqueCliente
          ? 'No hay cambios'
          : programacionVentanaData.buqueCliente,
      buqueClienteVenta:
        editProgramacionVentana.buqueClienteVenta ===
        programacionVentanaData.buqueClienteVenta
          ? 'No hay cambios'
          : programacionVentanaData.buqueClienteVenta,

      fechaFinVentana:
        editProgramacionVentana.fechaFinVentana ===
        programacionVentanaData.fechaFinVentana
          ? 'No hay cambios'
          : moment(programacionVentanaData.fechaFinVentana).format('DD/MM/YY'),
      fechaInicioVentana:
        editProgramacionVentana.fechaInicioVentana ===
        programacionVentanaData.fechaInicioVentana
          ? 'No hay cambios'
          : moment(programacionVentanaData.fechaInicioVentana).format(
              'DD/MM/YY'
            ),

      nombreBuque:
        editProgramacionVentana.nombreBuque ===
        programacionVentanaData.nombreBuque
          ? 'No hay cambios'
          : programacionVentanaData.nombreBuque,

      terminalBuque:
        editProgramacionVentana.terminalBuque ===
        programacionVentanaData.terminalBuque
          ? 'No hay cambios'
          : programacionVentanaData.terminalBuque,
      toneladasNominadas:
        editProgramacionVentana.toneladasNominadas ===
        programacionVentanaData.toneladasNominadas
          ? 'No hay cambios'
          : programacionVentanaData.toneladasNominadas
    }
    console.log(templateParams)
    emailjs
      .send(
        'service_abdz5oz',
        'template_xlk6gns',
        templateParams,
        '0sIlMgGjb4iAHCyGd'
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text)
        },
        (err) => {
          console.log('FAILED...', err)
        }
      )
  }
  const enviarCorreoCreado = () => {
    const templateParams = {
      name: 'James',
      notes: 'Check this out!',
      from_name: 'App Maroil Trading',
      to_name: 'Alejandro Perez',
      message: 'aqui va el cuerpo del correo a ver q tal se ve',
      fechaCreado: moment().format('DD/MM/YY'),

      buqueCliente: programacionVentanaData.buqueCliente,
      buqueClienteVenta: programacionVentanaData.buqueClienteVenta,

      fechaFinVentana: moment(programacionVentanaData.fechaFinVentana).format(
        'DD/MM/YY'
      ),
      fechaInicioVentana: moment(
        programacionVentanaData.fechaInicioVentana
      ).format('DD/MM/YY'),

      nombreBuque: programacionVentanaData.nombreBuque,

      terminalBuque: programacionVentanaData.terminalBuque,
      toneladasNominadas: programacionVentanaData.toneladasNominadas
    }
    console.log(templateParams)
    emailjs
      .send(
        'service_abdz5oz',
        'template_6hhhyec',
        templateParams,
        '0sIlMgGjb4iAHCyGd'
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text)
        },
        (err) => {
          console.log('FAILED...', err)
        }
      )
  }

  const saveProgramacionVentana = () => {
    if (!editProgramacionVentana) {
      enviarCorreoCreado()
      createProgramacionVentana(programacionVentanaData)
    } else {
      enviarCorreoModificacion()
      updateProgramacionVentana({
        ...programacionVentanaData,
        programacionVentanaModificado: moment()
      })
    }
    setProgramacionVentanaData(initialProgramacionVentanaForm)
    setIsVisible(false)
    setDateInicioVentana(null)
    setDateFinVentana(null)
    setSelectTerminalBuque(null)
    setSelectedBuqueCliente(null)
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
        onClick={saveProgramacionVentana}
      />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setProgramacionVentanaData(initialProgramacionVentanaForm)
    setDateInicioVentana(null)
    setDateFinVentana(null)
    setSelectTerminalBuque(null)
    setSelectedBuqueCliente(null)
  }

  const selectedBuqueClienteTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.buqueCliente}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const buqueClienteOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.buqueCliente}</div>
      </div>
    )
  }
  const selectedBuqueClienteVentaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.buqueClienteVenta}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const buqueClienteVentaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.buqueClienteVenta}</div>
      </div>
    )
  }

  const selectedTerminalBuqueTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.name}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const TerminalBuqueOptionTemplate = (option) => {
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
        style={{ width: '40vw' }}
        header="Detalles de la ProgramacionVentana"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={programacionVentanaData.nombreBuque}
              onChange={(e) => updateField(e.target.value, 'nombreBuque')}
            />
            <label>Nombre del Buque</label>
          </div>
          <br />

          <div className="formgrid grid">
            <div className="field col-12 md:col-6  mb-0 ">
              <label htmlFor="toneladasNominadas">Consignatario</label>
              <Dropdown
                value={selectedBuqueCliente}
                options={buqueCliente}
                onChange={onBuqueCliente}
                optionLabel="estatusbuqueCliente"
                placeholder="Seleccione Consignatario"
                valueTemplate={selectedBuqueClienteTemplate}
                itemTemplate={buqueClienteOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-6  mb-0 ">
              <label htmlFor="toneladasNominadas">Cliente</label>
              <Dropdown
                value={selectedBuqueClienteVenta}
                options={buqueClienteVenta}
                onChange={onBuqueClienteVenta}
                optionLabel="estatusbuqueCliente"
                placeholder="Seleccione Cliente"
                valueTemplate={selectedBuqueClienteVentaTemplate}
                itemTemplate={buqueClienteVentaOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Terminal</label>
              <Dropdown
                value={selectedTerminalBuque}
                options={TerminalBuque}
                onChange={onTerminalBuque}
                optionLabel="name"
                placeholder="Seleccione ubicacionBuque"
                valueTemplate={selectedTerminalBuqueTemplate}
                itemTemplate={TerminalBuqueOptionTemplate}
              />
            </div>
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="toneladasNominadas">Toneladas Nominadas</label>
              <InputNumber
                inputId="toneladasNominadas"
                value={programacionVentanaData.toneladasNominadas}
                onValueChange={(e) =>
                  updateField(e.target.value, 'toneladasNominadas')
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
              <label> Inicio de Ventana</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateInicioVentana !== null && dateInicioVentana}
                onChange={(e) => {
                  setDateInicioVentana(e.target.value)
                  updateField(e.target.value, 'fechaInicioVentana')
                }}
                showTime
                locale="es"
                // hourFormat="12"
                showButtonBar
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>Fin de Ventana</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={dateFinVentana !== null && dateFinVentana}
                onChange={(e) => {
                  setDateFinVentana(e.value)
                  updateField(e.target.value, 'fechaFinVentana')
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
      {/* </div> */}
    </div>
  )
}

export default ProgramacionVentanaForm
