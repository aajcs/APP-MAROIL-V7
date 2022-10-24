/* eslint-disable prefer-const */
// /* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'
import { IngresoGastoContext } from '../contexts/IngresoGastoContext'
import moment from 'moment'

const HomeAdministracion = () => {
  const { ingresoGastos } = useContext(IngresoGastoContext)
  console.log(ingresoGastos)
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
  console.log(basicData)
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
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
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
  const totalEgreso = ingresoGastos
    .map((egreso) => egreso.egresoIngresoGasto)
    .reduce((a, b) => a + b, 0)
  console.log(totalEgreso)
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
  let auxOtro3 = []
  let auxOtro4 = []

  let diasTotales = []
  const buquesToneladasDias = () => {
    mesesDelAno.forEach((dataset, i) => {
      console.log(dataset)
      let ingresoGasto = ingresoGastos.filter((p) =>
        moment(dataset).isSame(p.fechaIngresoGasto, 'month')
      )
      const totalEgreso = ingresoGasto
        .map((egreso) => egreso.egresoIngresoGasto)
        .reduce((a, b) => a + b, 0)
      console.log(totalEgreso)
      console.log(ingresoGasto)
      diasTotales = diasTotales.concat(totalEgreso)
    })
    console.log(diasTotales)
    auxOtro3.push(...mesesDelAnoNombre)
    auxOtro4.push({
      type: 'bar',
      label: 'Gastos Totales',
      backgroundColor: '#d9a406',
      data: [...diasTotales]
    })
  }
  return (
    <>
      <h1>aqui {totalEgreso}</h1>
      <Chart type="bar" data={basicData} options={basicOptions} />
    </>
  )
}

export default HomeAdministracion
