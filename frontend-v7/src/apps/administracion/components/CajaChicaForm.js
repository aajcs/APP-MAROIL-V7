/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { CajaChicaContext } from '../contexts/CajaChicaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'
import { classNames } from 'primereact/utils'
import moment from 'moment'
import { ProveedorContext } from '../contexts/ProveedorContext'
import { CentroDeCostoAuxContext } from '../contexts/CentroDeCostoAuxContext'
import { ConceptoAuxContext } from '../contexts/ConceptoAuxContext'

const CajaChicaForm = (props) => {
  const initialCajaChicaForm = {
    id: null,
    codigoCajaChica: 0,
    fechaCajaChica: null,
    conceptoAuxId: null,
    ingresoMontoCajaChica: 0,
    egresoMontoCajaChica: 0,
    montoEntregadoCajaChica: 0,
    montoVueltoCajaChica: 0,
    estatusVueltoCajaChica: '',
    descripcionCajaChica: '',
    estatusCajaChica: '',
    proveedorId: null,
    centroDeCostoAuxId: null,
    userCreatorId: null,
    cajaChicaCreado: moment(),
    cajaChicaModificado: moment()
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
  const { createCajaChica, editCajaChica, updateCajaChica } =
    useContext(CajaChicaContext)
  const { proveedors } = useContext(ProveedorContext)
  const { centroDeCostoAuxs } = useContext(CentroDeCostoAuxContext)
  const { conceptoAuxs } = useContext(ConceptoAuxContext)
  const {
    isVisible,
    setIsVisible,
    ingresoEgresoVisible,
    setIngresoEgresoVisible,
    codigoUltimoActual
  } = props
  const [selectedCajaChica, setSelectedCajaChica] = useState(null)
  const [selectedEstatusVueltoCajaChica, setSelectedEstatusCajaCajaChica] =
    useState(null)
  const [selectedConceptoAux, setSelectedConceptoAux] = useState(null)
  const [selectedProveedorId, setSelectedProveedorId] = useState(null)
  const [selectedCentroDeCostoAuxId, setSelectedCentroDeCostoAuxId] =
    useState(null)
  const [cajaChicaData, setCajaChicaData] = useState(initialCajaChicaForm)
  const [submitted, setSubmitted] = useState(false)

  const estadoCajaChica = [
    { estatusCajaChica: 'PROCESADO' },
    { estatusCajaChica: 'ANULADO' },
    { estatusCajaChica: 'PENDIENTE' }
  ]
  const estatusVueltoCajaChica = [
    { estatusVueltoCajaChica: 'PROCESADO' },
    { estatusVueltoCajaChica: 'ANULADO' },
    { estatusVueltoCajaChica: 'PENDIENTE' }
  ]
  const onEstatusCajaChica = (e) => {
    setSelectedCajaChica(e.value)
    updateField(e.value.estatusCajaChica, 'estatusCajaChica')
  }
  const onEstatusVueltoCajaChica = (e) => {
    setSelectedEstatusCajaCajaChica(e.value)
    updateField(e.value.estatusVueltoCajaChica, 'estatusVueltoCajaChica')
  }
  const onconceptoCajaChica = (e) => {
    e.value
      ? (setSelectedConceptoAux(e.value),
        updateField(e.value.id, 'conceptoAuxId'))
      : (setSelectedConceptoAux(null), updateField(null, 'conceptoAuxId'))
  }

  const onProveedorId = (e) => {
    e.value
      ? (setSelectedProveedorId(e.value),
        updateField(e.value.id, 'proveedorId'))
      : (setSelectedProveedorId(e.value),
        updateField(e.value.id, 'proveedorId'))
  }
  const onCentroDeCostoAuxId = (e) => {
    e.value
      ? (setSelectedCentroDeCostoAuxId(e.value),
        updateField(e.value.id, 'centroDeCostoAuxId'))
      : (setSelectedCentroDeCostoAuxId(null),
        updateField(null, 'centroDeCostoAuxId'))
  }

  const [datefechaCajaChica, setDatefechaCajaChica] = useState(null)

  const toast = useRef(null)

  useEffect(() => {
    if (editCajaChica) {
      setCajaChicaData({
        ...editCajaChica,

        proveedorId: editCajaChica.proveedorId && editCajaChica.proveedorId.id,
        centroDeCostoAuxId:
          editCajaChica.centroDeCostoAuxId &&
          editCajaChica.centroDeCostoAuxId.id,
        conceptoAuxId:
          editCajaChica.conceptoAuxId && editCajaChica.conceptoAuxId.id
      })
      setSelectedCajaChica({
        estatusCajaChica: editCajaChica.estatusCajaChica
      })
      setSelectedEstatusCajaCajaChica({
        estatusVueltoCajaChica: editCajaChica.estatusVueltoCajaChica
      })
      const conceptoAuxSelecEdit =
        editCajaChica.conceptoAuxId &&
        conceptoAuxs.find((p) => p.id === editCajaChica.conceptoAuxId.id)

      setSelectedConceptoAux(conceptoAuxSelecEdit)

      const centroDeCostoSelecEdit =
        editCajaChica.centroDeCostoAuxId &&
        centroDeCostoAuxs.find(
          (p) => p.id === editCajaChica.centroDeCostoAuxId.id
        )
      setSelectedCentroDeCostoAuxId(centroDeCostoSelecEdit)
      const proveedorSelecEdit =
        editCajaChica.proveedorId &&
        proveedors.find((p) => p.id === editCajaChica.proveedorId.id)
      setSelectedProveedorId(proveedorSelecEdit)
      setDatefechaCajaChica(
        editCajaChica.fechaCajaChica && moment(editCajaChica.fechaCajaChica)._d
      )
      setDatefechaCajaChica(
        editCajaChica.fechaEfectivaCajaChica &&
          moment(editCajaChica.fechaEfectivaCajaChica)._d
      )
    }
  }, [editCajaChica])
  useEffect(() => {
    setCajaChicaData({
      ...cajaChicaData,
      codigoCajaChica: codigoUltimoActual + 1
    })
  }, [codigoUltimoActual, isVisible])

  const updateField = (data, field) => {
    setCajaChicaData({
      ...cajaChicaData,
      [field]: data
    })
  }
  const vueltoAutomatico = (data, field) => {
    const vuelto = data - cajaChicaData.egresoMontoCajaChica
    if (vuelto > 0) {
      setCajaChicaData({
        ...cajaChicaData,
        montoVueltoCajaChica: vuelto
      })
    } else {
      setCajaChicaData({
        ...cajaChicaData,
        montoVueltoCajaChica: 0
      })
    }
  }
  // id: null,
  // codigoCajaChica: 0,
  // fechaCajaChica: null,
  // conceptoAuxId: null,
  // ingresoMontoCajaChica: 0,
  // egresoMontoCajaChica: 0,
  // montoEntregadoCajaChica: 0,
  // montoVueltoCajaChica: 0,
  // estatusVueltoCajaChica: '',
  // descripcionCajaChica: '',
  // estatusCajaChica: '',
  // proveedorId: null,
  // centroDeCostoAuxId: null,
  // userCreatorId: null,
  // cajaChicaCreado: moment(),
  // cajaChicaModificado: moment()
  const saveCajaChica = () => {
    setSubmitted(true)
    if (
      cajaChicaData.codigoCajaChica !== 0 &&
      (cajaChicaData.ingresoMontoCajaChica !== 0 ||
        cajaChicaData.egresoMontoCajaChica !== 0) &&
      cajaChicaData.estatusDataPresupuesto !== null &&
      cajaChicaData.fechaCajaChica !== null &&
      cajaChicaData.estatusCajaChica !== null &&
      cajaChicaData.proveedorId !== null &&
      cajaChicaData.centroDeCostoAuxId !== null &&
      cajaChicaData.conceptoAuxId !== null
    ) {
      if (!editCajaChica) {
        createCajaChica(cajaChicaData)
      } else {
        updateCajaChica({
          ...cajaChicaData,
          modificadoCajaChica: moment()
        })
      }
      clearSelected()
    }
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveCajaChica} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setIngresoEgresoVisible(false)
    setCajaChicaData(initialCajaChicaForm)
    setSelectedCajaChica('')
    setDatefechaCajaChica(null)
    setSelectedCajaChica(null)
    setSelectedConceptoAux(null)
    setSelectedProveedorId(null)
    setSelectedCentroDeCostoAuxId(null)
    setSubmitted(false)
  }

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '50vw' }}
        header={
          ingresoEgresoVisible
            ? 'Datalles del ingreso '
            : 'Datalles del egreso '
        }
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid">
            <div className="label col-12 md:col-6 mt-3">
              <span className="p-float-label">
                <InputText
                  disabled
                  value={
                    cajaChicaData.codigoCajaChica || codigoUltimoActual + 1
                  }
                  onChange={(e) =>
                    updateField(e.target.value, 'codigoCajaChica')
                  }
                  className={classNames({
                    'p-invalid': submitted && !cajaChicaData.codigoCajaChica
                  })}
                />{' '}
                {submitted && !cajaChicaData.codigoCajaChica && (
                  <small className="p-invalid">Proveedor es requerido.</small>
                )}
                <label>Codigo Caja Chica:</label>
              </span>
            </div>

            <div className="field col-12 md:col-6 mt-3 ">
              <span className="p-float-label">
                <Dropdown
                  value={selectedConceptoAux}
                  options={conceptoAuxs}
                  onChange={onconceptoCajaChica}
                  optionLabel="nombreConceptoAux"
                  // valueTemplate={selectedconceptoCajaChicaTemplate}
                  // itemTemplate={conceptoCajaChicaOptionTemplate}
                  showClear
                  filter
                  filterBy="nombreConceptoAux"
                  className={classNames({
                    'p-invalid': submitted && !cajaChicaData.conceptoAuxId
                  })}
                />{' '}
                {submitted && !cajaChicaData.conceptoAuxId && (
                  <small className="p-invalid">Concepto es requerido.</small>
                )}
                <label>Seleccione Concepto</label>
              </span>
            </div>

            <div className="field col-12 mt-3 ">
              <span className="p-float-label">
                <InputText
                  value={cajaChicaData.descripcionCajaChica}
                  onChange={(e) =>
                    updateField(e.target.value, 'descripcionCajaChica')
                  }
                />
                <label>Descripcion:</label>{' '}
              </span>
            </div>
            <div className="field col-12 md:col-6 mt-3 ">
              <span className="p-float-label">
                <Dropdown
                  value={selectedProveedorId}
                  options={proveedors}
                  onChange={onProveedorId}
                  optionLabel="nombreProveedor"
                  showClear
                  filter
                  filterBy="nombreProveedor"
                  showButtonBar
                  className={classNames({
                    'p-invalid': submitted && !cajaChicaData.proveedorId
                  })}
                />{' '}
                {submitted && !cajaChicaData.proveedorId && (
                  <small className="p-invalid">Proveedor es requerido.</small>
                )}
                <label>Seleccione Proveedor</label>
              </span>
            </div>
            <div className="field col-12 md:col-6 mt-3">
              <span className="p-float-label">
                <Dropdown
                  value={selectedCentroDeCostoAuxId}
                  options={centroDeCostoAuxs}
                  onChange={onCentroDeCostoAuxId}
                  optionLabel="nombreCentroDeCosto"
                  showClear
                  filter
                  filterBy="nombreCentroDeCosto"
                  className={classNames({
                    'p-invalid': submitted && !cajaChicaData.centroDeCostoAuxId
                  })}
                />{' '}
                {submitted && !cajaChicaData.centroDeCostoAuxId && (
                  <small className="p-invalid">
                    Centro De Costo es requerido.
                  </small>
                )}
                <label>Seleccione Centro De Costo</label>{' '}
              </span>
            </div>
            {!ingresoEgresoVisible && (
              <div className="field col-12 md:col-6 mt-3">
                <span className="p-float-label">
                  <InputNumber
                    inputId="egresoMontoCajaChica"
                    value={cajaChicaData.egresoMontoCajaChica}
                    onValueChange={(e) =>
                      updateField(e.target.value, 'egresoMontoCajaChica')
                    }
                    mode="currency"
                    currency="USD"
                    locale="de-DE"
                    className={classNames({
                      'p-invalid':
                        submitted && !cajaChicaData.egresoMontoCajaChica
                    })}
                  />
                  {submitted && !cajaChicaData.egresoMontoCajaChica && (
                    <small className="p-invalid">
                      Centro De Costo es requerido.
                    </small>
                  )}
                  <label htmlFor="egresoMontoCajaChica">Egreso</label>
                </span>
              </div>
            )}
            {ingresoEgresoVisible && (
              <div className="field col-12 md:col-6 mt-3">
                <span className="p-float-label">
                  <InputNumber
                    inputId="ingresoMontoCajaChica"
                    value={cajaChicaData.ingresoMontoCajaChica}
                    onValueChange={(e) =>
                      updateField(e.target.value, 'ingresoMontoCajaChica')
                    }
                    mode="currency"
                    currency="USD"
                    locale="de-DE"
                    className={classNames({
                      'p-invalid':
                        submitted && !cajaChicaData.ingresoMontoCajaChica
                    })}
                  />
                  {submitted && !cajaChicaData.ingresoMontoCajaChica && (
                    <small className="p-invalid">
                      Centro De Costo es requerido.
                    </small>
                  )}
                  <label htmlFor="ingresoMontoCajaChica">Ingreso</label>
                </span>
              </div>
            )}
            {!ingresoEgresoVisible && (
              <>
                <div className="field col-12 md:col-6 mt-3">
                  <span className="p-float-label">
                    <InputNumber
                      inputId="montoEntregadoCajaChica"
                      value={cajaChicaData.montoEntregadoCajaChica}
                      onValueChange={(e) => {
                        updateField(e.target.value, 'montoEntregadoCajaChica')
                        vueltoAutomatico(e.target.value)
                      }}
                      mode="currency"
                      currency="USD"
                      locale="de-DE"
                    />{' '}
                    <label htmlFor="montoEntregadoCajaChica">
                      Monto Entregado
                    </label>
                  </span>
                </div>
                <div className="field col-12 md:col-6 mt-3">
                  <span className="p-float-label">
                    <InputNumber
                      inputId="montoVueltoCajaChica"
                      value={cajaChicaData.montoVueltoCajaChica}
                      onValueChange={(e) =>
                        updateField(e.target.value, 'montoVueltoCajaChica')
                      }
                      mode="currency"
                      currency="USD"
                      locale="de-DE"
                      disabled
                    />
                    <label htmlFor="montoVueltoCajaChica">
                      Cambio Pendiente
                    </label>
                  </span>
                </div>
                <div className="field col-12 md:col-6 mt-3">
                  <span className="p-float-label">
                    <Dropdown
                      value={selectedEstatusVueltoCajaChica}
                      options={estatusVueltoCajaChica}
                      onChange={onEstatusVueltoCajaChica}
                      optionLabel="estatusVueltoCajaChica"
                    />
                    <label>Estatus Cambio</label>
                  </span>
                </div>
              </>
            )}
            <div className="field col-12 md:col-6 mt-3">
              <span className="p-float-label">
                <Dropdown
                  value={selectedCajaChica}
                  options={estadoCajaChica}
                  onChange={onEstatusCajaChica}
                  optionLabel="estatusCajaChica"
                  className={classNames({
                    'p-invalid': submitted && !cajaChicaData.estatusCajaChica
                  })}
                />{' '}
                {submitted && !cajaChicaData.estatusCajaChica && (
                  <small className="p-invalid">Proveedor es requerido.</small>
                )}
                <label>Seleccione Estado</label>
              </span>
            </div>
            <div className="field col-12 md:col-6 mt-3">
              <span className="p-float-label">
                <Calendar
                  id="time24"
                  value={datefechaCajaChica !== null && datefechaCajaChica}
                  onChange={(e) => {
                    setDatefechaCajaChica(e.target.value)
                    updateField(e.target.value, 'fechaCajaChica')
                  }}
                  showTime
                  locale="es"
                  // hourFormat="12"
                  showButtonBar
                  className={classNames(
                    {
                      'p-invalid': submitted && !cajaChicaData.fechaCajaChica
                    },
                    'p-datepicker-today'
                  )}
                />
                {submitted && !cajaChicaData.fechaCajaChica && (
                  <small className="p-invalid">Fecha es requerido.</small>
                )}
                <label>Fecha Efectiva</label>{' '}
              </span>
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default CajaChicaForm
