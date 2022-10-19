/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { IngresoGastoContext } from '../contexts/IngresoGastoContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'

import moment from 'moment'
import { ProveedorContext } from '../contexts/ProveedorContext'
import { CentroDeCostoAuxContext } from '../contexts/CentroDeCostoAuxContext'
import { ProcesoAuxContext } from '../contexts/ProcesoAuxContext'

const IngresoGastoForm = (props) => {
  const initialIngresoGastoForm = {
    id: null,
    fechaIngresoGasto: '',
    conceptoIngresoGasto: '',
    ingresoIngresoGasto: 0,
    egresoIngresoGasto: 0,
    estatusIngresoGasto: '',
    procesoAuxId: null,
    proveedorId: null,
    centroDeCostoAuxId: null,
    userCreatorId: null,
    ingresoGastoCreado: moment(),
    ingresoGastoModificado: moment()
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
  const { createIngresoGasto, editIngresoGasto, updateIngresoGasto } =
    useContext(IngresoGastoContext)
  const { procesoAuxs } = useContext(ProcesoAuxContext)
  const { proveedors } = useContext(ProveedorContext)
  const { centroDeCostoAuxs } = useContext(CentroDeCostoAuxContext)

  const { isVisible, setIsVisible } = props
  const [selectedIngresoGasto, setSelectedIngresoGasto] = useState(null)
  const [selectedconceptoIngresoGasto, setSelectedconceptoIngresoGasto] =
    useState(null)
  const [selectedProcesoAuxId, setSelectedProcesoAuxId] = useState(null)
  const [selectedProveedorId, setSelectedProveedorId] = useState(null)
  const [selectedCentroDeCostoAuxId, setSelectedCentroDeCostoAuxId] =
    useState(null)
  const [ingresoGastoData, setIngresoGastoData] = useState(
    initialIngresoGastoForm
  )

  const estadoIngresoGasto = [
    { estatusIngresoGasto: 'PROCESADO' },
    { estatusIngresoGasto: 'ANULADO' },
    { estatusIngresoGasto: 'PENDIENTE' }
  ]
  const onEstatusIngresoGasto = (e) => {
    setSelectedIngresoGasto(e.value)
    updateField(e.value.estatusIngresoGasto, 'estatusIngresoGasto')
  }
  const conceptoIngresoGasto = [
    { conceptoIngresoGasto: 'NOMINAS Y GASTOS DEL PERSONAL' },
    { conceptoIngresoGasto: 'SERVICIOS CONTRATADOS' },
    { conceptoIngresoGasto: 'TRANSPORTE DE PERSONAL' },
    { conceptoIngresoGasto: 'COMIDAS' },
    { conceptoIngresoGasto: 'REPARACIONES Y MANTENIMIENTO' },
    { conceptoIngresoGasto: 'SERVICIOS TECNICOS (LUBVENCA)' },
    { conceptoIngresoGasto: 'SERVICIOS QUÍMICOS (LUBVENCA)' },
    { conceptoIngresoGasto: 'GASTOS ADMIN. Y CONSUMIBLES DE OFICINA' },
    { conceptoIngresoGasto: 'SIHO' },
    { conceptoIngresoGasto: 'ACARREO' },
    { conceptoIngresoGasto: 'OPERACIONES MARITIMAS' }
  ]

  const onconceptoIngresoGasto = (e) => {
    setSelectedconceptoIngresoGasto(e.value)
    updateField(e.value.conceptoIngresoGasto, 'conceptoIngresoGasto')
  }
  const onProcesoAuxId = (e) => {
    setSelectedProcesoAuxId(e.value)
    updateField(e.value.id, 'procesoAuxId')
  }
  const onProveedorId = (e) => {
    setSelectedProveedorId(e.value)
    updateField(e.value.id, 'proveedorId')
  }
  const onCentroDeCostoAuxId = (e) => {
    setSelectedCentroDeCostoAuxId(e.value)
    updateField(e.value.id, 'centroDeCostoAuxId')
  }

  const [datefechaIngresoGasto, setDatefechaIngresoGasto] = useState(null)

  const toast = useRef(null)

  useEffect(() => {
    if (editIngresoGasto) {
      setIngresoGastoData(editIngresoGasto)
      setSelectedIngresoGasto({
        estatusIngresoGasto: editIngresoGasto.estatusIngresoGasto
      })
      setSelectedconceptoIngresoGasto({
        conceptoIngresoGasto: editIngresoGasto.conceptoIngresoGasto
      })

      setDatefechaIngresoGasto(
        editIngresoGasto.fechafechaIngresoGasto &&
          moment(editIngresoGasto.fechafechaIngresoGasto)._d
      )
    }
  }, [editIngresoGasto])

  const updateField = (data, field) => {
    setIngresoGastoData({
      ...ingresoGastoData,
      [field]: data
    })
  }

  const saveIngresoGasto = () => {
    if (!editIngresoGasto) {
      createIngresoGasto(ingresoGastoData)
    } else {
      updateIngresoGasto({
        ...ingresoGastoData,
        ingresoGastoModificado: moment()
      })
    }
    setIngresoGastoData(initialIngresoGastoForm)
    setIsVisible(false)
    setSelectedIngresoGasto('')
    setDatefechaIngresoGasto(null)
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveIngresoGasto} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setIngresoGastoData(initialIngresoGastoForm)
    setSelectedIngresoGasto('')
    setDatefechaIngresoGasto(null)
  }
  const selectedestatusIngresoGastoTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusIngresoGasto}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusIngresoGastoOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusIngresoGasto}</div>
      </div>
    )
  }
  const selectedconceptoIngresoGastoTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.conceptoIngresoGasto}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const conceptoIngresoGastoOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.conceptoIngresoGasto}</div>
      </div>
    )
  }
  const selectedTemplateProcesoAuxId = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.nombreProceso}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const optionTemplateProcesoAuxId = (option) => {
    return (
      <div className="country-item">
        <div>{option.nombreProceso}</div>
      </div>
    )
  }
  const selectedTemplateProveedorId = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.nombreProveedor}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const optionTemplateProveedorId = (option) => {
    return (
      <div className="country-item">
        <div>{option.nombreProveedor}</div>
      </div>
    )
  }
  const selectedTemplateCentroDeCostoAuxId = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.nombreCentroDeCosto}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const optionTemplateCentroDeCostoAuxId = (option) => {
    return (
      <div className="country-item">
        <div>{option.nombreCentroDeCosto}</div>
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
        header="Detalles de la IngresoGasto"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />

          <div className="field col-12 md:col-6 mt-3 mb-0 ">
            <label>conceptoIngresoGasto</label>

            <Dropdown
              value={selectedconceptoIngresoGasto}
              options={conceptoIngresoGasto}
              onChange={onconceptoIngresoGasto}
              optionLabel="estatusconceptoIngresoGasto"
              placeholder="Seleccione Cliente"
              valueTemplate={selectedconceptoIngresoGastoTemplate}
              itemTemplate={conceptoIngresoGastoOptionTemplate}
              showClear
              filter
              filterBy="conceptoIngresoGasto"
            />
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={ingresoGastoData.descripcion}
              onChange={(e) => updateField(e.target.value, 'descripcion')}
            />
            <label>Descripcion:</label>
          </div>
          <div className="formgrid grid">
            <div className="field col-12 md:col-6 mt-3 mb-0 ">
              <label>procesoAuxId</label>

              <Dropdown
                value={selectedProcesoAuxId}
                options={procesoAuxs}
                onChange={onProcesoAuxId}
                optionLabel="nombreProyecto"
                placeholder="Seleccione procesoAuxId"
                valueTemplate={selectedTemplateProcesoAuxId}
                itemTemplate={optionTemplateProcesoAuxId}
                showClear
                filter
                filterBy="procesoAuxs.nombreProyecto"
              />
            </div>
            <div className="field col-12 md:col-6 mt-3 mb-0 ">
              <label>proveedorId</label>

              <Dropdown
                value={selectedProveedorId}
                options={proveedors}
                onChange={onProveedorId}
                optionLabel="nombreProveedor"
                placeholder="Seleccione ProveedorId"
                valueTemplate={selectedTemplateProveedorId}
                itemTemplate={optionTemplateProveedorId}
                showClear
              />
            </div>
            <div className="field col-12 md:col-6 mt-3 mb-0 ">
              <label>centroDeCostoAuxId</label>

              <Dropdown
                value={selectedCentroDeCostoAuxId}
                options={centroDeCostoAuxs}
                onChange={onCentroDeCostoAuxId}
                optionLabel="nombreCentroDeCosto"
                placeholder="Seleccione C
                entroDeCostoAuxId"
                valueTemplate={selectedTemplateCentroDeCostoAuxId}
                itemTemplate={optionTemplateCentroDeCostoAuxId}
                showClear
              />
            </div>

            <br />
            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="egresoIngresoGasto">egresoIngresoGasto</label>
              <InputNumber
                inputId="egresoIngresoGasto"
                value={ingresoGastoData.egresoIngresoGasto}
                onValueChange={(e) =>
                  updateField(e.target.value, 'egresoIngresoGasto')
                }
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </div>

            <div className="field col-6 p-col-2 p-md-1">
              <label htmlFor="ingresoIngresoGasto">ingresoIngresoGasto</label>
              <InputNumber
                inputId="ingresoIngresoGasto"
                value={ingresoGastoData.ingresoIngresoGasto}
                onValueChange={(e) =>
                  updateField(e.target.value, 'ingresoIngresoGasto')
                }
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedIngresoGasto}
                options={estadoIngresoGasto}
                onChange={onEstatusIngresoGasto}
                optionLabel="estatusIngresoGasto"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusIngresoGastoTemplate}
                itemTemplate={estatusIngresoGastoOptionTemplate}
              />
            </div>
            <div className="field col-12 md:col-6">
              <label>fechaIngresoGasto</label>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={datefechaIngresoGasto !== null && datefechaIngresoGasto}
                onChange={(e) => {
                  setDatefechaIngresoGasto(e.target.value)
                  updateField(e.target.value, 'fechaIngresoGasto')
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

export default IngresoGastoForm
