/* eslint-disable react/prop-types */
/* eslint-disable multiline-ternary */
/* eslint-disable prefer-const */
import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { VolumetriaContext } from '../contexts/VolumetriaContext'
import VolumetriaEstadisticaCardRender from './VolumetriaEstadisticaCardRender'
import HistoricoEstadisticaCardRender from './HistoricoEstadisticaCardRender'

const VolumetriaEstadisticaCard = ({ date9, valor }) => {
  const validarFecha = moment(date9).isValid()

  const { volumetrias } = useContext(VolumetriaContext)

  const [data, setdata] = useState()

  useEffect(() => {
    volumetiraMeses()
    if (valor) {
      const barcosMes = auxOtro2.filter((p) =>
        moment(p.mesCompletoNombre).isSame(date9, 'month')
      )
      setdata(barcosMes)
    } else {
      setdata(auxOtro2)
    }
  }, [volumetrias, date9])

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
      let mesCompleto = mesesDelAno[i]

      auxOtro2.push({
        mesNombre: mes,
        mesCompletoNombre: mesCompleto,
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
        data.map((data) =>
          valor ? (
            <HistoricoEstadisticaCardRender data={data} key={data.id} />
          ) : (
            <VolumetriaEstadisticaCardRender data={data} key={data.id} />
          )
        )}
    </div>
  )
}

export default VolumetriaEstadisticaCard
