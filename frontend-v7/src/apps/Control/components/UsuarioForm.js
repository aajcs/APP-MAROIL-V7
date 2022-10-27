/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { UsuarioContext } from '../contexts/UsuarioContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import { Password } from 'primereact/password'
import { MultiSelect } from 'primereact/multiselect'

import moment from 'moment'

const UsuarioForm = (props) => {
  const initialUsuarioState = {
    _id: null,
    nombre: '',
    user: '',
    password: '',
    roles: [],
    apps: [],
    usuariocreado: moment(),
    usuariomodificado: moment()
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
  const { createUsuario, deleteUsuario, editUsuario, updateUsuario } =
    useContext(UsuarioContext)
  const { isVisible, setIsVisible } = props
  const [selectedRol, setSelectedRol] = useState(null)
  const [selectedApps, setSelectedApps] = useState(null)
  const cboRoles = [
    { name: 'SUPERADMIN' },
    { name: 'ADMIN' },
    { name: 'OPERADOR' },
    { name: 'LECTURA' },
    { name: 'CLIENTE' }
  ]
  const cboApps = [
    { name: 'SUPERAPPS' },
    { name: 'ADMINAPPS' },
    { name: 'CONTROLAPPS' },
    { name: 'AMINISTRACIONAPPS' }
  ]

  const onRolesChange = (e) => {
    const valeArray = e.value
    const value = valeArray.map((p) => p.name)

    setSelectedRol(e.value)
    updateField(value, 'roles')
  }
  const onAppsChange = (e) => {
    const valeArray = e.value
    const value = valeArray.map((p) => p.name)
    setSelectedApps(e.value)
    updateField(value, 'apps')
  }

  const [date, setDate] = useState(null)
  const toast = useRef(null)
  const [usuarioData, setUsuarioData] = useState(initialUsuarioState)

  useEffect(() => {
    if (editUsuario) setUsuarioData(editUsuario)
  }, [editUsuario])

  const updateField = (data, field) => {
    setUsuarioData({
      ...usuarioData,
      [field]: data
    })
  }

  const saveUsuario = () => {
    if (!editUsuario) {
      createUsuario(usuarioData)
    } else {
      updateUsuario({ ...usuarioData, usuariomodificado: moment() })
    }
    setUsuarioData(initialUsuarioState)
    setIsVisible(false)
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button label="Guardar" icon="pi pi-check" onClick={saveUsuario} />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setUsuarioData(initialUsuarioState)
  }

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '30vw' }}
        header="Detalles de la Usuario"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={usuarioData.nombre}
              onChange={(e) => updateField(e.target.value, 'nombre')}
            />

            <label>Nombre:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={usuarioData.correo}
              onChange={(e) => updateField(e.target.value, 'correo')}
            />

            <label>Correo:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={usuarioData.user}
              onChange={(e) => updateField(e.target.value, 'user')}
            />

            <label>Usuario:</label>
          </div>
          <br />
          <div className="p-float-label">
            <Password
              value={usuarioData.password}
              name="clave"
              autocomplete="new-password"
              onChange={(e) => updateField(e.target.value, 'password')}
              feedback={false}
              toggleMask
            />{' '}
            <label>Contraseña:</label>
          </div>

          <br />
          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <h5>Rol</h5>

              <MultiSelect
                value={selectedRol}
                options={cboRoles}
                onChange={onRolesChange}
                optionLabel="name"
                placeholder="Seleccione Rol"
                display="chip"
              />
              {/* <Dropdown
                value={selectedRol}
                options={cboRoles}
                onChange={onRolesChange}
                optionLabel="name"
                placeholder="Seleccione Rol"
              /> */}
            </div>
            <div className="field col-12 md:col-6">
              <h5>Apps</h5>
              <MultiSelect
                value={selectedApps}
                options={cboApps}
                onChange={onAppsChange}
                optionLabel="name"
                placeholder="Seleccione Apps"
              />
            </div>
            <div className="field col-12 md:col-6">
              <h5>Fecha</h5>
              <Calendar
                className="p-datepicker-today"
                id="time24"
                value={date}
                onChange={(e) => setDate(e.value)}
                showTime
                locale="es"
                // hourFormat="12"
                showButtonBar
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default UsuarioForm
