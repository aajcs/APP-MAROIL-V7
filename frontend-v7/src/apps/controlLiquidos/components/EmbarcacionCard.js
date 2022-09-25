/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Tag } from 'primereact/tag'
// import { Image } from 'primereact/image'
import { ProgressBar } from 'primereact/progressbar'

import AuthUse from '../../../auth/AuthUse'
// import barcoJPEG from '../assetsControl/barco.jpeg'

function EmbarcacionCard({ embarcacions }) {
  const [porcentajeCombustible, setPorcentajeCombustible] = useState(0)

  const auth = AuthUse()

  // const fecha4 = fecha2.diff(fecha1, 'days')
  useEffect(() => {
    const handlesumar = () => {
      if (embarcacions.combustibleActualEmbarcacion) {
        const porcentaje =
          (100 * embarcacions.combustibleActualEmbarcacion) /
          embarcacions.combustibleCapacidadEmbarcacion
        setPorcentajeCombustible(porcentaje.toFixed(2))
      }
    }

    handlesumar()
  }, [])

  console.log(embarcacions)
  return (
    <div className="col-12 lg:col-6 xl:col-6">
      <div className="card mt-2 mb-0 pb-0 ">
        <div className="card-body p-0">
          <div className="grid ">
            <div className="col-6">
              <h3 className=" card-title mb-0">
                {embarcacions.nombreEmbarcacion}
              </h3>{' '}
              <h6 className="text-400 card-title mt-0">
                {embarcacions.descripcionEmbarcacion}
              </h6>
            </div>
            <div className="col-6 text-right ">
              <Tag className="w-100 p-2 text-900">
                <p className=" mb-0">{embarcacions.estatusEmbarcacion}</p>
              </Tag>
              {auth.isLogged() && auth.user.faidUser.roles[0] !== 'LECTURA' && (
                <span className="text-sm text-400">
                  Act.
                  {moment(embarcacions.updatedAt).isValid() &&
                    moment(embarcacions.updatedAt).format('DD/MM HH:mm')}{' '}
                </span>
              )}
            </div>
          </div>
          <h6 className="card-text mt-0 mb-2">
            Ubicacion:
            <span className=" font-medium">
              {' '}
              {embarcacions.ubicacionEmbarcacion}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Combustible Actual:
            <span className=" font-medium">
              {' '}
              {new Intl.NumberFormat().format(
                embarcacions.combustibleActualEmbarcacion
              )}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Combustible Capacidad:
            <span className=" font-medium">
              {' '}
              {new Intl.NumberFormat().format(
                embarcacions.combustibleCapacidadEmbarcacion
              )}
            </span>
          </h6>
          <hr className="mt-2 mb-2 " />
          <div className=" ">
            <h6 className="text-center">Porcentaje de Combustible</h6>
            <ProgressBar
              className="mt-2 mb-3 "
              color={porcentajeCombustible > 10 ? '#198754' : '#ff0000'}
              value={porcentajeCombustible}
            ></ProgressBar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmbarcacionCard
