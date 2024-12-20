/* eslint-disable prefer-const */
import { useContext, useEffect, useState } from 'react'

import moment from 'moment'
import { IngresoGastoContext } from '../../administracion/contexts/IngresoGastoContext'
import { VolumetriaContext } from '../../Control/contexts/VolumetriaContext'
import { CostoTmMesContext } from '../../administracion/contexts/CostoTmMesContext'
import { MensualidadOpMesContext } from '../../administracion/contexts/MensualidadOpMesContext'
import CostoPorTmReporteEstadisticaCard from './CostoPorTmReporteEstadisticaCard'

const CostoPorTmReporteEstadistica = () => {
  const { ingresoGastos } = useContext(IngresoGastoContext)
  const { volumetrias } = useContext(VolumetriaContext)
  const { costoTmMess } = useContext(CostoTmMesContext)
  const { mensualidadOpMess } = useContext(MensualidadOpMesContext)

  const [dataDataCompleta, setdataDataCompleta] = useState()

  useEffect(() => {
    dataMesCompleta()
    setdataDataCompleta(arrayDataCompleta)
  }, [ingresoGastos, volumetrias, costoTmMess, mensualidadOpMess])
  // useEffect(() => {
  //
  //   setdataDataCompleta(arrayDataCompleta)
  // }, [volumetrias])
  let arrayDataCompleta = []

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

  const dataMesCompleta = () => {
    mesesDelAno.forEach((dataset, i) => {
      // GATOS
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

      // VOLUMETRIA
      let volumetriaMes = volumetrias.filter((p) =>
        moment(dataset).isSame(p.fechaBlFinalVolumetria, 'month')
      )
      let volumetriaMaroilMes = volumetriaMes.filter(
        (p) => p.terminalAuxId === 'MAROIL TERMINAL'
      )
      let volumetriaSanFelixMes = volumetriaMes.filter(
        (p) => p.terminalAuxId === 'PETRO SAN FELIX'
      )
      let volumetriaCedenoMes = volumetriaMes.filter(
        (p) => p.terminalAuxId === 'PETRO CEDENO'
      )
      const totalVolumetria = volumetriaMes
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)
      const totalVolumetriaMaroil = volumetriaMaroilMes
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)
      const totalVolumetriaSanFelix = volumetriaSanFelixMes
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)
      const totalVolumetriaCedeno = volumetriaCedenoMes
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)

      // COSTOS TM MES
      let costoTmMes = costoTmMess.filter(
        (p) =>
          p.estatusCostoTmMes === 'OPERATIVO' &&
          moment(dataset).isSame(p.fechaEfectivaCostoTmMes, 'month')
      )
      const totalCostoTmMes = costoTmMes
        .map((p) => p.costoCostoTmMes)
        .reduce((a, b) => a + b, 0)

      // COSTO MENSUALIDAD OPERATIVA
      let mensualidadOpMes = mensualidadOpMess.filter(
        (p) =>
          p.estatusMensualidadOpMes === 'OPERATIVO' &&
          moment(dataset).isSame(p.fechaEfectivaMensualidadOpMes, 'month')
      )
      const totalMensualidadOpMes = mensualidadOpMes
        .map((p) => p.costoMensualidadOpMes)
        .reduce((a, b) => a + b, 0)
      arrayDataCompleta.push({
        mesNombre: mes,
        totalGastoMes: totalEgreso,
        totalGastoMaroil: totalingresoGastoMaroil,
        totalGastoSanFelix: totalingresoGastoSanFelix,
        totalGastoCedeno: totalingresoGastoCedeno,
        totalVolumenMes: totalVolumetria,
        totalVolumenTerminalMaroil: totalVolumetriaMaroil,
        totalVolumenTerminalSanFelix: totalVolumetriaSanFelix,
        totalVolumenTerminalCedeno: totalVolumetriaCedeno,
        totalCostoTmMes: totalCostoTmMes,
        totalmensualidadOpMes: totalMensualidadOpMes
      })
    })
  }

  // cabecera de la tabla

  return (
    <>
      <div className="grid  ">
        {ingresoGastos.length !== 0 &&
          dataDataCompleta &&
          dataDataCompleta.map((dataDataCompleta) => (
            <CostoPorTmReporteEstadisticaCard
              dataDataCompleta={dataDataCompleta}
              key={dataDataCompleta.id}
            />
          ))}
      </div>
    </>
  )
}

export default CostoPorTmReporteEstadistica
