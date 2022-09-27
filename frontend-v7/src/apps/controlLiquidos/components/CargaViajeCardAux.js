/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Tag } from 'primereact/tag'
// import { Image } from 'primereact/image'
import { ProgressBar } from 'primereact/progressbar'

import AuthUse from '../../../auth/AuthUse'
// import barcoJPEG from '../assetsControl/barco.jpeg'

function CargaViajeCardAux({ viajes }) {
  const [porcentajeCombustible, setPorcentajeCombustible] = useState(0)

  const auth = AuthUse()
  const fecha1 = moment(viajes.fechaInicioViaje)
  const fecha2 = moment(viajes.fechaFinViaje ? viajes.fechaFinViaje : moment())
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
      if (viajes.cantidadActualCargaViaje) {
        const porcentaje =
          (100 * viajes.cantidadActualCargaViaje) / viajes.cantidadCargaViaje
        setPorcentajeCombustible(porcentaje.toFixed(2))
      }
    }

    handlesumar()
  }, [])
  console.log(viajes)
  return (
    <div className="col-12 lg:col-6 xl:col-6">
      <div className="card mt-2 mb-0 pb-0 ">
        <div className="card-body p-0">
          <div className="grid ">
            <div className="col-6">
              <h3 className=" card-title mb-0">{viajes.nombreViaje}</h3>{' '}
              <h6 className="text-400 card-title mt-0">
                {viajes.descripcionViaje}
              </h6>
            </div>
            <div className="col-6 text-right ">
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
          <h6 className="card-text mt-0 mb-2">
            etaViaje:
            <span className=" font-medium"> {viajes.etaViaje}</span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            etcViaje:
            <span className=" font-medium"> {viajes.etcViaje}</span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            etdViaje:
            <span className=" font-medium"> {viajes.etdViaje}</span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            fechaInicioViaje:
            <span className=" font-medium">
              {' '}
              {moment(viajes.fechaInicioViaje).isValid() &&
                moment(viajes.fechaInicioViaje).format('dddDD/MM/YY HH:mm')}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            fechaFinViaje:
            <span className=" font-medium">
              {' '}
              {moment(viajes.fechaFinViaje).isValid() &&
                moment(viajes.fechaFinViaje).format('dddDD/MM/YY HH:mm')}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            rataCargaViaje:
            <span className=" font-medium"> {viajes.rataCargaViaje}</span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            nombreEmbarcacion:
            <span className=" font-medium">
              {viajes.embarcacion.nombreEmbarcacion}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            remolcador:
            <span className=" font-medium">
              {viajes.remolcador[0].nombreRemolcador}
            </span>
          </h6>

          <h6 className="card-text mt-0 mb-2">
            cantidadCargaViaje:
            <span className=" font-medium">
              {' '}
              {new Intl.NumberFormat().format(viajes.cantidadCargaViaje)}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            cantidadActualCargaViaje:
            <span className=" font-medium">
              {' '}
              {new Intl.NumberFormat().format(viajes.cantidadActualCargaViaje)}
            </span>
          </h6>
          <hr className="mt-2 mb-2 " />
          <div className=" ">
            <h6 className="text-center">Porcentaje de Carga</h6>
            <ProgressBar
              className="mt-2 mb-3 "
              color={porcentajeCombustible > 10 ? '#198754' : '#ff0000'}
              value={porcentajeCombustible}
            ></ProgressBar>
            <h6 className="text-center  m-1">
              Tiempo de Carga {secondsToString(diff)}
            </h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CargaViajeCardAux
