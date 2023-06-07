/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react'
import { Chart } from 'primereact/chart'
import { VolumetriaContext } from '../../Control/contexts/VolumetriaContext'
import moment from 'moment'

const HomeDashboardTotalGrafica = ({
  dateDashboard,
  centroDeCosto,
  ingresoGastosPorCdco
}) => {
  const { volumetrias } = useContext(VolumetriaContext)
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const auxOtro1 = []
  const auxOtro2 = []
  let volumetriaMaroilMes = []
  let volumetriaSanFelixMes = []
  let volumetriaCedenolMes = []
  let costoTMMaroilMes = []
  let costoTMSanFelixMes = []
  let costoTMCedenolMes = []
  let gastoCdcoMaroilMes = []
  let gastoCdcoCedenolMes = []
  let gastoCdcoSanFelixMes = []
  let mesesNombre = []

  const buquesToneladasDias = () => {
    const documentStyle = getComputedStyle(document.documentElement)
    for (let i = 12; i >= 0; i--) {
      // console.log(moment(dateDashboard).subtract(i, 'M').format('DD/MM/YY '))
      const ingresoGastoMesActual = ingresoGastosPorCdco.filter((p) =>
        moment(dateDashboard)
          .subtract(i, 'M')
          .isSame(p.fechaIngresoGasto, 'month')
      )

      const totalGastosCdcoTotal = ingresoGastoMesActual
        .map((p) => p.egresoIngresoGasto)
        .reduce((a, b) => a + b, 0)
      console.log(totalGastosCdcoTotal)
      const volumetriaMesActual = volumetrias.filter((p) =>
        moment(dateDashboard)
          .subtract(i, 'M')
          .isSame(p.fechaBlFinalVolumetria, 'month')
      )
      const totalVolumetriaMesMaroil = volumetriaMesActual
        .map(
          (p) => p.terminalAuxId === 'MAROIL TERMINAL' && p.blFinalVolumetria
        )
        .reduce((a, b) => a + b, 0)
      const totalVolumetriaMesPc = volumetriaMesActual
        .map((p) => p.terminalAuxId === 'PETRO CEDENO' && p.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)
      const totalVolumetriaMesPsf = volumetriaMesActual
        .map(
          (p) => p.terminalAuxId === 'PETRO SAN FELIX' && p.blFinalVolumetria
        )
        .reduce((a, b) => a + b, 0)
      // console.log(totalVolumetriaMesMaroil)
      // console.log(totalVolumetriaMesPc)
      // console.log(totalVolumetriaMesPsf)
      volumetriaMaroilMes = volumetriaMaroilMes.concat(totalVolumetriaMesMaroil)
      volumetriaCedenolMes = volumetriaCedenolMes.concat(totalVolumetriaMesPc)
      volumetriaSanFelixMes = volumetriaSanFelixMes.concat(
        totalVolumetriaMesPsf
      )
      mesesNombre = mesesNombre.concat(
        moment(dateDashboard).subtract(i, 'M').format('MMM ')
      )
      costoTMMaroilMes = costoTMMaroilMes.concat(
        totalGastosCdcoTotal / totalVolumetriaMesMaroil
      )
      costoTMCedenolMes = costoTMCedenolMes.concat(
        totalGastosCdcoTotal / totalVolumetriaMesPc
      )
      costoTMSanFelixMes = costoTMSanFelixMes.concat(
        totalGastosCdcoTotal / totalVolumetriaMesPsf
      )
      gastoCdcoMaroilMes = gastoCdcoMaroilMes.concat(totalGastosCdcoTotal)
      gastoCdcoCedenolMes = gastoCdcoCedenolMes.concat(totalGastosCdcoTotal)
      gastoCdcoSanFelixMes = gastoCdcoSanFelixMes.concat(totalGastosCdcoTotal)
    }
    if (centroDeCosto.id === '63504235a9d055063b6447f0') {
      auxOtro1.push({
        label: '',
        data: [...gastoCdcoMaroilMes],
        // fill: true,
        borderColor: documentStyle.getPropertyValue('--gray-600'),
        tension: 0.4,
        backgroundColor: 'rgba(108,117,125,0.2)',
        yAxisID: 'y2'
      })
    }
    if (centroDeCosto.id === '6350424ca9d055063b6447f3') {
      auxOtro1.push({
        label: '',
        data: [...gastoCdcoCedenolMes],
        // fill: true,
        borderColor: documentStyle.getPropertyValue('--gray-600'),
        tension: 0.4,
        backgroundColor: 'rgba(108,117,125,0.2)',
        yAxisID: 'y2'
      })
    }
    if (centroDeCosto.id === '62de20b986f66dbfa7f25dde') {
      auxOtro1.push({
        label: '',
        data: [...gastoCdcoSanFelixMes],
        // fill: true,
        borderColor: documentStyle.getPropertyValue('--gray-600'),
        tension: 0.4,
        backgroundColor: 'rgba(108,117,125,0.2)',
        yAxisID: 'y2'
      })
    }

    auxOtro2.push(...mesesNombre)

    setChartData({ ...chartData, labels: auxOtro2, datasets: auxOtro1 })
  }
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    )

    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    const data = {
      labels: [
        'M',
        'A',
        'M',
        'J',
        'J',
        'A',
        'S',
        'M',
        'A',
        'M',
        'J',
        'J',
        'A',
        'S'
      ],
      datasets: [
        {
          label: 'Costo TM',
          data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90],
          fill: false,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--blue-500')
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--teal-500')
        },
        {
          label: 'Third Dataset',
          data: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: documentStyle.getPropertyValue('--gray-600'),
          tension: 0.4,
          backgroundColor: 'rgba(108,117,125,0.2)'
        }
      ]
    }
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            color: textColor
          }
        }
        // tooltip: {
        //   callbacks: {
        //     footer: footer
        //   }
        // }
      },
      scales: {
        x: {
          display: false,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        // y:
        //   // display: false,
        //   // ticks: {
        //   //   color: textColorSecondary
        //   // },
        //   // grid: {
        //   //   color: surfaceBorder
        //   // }
        //   [
        //     {
        //       display: false,
        //       scaleLabel: {
        //         display: false,
        //         labelString: 'Purchase amount (USD)'
        //       },
        //       id: 'left',
        //       stacked: false,
        //       ticks: {
        //         beginAtZero: true
        //       }
        //     },
        //     {
        //       scaleLabel: {
        //         display: false,
        //         labelString: 'Purchase count'
        //       },
        //       id: 'right',
        //       position: 'right',
        //       stacked: false,
        //       ticks: {
        //         beginAtZero: true
        //       }
        //     }
        //   ]
        y: {
          display: false,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y2: {
          display: false,
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          position: 'right',
          // reverse: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            drawOnChartArea: false // only want the grid lines for one axis to show up
          }
        }
      }
    }
    setChartData(data)

    setChartOptions(options)
  }, [])
  useEffect(() => {
    buquesToneladasDias()
  }, [dateDashboard])
  return (
    <div className=" ">
      <div className="">
        <Chart
          type="line"
          data={chartData}
          options={chartOptions}
          style={{
            height: '50px',
            width: '100%'
            // position: 'absolute',
            // overflow: 'hidden',
            // bottom: '30%',
            // 'margin-left': '-6%',
            // 'padding-left': '14%'
          }}
        />
      </div>
    </div>
  )
}

export default HomeDashboardTotalGrafica
