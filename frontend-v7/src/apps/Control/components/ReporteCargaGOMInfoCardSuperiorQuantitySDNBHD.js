/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment'
import { Tag } from 'primereact/tag'
// import { Image } from 'primereact/image'
import { ProgressBar } from 'primereact/progressbar'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import BarChartDemo from './BarChart'
import { CargaBodegaContext } from '../contexts/CargaBodegaContext'
import AuthUse from '../../../auth/AuthUse'
import ClimaVientoGOMInfoCard from './ClimaVientoGOMInfoCard'
// import barcoJPEG from '../assetsControl/barco.jpeg'

function ReporteCargaGOMInfoCardSuperiorQuantitySDNBHD({ barcos }) {
  const { cargaBodegas } = useContext(CargaBodegaContext)
  const [displayResponsive, setDisplayResponsive] = useState(false)
  const [displayDetalleCarga, setDisplayDetalleCarga] = useState(false)
  const [porcentajeDescarga, setPorcentajeDescarga] = useState(0)
  const [bodegasDelBarco, setBodegasDelBarco] = useState(null)
  const auth = AuthUse()
  cargaBodegas.sort((o1, o2) => {
    if (o1.nombreBodega > o2.nombreBodega) {
      return -1
    } else if (o1.nombreBodega < o2.nombreBodega) {
      return 1
    } else {
      return 0
    }
  })
  const { reporteCargaGOM } = barcos
  const ultimoRegistro = reporteCargaGOM.length - 1
  const { toneladasNominadas } = barcos

  const fecha1 = moment(barcos.fechaInicioCarga)
  const fecha2 = moment(
    barcos.fechaFinalCarga ? barcos.fechaFinalCarga : moment()
  )
  // const fecha3 = moment(fecha1 - fecha2).format('HH:mm')

  // Diff in hours
  const diff = fecha2.diff(fecha1, 'seconds') // Diff in days

  function secondsToString(diff) {
    const numdays = Math.floor(diff / 86400)
    const numhours = Math.floor((diff % 86400) / 3600)
    const numminutes = Math.floor(((diff % 86400) % 3600) / 60)
    // const numseconds = ((diff % 86400) % 3600) % 60

    return numdays + ' dias ' + numhours + ' horas ' + numminutes + ' minutos '
  }

  // const fecha4 = fecha2.diff(fecha1, 'days')

  useEffect(() => {
    const handlesumar = () => {
      if (reporteCargaGOM[ultimoRegistro]) {
        const porcentaje =
          (100 * reporteCargaGOM[ultimoRegistro].toneladasCargadasGOM) /
          toneladasNominadas
        setPorcentajeDescarga(porcentaje.toFixed(2))
      }
    }

    handlesumar()
    const findBodegaBarco = (id) => {
      const bodegaBarco = cargaBodegas.filter((p) => p.barcoID.id === id)

      setBodegasDelBarco(bodegaBarco)
    }
    findBodegaBarco(barcos.id)
  }, [cargaBodegas])
  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
    displayDetalleCarga: setDisplayDetalleCarga
  }
  const onClick = (name) => {
    dialogFuncMap[`${name}`](true)
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false)
  }
  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    )
  }
  const ubicacionBuqueTags = {
    'MAROIL TERMINAL': '#094db1',
    'PETRO CEDENO': '#d9a406',
    'PETRO SAN FELIX': '#157347',
    'BUQUES FONDEADO': 'danger',
    'PROXIMOS BUQUES': 'danger'
  }

  const ubicacionBuqueTag =
    ubicacionBuqueTags[reporteCargaGOM[ultimoRegistro].ubicacionBuque]

  return (
    <div className="col-12 lg:col-6 xl:col-4">
      <div className="card mt-2 mb-0 pb-0 ">
        <div className="card-body p-0">
          <div className="grid ">
            <div className="col-6">
              <h3 className=" card-title mb-0">{barcos.nombreBarco}</h3>
              <h5 className="text-400 card-title mt-0">
                {barcos.buqueClienteVenta && `(${barcos.buqueClienteVenta})`}
              </h5>
            </div>
            <div className="col-6 text-right ">
              <Tag
                className="w-100 p-2 text-900"
                severity={ubicacionBuqueTag}
                style={{ fontSize: '12px', background: ubicacionBuqueTag }}
              >
                <p className=" mb-0">
                  {reporteCargaGOM[ultimoRegistro] &&
                    reporteCargaGOM[ultimoRegistro].ubicacionBuque}
                </p>
                {reporteCargaGOM[ultimoRegistro].ubicacionBuque ===
                  'MAROIL TERMINAL' && (
                  <p className="text-600 p-0">
                    (
                    {reporteCargaGOM[ultimoRegistro] &&
                      reporteCargaGOM[ultimoRegistro].puestoTerminal}
                    )
                  </p>
                )}
              </Tag>
              {auth.isLogged() && auth.user.faidUser.roles[0] !== 'LECTURA' && (
                <span className="text-sm text-400">
                  Act.{' '}
                  {moment(
                    reporteCargaGOM[ultimoRegistro].reporteCargaGOMModificado
                  ).isValid() &&
                    moment(
                      reporteCargaGOM[ultimoRegistro].reporteCargaGOMModificado
                    ).format('DD/MM HH:mm')}
                </span>
              )}
            </div>
          </div>
          <h6 className="card-text  mt-0 mb-2">
            Fecha de Atraque:
            <span className="text-yellow-500 font-medium ">
              {' '}
              {moment(barcos.fechaAtraco).isValid() &&
                moment(barcos.fechaAtraco).format('dddDD/MM/YY HH:mm')}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Fecha Inicio Carga:
            <span className="text-green-500 font-medium">
              {' '}
              {moment(barcos.fechaInicioCarga).isValid() &&
                moment(barcos.fechaInicioCarga).format('dddDD/MM/YY HH:mm')}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Fecha Fin Carga:
            <span className="text-orange-500 font-medium">
              {' '}
              {moment(barcos.fechaFinalCarga).isValid() &&
                moment(barcos.fechaFinalCarga).format('dddDD/MM/YY HH:mm')}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Cantidad Nominada:
            <span className=" font-medium">
              {' '}
              {new Intl.NumberFormat().format(barcos.toneladasCapacidad)} Tm
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Requerida por el Buque:
            <span className=" font-medium">
              {' '}
              {new Intl.NumberFormat().format(barcos.toneladasNominadas)} Tm
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Cantidad Cargada:
            <span className=" font-medium">
              {' '}
              {reporteCargaGOM[ultimoRegistro] &&
                new Intl.NumberFormat().format(
                  reporteCargaGOM[ultimoRegistro].toneladasCargadasGOM
                )}{' '}
              Tm
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Cantidad por Cargar:
            <span className=" font-medium">
              {' '}
              {reporteCargaGOM[ultimoRegistro] &&
                new Intl.NumberFormat().format(
                  barcos.toneladasNominadas -
                    reporteCargaGOM[ultimoRegistro].toneladasCargadasGOM
                )}{' '}
              Tm
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Tasa de Carga GOM:
            <span className=" font-medium">
              {' '}
              {reporteCargaGOM[ultimoRegistro] &&
                reporteCargaGOM[ultimoRegistro].tasaDeCargaGOM}{' '}
              Tm/h
            </span>
          </h6>{' '}
          <h6 className="card-text mt-0 mb-2">
            ETC:
            <span className=" font-medium">
              {' '}
              {reporteCargaGOM[ultimoRegistro] &&
                reporteCargaGOM[ultimoRegistro].etc}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-0">
            <Button
              className="mr-3"
              icon="pi pi-search-plus"
              onClick={() => onClick('displayResponsive')}
            />
            <Dialog
              header="Observaciones"
              visible={displayResponsive}
              onHide={() => onHide('displayResponsive')}
              breakpoints={{ '960px': '75vw' }}
              style={{ width: '50vw' }}
              footer={renderFooter('displayResponsive')}
            >
              <p>
                {reporteCargaGOM[ultimoRegistro] &&
                  reporteCargaGOM[ultimoRegistro].observacionesGOM}
              </p>
            </Dialog>{' '}
            <Dialog
              header="Detalle de carga en bodegas"
              visible={displayDetalleCarga}
              onHide={() => onHide('displayDetalleCarga')}
              breakpoints={{ '960px': '75vw' }}
              style={{ width: '75vw' }}
              footer={renderFooter('displayDetalleCarga')}
            >
              <BarChartDemo
                heightBogega="300px"
                bodegasDelBarco={bodegasDelBarco}
                barcos={barcos}
                reporteCargaGOM={
                  reporteCargaGOM[ultimoRegistro] &&
                  reporteCargaGOM[ultimoRegistro].toneladasCargadasGOM
                }
                tolltip={true}
              />
            </Dialog>
            Comentarios:
            <span className=" font-medium">
              {' '}
              {reporteCargaGOM[ultimoRegistro] &&
                reporteCargaGOM[ultimoRegistro].comentariosGOM}
            </span>
          </h6>
          <hr className="mt-2 mb-2 " />
          <div className="grid ">
            <div
              className="col-6 text-center "
              onClick={() => onClick('displayDetalleCarga')}
            >
              {/* <Image src={barcoJPEG} alt="Image" width="100" preview /> */}
              <BarChartDemo
                heightBogega="50px"
                bodegasDelBarco={bodegasDelBarco}
                barcos={barcos}
              />
            </div>
            <div className="col-6 text-right ">
              <h6 className="text-center">Porcentaje de Carga</h6>
              <ProgressBar
                color={porcentajeDescarga > 99 ? '#00bc51' : '#0000FF'}
                value={porcentajeDescarga}
              ></ProgressBar>
              <h6 className="text-center  m-1">
                Tiempo de Carga {secondsToString(diff)}
              </h6>
            </div>
          </div>
          <hr className="mt-2 mb-2 " />
          <div className="grid ">
            <ClimaVientoGOMInfoCard
              clima={
                reporteCargaGOM[ultimoRegistro] &&
                reporteCargaGOM[ultimoRegistro].climaGOM
              }
              viento={
                reporteCargaGOM[ultimoRegistro] &&
                reporteCargaGOM[ultimoRegistro].vientoGOM
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReporteCargaGOMInfoCardSuperiorQuantitySDNBHD
