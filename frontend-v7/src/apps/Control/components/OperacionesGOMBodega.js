/* eslint-disable array-callback-return */
/* eslint-disable indent */
import React, { useContext, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { BarcoContext } from '../contexts/BarcoContext'
import { Button } from 'primereact/button'
import { OperacionesGOMBodegaCard } from './OperacionesGOMBodegaCard'
import { CargaBodegaContext } from '../contexts/CargaBodegaContext'

export const OperacionesGOMBodega = () => {
  const [selecteBarcoIDGOM, setSelectedBarcoIDGOM] = useState(null)
  const [bodegasDelBarco, setBodegasDelBarco] = useState(null)
  const { barcos } = useContext(BarcoContext)
  const { cargaBodegas, updateCargaBodega } = useContext(CargaBodegaContext)

  const barcoIDGOM = barcos.filter((p) => p.estatusBarco === 'OPERATIVO' && p)
  const onuBarcoIDGOM = (e) => {
    setSelectedBarcoIDGOM(e.value)
    findBodegaBarco(e.value.id)
  }
  cargaBodegas.sort((o1, o2) => {
    if (o1.nombreBodega < o2.nombreBodega) {
      return -1
    } else if (o1.nombreBodega > o2.nombreBodega) {
      return 1
    } else {
      return 0
    }
  })

  const findBodegaBarco = (id) => {
    const bodegaBarco = cargaBodegas.filter((p) => p.barcoID.id === id)

    setBodegasDelBarco(bodegaBarco)
  }
  const actualizarCargaBodega = (cargaBodegasid, cargaBodegaActual) => {
    cargaBodegas.map((bodega) => {
      if (bodega.id === cargaBodegasid) {
        updateCargaBodega({
          ...bodega,
          barcoID: bodega.barcoID.id,
          estatusBodega: cargaBodegaActual.estatusBodega
            ? cargaBodegaActual.estatusBodega
            : bodega.estatusBodega,
          toneladasCapacidadBodega: cargaBodegaActual.toneladasCapacidadBodega
            ? cargaBodegaActual.toneladasCapacidadBodega
            : bodega.toneladasCapacidadBodega,
          toneladasCargadasBodega: cargaBodegaActual.toneladasCargadasBodega
            ? cargaBodegaActual.toneladasCargadasBodega
            : bodega.toneladasCargadasBodega
        })
      }
    })
  }
  return (
    <>
      <Dropdown
        value={selecteBarcoIDGOM}
        options={barcoIDGOM}
        onChange={onuBarcoIDGOM}
        optionLabel="nombreBarco"
        placeholder="Seleccione el Barco"
        filter
      />{' '}
      <Button
        className="p-button-success ml-2"
        label="Actualizar"
        icon="pi pi-plus"
        // onClick={''}
        disabled={true}
      />
      <Button
        className="p-button-help ml-2"
        label="Limpiiar"
        icon="pi pi-plus"
        // onClick={''}
      />{' '}
      <div className="grid p-fluid  mt-3">
        {bodegasDelBarco
          ? bodegasDelBarco.map((bodega) => (
              <OperacionesGOMBodegaCard
                key={bodega.id}
                bodegaItem={bodega}
                actualizarCargaBodega={actualizarCargaBodega}
              />
            ))
          : null}
      </div>
    </>
  )
}
