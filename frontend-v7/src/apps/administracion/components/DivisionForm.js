/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { DivisionContext } from '../contexts/DivisionContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import moment from 'moment'
import { DominioContext } from '../contexts/DominioContext'
import { classNames } from 'primereact/utils'

const DivisionForm = (props) => {
  const initialDivisionForm = {
    id: null,

    codigoDivision: '',
    nombreDivision: '',
    descripcionDivision: '',
    estatusDivision: '',
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
  const { createDivision, editDivision, updateDivision } =
    useContext(DivisionContext)
  const { dominios } = useContext(DominioContext)

  const { isVisible, setIsVisible } = props
  const [selectedDivision, setSelectedDivision] = useState(null)
  const [selectedDominio, setSelectedDominio] = useState(null)
  const [divisionData, setDivisionData] = useState(initialDivisionForm)
  const [submitted, setSubmitted] = useState(false)

  const estadoDivision = [
    { estatusDivision: 'OPERATIVO' },
    { estatusDivision: 'INOPERATIVO' }
  ]
  const onEstatusDivision = (e) => {
    setSelectedDivision(e.value)
    updateField(e.value.estatusDivision, 'estatusDivision')
  }
  const onDominio = (e) => {
    e.value
      ? (setSelectedDominio(e.value), updateField(e.value.id, 'dominioId'))
      : (setSelectedDominio(null), updateField(null, 'dominioId'))
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
    if (editDivision) {
      setDivisionData({
        ...editDivision,
        dominioId: editDivision.dominioId?.id
      })
      setSelectedDivision({
        estatusDivision: editDivision.estatusDivision
      })
      const dominioSelecEdit =
        editDivision.dominioId &&
        dominios.find((p) => p.id === editDivision.dominioId.id)
      setSelectedDominio(dominioSelecEdit)
    }
  }, [editDivision])

  const updateField = (data, field) => {
    setDivisionData({
      ...divisionData,
      [field]: data
    })
  }

  const saveDivision = () => {
    setSubmitted(true)
    if (!editDivision) {
      createDivision(divisionData)
    } else {
      updateDivision({
        ...divisionData,
        DivisionModificado: moment()
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
      <Button label="Guardar" icon="pi pi-check" onClick={saveDivision} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setDivisionData(initialDivisionForm)
    setSelectedDivision('')
    setSelectedDominio(null)
  }
  const selectedestatusDivisionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusDivision}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusDivisionOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusDivision}</div>
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
        header="Detalles de la Division"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="field col-12 md:col-6  mt-3">
            <span className="p-float-label">
              <Dropdown
                inputId="dropdown"
                value={selectedDominio}
                options={dominios}
                onChange={onDominio}
                optionLabel="nombreDominio"
                showClear
                filter
                filterBy="nombreDominio"
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
          <div className="p-float-label">
            <InputText
              value={divisionData.codigoDivision}
              onChange={(e) => updateField(e.target.value, 'codigoDivision')}
            />
            <label>codigoDivision:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={divisionData.nombreDivision}
              onChange={(e) => updateField(e.target.value, 'nombreDivision')}
            />
            <label>Nombre del Division:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={divisionData.descripcionDivision}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionDivision')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedDivision}
                options={estadoDivision}
                onChange={onEstatusDivision}
                optionLabel="estatusDivision"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusDivisionTemplate}
                itemTemplate={estatusDivisionOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default DivisionForm
