/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { SubDependenciaContext } from '../contexts/SubDependenciaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { classNames } from 'primereact/utils'

import moment from 'moment'
import { DependenciaContext } from '../contexts/DependenciaContext'

const SubDependenciaForm = (props) => {
  const initialSubDependenciaForm = {
    id: null,

    codigoSubDependencia: '',
    nombreSubDependencia: '',
    descripcionSubDependencia: '',
    estatusSubDependencia: '',
    conceptoAuxCreado: moment(),
    conceptoAuxModificado: moment()
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
  const { createSubDependencia, editSubDependencia, updateSubDependencia } =
    useContext(SubDependenciaContext)
  const { dependencias } = useContext(DependenciaContext)

  const { isVisible, setIsVisible } = props
  const [selectedSubDependencia, setSelectedSubDependencia] = useState(null)
  const [subDependenciaData, setSubDependenciaData] = useState(
    initialSubDependenciaForm
  )
  const [selectedDependencia, setSelectedDependencia] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const estadoSubDependencia = [
    { estatusSubDependencia: 'OPERATIVO' },
    { estatusSubDependencia: 'INOPERATIVO' }
  ]
  const onEstatusSubDependencia = (e) => {
    setSelectedSubDependencia(e.value)
    updateField(e.value.estatusSubDependencia, 'estatusSubDependencia')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editSubDependencia) {
      setSubDependenciaData({
        ...editSubDependencia,
        dependenciaId: editSubDependencia.dependenciaId?.id
      })
      setSelectedSubDependencia({
        estatusSubDependencia: editSubDependencia.estatusSubDependencia
      })
      const dependenciaSelecEdit =
        editSubDependencia.dependenciaId &&
        dependencias.find((p) => p.id === editSubDependencia.dependenciaId.id)
      setSelectedDependencia(dependenciaSelecEdit)
    }
  }, [editSubDependencia])

  const updateField = (data, field) => {
    setSubDependenciaData({
      ...subDependenciaData,
      [field]: data
    })
  }
  const onDependencia = (e) => {
    e.value
      ? (setSelectedDependencia(e.value),
        updateField(e.value.id, 'dependenciaId'))
      : (setSelectedDependencia(null), updateField(null, 'dependenciaId'))
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
  const saveSubDependencia = () => {
    setSubmitted(true)
    if (!editSubDependencia) {
      createSubDependencia(subDependenciaData)
    } else {
      updateSubDependencia({
        ...subDependenciaData,
        SubDependenciaModificado: moment()
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
      <Button label="Guardar" icon="pi pi-check" onClick={saveSubDependencia} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setSubDependenciaData(initialSubDependenciaForm)
    setSelectedSubDependencia('')
    setSelectedDependencia(null)
  }
  const selectedestatusSubDependenciaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusSubDependencia}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusSubDependenciaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusSubDependencia}</div>
      </div>
    )
  }
  const selectedDependenciaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          {option.codigoDependencia}-{option.nombreDependencia}
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const dependenciaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        {option.codigoDependencia}-{option.nombreDependencia}
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
        header="Detalles de la SubDependencia"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="field col-12 md:col-12  mt-3">
            <span className="p-float-label">
              <Dropdown
                inputId="dropdown"
                value={selectedDependencia}
                options={dependencias}
                onChange={onDependencia}
                optionLabel="nombreDependencia"
                showClear
                filter
                filterBy="nombreDependencia"
                valueTemplate={selectedDependenciaTemplate}
                itemTemplate={dependenciaOptionTemplate}
                className={classNames({
                  'p-invalid': submitted && !selectedDependencia
                })}
              />
              {submitted && !selectedDependencia && (
                <small className="p-invalid">Dependencia es requerido.</small>
              )}
              <label htmlFor="dropdown">Seleccione Dependencia*</label>
            </span>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={subDependenciaData.codigoSubDependencia}
              onChange={(e) =>
                updateField(e.target.value, 'codigoSubDependencia')
              }
            />
            <label>codigoSubDependencia:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={subDependenciaData.nombreSubDependencia}
              onChange={(e) =>
                updateField(e.target.value, 'nombreSubDependencia')
              }
            />
            <label>Nombre del SubDependencia:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={subDependenciaData.descripcionSubDependencia}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionSubDependencia')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedSubDependencia}
                options={estadoSubDependencia}
                onChange={onEstatusSubDependencia}
                optionLabel="estatusSubDependencia"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusSubDependenciaTemplate}
                itemTemplate={estatusSubDependenciaOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default SubDependenciaForm
