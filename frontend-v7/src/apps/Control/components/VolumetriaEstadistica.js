/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
// /* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'
import moment from 'moment'
import { VolumetriaContext } from '../contexts/VolumetriaContext'
import VolumetriaEstadisticaGrafica from './VolumetriaEstadisticaGrafica'
import VolumetriaEstadisticaCard from './VolumetriaEstadisticaCard'
import { Dropdown } from 'primereact/dropdown'

const VolumetriaEstadistica = () => {
  const initialIngresoGasto = {
    enero: 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre: 0
  }
  const { volumetrias } = useContext(VolumetriaContext)
  const [anoVisual, setAnoVisual] = useState(2024)
  const [totalVolumenTodo, setTotalVolumenTodo] = useState(2024)

  const [ingresoGastoData, setIngresoGastoData] = useState(initialIngresoGasto)
  const [selectedEstadoAno, setSelectedEstadoAno] = useState({
    anoActual: '2024'
  })
  const estadoAno = [
    { anoActual: '2021' },
    { anoActual: '2022' },
    { anoActual: '2023' },
    { anoActual: '2024' }
  ]
  const onEstatusPresupuesto = (e) => {
    setSelectedEstadoAno(e.value)
    setAnoVisual(e.value.anoActual)
  }
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
  const [data, setdata] = useState()
  const { labels, datasets } = basicData
  // const { data } = datasets
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const efectoTarjeta = [
    'animate__animated animate__rotateInUpRight animate__slower',
    'animate__animated animate__rubberBand animate__slower',
    'animate__animated animate__jackInTheBox animate__slower',
    'animate__animated animate__zoomInDown animate__slower',
    'animate__animated animate__rotateIn animate__slower'
  ]
  const tarjetaGatosTotalesMeses = (data) => {
    return (
      <div
        className=" col-12 lg:col-6 xl:col-3 "
        // onClick={onAppsControlClick}
      >
        <div className={`cardAPPS card mb-0 ${efectoTarjeta[getRandomInt(4)]}`}>
          <div className="flex justify-content-between mb-1">
            <div>
              <span className="block text-500 font-medium mb-1">
                {data.mesNombre}
              </span>
              <div className="text-500 font-medium  ">
                {'Toneladas Totales: '}
                <span className="text-900 text-xl">
                  <strong>
                    {new Intl.NumberFormat().format(data.totalGastoMes)} Tm
                  </strong>
                </span>
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-blue-100 border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-chart-bar text-blue-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  useEffect(() => {
    setBasicData({ ...setBasicData, labels: auxOtro3, datasets: auxOtro4 })
    volumetiraMeses()
    setdata(auxOtro2)
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
  const totalEgreso = volumetrias
    .map((egreso) => egreso.egresoIngresoGasto)
    .reduce((a, b) => a + b, 0)
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
  const volumetiraMeses = () => {
    const volumetriaTodo = volumetrias
      .map((blFinal) => blFinal.blFinalVolumetria)
      .reduce((a, b) => a + b, 0)
    setTotalVolumenTodo(volumetriaTodo)

    // mesesDelAno.forEach((dataset, i) => {
    //   let volumetria = volumetrias.filter((p) =>
    //     moment(dataset).isSame(p.fechaBlFinalVolumetria, 'year')
    //   )
    //   console.log(volumetria)
    //   const totalVolumetria = volumetria
    //     .map((blFinal) => blFinal.blFinalVolumetria)
    //     .reduce((a, b) => a + b, 0)
    //   setTotalVolumenTodo(totalVolumetria)
    // })

    mesesDelAno.forEach((dataset, i) => {
      let volumetria = volumetrias.filter((p) =>
        moment(dataset).isSame(p.fechaBlFinalVolumetria, 'month')
      )
      const totalVolumetria = volumetria
        .map((blFinal) => blFinal.blFinalVolumetria)
        .reduce((a, b) => a + b, 0)
      let mes = mesesDelAnoNombre[i]

      // auxOtro2.push({ [mes]: totalEgreso })
      auxOtro2.push({ mesNombre: mes, totalGastoMes: totalVolumetria })
      diasTotales = diasTotales.concat(totalVolumetria)
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
    <>
      <div className="grid  ">
        <div className="field col-12 md:col-6">
          <h1>
            Volumetria Global {new Intl.NumberFormat().format(totalVolumenTodo)}
          </h1>
          <Dropdown
            value={selectedEstadoAno}
            options={estadoAno}
            onChange={onEstatusPresupuesto}
            optionLabel="anoActual"
          />
        </div>
        <VolumetriaEstadisticaCard anoVisual={anoVisual} />
      </div>
      <VolumetriaEstadisticaGrafica anoVisual={anoVisual} />
    </>
  )
}

export default VolumetriaEstadistica
