/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { DependenciaContext } from '../contexts/DependenciaContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { classNames } from 'primereact/utils'

import moment from 'moment'
import { DivisionContext } from '../contexts/DivisionContext'

const DependenciaForm = (props) => {
  const initialDependenciaForm = {
    id: null,

    codigoDependencia: '',
    nombreDependencia: '',
    descripcionDependencia: '',
    estatusDependencia: '',
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
  const { createDependencia, editDependencia, updateDependencia } =
    useContext(DependenciaContext)
  const { divisions } = useContext(DivisionContext)

  const { isVisible, setIsVisible } = props
  const [selectedDependencia, setSelectedDependencia] = useState(null)
  const [selectedDivision, setSelectedDivision] = useState(null)
  const [dependenciaData, setDependenciaData] = useState(initialDependenciaForm)
  const [submitted, setSubmitted] = useState(false)

  const estadoDependencia = [
    { estatusDependencia: 'OPERATIVO' },
    { estatusDependencia: 'INOPERATIVO' }
  ]
  const onEstatusDependencia = (e) => {
    setSelectedDependencia(e.value)
    updateField(e.value.estatusDependencia, 'estatusDependencia')
  }
  const onDivision = (e) => {
    e.value
      ? (setSelectedDivision(e.value), updateField(e.value.id, 'divisionId'))
      : (setSelectedDivision(null), updateField(null, 'divisionId'))
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
  const toast = useRef(null)

  useEffect(() => {
    if (editDependencia) {
      setDependenciaData({
        ...editDependencia,
        divisionId: editDependencia.divisionId?.id
      })
      setSelectedDependencia({
        estatusDependencia: editDependencia.estatusDependencia
      })
      const divisionSelecEdit =
        editDependencia.divisionId &&
        divisions.find((p) => p.id === editDependencia.divisionId.id)
      setSelectedDivision(divisionSelecEdit)
    }
  }, [editDependencia])

  const updateField = (data, field) => {
    setDependenciaData({
      ...dependenciaData,
      [field]: data
    })
  }

  const saveDependencia = () => {
    setSubmitted(true)
    if (!editDependencia) {
      createDependencia(dependenciaData)
    } else {
      updateDependencia({
        ...dependenciaData,
        DependenciaModificado: moment()
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
      <Button label="Guardar" icon="pi pi-check" onClick={saveDependencia} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setDependenciaData(initialDependenciaForm)
    setSelectedDependencia('')
    setSelectedDivision(null)
  }
  const selectedestatusDependenciaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusDependencia}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusDependenciaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusDependencia}</div>
      </div>
    )
  }
  const selectedDivisionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          {option.codigoDivision}-{option.nombreDivision}
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const divisionOptionTemplate = (option) => {
    return (
      <div className="country-item">
        {option.codigoDivision}-{option.nombreDivision}
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
        header="Detalles de la Dependencia"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="field col-12 md:col-12  mt-3">
            <span className="p-float-label">
              <Dropdown
                inputId="dropdown"
                value={selectedDivision}
                options={divisions}
                onChange={onDivision}
                optionLabel="nombreDivision"
                showClear
                filter
                filterBy="nombreDivision"
                valueTemplate={selectedDivisionTemplate}
                itemTemplate={divisionOptionTemplate}
                className={classNames({
                  'p-invalid': submitted && !selectedDivision
                })}
              />
              {submitted && !selectedDivision && (
                <small className="p-invalid">Division es requerido.</small>
              )}
              <label htmlFor="dropdown">Seleccione Division*</label>
            </span>
          </div>
          <div className="p-float-label">
            <InputText
              value={dependenciaData.codigoDependencia}
              onChange={(e) => updateField(e.target.value, 'codigoDependencia')}
            />
            <label>codigoDependencia:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={dependenciaData.nombreDependencia}
              onChange={(e) => updateField(e.target.value, 'nombreDependencia')}
            />
            <label>Nombre del Dependencia:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={dependenciaData.descripcionDependencia}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionDependencia')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedDependencia}
                options={estadoDependencia}
                onChange={onEstatusDependencia}
                optionLabel="estatusDependencia"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusDependenciaTemplate}
                itemTemplate={estatusDependenciaOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default DependenciaForm
