/* eslint-disable prefer-const */
import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { VolumetriaContext } from '../contexts/VolumetriaContext'
import VolumetriaEstadisticaCardRender from './VolumetriaEstadisticaCardRender'

const VolumetriaEstadisticaCard = () => {
  const { volumetrias } = useContext(VolumetriaContext)

  const [data, setdata] = useState()

  useEffect(() => {
    volumetiraMeses()
    setdata(auxOtro2)
  }, [volumetrias])

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
      let volumetriaMes = volumetrias.filter(
        (p) =>
          p.estatusVolumetria !== 'VOLUMETRIA ESTIMADA' &&
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
      {volumetrias.length !== 0 &&
        data &&
        data.map((data) => (
          <VolumetriaEstadisticaCardRender data={data} key={data.id} />
        ))}
    </div>
  )
}

export default VolumetriaEstadisticaCard
