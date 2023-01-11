/* eslint-disable quotes */
/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment'
import { Tag } from 'primereact/tag'
// import { Image } from 'primereact/image'

import AuthUse from '../../../auth/AuthUse'

import { ViajeAuxContext } from '../contexts/ViajeAuxContext'
import ViajeAuxCard from './ViajeAuxCard'
import TanqueAuxCard from './TanqueAuxCard'
import { TanqueAuxContext } from '../contexts/TanqueAuxContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { GastosOperacionaleContext } from '../contexts/GastosOperacionaleContext'
// import barcoJPEG from '../assetsControl/barco.jpeg'

function ViajeCard({ viajes }) {
  const { viajeAuxs } = useContext(ViajeAuxContext)
  const { tanqueAuxs } = useContext(TanqueAuxContext)
  const { gastosOperacionales } = useContext(GastosOperacionaleContext)
  const [tanqueAuxEmbarcacion, setTanqueAuxEmbarcacion] = useState(null)
  const [costoOperacionViaje, setCostoOperacionViaje] = useState(null)
  const [displayDetalleCarga, setDisplayDetalleCarga] = useState(false)
  const auth = AuthUse()
  const fecha1 = moment(viajes.fechaInicioViaje)
  const fecha2 = moment(viajes.fechaFinViaje ? viajes.fechaFinViaje : moment())
  const fecha3 = moment()

  viajeAuxs.sort((o1, o2) => {
    if (moment(o1.createdAt) > moment(o2.createdAt)) {
      return -1
    } else if (moment(o1.createdAt) < moment(o2.createdAt)) {
      return 1
    } else {
      return 0
    }
  })

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
    const findBodegaBarco = (id) => {
      const bodegaBarco = tanqueAuxs.filter((p) => p.embarcacion.id === id)

      setTanqueAuxEmbarcacion(bodegaBarco)
    }
    findBodegaBarco(viajes.embarcacion.id)
  }, [tanqueAuxs])
  useEffect(() => {
    const findGastosOperacion = (id) => {
      const bodegaBarco = gastosOperacionales.filter((p) => p.viaje.id === id)
      const sumaGastosOepacion =
        bodegaBarco &&
        bodegaBarco
          .map((item) => item.montoGastosOperacionale)
          .reduce((prev, curr) => prev + curr, 0)
      // setCostosOperacionales(costosOperacion)

      setCostoOperacionViaje(sumaGastosOepacion)
    }
    findGastosOperacion(viajes.id)
  }, [gastosOperacionales])
  const dialogFuncMap = {
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
  return (
    <div className="col-12 lg:col-12 xl:col-12 ">
      <div className="card mt-2 mb-0 pb-0 ">
        <div className="card-body p-0">
          <div className="grid ">
            <div className="col-12 lg:col-6 xl:col-5">
              <h3 className=" card-title mb-0">{viajes.nombreViaje}</h3>{' '}
              <h6 className="text-400 card-title m-0">
                {viajes.descripcionViaje}
              </h6>
              <Tag className="w-100 p-2 mt-3 text-900">
                <p className=" mb-0">{viajes.estatusViaje}</p>
              </Tag>
              {auth.isLogged() && auth.user.faidUser.roles[0] !== 'LECTURA' && (
                <span className="text-sm text-400">
                  Act.
                  {moment(viajes.updatedAt).isValid() &&
                    moment(viajes.updatedAt).format('DD/MM HH:mm')}{' '}
                </span>
              )}
              <div className="skill-bars mt-4">
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
              <div className="justify-content-between mt-0 flex flex-fill">
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
              <h6 className="text-400 card-title m-0">
                Tiempo de Viaje {secondsToString(diff)}
              </h6>
              <h6 className="text-800 card-title ">
                Costos Operacionales{' '}
                <strong>
                  {' '}
                  <span className="text-yellow-700">
                    {new Intl.NumberFormat().format(costoOperacionViaje)}
                    {' $'}
                  </span>
                </strong>
              </h6>
            </div>
            {/* <div className="col-12 lg:col-6 xl:col-5"></div> */}
            <div className="col-12 lg:col-6 xl:col-7 ">
              <div
                className="col-12 lg:col-12 xl:col-12   "
                onClick={() => onClick('displayDetalleCarga')}
              >
                <div className="justify-content-around  flex flex-fill">
                  <h6 className="card-text mt-2 mb-2">
                    Embarcacion:
                    <span className=" font-medium ml-2 font-italic">
                      {viajes.embarcacion.nombreEmbarcacion}
                    </span>
                    {/* <div onClick={() => onClick('displayDetalleCarga')}> */}
                  </h6>
                  <h6 className="card-text mt-2 mb-2">
                    Remolcador:
                    <span className=" font-medium ml-2 font-italic">
                      {viajes.remolcador[0].nombreRemolcador}
                    </span>
                  </h6>
                </div>
                <div>
                  <TanqueAuxCard
                    tanqueAuxEmbarcacion={tanqueAuxEmbarcacion}
                    embarcacions={viajes.embarcacion}
                    heightTanque="180px"
                  />
                </div>
              </div>
            </div>
          </div>
          <Dialog
            header="Detalle de carga en bodegas"
            visible={displayDetalleCarga}
            onHide={() => onHide('displayDetalleCarga')}
            breakpoints={{ '960px': '75vw' }}
            style={{ width: '75vw' }}
            footer={renderFooter('displayDetalleCarga')}
          >
            <TanqueAuxCard
              heightTanque="500px"
              tanqueAuxEmbarcacion={tanqueAuxEmbarcacion}
              embarcacions={viajes.embarcacion}
              tolltip={true}
            />
          </Dialog>
          <div className="grid ">
            <div className="col-12 lg:col-6 xl:col-6 text-right "></div>
          </div>
          <hr className="mt-2 mb-2 " />
        </div>
        <div className="grid w-100 d-flex flex-row">
          {viajeAuxs.map(
            (viajeAuxs) =>
              viajeAuxs.viaje.id === viajes.id && (
                <>
                  <ViajeAuxCard key={viajeAuxs.id} viajeAuxs={viajeAuxs} />
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
