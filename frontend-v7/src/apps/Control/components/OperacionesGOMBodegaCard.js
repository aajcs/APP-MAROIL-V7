/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import moment from 'moment'
import { ProgressBar } from 'primereact/progressbar'
import { Button } from 'primereact/button'

export const OperacionesGOMBodegaCard = ({
  bodegaItem,
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
  const [porcenBar, setporcenBar] = useState(null)
  const [estatusBodega, setEstatusBodega] = useState(null)
  const [actualizarBodega, setActualizarBodega] = useState(true)
  const cboEstatus = [
    { estatusBodega: 'CARGANDO' },
    { estatusBodega: 'PARADO' },
    { estatusBodega: 'CULMINADO' }
  ]
  useEffect(() => {
    setEstatusBodega({ estatusBodega: bodegaItem.estatusBodega })
    setporcenBar(
      (
        (100 * bodegaItem.toneladasCargadasBodega) /
        bodegaItem.toneladasCapacidadBodega
      ).toFixed(2)
    )
  }, [])
  const onuEstatusBodega = (e) => {
    setEstatusBodega(e.value)
    updateField(e.value.estatusBodega, 'estatusBodega')
  }
  const selectedestatusBodegaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusBodega}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusBodegaOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusBodega}</div>
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
    actualizarCargaBodega(bodegaItem.id, reporteCargaGOMData)
    setActualizarBodega(true)
  }

  return (
    <div className="field col-12 lg:col-6 xl:col-4">
      <div className="card">
        <div className="grid p-fluid">
          <div className="col-6">
            <h5>{bodegaItem.nombreBodega} </h5>{' '}
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
              value={estatusBodega}
              options={cboEstatus}
              onChange={onuEstatusBodega}
              optionLabel="estatusBodega"
              placeholder="Seleccione el Barco"
              valueTemplate={selectedestatusBodegaTemplate}
              itemTemplate={estatusBodegaOptionTemplate}
            />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="currency-germany">Carga Actual</label>
            <InputNumber
              inputId="currency-germany"
              value={bodegaItem.toneladasCargadasBodega}
              onValueChange={(e) =>
                updateField(e.target.value, 'toneladasCargadasBodega')
              }
            />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="currency-india">Capacidad</label>
            <InputNumber
              inputId="currency-india"
              value={bodegaItem.toneladasCapacidadBodega}
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
