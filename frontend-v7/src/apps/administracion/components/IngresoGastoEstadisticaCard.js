/* eslint-disable prefer-const */
import { useContext, useEffect, useState } from 'react'
import { IngresoGastoContext } from '../contexts/IngresoGastoContext'
import moment from 'moment'

import IngresoGastoEstadisticaCardRender from './IngresoGastoEstadisticaCardRender'

const IngresoGastoEstadisticaCard = () => {
  const { ingresoGastos } = useContext(IngresoGastoContext)

  const [data, setdata] = useState()

  useEffect(() => {
    buquesToneladasDias()
    setdata(auxOtro2)
  }, [ingresoGastos])

  // cabecera de la tabla
  const mesesDelAno = [
    '2022-01-20',
    '2022-02-20',
    '2022-03-20',
    '2022-04-20',
    '2022-05-20',
    '2022-06-20',
    '2022-07-20',
    '2022-08-20',
    '2022-09-20',
    '2022-10-20',
    '2022-11-20',
    '2022-12-20'
  ]
  const mesesDelAnoNombre = [
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
  ]
  let auxOtro2 = []
  let diasTotales = []

  const buquesToneladasDias = () => {
    mesesDelAno.forEach((dataset, i) => {
      let ingresoGastoMes = ingresoGastos.filter(
        (p) =>
          p.estatusIngresoGasto === 'PROCESADO' &&
          moment(dataset).isSame(p.fechaIngresoGasto, 'month')
      )
      let ingresoGastoMaroilMes = ingresoGastoMes.filter(
        (p) =>
          p.centroDeCostoAuxId !== null &&
          p.centroDeCostoAuxId.id === '63504235a9d055063b6447f0'
      )
      let ingresoGastoSanFelixMes = ingresoGastoMes.filter(
        (p) =>
          p.centroDeCostoAuxId !== null &&
          p.centroDeCostoAuxId.id === '62de20b986f66dbfa7f25dde'
      )
      let ingresoGastoCedenoMes = ingresoGastoMes.filter(
        (p) =>
          p.centroDeCostoAuxId !== null &&
          p.centroDeCostoAuxId.id === '6350424ca9d055063b6447f3'
      )

      const totalEgreso = ingresoGastoMes
        .map((egreso) => egreso.egresoIngresoGasto)
        .reduce((a, b) => a + b, 0)

      const totalingresoGastoMaroil = ingresoGastoMaroilMes
        .map((egreso) => egreso.egresoIngresoGasto)
        .reduce((a, b) => a + b, 0)

      const totalingresoGastoSanFelix = ingresoGastoSanFelixMes
        .map((egreso) => egreso.egresoIngresoGasto)
        .reduce((a, b) => a + b, 0)

      const totalingresoGastoCedeno = ingresoGastoCedenoMes
        .map((egreso) => egreso.egresoIngresoGasto)
        .reduce((a, b) => a + b, 0)
      let mes = mesesDelAnoNombre[i]

      // auxOtro2.push({ [mes]: totalEgreso })
      auxOtro2.push({
        mesNombre: mes,
        totalGastoMes: totalEgreso,
        totalGastoMaroil: totalingresoGastoMaroil,
        totalGastoSanFelix: totalingresoGastoSanFelix,
        totalGastoCedeno: totalingresoGastoCedeno
      })
      diasTotales = diasTotales.concat(totalEgreso)
    })
  }
  return (
    <div className="grid  ">
      {ingresoGastos.length !== 0 &&
        data &&
        data.map((data) => (
          <IngresoGastoEstadisticaCardRender data={data} key={data.id} />
        ))}
    </div>
  )
}

export default IngresoGastoEstadisticaCard
