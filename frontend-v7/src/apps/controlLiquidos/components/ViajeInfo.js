/* eslint-disable multiline-ternary */
import { useContext } from 'react'
import { ViajeContext } from '../contexts/ViajeContext'
import { Skeleton } from 'primereact/skeleton'
import ViajeCard from './ViajeCard'

function ViajeInfo() {
  const { viajes } = useContext(ViajeContext)
  viajes.reverse()
  // console.table(viajes)
  return (
    <>
      {viajes.length === 0 ? (
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
        viajes.map((viajes) => <ViajeCard key={viajes.id} viajes={viajes} />)
      )}
    </>
  )
}

export default ViajeInfo
