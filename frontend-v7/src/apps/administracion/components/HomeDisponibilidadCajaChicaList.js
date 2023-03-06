import React, { useContext, useState, useRef, useEffect } from 'react'

import { Toast } from 'primereact/toast'
import { CajaChicaContext } from '../contexts/CajaChicaContext'

import { CentroDeCostoAuxContext } from '../contexts/CentroDeCostoAuxContext'

const HomeDisponibilidadCajaChicaList = () => {
  const { cajaChicas } = useContext(CajaChicaContext)
  const { centroDeCostoAuxs } = useContext(CentroDeCostoAuxContext)

  const [ingresoMontoGlobal, setIngresoMontoGlobal] = useState(0)
  const [egresoMontoGlobal, setEgresoMontoGlobal] = useState(0)
  const [cambioGlobalPendiente, setCambioGlobalPendiente] = useState(0)
  const [disponibilidadCajaChicaData, setDisponibilidadCajaChicaData] =
    useState(null)

  console.log(disponibilidadCajaChicaData)

  const toast = useRef(null)
  console.log(ingresoMontoGlobal)
  console.log(egresoMontoGlobal)
  useEffect(
    () => {
      disponibilidadCajaChicaCentroCosto()
      setDisponibilidadCajaChicaData(auxOtro2)
    },
    // setDataPresupuesto(dataPresupuestos)
    [cajaChicas]
  )
  const auxOtro2 = []
  const disponibilidadCajaChicaCentroCosto = () => {
    const ingresoMontoGlobal = cajaChicas
      .map((ingresoTotal) => ingresoTotal.ingresoMontoCajaChica)
      .reduce((a, b) => a + b, 0)
    setIngresoMontoGlobal(ingresoMontoGlobal)
    const egresoMontoGlobal = cajaChicas
      .map((egresoTotal) => egresoTotal.egresoMontoCajaChica)
      .reduce((a, b) => a + b, 0)
    setEgresoMontoGlobal(egresoMontoGlobal)

    const cambioMontoGlobal = cajaChicas
      .map((p) =>
        p.estatusVueltoCajaChica === 'PENDIENTE' ? p.montoVueltoCajaChica : 0
      )
      .reduce((a, b) => a + b, 0)
    setCambioGlobalPendiente(cambioMontoGlobal)
    centroDeCostoAuxs.forEach((dataset, i) => {
      console.log(dataset.id)
      console.log(i)

      const centrodecosto = cajaChicas.filter(
        (p) => p.centroDeCostoAuxId?.id === dataset.id
      )

      const totalEgreso = centrodecosto
        .map((egreso) => egreso.egresoMontoCajaChica)
        .reduce((a, b) => a + b, 0)
      const totalIngreso = centrodecosto
        .map((ingreso) => ingreso.ingresoMontoCajaChica)
        .reduce((a, b) => a + b, 0)
      // .reduce((a, b) => a + b, 0)
      console.log(totalEgreso)
      auxOtro2.push({
        centroCostoNombre: dataset.nombreCentroDeCosto,
        disponibleTotal: totalIngreso - totalEgreso
      })
    })
    console.log(auxOtro2)
    // mesesDelAno.forEach((dataset, i) => {
    //   let ingresoGasto = ingresoGastos.filter((p) =>
    //     moment(dataset).isSame(p.fechaIngresoGasto, 'month')
    //   )
    //   const totalEgreso = ingresoGasto
    //     .map((egreso) => egreso.egresoIngresoGasto)
    //     .reduce((a, b) => a + b, 0)
    //   let mes = mesesDelAnoNombre[i]

    //   // auxOtro2.push({ [mes]: totalEgreso })
    //   auxOtro2.push({ mesNombre: mes, totalGastoMes: totalEgreso })
    //   diasTotales = diasTotales.concat(totalEgreso)
    // })

    // // setIngresoGastoData({
    // //   ...ingresoGastoData,
    // //   [mesesDelAnoNombre]: diasTotales
    // // })
    // // auxOtro2.push(diasTotales)
    // auxOtro3.push(...mesesDelAnoNombre)
    // auxOtro4.push({
    //   type: 'bar',
    //   label: 'Gastos Totales',
    //   backgroundColor: '#d9a406',
    //   data: [...diasTotales]
    // })
  }

  const disnonibilidadTemplate = (p) => {
    return (
      <div className="card">
        {p.centroCostoNombre}={p.disponibleTotal}
      </div>
    )
  }

  return (
    <>
      <Toast ref={toast} />
      {disponibilidadCajaChicaData?.map(
        (p) => p.disponibleTotal !== 0 && disnonibilidadTemplate(p)
      )}
      {ingresoMontoGlobal - egresoMontoGlobal}
      {'bvv'}
      {cambioGlobalPendiente}
      {'bvv'}
      {ingresoMontoGlobal - egresoMontoGlobal - cambioGlobalPendiente}
    </>
  )
}

export default HomeDisponibilidadCajaChicaList
