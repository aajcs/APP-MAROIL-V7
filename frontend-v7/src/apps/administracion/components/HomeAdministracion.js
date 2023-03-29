/* eslint-disable multiline-ternary */
import { useContext } from 'react'
import { Skeleton } from 'primereact/skeleton'

import HomeCajaChica from './HomeCajaChica'
// import IngresoGastoEstadistica from './IngresoGastoEstadistica'
import { IngresoGastoContext } from '../contexts/IngresoGastoContext'
import HomeDashboard from './HomeDashboard'
import { CentroDeCostoAuxContext } from '../contexts/CentroDeCostoAuxContext'
function HomeAdministracion() {
  const { ingresoGastos } = useContext(IngresoGastoContext)
  const { centroDeCostoAuxs } = useContext(CentroDeCostoAuxContext)
  centroDeCostoAuxs.sort((o1, o2) => {
    if (o1.centroDeCostoAuxCreado > o2.centroDeCostoAuxCreado) {
      return -1
    } else if (o1.centroDeCostoAuxCreado < o2.centroDeCostoAuxCreado) {
      return 1
    } else {
      return 0
    }
  })
  return (
    <>
      {ingresoGastos.length === 0 ? (
        <div className="field col-12 lg:col-6 xl:col-4 pr-0">
          <div className="card custom-skeleton p-4">
            <div className="flex justify-content-between mt-3 mb-3">
              <div className="mr-2">
                <Skeleton
                  width="13rem"
                  height="3rem"
                  className="mb-2"
                ></Skeleton>
                <Skeleton
                  width="5rem"
                  height="1.5rem"
                  className="mb-2"
                ></Skeleton>
              </div>

              <Skeleton width="40%" height="4.5rem"></Skeleton>
            </div>

            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <div className="flex justify-content-between mt-3">
              <Skeleton width="45%" height="5rem"></Skeleton>
              <Skeleton width="45%" height="5rem"></Skeleton>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="animate__animated animate__backInUp animate__slower">
            <HomeDashboard
              ingresoGastos={ingresoGastos}
              centroDeCostoAuxs={centroDeCostoAuxs}
            />
          </div>
          <div className="animate__animated animate__backInUp animate__slower">
            <HomeCajaChica />
          </div>
          {/*
          <IngresoGastoEstadistica /> */}
        </>
      )}
    </>
  )
}

export default HomeAdministracion
