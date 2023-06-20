/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect, useRef } from 'react'
import { ProformaContext } from '../contexts/ProformaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { classNames } from 'primereact/utils'
// import { InputNumber } from 'primereact/inputnumber'
// import { InputTextarea } from 'primereact/inputtextarea'
import { Calendar } from 'primereact/calendar'
import moment from 'moment'
import { DominioContext } from '../contexts/DominioContext'
import { DivisionContext } from '../contexts/DivisionContext'
import { DependenciaContext } from '../contexts/DependenciaContext'
import { SubDependenciaContext } from '../contexts/SubDependenciaContext'
import { ProveedorContext } from '../contexts/ProveedorContext'
import { ActividadAsociadaContext } from '../contexts/ActividadAsociadaContext'
import { ClasificacionServicioContext } from '../contexts/ClasificacionServicioContext'
import CargaItemsProformaList from './CargaItemsProformaList'
const CargaProformaForm = (props) => {
  const initialProformaForm = {
    id: null,

    codigoProforma: '',
    proveedorId: null,
    numeroControlProforma: '',
    fechaControlProforma: null,
    fechaInicioProforma: null,
    fechaFinProforma: null,
    dominioId: null,
    divisionId: null,
    dependenciaId: null,
    subDependenciaId: null,
    actividadAsociadaId: null,
    clasificacionServicioId: null,
    usoFondoProforma: null,
    ingresoProforma: 0,
    egresoProforma: 0,
    totalProforma: 0,
    descripcionProforma: '',
    estatusProforma: null,
    estatus2Proforma: 'NO PAGADA',
    userCreatorId: null,
    creadoProforma: moment(),
    modificadoProforma: moment()
  }
  // const emptyItem = {
  //   itemId: null,
  //   itemClasificacionServicio: null,
  //   itemClasificacion3erNivel: null,
  //   itemClasificacion4toNivel: null,
  //   itemDescripcion: '',
  //   itemUnidad: null,
  //   itemCantidad: 0,
  //   itemPrecioUnitario: 0,
  //   itemPrecioTotal: 0
  // }

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
    proformas,
    createProforma,
    editProforma,
    setEditProforma,
    updateProforma
  } = useContext(ProformaContext)
  const { dominios } = useContext(DominioContext)
  const { divisions } = useContext(DivisionContext)
  const { dependencias } = useContext(DependenciaContext)
  const { subDependencias } = useContext(SubDependenciaContext)

  const { proveedors } = useContext(ProveedorContext)
  const { actividadAsociadas } = useContext(ActividadAsociadaContext)
  const { clasificacionServicios } = useContext(ClasificacionServicioContext)

  const { isVisible, setIsVisible } = props
  const [selectedProforma, setSelectedProforma] = useState(null)
  const [selectedEstatus2Proforma, setSelectedEstatus2Proforma] = useState({
    estatus2Proforma: 'NO PAGADA'
  })
  const [proformaData, setProformaData] = useState(initialProformaForm)

  const [selectedDominio, setSelectedDominio] = useState(null)
  const [selectedDivision, setSelectedDivision] = useState(null)
  const [selectedDependencia, setSelectedDependencia] = useState(null)
  const [selectedSubDependencia, setSelectedSubDependencia] = useState(null)
  const [selectedProveedor, setSelectedProveedor] = useState(null)
  const [selectedActividadAsociada, setSelectedActividadAsociada] =
    useState(null)
  const [selectedClasificacionServicio, setSelectedClasificacionServicio] =
    useState(null)
  const [selectedusoFondoProforma, setSelectedusoFondoProforma] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [dateControl, setDateControl] = useState()
  const [dateInicio, setDateInicio] = useState()
  const [dateFinal, setDateFinal] = useState()
  const [items, setItems] = useState([])
  const [division, setDivision] = useState(divisions)
  const [dependencia, setDependencia] = useState(dependencias)
  const [subDependencia, setSubDependencia] = useState(subDependencias)
  const estadoProforma = [
    { estatusProforma: 'ESTIMADA (PROVISIÓN)' },
    { estatusProforma: 'POR CONFIRMAR' },
    { estatusProforma: 'CONFIRMADA' }
  ]
  const estadoEstatus2Proforma = [
    { estatus2Proforma: 'PAGADA' },
    { estatus2Proforma: 'NO PAGADA' },
    { estatus2Proforma: 'PAGADA PARCIAL' }
  ]
  const usoFondoProforma = [
    { usoFondoProforma: 'CONTINUIDAD OPERATIVA' },
    { usoFondoProforma: 'INVERSIÓN' },
    { usoFondoProforma: 'GASTO ADMINISTRATIVO' }
  ]
  const onEstatusProforma = (e) => {
    setSelectedProforma(e.value)
    updateField(e.value.estatusProforma, 'estatusProforma')
  }
  const onEstatus2Proforma = (e) => {
    setSelectedEstatus2Proforma(e.value)
    updateField(e.value.estatus2Proforma, 'estatus2Proforma')
  }
  const onUsoFondoProforma = (e) => {
    e.value
      ? (setSelectedusoFondoProforma(e.value),
        updateField(e.value.usoFondoProforma, 'usoFondoProforma'))
      : (setSelectedusoFondoProforma(null),
        updateField(null, 'usoFondoProforma'))
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editProforma) {
      setProformaData({
        ...editProforma,
        dominioId: editProforma.dominioId?.id,
        divisionId: editProforma.divisionId?.id,
        dependenciaId: editProforma.dependenciaId?.id,
        subDependenciaId: editProforma.subDependenciaId?.id,
        proveedorId: editProforma.proveedorId?.id,
        actividadAsociadaId: editProforma.actividadAsociadaId?.id,
        clasificacionServicioId: editProforma.clasificacionServicioId?.id
      })
      setSelectedProforma({
        estatusProforma: editProforma.estatusProforma
      })
      const dominioSelecEdit =
        editProforma.dominioId &&
        dominios.find((p) => p.id === editProforma.dominioId.id)
      setSelectedDominio(dominioSelecEdit)
      const divisionSelecEdit =
        editProforma.divisionId &&
        divisions.find((p) => p.id === editProforma.divisionId.id)
      setSelectedDivision(divisionSelecEdit)

      const dependenciaSelecEdit =
        editProforma.dependenciaId &&
        dependencias.find((p) => p.id === editProforma.dependenciaId.id)
      setSelectedDependencia(dependenciaSelecEdit)
      const subDependenciaSelecEdit =
        editProforma.subDependenciaId &&
        subDependencias.find((p) => p.id === editProforma.subDependenciaId.id)
      setSelectedSubDependencia(subDependenciaSelecEdit)
      const proveedorSelecEdit =
        editProforma.proveedorId &&
        proveedors.find((p) => p.id === editProforma.proveedorId.id)
      setSelectedProveedor(proveedorSelecEdit)
      const actividadAsociadaSelecEdit =
        editProforma.actividadAsociadaId &&
        actividadAsociadas.find(
          (p) => p.id === editProforma.actividadAsociadaId.id
        )
      setSelectedActividadAsociada(actividadAsociadaSelecEdit)
      const clasificacionServicioSelecEdit =
        editProforma.clasificacionServicioId &&
        clasificacionServicios.find(
          (p) => p.id === editProforma.clasificacionServicioId.id
        )
      setSelectedClasificacionServicio(clasificacionServicioSelecEdit)
      setDateControl(
        editProforma.fechaControlProforma &&
          moment(editProforma.fechaControlProforma)._d
      )
      setDateInicio(
        editProforma.fechaInicioProforma &&
          moment(editProforma.fechaInicioProforma)._d
      )
      setDateFinal(
        editProforma.fechaFinProforma &&
          moment(editProforma.fechaFinProforma)._d
      )
      setItems(editProforma?.items && editProforma.items)
      setSelectedusoFondoProforma({
        usoFondoProforma: editProforma.usoFondoProforma
      })
    }
  }, [editProforma])
  useEffect(() => {
    updateField(totalDataPresupuestoSuma(), 'totalProforma')
  }, [items])
  const totalDataPresupuestoSuma = () => {
    // let cantidad = 0
    // let precioUnitario = 0
    let total = 0
    for (const unitario of items) {
      // precioUnitario += unitario.precioUnitarioDataPresupuesto
      // cantidad += unitario.cantidadDataPresupuesto
      total += unitario.itemCantidad * unitario.itemPrecioUnitario
    }

    return total
  }
  // const formatCurrency = (value) => {
  //   return value.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })
  // }
  const onDominio = (e) => {
    // e.value
    //   ? (setSelectedDominio(e.value), updateField(e.value.id, 'dominioId'))
    //   : (setSelectedDominio(null), updateField(null, 'dominioId'))
    if (e.value) {
      const divisionsFilter = divisions.filter(
        (p) => p.dominioId?.id === e.value.id
      )
      setSelectedDominio(e.value)
      updateField(e.value.id, 'dominioId')

      setDivision(divisionsFilter)
    } else {
      setSelectedDominio(null)
      updateField(null, 'dominioId')
      setDependencia(null)
      setSubDependencia(null)
      setDivision(null)
    }
  }
  const onDivision = (e) => {
    // e.value
    //   ? (setSelectedDivision(e.value), updateField(e.value.id, 'divisionId'))
    //   : (setSelectedDivision(null), updateField(null, 'divisionId'))
    if (e.value) {
      const dependenciasFilter = dependencias.filter(
        (p) => p.divisionId?.id === e.value.id
      )
      setSelectedDivision(e.value)
      updateField(e.value.id, 'divisionId')

      setDependencia(dependenciasFilter)
    } else {
      setSelectedDivision(null)
      updateField(null, 'divisionId')
      setDependencia(null)
      setSubDependencia(null)
    }
  }
  const onDependencia = (e) => {
    // e.value
    //   ? (setSelectedDependencia(e.value),
    //     updateField(e.value.id, 'dependenciaId'))
    //   : (setSelectedDependencia(null), updateField(null, 'dependenciaId'))
    if (e.value) {
      const subDependenciasFilter = subDependencias.filter(
        (p) => p.dependenciaId?.id === e.value.id
      )
      setSelectedDependencia(e.value)
      updateField(e.value.id, 'dependenciaId')

      setSubDependencia(subDependenciasFilter)
    } else {
      setSelectedDependencia(null)
      updateField(null, 'dependenciaId')
      setDependencia(null)
      setSubDependencia(null)
    }
  }
  const onSubDependencia = (e) => {
    e.value
      ? (setSelectedSubDependencia(e.value),
        updateField(e.value.id, 'subDependenciaId'))
      : (setSelectedSubDependencia(null), updateField(null, 'subDependenciaId'))
    // if (e.value) {
    //   const subProyectoFilter = subProyectos.filter(
    //     (p) => p.proyectoId?.id === e.value.id
    //   )
    //   setSelectedProyecto(e.value)
    //   setSubProyecto(subProyectoFilter)
    // } else {
    //   setSelectedProyecto(null)
    //   setSubProyecto(null)
    //   setSelectedSubProyecto(null)
    //   setSelectedPresupuesto(null)
    // }
  }
  const onProveedor = (e) => {
    console.log(proformas)

    const proveedorCodigoInterno = proformas.filter(
      (p) => p.proveedorId?.id === e.value?.id
    )

    console.log(proveedorCodigoInterno.length + 1)
    const codigoAutomaticoProforma = `PF-${e.value?.codigoProveedor}-${
      proveedorCodigoInterno.length + 1
    }`
    e.value
      ? (setSelectedProveedor(e.value),
        updateField2(
          e.value.id,
          'proveedorId',
          codigoAutomaticoProforma,
          'codigoProforma'
        ))
      : (setSelectedProveedor(null),
        updateField2(null, 'proveedorId', '', 'codigoProforma'))
    // if (e.value) {
    //   const subProyectoFilter = subProyectos.filter(
    //     (p) => p.proyectoId?.id === e.value.id
    //   )
    //   setSelectedProyecto(e.value)
    //   setSubProyecto(subProyectoFilter)
    // } else {
    //   setSelectedProyecto(null)
    //   setSubProyecto(null)
    //   setSelectedSubProyecto(null)
    //   setSelectedPresupuesto(null)
    // }
  }
  // const onNumeroControl = (e) => {
  //   const codigoAutomaticoProforma = `PF-${selectedProveedor?.codigoProveedor}-${e.target.value}`
  //   updateField2(
  //     e.target.value,
  //     'numeroControlProforma',
  //     codigoAutomaticoProforma,
  //     'codigoProforma'
  //   )
  //   // console.log(e.value?.codigoProveedor)
  //   // const codigoAutomaticoProforma = `PF-${e.value?.codigoProveedor}-${proformaData.numeroControlProforma}`
  //   // console.log(codigoAutomaticoProforma)
  //   // e.value
  //   //   ? (setSelectedProveedor(e.value),
  //   //     updateField2(
  //   //       e.value.id,
  //   //       'proveedorId',
  //   //       codigoAutomaticoProforma,
  //   //       'codigoProforma'
  //   //     ))
  //   //   : (setSelectedProveedor(null),
  //   //     updateField2(null, 'proveedorId', '', 'codigoProforma'))
  //   // if (e.value) {
  //   //   const subProyectoFilter = subProyectos.filter(
  //   //     (p) => p.proyectoId?.id === e.value.id
  //   //   )
  //   //   setSelectedProyecto(e.value)
  //   //   setSubProyecto(subProyectoFilter)
  //   // } else {
  //   //   setSelectedProyecto(null)
  //   //   setSubProyecto(null)
  //   //   setSelectedSubProyecto(null)
  //   //   setSelectedPresupuesto(null)
  //   // }
  // }
  const onActividadAsociada = (e) => {
    e.value
      ? (setSelectedActividadAsociada(e.value),
        updateField(e.value.id, 'actividadAsociadaId'))
      : (setSelectedActividadAsociada(null),
        updateField(null, 'actividadAsociadaId'))
    // if (e.value) {
    //   const subProyectoFilter = subProyectos.filter(
    //     (p) => p.proyectoId?.id === e.value.id
    //   )
    //   setSelectedProyecto(e.value)
    //   setSubProyecto(subProyectoFilter)
    // } else {
    //   setSelectedProyecto(null)
    //   setSubProyecto(null)
    //   setSelectedSubProyecto(null)
    //   setSelectedPresupuesto(null)
    // }
  }
  const onClasificacionServicio = (e) => {
    e.value
      ? (setSelectedClasificacionServicio(e.value),
        updateField(e.value.id, 'clasificacionServicioId'))
      : (setSelectedClasificacionServicio(null),
        updateField(null, 'clasificacionServicioId'))
    // if (e.value) {
    //   const subProyectoFilter = subProyectos.filter(
    //     (p) => p.proyectoId?.id === e.value.id
    //   )
    //   setSelectedProyecto(e.value)
    //   setSubProyecto(subProyectoFilter)
    // } else {
    //   setSelectedProyecto(null)
    //   setSubProyecto(null)
    //   setSelectedSubProyecto(null)
    //   setSelectedPresupuesto(null)
    // }
  }
  const updateField = (data, field) => {
    setProformaData({
      ...proformaData,
      [field]: data
    })
  }
  const updateField2 = (data, field, data2, field2) => {
    setProformaData({
      ...proformaData,
      [field]: data,
      [field2]: data2
    })
  }

  const saveProforma = () => {
    setSubmitted(true)

    if (
      proformaData.proveedorId !== null &&
      // proformaData.codigoProforma.trim() &&
      proformaData.numeroControlProforma.trim() &&
      proformaData.fechaControlProforma !== null &&
      proformaData.dominioId !== null &&
      proformaData.divisionId !== null &&
      proformaData.dependenciaId !== null &&
      proformaData.subDependenciaId !== null &&
      proformaData.actividadAsociadaId !== null &&
      proformaData.clasificacionServicioId !== null &&
      proformaData.usoFondoProforma !== null &&
      proformaData.totalProforma !== null &&
      proformaData.estatusProforma !== null &&
      proformaData.estatus2Proforma !== null &&
      items.length !== 0
    ) {
      if (
        editProforma &&
        editProforma?.estatusProforma === 'ESTIMADA (PROVISIÓN)' &&
        proformaData?.estatusProforma !== 'ESTIMADA (PROVISIÓN)'
      ) {
        createProforma({ ...proformaData, items: items, id: null })
        clearSelected()
        return
      }
      if (!editProforma) {
        createProforma({ ...proformaData, items: items })
      } else {
        updateProforma({
          ...proformaData,
          ProformaModificado: moment(),
          items: items
        })
      }
      setProformaData(initialProformaForm)
      setIsVisible(false)
      setSelectedProforma('')
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
      <Button label="Guardar" icon="pi pi-check" onClick={saveProforma} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setProformaData(initialProformaForm)

    setSelectedProforma(null)
    setSelectedEstatus2Proforma({
      estatus2Proforma: 'NO PAGADA'
    })
    setDateControl(null)
    setDateFinal(null)
    setSelectedDominio(null)
    setSelectedDivision(null)
    setSelectedDependencia(null)
    setSelectedSubDependencia(null)
    setSelectedProveedor(null)
    setSelectedActividadAsociada(null)
    setSelectedClasificacionServicio(null)
    setSubmitted(false)
    setDateInicio(null)
    setItems([])
    setSelectedusoFondoProforma(null)
    setDivision(divisions)
    setDependencia(dependencias)
    setSubDependencia(subDependencias)
    setEditProforma(null)
  }

  const selectedDominiosTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>
            {option.codigoDominio}-{option.nombreDominio}
          </div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const dominiosOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>
          {option.codigoDominio}-{option.nombreDominio}
        </div>
      </div>
    )
  }
  const selectedDivisionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>
            {option.codigoDivision}-{option.nombreDivision}
          </div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const divisionOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>
          {option.codigoDivision}-{option.nombreDivision}
        </div>
      </div>
    )
  }
  const selectedDependenciaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>
            {option.codigoDependencia}-{option.nombreDependencia}
          </div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const dependenciaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>
          {option.codigoDependencia}-{option.nombreDependencia}
        </div>
      </div>
    )
  }
  const selectedSubDependenciaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>
            {option.codigoSubDependencia}-{option.nombreSubDependencia}
          </div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const subDependenciaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>
          {option.codigoSubDependencia}-{option.nombreSubDependencia}
        </div>
      </div>
    )
  }
  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '80vw' }}
        header="Detalles de la Proforma"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid">
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedProveedor}
                  options={proveedors}
                  onChange={onProveedor}
                  optionLabel="nombreProveedor"
                  showClear
                  filter
                  filterBy="nombreProveedor"
                  className={classNames({
                    'p-invalid': submitted && !selectedProveedor
                  })}
                />
                {submitted && !selectedProveedor && (
                  <small className="p-invalid">Proveedor es requerido.</small>
                )}
                <label htmlFor="dropdown">Seleccione Proveedor*</label>
              </span>
            </div>
            <div className="field col-12 md:col-2 p-col-2 mt-3">
              <span className="p-float-label ">
                <InputText
                  value={proformaData.numeroControlProforma}
                  onChange={(e) =>
                    updateField2(e.target.value, 'numeroControlProforma')
                  }
                  className={classNames({
                    'p-invalid':
                      submitted && !proformaData.numeroControlProforma
                  })}
                />

                {submitted && !proformaData.numeroControlProforma && (
                  <small className="p-invalid">
                    Numero Control es requerido.
                  </small>
                )}
                <label htmlFor="numeroControlProforma">Numero Control</label>
              </span>
            </div>
            <div className="field col-12 md:col-2 mt-3">
              <span className="p-float-label ">
                <Calendar
                  // className="p-datepicker-today"
                  id="time24"
                  value={dateControl !== null && dateControl}
                  onChange={(e) => {
                    setDateControl(e.value)
                    updateField(e.target.value, 'fechaControlProforma')
                  }}
                  locale="es"
                  // hourFormat="12"
                  showButtonBar
                  className={classNames(
                    {
                      'p-invalid':
                        submitted && !proformaData.fechaControlProforma
                    },
                    'p-datepicker-today'
                  )}
                />{' '}
                {submitted && !proformaData.fechaControlProforma && (
                  <small className="p-invalid">Fecha es requerido.</small>
                )}
                <label>Fecha Control </label>
              </span>
            </div>
            <div className="field col-12 md:col-2 mt-3">
              <span className="p-float-label ">
                <Calendar
                  // className="p-datepicker-today"
                  id="time24"
                  value={dateInicio !== null && dateInicio}
                  onChange={(e) => {
                    setDateInicio(e.value)
                    updateField(e.target.value, 'fechaInicio')
                  }}
                  locale="es"
                  // hourFormat="12"
                  showButtonBar
                  className={classNames(
                    // {
                    //   'p-invalid': submitted && !proformaData.fechaInicio
                    // },
                    'p-datepicker-today'
                  )}
                />{' '}
                {/* {submitted && !proformaData.fechaInicio && (
                  <small className="p-invalid">
                    Fecha Inicio es requerido.
                  </small>
                )} */}
                <label>Fecha Inicio </label>
              </span>
            </div>
            <div className="field col-12 md:col-2 mt-3">
              <span className="p-float-label ">
                <Calendar
                  // className="p-datepicker-today"
                  id="time24"
                  value={dateFinal !== null && dateFinal}
                  onChange={(e) => {
                    setDateFinal(e.value)
                    updateField(e.target.value, 'fechaFin')
                  }}
                  locale="es"
                  // hourFormat="12"
                  showButtonBar
                  className={classNames(
                    // {
                    //   'p-invalid': submitted && !proformaData.fechaFin
                    // },
                    'p-datepicker-today'
                  )}
                />{' '}
                {/* {submitted && !proformaData.fechaFin && (
                  <small className="p-invalid">Fecha Fin es requerido.</small>
                )} */}
                <label>Fecha Final </label>
              </span>
            </div>
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedDominio}
                  options={dominios}
                  onChange={onDominio}
                  optionLabel="nombreDominio"
                  showClear
                  filter
                  style={{ 'min-height': '2.5rem' }}
                  filterBy="nombreDominio"
                  valueTemplate={selectedDominiosTemplate}
                  itemTemplate={dominiosOptionTemplate}
                  className={classNames({
                    'p-invalid': submitted && !selectedDominio
                  })}
                />
                {submitted && !selectedDominio && (
                  <small className="p-invalid">Dominio es requerido.</small>
                )}
                <label htmlFor="dropdown">Seleccione Dominio*</label>
              </span>
            </div>
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedDivision}
                  options={division}
                  onChange={onDivision}
                  optionLabel="nombreDivision"
                  showClear
                  filter
                  style={{ 'min-height': '2.5rem' }}
                  disabled={division === null}
                  filterBy="nombreDivision"
                  valueTemplate={selectedDivisionTemplate}
                  itemTemplate={divisionOptionTemplate}
                  className={classNames({
                    'p-invalid':
                      (submitted && !selectedDivision) || division === null
                  })}
                />
                {submitted && !selectedDivision && (
                  <small className="p-invalid">Division es requerido.</small>
                )}
                <label htmlFor="dropdown">Seleccione Division*</label>
              </span>
            </div>
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedDependencia}
                  options={dependencia}
                  onChange={onDependencia}
                  optionLabel="nombreDependencia"
                  showClear
                  filter
                  style={{ 'min-height': '2.5rem' }}
                  disabled={dependencia === null}
                  filterBy="nombreDependencia"
                  valueTemplate={selectedDependenciaTemplate}
                  itemTemplate={dependenciaOptionTemplate}
                  className={classNames({
                    'p-invalid':
                      (submitted && !selectedDependencia) ||
                      dependencia === null
                  })}
                />
                {submitted && !selectedDependencia && (
                  <small className="p-invalid">Dependencia es requerido.</small>
                )}
                <label htmlFor="dropdown">Seleccione Dependencia*</label>
              </span>
            </div>
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedSubDependencia}
                  options={subDependencia}
                  onChange={onSubDependencia}
                  optionLabel="nombreSubDependencia"
                  showClear
                  filter
                  style={{ 'min-height': '2.5rem' }}
                  disabled={subDependencia === null}
                  filterBy="nombreSubDependencia"
                  valueTemplate={selectedSubDependenciaTemplate}
                  itemTemplate={subDependenciaOptionTemplate}
                  className={classNames({
                    'p-invalid':
                      (submitted && !selectedSubDependencia) ||
                      subDependencia === null
                  })}
                />
                {submitted && !selectedSubDependencia && (
                  <small className="p-invalid">
                    SubDependencia es requerido.
                  </small>
                )}
                <label htmlFor="dropdown">Seleccione SubDependencia*</label>
              </span>
            </div>
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedActividadAsociada}
                  options={actividadAsociadas}
                  onChange={onActividadAsociada}
                  optionLabel="nombreActividadAsociada"
                  showClear
                  filter
                  filterBy="nombreActividadAsociada"
                  className={classNames({
                    'p-invalid': submitted && !selectedActividadAsociada
                  })}
                />
                {submitted && !selectedActividadAsociada && (
                  <small className="p-invalid">
                    ActividadAsociada es requerido.
                  </small>
                )}
                <label htmlFor="dropdown">Seleccione ActividadAsociada*</label>
              </span>
            </div>
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedClasificacionServicio}
                  options={clasificacionServicios}
                  onChange={onClasificacionServicio}
                  optionLabel="nombreClasificacionServicio"
                  showClear
                  filter
                  filterBy="nombreClasificacionServicio"
                  className={classNames({
                    'p-invalid': submitted && !selectedClasificacionServicio
                  })}
                />
                {submitted && !selectedClasificacionServicio && (
                  <small className="p-invalid">
                    ClasificacionServicio es requerido.
                  </small>
                )}
                <label htmlFor="dropdown">
                  Seleccione ClasificacionServicio*
                </label>
              </span>
            </div>
            <div className="field col-12 md:col-3  mt-3">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedusoFondoProforma}
                  options={usoFondoProforma}
                  onChange={onUsoFondoProforma}
                  optionLabel="usoFondoProforma"
                  showClear
                  filter
                  filterBy="usoFondoProforma"
                  className={classNames({
                    'p-invalid': submitted && !selectedusoFondoProforma
                  })}
                />
                {submitted && !selectedusoFondoProforma && (
                  <small className="p-invalid">
                    Uso de fondo es requerido.
                  </small>
                )}
                <label htmlFor="dropdown">Seleccione Uso de fondo*</label>
              </span>
            </div>

            <div className="field col-12 md:col-3 p-col-2 mt-3">
              <span className="p-float-label ">
                <InputText
                  value={proformaData.codigoProforma}
                  // onChange={(e) =>
                  //   updateField(e.target.value, 'codigoProforma')
                  // }
                  className={classNames({
                    'p-invalid': submitted && !proformaData.codigoProforma
                  })}
                />

                {submitted && !proformaData.codigoProforma && (
                  <small className="p-invalid">
                    Codigo Proforma es requerido.
                  </small>
                )}
                <label htmlFor="codigoProforma">Codigo Proforma Control</label>
              </span>
            </div>
            <div className="field col-12 p-col-2 mt-3">
              {submitted && items.length === 0 && (
                <small className="p-invalid" style={{ color: '#f19ea6' }}>
                  Items Proforma es requerido.
                </small>
              )}
              <CargaItemsProformaList
                className="p-invalid"
                items={items}
                setItems={setItems}
              />
            </div>
            {/* <div className="field col-3 p-col-2 mt-3">
              <span className="p-float-label ">
                <InputNumber
                  inputId="cantidadDataPresupuesto"
                  value={proformaData.totalProforma}
                  onValueChange={(e) =>
                    updateField(e.target.value, 'totalProforma')
                  }
                  minFractionDigits={2}
                  maxFractionDigits={5}
                  className={classNames({
                    'p-invalid': submitted && !proformaData.totalProforma
                  })}
                  mode="currency"
                  currency="USD"
                  locale="de-DE"
                />

                {submitted && !proformaData.totalProforma && (
                  <small className="p-invalid">
                    Total Proforma es requerido.
                  </small>
                )}
                <label htmlFor="totalProforma">Total Proforma</label>
              </span>
            </div> */}
            <div className="field col-12  md:col-8 p-col-2 ">
              <span className="p-float-label ">
                <InputText
                  value={proformaData.descripcionProforma}
                  onChange={(e) =>
                    updateField(e.target.value, 'descripcionProforma')
                  }
                  // className={classNames({
                  //   'p-invalid': submitted && !proformaData.descripcionProforma
                  // })}
                />

                {/* {submitted && !proformaData.descripcionProforma && (
                  <small className="p-invalid">
                    Descripcion Proforma es requerido.
                  </small>
                )} */}
                <label htmlFor="descripcionProforma">
                  Descripcion Proforma Control
                </label>
              </span>
            </div>
            <div className="field col-12 md:col-2 ">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedProforma}
                  options={estadoProforma}
                  onChange={onEstatusProforma}
                  optionLabel="estatusProforma"
                  className={classNames({
                    'p-invalid': submitted && !selectedProforma
                  })}
                />
                {submitted && !selectedProforma && (
                  <small className="p-invalid">Estatus es requerido.</small>
                )}
                <label htmlFor="dropdown">Estatus proforma*</label>
              </span>
            </div>
            <div className="field col-12 md:col-2 ">
              <span className="p-float-label">
                <Dropdown
                  inputId="dropdown"
                  value={selectedEstatus2Proforma}
                  options={estadoEstatus2Proforma}
                  onChange={onEstatus2Proforma}
                  optionLabel="estatus2Proforma"
                  className={classNames({
                    'p-invalid': submitted && !selectedEstatus2Proforma
                  })}
                />
                {submitted && !selectedEstatus2Proforma && (
                  <small className="p-invalid">Estatus2 es requerido.</small>
                )}
                <label htmlFor="dropdown">Estatus2 proforma*</label>
              </span>
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default CargaProformaForm
