/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Tag } from 'primereact/tag'
import { ProgressBar } from 'primereact/progressbar'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import AuthUse from '../../../auth/AuthUse'

function ReporteCargaBuqueCard({ buques }) {
  const [displayResponsive, setDisplayResponsive] = useState(false)
  const [porcentajeDescarga, setPorcentajeDescarga] = useState(0)
  const [porcentajeDescargaFeeder, setPorcentajeDescargaFeeder] = useState(0)
  const [totalDescargadoBuque, setTotalDescargadoBuque] = useState(0)
  const auth = AuthUse()

  const { reporteCargaGOMBuque } = buques
  const ultimoRegistro = reporteCargaGOMBuque.length - 1
  const { capacidadNominadaBuque } = buques

  const fecha1 = moment(buques.fechaInicioCargaBuque)
  const fecha2 = moment(
    buques.fechaFinalCargaBuque ? buques.fechaFinalCargaBuque : moment()
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
  const fecha3 = moment(
    reporteCargaGOMBuque[ultimoRegistro].fechaInicioFeederBuque
  )
  const fecha4 = moment(
    reporteCargaGOMBuque[ultimoRegistro].fechaFinFeederBuque
      ? reporteCargaGOMBuque[ultimoRegistro].fechaFinFeederBuque
      : moment()
  )
  // const fecha3 = moment(fecha3 - fecha4).format('HH:mm')
  moment(reporteCargaGOMBuque[ultimoRegistro].fechaFinFeederBuque).isValid() &&
    moment(reporteCargaGOMBuque[ultimoRegistro].fechaFinFeederBuque)
  // Diff in hours
  const diff1 = fecha4.diff(fecha3, 'seconds') // Diff in days

  function secondsToString1(diff1) {
    const numdays = Math.floor(diff1 / 86400)
    const numhours = Math.floor((diff1 % 86400) / 3600)
    const numminutes = Math.floor(((diff1 % 86400) % 3600) / 60)
    // const numseconds = ((diff % 86400) % 3600) % 60

    return numdays + ' dias ' + numhours + ' horas ' + numminutes + ' minutos '
  }

  // const fecha4 = fecha2.diff(fecha1, 'days')

  const sumarMaterialCargado = (reportecargagombuque) => {
    let total = 0
    for (let i = 0; i < reportecargagombuque.length; i++) {
      total += reportecargagombuque[i].materialCargadoBuque
    }
    return total
  }

  useEffect(() => {
    const handlesumar = () => {
      setTotalDescargadoBuque(sumarMaterialCargado(reporteCargaGOMBuque))
      if (reporteCargaGOMBuque[ultimoRegistro]) {
        const porcentaje = (100 * totalDescargadoBuque) / capacidadNominadaBuque
        setPorcentajeDescarga(porcentaje.toFixed(2))
        const porcentaje1 =
          (100 * reporteCargaGOMBuque[ultimoRegistro].materialCargadoBuque) /
          reporteCargaGOMBuque[ultimoRegistro].capacidadFeederBuque
        setPorcentajeDescargaFeeder(porcentaje1.toFixed(2))
      }
    }

    handlesumar()
  }, [totalDescargadoBuque])
  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive
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
    AMUAY: '#094db1',
    GUARAGUAO: '#d9a406',
    CARDON: '#157347',
    'BUQUES FONDEADO': 'danger',
    'PROXIMOS BUQUES': 'danger'
  }

  const ubicacionBuqueTag =
    ubicacionBuqueTags[reporteCargaGOMBuque[ultimoRegistro].ubicacionBuque]

  return (
    <div className="col-12 lg:col-6 xl:col-6">
      <div className="card mt-2 mb-0 pb-0 ">
        <div className="card-body p-0">
          <div className="grid ">
            <div className="col-6">
              <h3 className=" card-title mb-0">{buques.nombreBuque}</h3>
              <h5 className="text-400 card-title mt-0">
                ({buques.clienteBuque}){' '}
                {buques.buqueClienteVenta && `(${buques.buqueClienteVenta})`}
              </h5>
            </div>
            <div className="col-6 text-right ">
              <Tag
                className="w-100 p-2 text-900"
                severity={ubicacionBuqueTag}
                style={{ fontSize: '12px', background: ubicacionBuqueTag }}
              >
                <p className=" mb-0">
                  {reporteCargaGOMBuque[ultimoRegistro] &&
                    reporteCargaGOMBuque[ultimoRegistro].ubicacionBuque}
                </p>
                {reporteCargaGOMBuque[ultimoRegistro].ubicacionBuque ===
                  'MAROIL TERMINAL' && (
                  <p className="text-600 p-0">
                    (
                    {reporteCargaGOMBuque[ultimoRegistro] &&
                      reporteCargaGOMBuque[ultimoRegistro].puestoTerminal}
                    )
                  </p>
                )}
              </Tag>

              {auth.isLogged() && auth.user.faidUser.roles[0] !== 'LECTURA' && (
                <span className="text-sm text-400">
                  Act.{' '}
                  {moment(
                    reporteCargaGOMBuque[ultimoRegistro]
                      .reporteCargaGOMBuqueModificado
                  ).isValid() &&
                    moment(
                      reporteCargaGOMBuque[ultimoRegistro]
                        .reporteCargaGOMBuqueModificado
                    ).format('DD/MM HH:mm')}
                </span>
              )}
            </div>
          </div>
          <hr className="mt-2 mb-2 " />
          <div className="grid ">
            <div className="col-6">
              <h6 className="card-text  mt-0 mb-2">
                Fecha de Atraque:
                <span className="text-yellow-500 font-medium ">
                  {' '}
                  {moment(buques.fechaAtracoBuque).isValid() &&
                    moment(buques.fechaAtracoBuque).format('dddDD/MM/YY HH:mm')}
                </span>
              </h6>
              <h6 className="card-text mt-0 mb-2">
                Fecha Inicio Carga:
                <span className="text-green-500 font-medium">
                  {' '}
                  {moment(buques.fechaInicioCargaBuque).isValid() &&
                    moment(buques.fechaInicioCargaBuque).format(
                      'dddDD/MM/YY HH:mm'
                    )}
                </span>
              </h6>
              <h6 className="card-text mt-0 mb-2">
                Fecha Fin Carga:
                <span className="text-orange-500 font-medium">
                  {' '}
                  {moment(buques.fechaFinalCargaBuque).isValid() &&
                    moment(buques.fechaFinalCargaBuque).format(
                      'dddDD/MM/YY HH:mm'
                    )}
                </span>
              </h6>

              <h6 className="card-text mt-0 mb-2">
                Requerida por el Buque:
                <span className=" font-medium">
                  {' '}
                  {new Intl.NumberFormat().format(
                    buques.capacidadNominadaBuque
                  )}{' '}
                  Bbls
                </span>
              </h6>
              <h6 className="card-text mt-0 mb-2">
                Cantidad Cargada:
                <span className=" font-medium">
                  {' '}
                  {new Intl.NumberFormat().format(totalDescargadoBuque)} Bbls
                </span>
              </h6>
              <h6 className="card-text mt-0 mb-2">
                Cantidad por Cargar:
                <span className=" font-medium">
                  {' '}
                  {reporteCargaGOMBuque[ultimoRegistro] &&
                    new Intl.NumberFormat().format(
                      buques.capacidadNominadaBuque - totalDescargadoBuque
                    )}{' '}
                  Bbls
                </span>
              </h6>
              <h6 className="card-text mt-0 mb-2">
                Tasa de Carga:
                <span className=" font-medium">
                  {' '}
                  {new Intl.NumberFormat().format(
                    reporteCargaGOMBuque[ultimoRegistro] &&
                      reporteCargaGOMBuque[ultimoRegistro].tasaDeCargaBuque
                  )}{' '}
                  Bbls/h
                </span>
              </h6>
              <h6 className="card-text mt-0 mb-2">
                ETC:
                <span className=" font-medium"> {buques.etcBuque}</span>
              </h6>
              {/* <h6 className="card-text mt-0 mb-2">
            Clima:
            <span className=" font-medium">
              {' '}
              {reporteCargaGOMBuque[ultimoRegistro] &&
                reporteCargaGOMBuque[ultimoRegistro].climaGOM}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Viento:
            <span className=" font-medium">
              {' '}
              {reporteCargaGOMBuque[ultimoRegistro] &&
                reporteCargaGOMBuque[ultimoRegistro].vientoGOM}
            </span>
          </h6> */}

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
                    {reporteCargaGOMBuque[ultimoRegistro] &&
                      reporteCargaGOMBuque[ultimoRegistro].observacionesBuque}
                  </p>
                </Dialog>{' '}
                Comentarios:
                <span className=" font-medium">
                  {reporteCargaGOMBuque[ultimoRegistro] &&
                    reporteCargaGOMBuque[ultimoRegistro].comentariosBuque}
                </span>
              </h6>
            </div>
            <div className="col-6 d-flex align-items-center">
              <div>
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
          </div>

          <hr className="mt-2 mb-2 " />
          <div className="grid ">
            <div className="col-12">
              <h6 className="text-3xl text-center">
                Feeder{' '}
                <span className="text-blue-400 font-medium ">
                  {reporteCargaGOMBuque[ultimoRegistro] &&
                    reporteCargaGOMBuque[ultimoRegistro].nombreFeederBuque}
                </span>
              </h6>
            </div>

            <div className="col-6  ">
              <h6 className="card-text mt-0 mb-2">
                Capacidad Feeder:
                <span className=" font-medium">
                  {' '}
                  {new Intl.NumberFormat().format(
                    reporteCargaGOMBuque[ultimoRegistro] &&
                      reporteCargaGOMBuque[ultimoRegistro].capacidadFeederBuque
                  )}{' '}
                  Bbls
                </span>
              </h6>
              <h6 className="card-text mt-0 mb-2">
                Cantidad Descargada:
                <span className=" font-medium">
                  {' '}
                  {new Intl.NumberFormat().format(
                    reporteCargaGOMBuque[ultimoRegistro] &&
                      reporteCargaGOMBuque[ultimoRegistro].materialCargadoBuque
                  )}{' '}
                  Bbls
                </span>
              </h6>
              <h6 className="card-text  mt-0 mb-2">
                Fecha inicio descarga:{' '}
                <span className="text-yellow-500 font-medium ">
                  {moment(
                    reporteCargaGOMBuque[ultimoRegistro].fechaInicioFeederBuque
                  ).isValid() &&
                    moment(
                      reporteCargaGOMBuque[ultimoRegistro]
                        .fechaInicioFeederBuque
                    ).format('dddDD/MM/YY HH:mm')}
                </span>
              </h6>
              <h6 className="card-text mt-0 mb-2">
                Fecha fin descarga:{' '}
                <span className="text-green-500 font-medium">
                  {moment(
                    reporteCargaGOMBuque[ultimoRegistro].fechaFinFeederBuque
                  ).isValid() &&
                    moment(
                      reporteCargaGOMBuque[ultimoRegistro].fechaFinFeederBuque
                    ).format('dddDD/MM/YY HH:mm')}
                </span>
              </h6>
              <h6 className="card-text mt-0 mb-2">
                ETC:
                <span className=" font-medium">
                  {' '}
                  {reporteCargaGOMBuque[ultimoRegistro] &&
                    reporteCargaGOMBuque[ultimoRegistro].etcBuque}
                </span>
              </h6>
            </div>
            <div className="col-6 d-flex align-items-center">
              <div>
                <ProgressBar
                  color={porcentajeDescargaFeeder > 99 ? '#00bc51' : '#0000FF'}
                  value={porcentajeDescargaFeeder}
                ></ProgressBar>
                <h6 className="text-center  m-1">
                  Tiempo de Carga {secondsToString1(diff1)}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReporteCargaBuqueCard
