/* eslint-disable prefer-const */
import { useContext, useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'
import moment from 'moment'
import { VolumetriaContext } from '../contexts/VolumetriaContext'

const VolumetriaEstadisticaGrafica = () => {
  const { volumetrias } = useContext(VolumetriaContext)

  const [basicData, setBasicData] = useState({
    labels: [
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
    ],
    datasets: [
      {
        label: 'Total Gasto',
        backgroundColor: '#42A5F5',
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56]
      },
      {
        label: 'Total De TM',
        backgroundColor: '#FFA726',
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56]
      }
    ]
  })

  useEffect(() => {
    setBasicData({ ...setBasicData, labels: auxOtro3, datasets: auxOtro4 })
    volumetiraMeses()
  }, [volumetrias])
  const getLightTheme = () => {
    const basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#fffcf3'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#fffcf3'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#fffcf3'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    }

    return {
      basicOptions
    }
  }

  const { basicOptions } = getLightTheme()

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
  let auxOtro3 = []
  let auxOtro4 = []
  console.log(volumetrias)
  let tmTotalesMes = []
  let tmTotalesMaroilMes = []
  let tmTotalesSanFelixMes = []
  let tmTotalesCedenoMes = []
  const volumetiraMeses = () => {
    mesesDelAno.forEach((dataset, i) => {
      let volumetria = volumetrias.filter((p) =>
        moment(dataset).isSame(p.fechaBlFinalVolumetria, 'month')
      )
      let volumetriaMaroilMes = volumetria.filter(
        (p) => p.terminalAuxId !== null && p.terminalAuxId === 'MAROIL TERMINAL'
      )
      let volumetriaSanFelixMes = volumetria.filter(
        (p) => p.terminalAuxId !== null && p.terminalAuxId === 'PETRO SAN FELIX'
      )
      let volumetriaCedenoMes = volumetria.filter(
        (p) => p.terminalAuxId !== null && p.terminalAuxId === 'PETRO CEDENO'
      )
      const totalVolumetria = volumetria
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)
      let mes = mesesDelAnoNombre[i]
      const totalVolumetriaMaroil = volumetriaMaroilMes
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)
      const totalVolumetriaSanFelix = volumetriaSanFelixMes
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)
      const totalVolumetriaCedeno = volumetriaCedenoMes
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)

      // auxOtro2.push({ [mes]: totalEgreso })
      auxOtro2.push({ mesNombre: mes, totalGastoMes: totalVolumetria })
      tmTotalesMes = tmTotalesMes.concat(totalVolumetria)
      tmTotalesMaroilMes = tmTotalesMaroilMes.concat(totalVolumetriaMaroil)
      tmTotalesSanFelixMes = tmTotalesSanFelixMes.concat(
        totalVolumetriaSanFelix
      )
      tmTotalesCedenoMes = tmTotalesCedenoMes.concat(totalVolumetriaCedeno)
    })

    // setIngresoGastoData({
    //   ...ingresoGastoData,
    //   [mesesDelAnoNombre]: tmTotalesMes
    // })
    // auxOtro2.push(tmTotalesMes)
    auxOtro3.push(...mesesDelAnoNombre)
    auxOtro4.push(
      {
        type: 'bar',
        label: 'Toneladas Totales',
        backgroundColor: '#198754',
        data: [...tmTotalesMes]
      },
      {
        // type: 'bar',
        label: 'Toneladas Maroil',
        backgroundColor: '#0d6efd',
        data: [...tmTotalesMaroilMes]
      },
      {
        // type: 'bar',
        label: 'Toneladas San Felix',
        backgroundColor: '#dc3545',
        data: [...tmTotalesSanFelixMes]
      },
      {
        // type: 'bar',
        label: 'Toneladas Cedeño',
        backgroundColor: '#ffc107',
        data: [...tmTotalesCedenoMes]
      }
    )
  }

  return (
    <div className="card">
      {volumetrias.length !== 0 && (
        <Chart type="bar" data={basicData} options={basicOptions} />
      )}
    </div>
  )
}

export default VolumetriaEstadisticaGrafica
