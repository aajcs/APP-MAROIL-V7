/* eslint-disable prefer-const */
import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { GanadorContext } from '../contexts/GanadorContext'
import SorteoCardRender from './SorteoCardRender'

const SorteoCard = () => {
  const { ganadors } = useContext(GanadorContext)
  console.log(ganadors)
  const [data, setdata] = useState()
  console.log(data)
  useEffect(() => {
    volumetiraMeses()
    setdata(auxOtro2)
  }, [ganadors])

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

  let blMensualTotal = []

  const volumetiraMeses = () => {
    mesesDelAno.forEach((dataset, i) => {
      let ganadorMes = ganadors.filter(
        (p) =>
          p.estatusVolumetria !== 'VOLUMETRIA ESTIMADA' &&
          moment(dataset).isSame(p.fechaBlFinalVolumetria, 'month')
      )
      let ganadorMaroilMes = ganadorMes.filter(
        (p) => p.terminalAuxId === 'MAROIL TERMINAL'
      )
      let ganadorSanFelixMes = ganadorMes.filter(
        (p) => p.terminalAuxId === 'PETRO SAN FELIX'
      )
      let ganadorCedenoMes = ganadorMes.filter(
        (p) => p.terminalAuxId === 'PETRO CEDENO'
      )

      const totalVolumetria = ganadorMes
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)
      const totalVolumetriaMaroil = ganadorMaroilMes
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)
      const totalVolumetriaSanFelix = ganadorSanFelixMes
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)
      const totalVolumetriaCedeno = ganadorCedenoMes
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)
      let mes = mesesDelAnoNombre[i]

      auxOtro2.push({
        mesNombre: mes,
        totalGastoMes: totalVolumetria,
        totalTerminalMaroil: totalVolumetriaMaroil,
        totalTerminalSanFelix: totalVolumetriaSanFelix,
        totalTerminalCedeno: totalVolumetriaCedeno
      })
      blMensualTotal = blMensualTotal.concat(totalVolumetria)
    })
  }
  return (
    <div className="grid  ">
      {ganadors.length !== 0 &&
        ganadors &&
        ganadors.map((data) => <SorteoCardRender data={data} key={data.id} />)}
    </div>
  )
}

export default SorteoCard
