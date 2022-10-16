/* eslint-disable indent */
/* eslint-disable react/prop-types */

import React, { useContext } from 'react'
import moment from 'moment'
// import { Tag } from 'primereact/tag'

import AuthUse from '../../../auth/AuthUse'
import flagplaceholder from '../assetsControlLiquidos/flagplaceholder.png'
import { CargaViajeContext } from '../contexts/CargaViajeContext'
import CargaViajeCard from './CargaViajeCard'

function ViajeAuxCard({ viajeAuxs }) {
  const { cargaViajes } = useContext(CargaViajeContext)

  const auth = AuthUse()
  const fecha1 = moment(viajeAuxs.fechaArriboViajeAux)
  const fecha2 = moment(
    viajeAuxs.fechaZarpeViajeAux ? viajeAuxs.fechaZarpeViajeAux : moment()
  )

  const fecha4 = moment()

  // const fecha3 = moment(fecha1 - fecha2).format('HH:mm')

  // Diff in hours
  const diff = fecha2.diff(fecha1, 'seconds')

  const diff3 = fecha4.diff(fecha1, 'seconds')

  // const fecha4 = fecha2.diff(fecha1, 'days')

  function diasPorcentaje(diff, diff3) {
    const validarFecha = moment(diff).isValid()
    if (!validarFecha) return '0%'
    if (diff > diff3) return '0%'
    const porcentajeFechaProgrees = Math.trunc((100 / diff) * diff3)
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

  const ubicacionBuqueTags = {
    DOMINICA: 'dm',
    VENEZUELA: 've',
    'SANTA LUCIA': 'lc',
    'SAN VICENTE DE LAS GRANADINAS': 'vc',
    'ST KITT AND NIEVES': 'tc'
  }

  const ubicacionBuqueTag = ubicacionBuqueTags[viajeAuxs.paisViajeAux]
  return (
    <div className="col-12 lg:col-12 xl:col-12">
      <div className={'card mt-2 mb-0 pb-0 border '}>
        <div className="card-body p-0">
          <div className="grid ">
            <div className="col-12 lg:col-4 xl:col-4 p-0">
              <h3 className=" card-title mb-0">
                {viajeAuxs.paisViajeAux}
                <img
                  alt={'option.name'}
                  src={flagplaceholder}
                  onError={(e) =>
                    (e.target.src =
                      'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
                  }
                  className={`ml-3 flag flag-${ubicacionBuqueTag.toLowerCase()}`}
                />
              </h3>{' '}
              <h6 className="text-400  m-1">
                Tiempo de Carga {secondsToString(diff)}
              </h6>
              {auth.isLogged() &&
                auth.user.faidUser.roles[0] !== 'LECTURA' && (
                  <span className="text-sm text-400">
                    Act.
                    {moment(viajeAuxs.updatedAt).isValid() &&
                      moment(viajeAuxs.updatedAt).format('DD/MM HH:mm')}{' '}
                  </span>
                )}{' '}
              {/* <BarChartDemo
                heightBogega="50px"
                bodegasDelBarco={bodegasDelBarco}
                barcos={barcos}
              /> */}
            </div>
            <div className="col-12 lg:col-12 xl:col-6 text-right">
              {' '}
              <div className="col-12 text-left p-0">
                <div className="skill-bars">
                  <div className="bar mt-3">
                    <div className="progress-line mysql">
                      <div className="infosnippet-startpoint"></div>
                      <div className="infosnippet-endpoint"></div>
                      <span
                        style={{
                          width: diasPorcentaje(diff, diff3)
                        }}
                      >
                        <div className=" text-endpoint ">
                          {diasPorcentaje(diff, diff3)}
                        </div>{' '}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="justify-content-between  flex flex-fill">
                  <h6 className="card-text mt-0 mb-0">
                    Fecha Atraque:
                    <span className="text-green-500 font-medium">
                      {' '}
                      {moment(viajeAuxs.fechaArriboViajeAux).isValid() &&
                        moment(viajeAuxs.fechaArriboViajeAux).format(
                          'dddDD/MM/YY HH:mm'
                        )}
                    </span>
                  </h6>

                  <h6 className="card-text mt-0 mb-0">
                    Fecha Zarpe:
                    <span className="text-orange-500 font-medium">
                      {' '}
                      {moment(viajeAuxs.fechaZarpeViajeAux).isValid() &&
                        moment(viajeAuxs.fechaZarpeViajeAux).format(
                          'dddDD/MM/YY HH:mm'
                        )}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
            {/* <div className="col-4 text-right ">
              <div
                className="col-6 text-left "
                // onClick={() => onClick('displayDetalleCarga')}
              ></div>
              <Tag
                className="w-100 p-2 text-800 font-bold"
                style={{
                  'box-shadow':
                    viajeAuxs.estatusViajeAux === 'INICIADO' &&
                    viajeAuxs.tipoViajeAux === 'CARGANDO'
                      ? '0px 6px 20px rgb(0 222 99 / 30%)'
                      : viajeAuxs.estatusViajeAux === 'INICIADO' &&
                        viajeAuxs.tipoViajeAux === 'DESCARGANDO'
                      ? '0px 6px 20px rgb(0 109 222 / 30%)'
                      : '0px 6px 20px rgb(222 0 92 / 30%)',
                  fontSize: '12px',
                  background:
                    viajeAuxs.estatusViajeAux === 'INICIADO'
                      ? '#157347'
                      : '#97101d'
                }}
              >
                <p className=" mb-0">{viajeAuxs.estatusViajeAux}</p>
              </Tag>
              {auth.isLogged() && auth.user.faidUser.roles[0] !== 'LECTURA' && (
                <span className="text-sm text-400">
                  Act.
                  {moment(viajeAuxs.updatedAt).isValid() &&
                    moment(viajeAuxs.updatedAt).format('DD/MM HH:mm')}{' '}
                </span>
              )}
            </div> */}
          </div>
          <hr className="mt-2 mb-2 " />
          <div className="grid ">
            {cargaViajes.map(
              (cargaViajes) =>
                cargaViajes.viajeAux.id === viajeAuxs.id && (
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
    </div>
  )
}

export default ViajeAuxCard
