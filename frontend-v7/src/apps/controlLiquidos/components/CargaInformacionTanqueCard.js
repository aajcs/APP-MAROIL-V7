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
  actualizarCargaBodega
}) => {
  const initialCargaBodegaForm = {
    id: null,
    barcoID: '',
    nombreBodega: '',
    toneladasCargadasBodega: '',
    toneladasCapacidadBodega: '',
    estatusCargaBodega: '',
    cargaBodegaCreado: moment(),
    cargaBodegaModificado: moment()
  }
  const [reporteCargaGOMData, setCargaBodegaData] = useState(
    initialCargaBodegaForm
  )
  console.log(tanqueItem)
  const [porcenBar, setporcenBar] = useState(null)
  const [estatusTanque, setEstatusBodega] = useState(null)
  const [actualizarBodega, setActualizarBodega] = useState(true)
  const cboEstatus = [
    { estatusTanque: 'OPERATIVO' },
    { estatusTanque: 'INOOPERATIVO' }
  ]
  useEffect(() => {
    setEstatusBodega({ estatusTanque: tanqueItem.estatusTanqueAux })
    setporcenBar(
      (
        (100 * tanqueItem.volumenActualTanqueAux) /
        tanqueItem.volumenCapacidadTanqueAux
      ).toFixed(2)
    )
  }, [])
  const onuEstatusBodega = (e) => {
    setEstatusBodega(e.value)
    updateField(e.value.estatusTanque, 'estatusTanque')
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
    setCargaBodegaData({
      ...reporteCargaGOMData,
      [field]: data
    })
    setActualizarBodega(false)
  }
  const updateBodega = () => {
    actualizarCargaBodega(tanqueItem.id, reporteCargaGOMData)
    setActualizarBodega(true)
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
              disabled={actualizarBodega}
              label="Actualizar"
              type="button"
              icon="pi pi-plus"
              onClick={() => updateBodega()}
              className="p-button-rounded p-button-success ml-2"
            ></Button>
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="currency-germany">Estado</label>
            <Dropdown
              value={estatusTanque}
              options={cboEstatus}
              onChange={onuEstatusBodega}
              optionLabel="estatusTanque"
              placeholder="Seleccione el Estatus"
              valueTemplate={selectedestatusTanqueTemplate}
              itemTemplate={estatusTanqueOptionTemplate}
            />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="currency-germany">Carga Actual</label>
            <InputNumber
              inputId="currency-germany"
              value={tanqueItem.volumenActualTanqueAux}
              onValueChange={(e) =>
                updateField(e.target.value, 'toneladasCargadasBodega')
              }
            />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="currency-india">Capacidad</label>
            <InputNumber
              inputId="currency-india"
              value={tanqueItem.volumenCapacidadTanqueAux}
              onValueChange={(e) =>
                updateField(e.target.value, 'toneladasCapacidadBodega')
              }
            />
          </div>
        </div>
        <ProgressBar color="#459e74" value={porcenBar}></ProgressBar>
      </div>
    </div>
  )
}
