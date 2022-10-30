/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable prefer-const */
import React, { useState, useContext, useEffect } from 'react'

import { Chart } from 'primereact/chart'
import { Timeline } from 'primereact/timeline'
import { BarcoContext } from '../contexts/BarcoContext'
import { ReporteCargaGOMContext } from '../contexts/ReporteCargaGOMContext'
import moment from 'moment'

const BuquePorClienteList = () => {
  const { reporteCargaGOMs } = useContext(ReporteCargaGOMContext)
  const { barcos } = useContext(BarcoContext)
  const [totalVolumeria, setTotalVolumetria] = useState(0)

  const [chartData1, setChartData1] = useState({
    labels: ['MAROIL', 'PDVSA'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#094db1', '#a31220'],
        hoverBackgroundColor: ['#64B5F6', '#97313b']
      }
    ]
  })
  const [chartData2, setChartData2] = useState({
    labels: ['MAROIL TERMINAL', 'PETRO CEDEÑO', 'PETRO SAN FELIX'],

    datasets: [
      {
        type: 'line',
        label: 'TONELADAS MÉTRICAS',
        borderColor: '#d9a406',
        borderWidth: 2,
        fill: false,
        stepped: true,
        tension: 0.4,
        yAxisID: 'y1',
        pointStyle: 'star',
        pointRadius: 10,
        pointHoverRadius: 15,
        data: [55000, 25301, 48000]
      },
      {
        type: 'bar',
        label: 'BUQUES MAROIL',
        backgroundColor: '#094db1',
        data: [23, 21, 32]
        // borderColor: 'white',
        // borderWidth: 2
      },
      {
        type: 'bar',
        label: 'BUQUES PDVSA',
        backgroundColor: '#a31220',
        data: [41, 52, 24, 74, 23, 21, 32]
      }
    ]
  })
  const [chartData3, setChartData3] = useState({
    labels: [
      'BUQUE1',
      'BUQUE2',
      'BUQUE3',
      'BUQUE4',
      'BUQUE5',
      'BUQUE6',
      'BUQUE7',
      'BUQUE8',
      'BUQUE9',
      'BUQUE10',
      'BUQUE11',
      'BUQUE12',
      'BUQUE13',
      'BUQUE14',
      'BUQUE15',
      'BUQUE16',
      'BUQUE17',
      'BUQUE18',
      'BUQUE19',
      'BUQUE20',
      'BUQUE21',
      'BUQUE22',
      'BUQUE23',
      'BUQUE24'
    ],

    datasets: [
      {
        type: 'line',
        label: 'DÍAS DE CARGA',
        borderColor: '#d63384',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        yAxisID: 'y1',
        pointStyle: 'star',
        pointRadius: 10,
        pointHoverRadius: 15,
        data: [55000, 25301, 48000]
      },
      {
        type: 'bar',
        label: 'TONELADAS MÉTRICAS',
        backgroundColor: '#d9a406',
        data: [21, 84, 24, 75, 37, 65, 34]
        // borderColor: 'white',
        // borderWidth: 2
      }
    ]
  })

  let auxOtro1 = []
  let contMaroil = 0
  let contPdvsa = 0
  let contJME = 0
  for (let prop in barcos) {
    let buqueCliente = barcos[prop].buqueCliente
    buqueCliente === 'MAROIL'
      ? contMaroil++
      : buqueCliente === 'PDVSA'
      ? contPdvsa++
      : contJME++
  }
  auxOtro1.push({
    data: [contMaroil, contPdvsa],
    backgroundColor: ['#094db1', '#a31220'],
    hoverBackgroundColor: ['#64B5F6', '#97313b']
  })
  useEffect(() => {
    setChartData1({ ...chartData1, datasets: auxOtro1 })
    setChartData2({ ...chartData2, datasets: auxOtro2 })
    setChartData3({ ...chartData3, labels: auxOtro3, datasets: auxOtro4 })
    buqueTerminal()
    buquesToneladasDias()
  }, [barcos])
  useEffect(() => {
    setChartData1({ ...chartData1, datasets: auxOtro1 })
    setChartData2({ ...chartData2, datasets: auxOtro2 })
    setChartData3({ ...chartData3, labels: auxOtro3, datasets: auxOtro4 })
    reporteCargaGOMs && buqueTerminal()
    buquesToneladasDias()
  }, [reporteCargaGOMs])

  const [lightOptions1] = useState({
    plugins: {
      legend: {
        labels: {
          color: '#fffcf3'
        },
        title: {
          display: true,
          text: 'BUQUES POR CONSIGNATARIO',
          color: '#fffcf3'
        }
      }
    }
  })

  // MIXTO
  let auxOtro2 = []
  let contTerminalMaroilPdvsa = 0
  let contTerminalfelixPdvsa = 0
  let contTerminalCedenoPdvsa = 0
  let contTerminalMaroil = 0
  let contTerminalfelix = 0
  let contTerminalCedeno = 0
  let contTerminalMaroilTm = 0
  let contTerminalfelixTm = 0
  let contTerminalCedenoTm = 0

  const buqueTerminal = () => {
    barcos.forEach((dataset, i) => {
      let reporteCargaGOM = reporteCargaGOMs
      let terminal = reporteCargaGOM.filter((p) => p.barcoID.id === dataset.id)
      if (dataset.buqueCliente === 'PDVSA') {
        if (terminal.length !== 0) {
          const ultimoRegistro = terminal.length - 1
          terminal[ultimoRegistro].ubicacionBuque === 'MAROIL TERMINAL' &&
            contTerminalMaroilPdvsa++
          terminal[ultimoRegistro].ubicacionBuque === 'PETRO SAN FELIX' &&
            contTerminalfelixPdvsa++
          terminal[ultimoRegistro].ubicacionBuque === 'PETRO CEDENO' &&
            contTerminalCedenoPdvsa++
        }
      } else {
        if (terminal.length !== 0) {
          const ultimoRegistro = terminal.length - 1
          terminal[ultimoRegistro].ubicacionBuque === 'MAROIL TERMINAL' &&
            contTerminalMaroil++
          terminal[ultimoRegistro].ubicacionBuque === 'PETRO SAN FELIX' &&
            contTerminalfelix++
          terminal[ultimoRegistro].ubicacionBuque === 'PETRO CEDENO' &&
            contTerminalCedeno++
        }
      }
      if (terminal.length !== 0) {
        const ultimoRegistro = terminal.length - 1
        terminal[ultimoRegistro].ubicacionBuque === 'MAROIL TERMINAL' &&
          (contTerminalMaroilTm =
            contTerminalMaroilTm +
            terminal[ultimoRegistro].toneladasCargadasGOM)
        terminal[ultimoRegistro].ubicacionBuque === 'PETRO SAN FELIX' &&
          (contTerminalfelixTm =
            contTerminalfelixTm + terminal[ultimoRegistro].toneladasCargadasGOM)
        terminal[ultimoRegistro].ubicacionBuque === 'PETRO CEDENO' &&
          (contTerminalCedenoTm =
            contTerminalCedenoTm +
            terminal[ultimoRegistro].toneladasCargadasGOM)
      }
    })

    auxOtro2.push(
      {
        type: 'line',
        label: 'TONELADAS MÉTRICAS',
        borderColor: '#d9a406',
        borderWidth: 2,
        fill: false,
        stepped: true,
        tension: 0.4,
        yAxisID: 'y1',
        pointStyle: 'star',
        pointRadius: 10,
        pointHoverRadius: 15,
        data: [contTerminalMaroilTm, contTerminalCedenoTm, contTerminalfelixTm]
      },
      {
        type: 'bar',
        label: 'BUQUES MAROIL',
        backgroundColor: '#094db1',
        data: [contTerminalMaroil, contTerminalCedeno, contTerminalfelix]
        // borderColor: 'white',
        // borderWidth: 2
      },
      {
        type: 'bar',
        label: 'BUQUES PDVSA',
        backgroundColor: '#a31220',
        data: [
          contTerminalMaroilPdvsa,
          contTerminalCedenoPdvsa,
          contTerminalfelixPdvsa
        ]
      }
    )
    setTotalVolumetria(
      contTerminalMaroilTm + contTerminalCedenoTm + contTerminalfelixTm
    )
  }
  let auxOtro3 = []
  let auxOtro4 = []
  let nombreBuques = []
  let toneladasTotales = []
  let diasTotales = []
  const buquesToneladasDias = () => {
    barcos.forEach((dataset, i) => {
      let reporteCargaGOM2 = reporteCargaGOMs
      let tonelada = reporteCargaGOM2.filter((p) => p.barcoID.id === dataset.id)
      if (tonelada.length !== 0) {
        const ultimoRegistro = tonelada.length - 1
        toneladasTotales = toneladasTotales.concat(
          tonelada[ultimoRegistro].toneladasCargadasGOM
        )
      } else {
        toneladasTotales = toneladasTotales.concat(0)
      }

      nombreBuques = nombreBuques.concat(dataset.nombreBarco)
      const fecha1 = moment(dataset.fechaInicioCarga)

      const fecha2 = moment(dataset.fechaFinalCarga)

      diasTotales = diasTotales.concat(fecha2.diff(fecha1, 'days'))
    })

    auxOtro3.push(...nombreBuques)
    auxOtro4.push(
      {
        type: 'line',
        label: 'DÍAS DE CARGA',
        borderColor: '#d63384',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        yAxisID: 'y1',
        pointStyle: 'star',
        pointRadius: 10,
        pointHoverRadius: 15,
        data: [...diasTotales]
      },
      {
        type: 'bar',
        label: 'TONELADAS MÉTRICAS',
        backgroundColor: '#d9a406',
        data: [...toneladasTotales]
        // borderColor: 'white',
        // borderWidth: 2
      }
    )
  }

  const [lightOptions2] = useState({
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: '#fffcf3'
        }
      },
      title: {
        display: true,
        text: 'BUQUES POR CLIENTE Y CARGA DE TONELADAS POR TERMINARL',
        color: '#fffcf3'
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
      },
      y1: {
        ticks: {
          color: '#fffcf3'
        },
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        }
      }
    }
  })
  // MIXTO

  const [lightOptions3] = useState({
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: '#fffcf3'
        },
        title: {
          display: true,
          text: 'CANTIDAD DE CARGA POR BUQUE',
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
      },
      y1: {
        ticks: {
          color: '#fffcf3'
        },
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        }
      }
    }
  })
  const graficasTimeline = [
    {
      status: 'Ordered',
      date: '15/10/2020 10:30',
      icon: 'pi pi-arrow-down-right',
      color: '#9C27B0',
      descrioption: 'probando que funciona lo q voy a poer aqui',
      nombre: 'AGENCIA 1',
      direccion: 'DIRECCION 1',
      telefono: 'TELEFONO 1',
      personaContacto: 'PERSONA CONTACTO 1',
      webSit2: '#',
      image: '22',
      grafica: 1
    },
    {
      status: 'Processing',
      date: '15/10/2020 14:00',
      icon: 'pi pi-arrow-down-left',
      color: '#673AB7',
      nombre: 'AGENCIA 2',
      direccion: 'DIRECCION 2',
      telefono: 'TELEFONO 2',
      personaContacto: 'PERSONA CONTACTO 2',
      webSit2: '#',
      image: '2',
      grafica: 2
    },
    {
      status: 'Shipped',
      date: '15/10/2020 16:15',
      icon: 'pi pi-arrow-down-right',
      color: '#FF9800',
      nombre: 'AGENCIA 3',
      direccion: 'DIRECCION 3',
      telefono: 'TELEFONO 3',
      personaContacto: 'PERSONA CONTACTO 3',
      webSit2: '#',
      image: '22',
      grafica: 3
    }
  ]
  const customizedMarker = (item) => {
    return (
      <span
        className="custom-marker p-shadow-2"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    )
  }
  const renderGrafica1 = () => {
    return (
      <div className="card">
        <div className="grid ">
          <div className="col-12 lg:col-6 xl:col-6">
            <div className=" mb-0">
              <Chart
                type="pie"
                data={chartData1}
                options={lightOptions1}
                // style={{ position: 'relative', width: '100%', left: '35%' }}
              />
            </div>
          </div>
          <div className="col-12 lg:col-6 xl:col-6 text-center">
            <div className=" mb-0">
              <div className="flex justify-content-between mb-3">
                <div>
                  <span className="block text-900 font-medium mb-3">
                    Buques por Consignatario
                  </span>
                  <hr style={{ width: '100%', height: '5px' }} />
                  <div className="text-900 font-medium text-xl mb-3">
                    Maroil{' '}
                    <span className="text-blue-400 font-medium">
                      {contMaroil}
                    </span>{' '}
                    Buques
                  </div>
                  <div className="text-900 font-medium text-xl mb-5">
                    PDVSA{' '}
                    <span className="text-pink-500 font-medium">
                      {contPdvsa}
                    </span>{' '}
                    Buques
                  </div>

                  <hr style={{ width: '100%', height: '5px' }} />

                  <div className="text-900 font-medium text-xl mb-3">
                    Maroil{' '}
                    <span className="text-blue-400 font-medium">
                      {((100 * contMaroil) / (contPdvsa + contMaroil)).toFixed(
                        2
                      )}
                      %
                    </span>{' '}
                    Buques
                  </div>
                  <div className="text-900 font-medium text-xl mb-5">
                    PDVSA{' '}
                    <span className="text-pink-500 font-medium">
                      {((100 * contPdvsa) / (contPdvsa + contMaroil)).toFixed(
                        2
                      )}
                      %
                    </span>{' '}
                    Buques
                  </div>
                  <div className="text-900 font-medium text-xl">
                    Total{' '}
                    <span className="text-green-400 font-medium">
                      {contPdvsa + contMaroil}
                    </span>{' '}
                    Buques
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const renderGrafica2 = () => {
    return (
      <div className="card">
        <Chart type="bar" data={chartData2} options={lightOptions2} />{' '}
        {/* <div className="mt-3 text-center text-900 font-medium text-xl">
          {'VOLUMETRÍA TOTAL'} {new Intl.NumberFormat().format(totalVolumeria)}
        </div> */}
      </div>
    )
  }
  const renderGrafica3 = () => {
    return (
      <div className="card">
        <Chart type="bar" data={chartData3} options={lightOptions3} />{' '}
      </div>
    )
  }
  const customizedContent = (item) => {
    return (
      <>
        {item.grafica === 1 && renderGrafica1()}
        {item.grafica === 2 && renderGrafica2()}
        {item.grafica === 3 && renderGrafica3()}
      </>
    )
  }

  return (
    <>
      {/* <div className="card flex justify-content-center">
        <Chart
          type="pie"
          data={chartData1}
          options={lightOptions1}
          style={{ position: 'relative', width: '40%', left: '35%' }}
        />
      </div>
      <div className="">
        <Chart type="bar" data={chartData2} options={lightOptions2} />
      </div>
      <br />
      <div className="">
        <Chart type="bar" data={chartData3} options={lightOptions3} />
      </div> */}
      <>
        <Timeline
          value={graficasTimeline}
          align="alternate"
          className="customized-timeline"
          marker={customizedMarker}
          content={customizedContent}
        />
      </>
    </>
  )
}

export default BuquePorClienteList
