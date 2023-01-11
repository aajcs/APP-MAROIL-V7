/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import moment from 'moment'
import { ProgressBar } from 'primereact/progressbar'
import { Button } from 'primereact/button'

export const CargaInformacionTanqueCard = ({
  tanqueItem,
  actualizarCargaTanque
}) => {
  const initialCargaTanqueForm = {
    id: tanqueItem.id,
    estatusTanqueAux: tanqueItem.estatusTanqueAux,

    volumenActualTanqueAux: tanqueItem.volumenActualTanqueAux,
    volumenCapacidadTanqueAux: tanqueItem.volumenCapacidadTanqueAux,
    tipoCargaTanqueAux: tanqueItem.tipoCargaTanqueAux,

    tanqueAuxModificado: moment()
  }
  const [tanqueData, setTanqueData] = useState(initialCargaTanqueForm)

  const [porcenBar, setporcenBar] = useState(null)
  const [estatusTanque, setEstatusTanque] = useState(null)
  const [tipoCargaTanque, setTipoCargaTanque] = useState(null)
  const [actualizarTanque, setActualizarTanque] = useState(true)

  const cboEstatus = [
    { estatusTanque: 'OPERATIVO' },
    { estatusTanque: 'INOOPERATIVO' }
  ]
  const cboTipoCargaTanque = [
    { tipoCargaTanque: 'GASOLINA' },
    { tipoCargaTanque: 'DIESEL' }
  ]
  useEffect(() => {
    setEstatusTanque({ estatusTanque: tanqueItem.estatusTanqueAux })
    setTipoCargaTanque({ tipoCargaTanque: tanqueItem.tipoCargaTanqueAux })
    setporcenBar(
      (
        (100 * tanqueItem.volumenActualTanqueAux) /
        tanqueItem.volumenCapacidadTanqueAux
      ).toFixed(2)
    )
  }, [])
  const onuEstatusTanque = (e) => {
    setEstatusTanque(e.value)
    updateField(e.value.estatusTanque, 'estatusTanqueAux')
  }
  const onTipoCargaTanque = (e) => {
    setTipoCargaTanque(e.value)
    updateField(e.value.tipoCargaTanque, 'tipoCargaTanqueAux')
  }
  const selectedestatusTanqueTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusTanque.toUpperCase()}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusTanqueOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusTanque}</div>
      </div>
    )
  }
  const updateField = (data, field) => {
    setTanqueData({
      ...tanqueData,
      [field]: data
    })
    setActualizarTanque(false)
  }
  const updateTanque = () => {
    actualizarCargaTanque(tanqueItem.id, tanqueData)
    setActualizarTanque(true)
  }

  return (
    <div className="field col-12 lg:col-6 xl:col-3">
      <div className="card animate__animated  animate__bounceInUp animate__slower">
        <div className="grid p-fluid">
          <div className="col-6">
            <h5>{tanqueItem.descripcionTanqueAux} </h5>{' '}
          </div>

          <div className="col-6 text-right ">
            <Button
              // {gabarra.estatus==='dsfdsfsd' ? 'Cargado' : 'Cargando'}
              disabled={actualizarTanque}
              label="Actualizar"
              type="button"
              icon="pi pi-plus"
              onClick={() => updateTanque()}
              className="p-button-rounded p-button-success ml-2"
            ></Button>
          </div>
          <div className="field col-12 md:col-12 m-0">
            <label htmlFor="currency-germany">tipoCargaTanque</label>
            <Dropdown
              value={tipoCargaTanque}
              options={cboTipoCargaTanque}
              onChange={onTipoCargaTanque}
              optionLabel="tipoCargaTanque"
              placeholder="Seleccione el tipoCargaTanque"
            />
          </div>
          <div className="field col-12 md:col-12 m-0">
            <label htmlFor="currency-germany">Estado</label>
            <Dropdown
              value={estatusTanque}
              options={cboEstatus}
              onChange={onuEstatusTanque}
              optionLabel="estatusTanque"
              placeholder="Seleccione el Estatus"
              valueTemplate={selectedestatusTanqueTemplate}
              itemTemplate={estatusTanqueOptionTemplate}
            />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="currency-germany">Carga Actual</label>
            <InputNumber
              inputId="currency-germany"
              value={tanqueItem.volumenActualTanqueAux}
              onValueChange={(e) =>
                updateField(e.target.value, 'volumenActualTanqueAux')
              }
            />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="currency-india">Capacidad</label>
            <InputNumber
              inputId="currency-india"
              value={tanqueItem.volumenCapacidadTanqueAux}
              onValueChange={(e) =>
                updateField(e.target.value, 'volumenCapacidadTanqueAux')
              }
            />
          </div>
        </div>
        <ProgressBar color="#459e74" value={porcenBar}></ProgressBar>
      </div>
    </div>
  )
}
