/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { DominioContext } from '../contexts/DominioContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import moment from 'moment'

const DominioForm = (props) => {
  const initialDominioForm = {
    id: null,

    codigoDominio: '',
    nombreDominio: '',
    descripcionDominio: '',
    estatusDominio: '',
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
  const { createDominio, editDominio, updateDominio } =
    useContext(DominioContext)

  const { isVisible, setIsVisible } = props
  const [selectedDominio, setSelectedDominio] = useState(null)
  const [dominioData, setDominioData] = useState(initialDominioForm)
  const estadoDominio = [
    { estatusDominio: 'OPERATIVO' },
    { estatusDominio: 'INOPERATIVO' }
  ]
  const onEstatusDominio = (e) => {
    setSelectedDominio(e.value)
    updateField(e.value.estatusDominio, 'estatusDominio')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editDominio) {
      setDominioData(editDominio)
      setSelectedDominio({
        estatusDominio: editDominio.estatusDominio
      })
    }
  }, [editDominio])

  const updateField = (data, field) => {
    setDominioData({
      ...dominioData,
      [field]: data
    })
  }

  const saveDominio = () => {
    if (!editDominio) {
      createDominio(dominioData)
    } else {
      updateDominio({
        ...dominioData,
        DominioModificado: moment()
      })
    }
    setDominioData(initialDominioForm)
    setIsVisible(false)
    setSelectedDominio('')
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveDominio} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setDominioData(initialDominioForm)
    setSelectedDominio('')
  }
  const selectedestatusDominioTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusDominio}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusDominioOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusDominio}</div>
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
        header="Detalles de la Dominio"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={dominioData.codigoDominio}
              onChange={(e) => updateField(e.target.value, 'codigoDominio')}
            />
            <label>codigoDominio:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={dominioData.nombreDominio}
              onChange={(e) => updateField(e.target.value, 'nombreDominio')}
            />
            <label>Nombre del Dominio:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={dominioData.descripcionDominio}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionDominio')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedDominio}
                options={estadoDominio}
                onChange={onEstatusDominio}
                optionLabel="estatusDominio"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusDominioTemplate}
                itemTemplate={estatusDominioOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default DominioForm
