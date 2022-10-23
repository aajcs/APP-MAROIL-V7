/* eslint-disable array-callback-return */
/* eslint-disable indent */
import React, { useContext, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'

import { Button } from 'primereact/button'

import { TanqueAuxContext } from '../contexts/TanqueAuxContext'
import { EmbarcacionContext } from '../contexts/EmbarcacionContext'
import { CargaInformacionTanqueCard } from './CargaInformacionTanqueCard'

export const CargaInformacionTanqueList = () => {
  const [selecteEmbaracionID, setSelectedBarcoIDGOM] = useState(null)
  const [tanqueEmbarcacions, setTanqueEmbarcacion] = useState(null)
  console.log(tanqueEmbarcacions)
  const { embarcacions } = useContext(EmbarcacionContext)
  console.log(embarcacions)
  const { tanqueAuxs } = useContext(TanqueAuxContext)
  console.log(tanqueAuxs)

  const onuEmbarcacionID = (e) => {
    setSelectedBarcoIDGOM(e.value)
    findTanqueEmbarcacion(e.value.id)
  }
  tanqueAuxs.sort((o1, o2) => {
    if (o1.nombreTanqueAux < o2.nombreTanqueAux) {
      return -1
    } else if (o1.nombreTanqueAux > o2.nombreTanqueAux) {
      return 1
    } else {
      return 0
    }
  })

  const findTanqueEmbarcacion = (id) => {
    const tanqueEmbarcacion = tanqueAuxs.filter((p) => p.embarcacion.id === id)

    setTanqueEmbarcacion(tanqueEmbarcacion)
  }
  // const actualizarCargaBodega = (cargaBodegasid, cargaBodegaActual) => {
  //   cargaBodegas.map((bodega) => {
  //     if (bodega.id === cargaBodegasid) {
  //       updateCargaBodega({
  //         ...bodega,
  //         barcoID: bodega.barcoID.id,
  //         estatusBodega: cargaBodegaActual.estatusBodega
  //           ? cargaBodegaActual.estatusBodega
  //           : bodega.estatusBodega,
  //         toneladasCapacidadBodega: cargaBodegaActual.toneladasCapacidadBodega
  //           ? cargaBodegaActual.toneladasCapacidadBodega
  //           : bodega.toneladasCapacidadBodega,
  //         toneladasCargadasBodega: cargaBodegaActual.toneladasCargadasBodega
  //           ? cargaBodegaActual.toneladasCargadasBodega
  //           : bodega.toneladasCargadasBodega
  //       })
  //     }
  //   })
  // }
  return (
    <>
      <Dropdown
        value={selecteEmbaracionID}
        options={embarcacions}
        onChange={onuEmbarcacionID}
        optionLabel="nombreEmbarcacion"
        placeholder="Seleccione el Embarcacion"
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
        {tanqueEmbarcacions
          ? tanqueEmbarcacions.map((tanque) => (
              <CargaInformacionTanqueCard
                key={tanque.id}
                tanqueItem={tanque}
                // actualizarCargaBodega={actualizarCargaBodega}
              />
            ))
          : null}
      </div>
    </>
  )
}
