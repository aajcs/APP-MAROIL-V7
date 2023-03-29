/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef, useEffect } from 'react'
import { Chart } from 'primereact/chart'
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
  const [chartData1, setChartData1] = useState({
    labels: ['Total'],

    datasets: [
      {
        label: '',
        backgroundColor: (context) => {
          const chart = context.chart
          // eslint-disable-next-line no-unused-vars
          const { ctx, chartArea } = chart

          if (!chartArea) {
            return null
          }
          if (context.dataIndex === 0) {
            return getGradiente(chart, 'red', '#CED4DE')
          } else {
            return getGradiente(chart, 'green', '#CED4DE')
          }
        },

        data: [ingresoMontoGlobal - egresoMontoGlobal]
      }
    ]
  })
  const [chartData2, setChartData2] = useState({
    labels: ['MAROIL TERMINAL', 'PETRO CEDEÑO', 'PETRO SAN FELIX'],

    datasets: [
      {
        label: 'TE AMO',
        backgroundColor: (context) => {
          const chart = context.chart
          // eslint-disable-next-line no-unused-vars
          const { ctx, chartArea } = chart

          if (!chartArea) {
            return null
          }
          if (context.dataIndex === 0) {
            return getGradiente(chart, 'red', '#CED4DE')
          } else {
            return getGradiente(chart, 'green', '#CED4DE')
          }
        },

        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  })

  const toast = useRef(null)

  useEffect(
    () => {
      disponibilidadCajaChicaCentroCosto()
      setDisponibilidadCajaChicaData(auxOtro2)
      setChartData2({ ...chartData2, labels: auxOtro3, datasets: auxOtro4 })
      setChartData1({ ...chartData1, datasets: auxOtro5 })
    },

    // setDataPresupuesto(dataPresupuestos)
    [cajaChicas]
  )
  const auxOtro2 = []
  const auxOtro3 = []
  const auxOtro4 = []
  const auxOtro5 = []
  let centrosDeCostosNombre = []
  let saldoDisponibleCentroCosto = []
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
      if (totalIngreso - totalEgreso !== 0) {
        centrosDeCostosNombre = centrosDeCostosNombre.concat(
          dataset.descripcionCentroDeCosto
        )
        const valor = totalIngreso - totalEgreso
        saldoDisponibleCentroCosto = saldoDisponibleCentroCosto.concat(valor)
      }

      auxOtro2.push({
        centroCostoNombre: dataset.descripcionCentroDeCosto,
        disponibleTotal: totalIngreso - totalEgreso
      })
    })
    auxOtro3.push(...centrosDeCostosNombre)
    auxOtro4.push({
      label: '',
      backgroundColor: (context) => {
        const chart = context.chart
        // eslint-disable-next-line no-unused-vars
        const { ctx, chartArea } = chart

        if (!chartArea) {
          return null
        }
        if (context.dataIndex === 0) {
          return getGradiente(chart, '#1a7347', '#CED4DE')
        }
        if (context.dataIndex === 1) {
          return getGradiente(chart, '#d9a405', '#CED4DE')
        } else {
          return getGradiente(chart, '#dc3545', '#CED4DE')
        }
      },

      data: [...saldoDisponibleCentroCosto]
    })
    auxOtro5.push({
      label: '',
      backgroundColor: (context) => {
        const chart = context.chart
        // eslint-disable-next-line no-unused-vars
        const { ctx, chartArea } = chart

        if (!chartArea) {
          return null
        }
        if (context.dataIndex === 0) {
          return getGradiente(chart, '#6c757d', '#CED4DE')
        }
      },

      data: [ingresoMontoGlobal - egresoMontoGlobal - cambioMontoGlobal]
    })
  }
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [chartOptions2, setChartOptions2] = useState({})
  function getGradiente(chart, color1, color2) {
    const {
      ctx,
      chartArea: { top, bottom, left, right }
    } = chart
    const gradientSegment = ctx.createLinearGradient(left, 0, right, 0)
    gradientSegment.addColorStop(0, color1)
    gradientSegment.addColorStop(1, color2)
    return gradientSegment
  }
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue('--bs-light')
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

    const data = {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: (context) => {
            const chart = context.chart
            // eslint-disable-next-line no-unused-vars
            const { ctx, chartArea } = chart

            if (!chartArea) {
              return null
            }
            if (context.dataIndex === 0) {
              return getGradiente(chart, 'red', '#CED4DE')
            } else {
              return getGradiente(chart, 'green', '#CED4DE')
            }
          },

          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }

    const options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      // aspectRatio: 0.8,
      barPercentage: 0.9,
      borderColor: '#151515',
      borderWidth: 0,

      // responsive: true,

      aspectRatio: 1.5,
      plugins: {
        tooltip: {
          // mode: 'dataset',
          // intersect: true,
          // caretPadding: 5
          enabled: false
        },
        legend: {
          display: false,
          labels: {
            fontColor: textColor
          }
        },
        layout: {
          padding: 0
        }
      },
      scales: {
        yAxes: [
          {
            barPercentage: 0.2
          }
        ],
        x: {
          display: false,
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: { display: false, color: surfaceBorder, drawBorder: false }
        }
      }
    }
    const options2 = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      // aspectRatio: 0.8,
      barPercentage: 0.55,
      borderColor: '#151515',
      borderWidth: 0,

      // responsive: true,

      aspectRatio: 22,
      plugins: {
        tooltip: {
          // mode: 'dataset',
          // intersect: true,
          // caretPadding: 5
          enabled: false
        },
        legend: {
          display: false,
          labels: {
            fontColor: textColor
          }
        },
        layout: {
          padding: 0
        }
      },
      scales: {
        yAxes: [
          {
            barPercentage: 0.2
          }
        ],
        x: {
          display: false,
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: { display: false, color: surfaceBorder, drawBorder: false }
        }
      }
    }

    setChartData(data)
    setChartOptions(options)
    setChartOptions2(options2)
  }, [])
  const alwaysShowTooltip = {
    id: 'alwaysShowTooltip',
    afterDraw(chart, args, options) {
      const { ctx } = chart
      ctx.save()

      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
          const { x, y } = datapoint.tooltipPosition()
          const text =
            chart.data.datasets[i].label +
            ' ' +
            new Intl.NumberFormat().format(chart.data.datasets[i].data[index]) +
            ' $'
          const textWidth = ctx.measureText(text).width
          ctx.fillStyle = 'rgba(0,0,0,0.4)'
          ctx.fillRect(x - (textWidth + 80) / 2, y - 10, textWidth + 10, 20)
          // ctx.beginPath()
          // ctx.moveTo(x, y)
          // ctx.lineTo(x - 5, y - 5)
          // ctx.lineTo(x + 5, y - 5)
          // ctx.fill()
          // ctx.restore()

          ctx.font = '14px Arial'
          ctx.fillStyle = 'white'
          ctx.fillText(text, x - textWidth - 10 / 1, y + 5)
          ctx.restore()
        })
      })
    }
  }
  const alwaysShowTooltip2 = {
    id: 'alwaysShowTooltip',
    afterDraw(chart, args, options) {
      const { ctx } = chart
      ctx.save()

      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
          const { x, y } = datapoint.tooltipPosition()
          const text =
            chart.data.datasets[i].label +
            ' ' +
            new Intl.NumberFormat().format(chart.data.datasets[i].data[index]) +
            ' $'
          const textWidth = ctx.measureText(text).width
          ctx.fillStyle = 'rgba(0,0,0,0.4)'
          ctx.fillRect(x - (textWidth + 70) / 2, y - 10, textWidth + 10, 20)
          // ctx.beginPath()
          // ctx.moveTo(x, y)
          // ctx.lineTo(x - 5, y - 5)
          // ctx.lineTo(x + 5, y - 5)
          // ctx.fill()
          // ctx.restore()

          ctx.font = '14px Arial'
          ctx.fillStyle = 'white'
          ctx.fillText(text, x - textWidth - 10 / 1, y + 5)
          ctx.restore()
        })
      })
    }
  }
  const disnonibilidadTemplate = (p) => {
    return (
      <div className="card">
        {p.centroCostoNombre}
        <br></br>={p.disponibleTotal}
      </div>
    )
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="">
        <Chart
          type="bar"
          data={chartData2}
          options={chartOptions}
          plugins={[alwaysShowTooltip]}
          style={{
            height: '150px',
            width: '100%'
            // position: 'absolute',
            // overflow: 'hidden',
            // bottom: '30%',
            // 'margin-left': '-6%',
            // 'padding-left': '14%'
          }}
        />{' '}
        <Chart
          type="bar"
          data={chartData1}
          options={chartOptions2}
          plugins={[alwaysShowTooltip2]}
          style={{
            height: '70px',
            width: '100%'
            // position: 'absolute',
            // overflow: 'hidden',
            // bottom: '30%',
            // 'margin-left': '-6%',
            // 'padding-left': '14%'
          }}
        />
      </div>
      {/* {disponibilidadCajaChicaData?.map(
        (p) => p.disponibleTotal !== 0 && disnonibilidadTemplate(p)
      )} */}
      {/* {ingresoMontoGlobal - egresoMontoGlobal}
      {'bvv'}
      {cambioGlobalPendiente}
      {'bvv'}
      {ingresoMontoGlobal - egresoMontoGlobal - cambioGlobalPendiente} */}
    </>
  )
}

export default HomeDisponibilidadCajaChicaList
