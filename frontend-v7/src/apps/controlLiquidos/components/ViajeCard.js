/* eslint-disable quotes */
/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment'
import { Tag } from 'primereact/tag'
// import { Image } from 'primereact/image'
import { ProgressBar } from 'primereact/progressbar'

import AuthUse from '../../../auth/AuthUse'

import { CargaViajeContext } from '../contexts/CargaViajeContext'
import CargaViajeCard from './CargaViajeCard'
// import barcoJPEG from '../assetsControl/barco.jpeg'

function ViajeCard({ viajes }) {
  const { cargaViajes } = useContext(CargaViajeContext)
  const [porcentajeCombustible, setPorcentajeCombustible] = useState(0)

  const auth = AuthUse()
  const fecha1 = moment(viajes.fechaInicioViaje)
  const fecha2 = moment(viajes.fechaFinViaje ? viajes.fechaFinViaje : moment())
  const fecha3 = moment()

  // const fecha3 = moment(fecha1 - fecha2).format('HH:mm')

  // Diff in hours
  const diff = fecha2.diff(fecha1, 'seconds') // Diff in days
  const diff2 = fecha3.diff(fecha1, 'seconds') // Diff in days

  function diasPorcentaje(diff, diff2) {
    const porcentajeFechaProgrees = Math.trunc((100 / diff) * diff2)
    if (porcentajeFechaProgrees >= 100) {
      return '100%'
    }
    return porcentajeFechaProgrees + '%'
  }
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
      if (viajes.cantidadActualCargaViaje) {
        const porcentaje =
          (100 * viajes.cantidadActualCargaViaje) / viajes.cantidadCargaViaje
        setPorcentajeCombustible(porcentaje.toFixed(2))
      }
    }

    handlesumar()
  }, [])

  return (
    <div className="col-12 lg:col-12 xl:col-12 ">
      <div className="card mt-2 mb-0 pb-0 ">
        <div className="card-body p-0">
          <div className="grid ">
            <div className="col-12 lg:col-6 xl:col-6">
              <h3 className=" card-title mb-0">{viajes.nombreViaje}</h3>{' '}
              <h6 className="text-400 card-title mt-0">
                {viajes.descripcionViaje}
              </h6>
            </div>
            <div className="col-12 lg:col-6 xl:col-6col-6 text-right ">
              <Tag className="w-100 p-2 text-900">
                <p className=" mb-0">{viajes.estatusViaje}</p>
              </Tag>
              {auth.isLogged() && auth.user.faidUser.roles[0] !== 'LECTURA' && (
                <span className="text-sm text-400">
                  Act.
                  {moment(viajes.updatedAt).isValid() &&
                    moment(viajes.updatedAt).format('DD/MM HH:mm')}{' '}
                </span>
              )}
            </div>
          </div>
          <div className="grid ">
            <div
              className="col-12 lg:col-6 xl:col-6 "
              // onClick={() => onClick('displayDetalleCarga')}
            >
              <div className="skill-bars">
                <div className="bar mt-3">
                  <div className="progress-line mysql">
                    <div className="infosnippet-startpoint"></div>
                    <div className="infosnippet-endpoint"></div>
                    <span
                      style={{
                        content: {
                          '&::after': {
                            content: 'aqui'
                          }
                        },
                        width: diasPorcentaje(diff, diff2)
                      }}
                    >
                      <div className=" text-endpoint ">
                        {diasPorcentaje(diff, diff2)}
                      </div>{' '}
                    </span>
                  </div>
                </div>
              </div>

              <div className="justify-content-around  flex flex-fill">
                <h6 className="card-text mt-0 mb-2 ">
                  Inicio del Viaje:
                  <span className=" font-medium ml-2 text-green-500 font-bold">
                    {' '}
                    {moment(viajes.fechaInicioViaje).isValid() &&
                      moment(viajes.fechaInicioViaje).format(
                        'dddDD/MM/YY HH:mm'
                      )}
                  </span>
                </h6>
                <h6 className="card-text mt-0 mb-2">
                  Fin del Viaje:
                  <span className=" font-medium ml-2 text-yellow-500 font-bold">
                    {' '}
                    {moment(viajes.fechaFinViaje).isValid() &&
                      moment(viajes.fechaFinViaje).format('dddDD/MM/YY HH:mm')}
                  </span>
                </h6>
              </div>
              <div className="justify-content-around  flex flex-fill">
                <h6 className="card-text mt-2 mb-2">
                  Embarcacion:
                  <span className=" font-medium ml-2 font-italic">
                    {viajes.embarcacion.nombreEmbarcacion}
                  </span>
                </h6>
                <h6 className="card-text mt-2 mb-2">
                  Remolcador:
                  <span className=" font-medium ml-2 font-italic">
                    {viajes.remolcador[0].nombreRemolcador}
                  </span>
                </h6>
              </div>
            </div>

            <div className="col-12 lg:col-6 xl:col-6 text-right ">
              <h6 className="text-center">Porcentaje de Carga</h6>
              <ProgressBar
                className="mt-2 mb-3 "
                color={porcentajeCombustible > 10 ? '#198754' : '#ff0000'}
                value={porcentajeCombustible}
              ></ProgressBar>
              <h6 className="text-center  m-1">
                Tiempo de Viaje {secondsToString(diff)}
              </h6>{' '}
            </div>
          </div>
          <hr className="mt-2 mb-2 " />
        </div>
        <div className="grid w-100 d-flex flex-row">
          {cargaViajes.map(
            (cargaViajes) =>
              cargaViajes.viaje.id === viajes.id && (
                <>
                  <CargaViajeCard
                    key={cargaViajes.id}
                    cargaViajes={cargaViajes}
                  />
                </>
                // <ReporteCargaGOMInfoCard key={barcos.id} barcos={barcos} />
              )
          )}
        </div>
      </div>
    </div>
  )
}

export default ViajeCard
