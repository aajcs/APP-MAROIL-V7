/* eslint-disable indent */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Tag } from 'primereact/tag'
import { Image } from 'primereact/image'
import { ProgressBar } from 'primereact/progressbar'

import AuthUse from '../../../auth/AuthUse'
import remolcadoresJPEG from '../assetsControlLiquidos/ImagenesTodas'

function RemolcadorCard({ remolcadors }) {
  const [porcentajeCombustible, setPorcentajeCombustible] = useState(0)

  const auth = AuthUse()

  // const fecha4 = fecha2.diff(fecha1, 'days')
  useEffect(() => {
    const handlesumar = () => {
      if (remolcadors.combustibleActualRemolcador) {
        const porcentaje =
          (100 * remolcadors.combustibleActualRemolcador) /
          remolcadors.combustibleCapacidadRemolcador
        setPorcentajeCombustible(porcentaje.toFixed(2))
      }
    }

    handlesumar()
  }, [])

  return (
    <div className="col-12 lg:col-6 xl:col-6">
      <div className="card mt-2 mb-0 pb-0 ">
        <div className="card-body p-0">
          <div className="grid ">
            <div className="col-6">
              <h3 className=" card-title mb-0">
                {remolcadors.nombreRemolcador}
              </h3>{' '}
              <h6 className="text-400 card-title mt-0">
                {remolcadors.descripcionRemolcador}
              </h6>
            </div>
            <div className="col-6 text-right ">
              <Tag
                className="w-100 p-2 text-900"
                style={{
                  'box-shadow':
                    remolcadors.estatusRemolcador === 'OPERATIVO'
                      ? '0px 6px 20px rgb(0 222 99 / 30%)'
                      : remolcadors.estatusRemolcador === 'INICIADO'
                      ? '0px 6px 20px rgb(0 109 222 / 30%)'
                      : '0px 6px 20px rgb(222 0 92 / 30%)',
                  fontSize: '12px',
                  background:
                    remolcadors.estatusRemolcador === 'OPERATIVO'
                      ? '#157347'
                      : remolcadors.estatusRemolcador === 'INICIADO'
                      ? '#094db1'
                      : '#97101d'
                }}
              >
                <p className=" mb-0">{remolcadors.estatusRemolcador}</p>
              </Tag>
              {auth.isLogged() && auth.user.faidUser.roles[0] !== 'LECTURA' && (
                <span className="text-sm text-400">
                  Act.
                  {moment(remolcadors.updatedAt).isValid() &&
                    moment(remolcadors.updatedAt).format('DD/MM HH:mm')}{' '}
                </span>
              )}
            </div>
          </div>
          <h6 className="card-text mt-0 mb-2">
            Ubicacion:
            <span className=" font-medium">
              {' '}
              {remolcadors.ubicacionRemolcador}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Combustible Actual:
            <span className=" font-medium">
              {' '}
              {new Intl.NumberFormat().format(
                remolcadors.combustibleActualRemolcador
              )}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Combustible Capacidad:
            <span className=" font-medium">
              {' '}
              {new Intl.NumberFormat().format(
                remolcadors.combustibleCapacidadRemolcador
              )}
            </span>
          </h6>
          <hr className="mt-2 mb-2 " />
          <div className="grid ">
            <div
              className="col-6 text-center "
              // onClick={() => onClick('displayDetalleCarga')}
            >
              <Image
                src={
                  remolcadoresJPEG[
                    remolcadors.nombreRemolcador === 'MARE'
                      ? 11
                      : remolcadors.nombreRemolcador === 'UMAY'
                      ? 15
                      : 13
                  ]
                }
                alt="Image"
                width="100%"
                preview
              />
              {/* <BarChartDemo
                heightBogega="50px"
                bodegasDelBarco={bodegasDelBarco}
                barcos={barcos}
              /> */}
            </div>
            <div className="col-6 text-right ">
              <h6 className="text-center">Porcentaje de Combustible</h6>
              <ProgressBar
                className="mt-2 mb-3 "
                color={porcentajeCombustible > 10 ? '#198754' : '#ff0000'}
                value={porcentajeCombustible}
              ></ProgressBar>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemolcadorCard
