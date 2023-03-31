/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { ProveedorContext } from '../contexts/ProveedorContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
// import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { InputTextarea } from 'primereact/inputtextarea'
import moment from 'moment'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'

const ProveedorForm = (props) => {
  const initialProveedorForm = {
    id: null,
    codigoProveedor: '',
    nombreProveedor: '',
    rifProveedor: '',
    direccionProveedor: '',
    estatusProveedor: '',

    creadoProveedor: moment(),
    modificadoProveedor: moment()
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

  const { createProveedor, editProveedor, updateProveedor } =
    useContext(ProveedorContext)

  const { isVisible, setIsVisible } = props
  const [selectedProveedor, setSelectedProveedor] = useState(null)

  const [submitted, setSubmitted] = useState(false)
  const [actividadData, setProveedorData] = useState(initialProveedorForm)

  const estadoProveedor = [
    { estatusProveedor: 'OPERATIVO' },
    { estatusProveedor: 'EN PROCESO' },
    { estatusProveedor: 'NEGADA' }
  ]

  const onEstatusProveedor = (e) => {
    setSelectedProveedor(e.value)
    updateField(e.value.estatusProveedor, 'estatusProveedor')
  }
  const toast = useRef(null)

  useEffect(() => {
    if (editProveedor) {
      setProveedorData(editProveedor)
      setSelectedProveedor({
        estatusProveedor: editProveedor.estatusProveedor
      })
    }
  }, [editProveedor])

  const updateField = (data, field) => {
    // console.log(data)
    setProveedorData({
      ...actividadData,
      [field]: data
    })
  }

  const saveProveedor = () => {
    setSubmitted(true)
    if (actividadData.estatusProveedor.trim()) {
      if (!editProveedor) {
        const {
          embarcacionId,
          responsableUsuarioId,
          presupuestoActididadId,
          proveedorId,
          ...actividadDataRest
        } = actividadData
        createProveedor(actividadDataRest)
      } else {
        updateProveedor({
          ...actividadData,
          proveedorModificado: moment()
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
      <Button label="Guardar" icon="pi pi-check" onClick={saveProveedor} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setProveedorData(initialProveedorForm)
    setSelectedProveedor('')
    setSubmitted(false)
  }

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '80vw' }}
        header="Detalles de la Proveedor"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <div className="formgrid grid ">
            <div className="field  col-12 lg:col-6 xl:col-4 mt-3">
              <span className="p-float-label">
                <InputText
                  value={actividadData.codigoProveedor}
                  onChange={(e) =>
                    updateField(e.target.value, 'codigoProveedor')
                  }
                  className={classNames({
                    'p-invalid': submitted && !actividadData.codigoProveedor
                  })}
                />

                {submitted && !actividadData.proyectoId && (
                  <small className="p-invalid">Proceso es requerido.</small>
                )}
                <label>codigoProveedor:</label>
              </span>
            </div>
            <div className="field  col-12 lg:col-6 xl:col-4 mt-3">
              <span className="p-float-label">
                <InputText
                  value={actividadData.nombreProveedor}
                  onChange={(e) =>
                    updateField(e.target.value, 'nombreProveedor')
                  }
                  className={classNames({
                    'p-invalid': submitted && !actividadData.nombreProveedor
                  })}
                />

                {submitted && !actividadData.proyectoId && (
                  <small className="p-invalid">Nombre es requerido.</small>
                )}
                <label>nombreProveedor:</label>
              </span>
            </div>
            <div className="field  col-12 lg:col-6 xl:col-4 mt-3">
              <span className="p-float-label">
                <InputNumber
                  inputId="rifProveedor"
                  value={actividadData.rifProveedor}
                  onValueChange={(e) =>
                    updateField(e.target.value, 'rifProveedor')
                  }
                  className={classNames({
                    'p-invalid': submitted && !actividadData.nombreProveedor
                  })}
                />

                {submitted && !actividadData.proyectoId && (
                  <small className="p-invalid">Rif es requerido.</small>
                )}
                <label>rifProveedor:</label>
              </span>
            </div>{' '}
            <div className="field col-12 lg:col-12 xl:col-12 mt-3 ">
              <span className="p-float-label">
                <InputTextarea
                  id="description"
                  value={actividadData.direccionProveedor}
                  onChange={(e) =>
                    updateField(e.target.value, 'direccionProveedor')
                  }
                  rows={3}
                  cols={20}
                />
                <label>Descripcion:</label>{' '}
              </span>
            </div>
            <div className="field col-6 lg:col-6 xl:col-4 mt-3">
              <span className="p-float-label">
                <Dropdown
                  value={selectedProveedor}
                  options={estadoProveedor}
                  onChange={onEstatusProveedor}
                  optionLabel="estatusProveedor"
                  className={classNames({
                    'p-invalid': submitted && !actividadData.estatusProveedor
                  })}
                />
                {submitted && !actividadData.estatusProveedor && (
                  <small className="p-invalid">Estatus es requerido.</small>
                )}
                <label>Estatus:</label>{' '}
              </span>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default ProveedorForm
