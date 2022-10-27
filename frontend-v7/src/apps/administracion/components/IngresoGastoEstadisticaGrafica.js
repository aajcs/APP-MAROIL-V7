/* eslint-disable prefer-const */
import { useContext, useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'
import { IngresoGastoContext } from '../contexts/IngresoGastoContext'
import moment from 'moment'

const IngresoGastoEstadisticaGrafica = () => {
  const { ingresoGastos } = useContext(IngresoGastoContext)

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
    buquesToneladasDias()
  }, [ingresoGastos])
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

  let diasTotales = []
  const buquesToneladasDias = () => {
    mesesDelAno.forEach((dataset, i) => {
      let ingresoGasto = ingresoGastos.filter((p) =>
        moment(dataset).isSame(p.fechaIngresoGasto, 'month')
      )
      const totalEgreso = ingresoGasto
        .map((egreso) => egreso.egresoIngresoGasto)
        .reduce((a, b) => a + b, 0)
      let mes = mesesDelAnoNombre[i]

      // auxOtro2.push({ [mes]: totalEgreso })
      auxOtro2.push({ mesNombre: mes, totalGastoMes: totalEgreso })
      diasTotales = diasTotales.concat(totalEgreso)
    })

    // setIngresoGastoData({
    //   ...ingresoGastoData,
    //   [mesesDelAnoNombre]: diasTotales
    // })
    // auxOtro2.push(diasTotales)
    auxOtro3.push(...mesesDelAnoNombre)
    auxOtro4.push({
      type: 'bar',
      label: 'Gastos Totales',
      backgroundColor: '#d9a406',
      data: [...diasTotales]
    })
  }
  return (
    <div className="card">
      <Chart type="bar" data={basicData} options={basicOptions} />
    </div>
  )
}

export default IngresoGastoEstadisticaGrafica