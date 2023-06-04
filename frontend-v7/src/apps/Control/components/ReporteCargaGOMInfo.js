/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import { useContext } from 'react'
import { BarcoContext } from '../contexts/BarcoContext'
import ReporteCargaGOMInfoCard from './ReporteCargaGOMInfoCard'
import { Skeleton } from 'primereact/skeleton'
import logo2023Plateado from '../../../assets/logo2023Plateado.png'
function ReporteCargaGOMInfo() {
  const { barcos } = useContext(BarcoContext)
  const barcoFill = barcos.filter(
    (barcos) => barcos.estatusBarco === 'OPERATIVO'
  )
  console.log(barcoFill)
  return (
    <>
      {barcos.length === 0 ? (
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
        barcos.map(
          (barcos) =>
            barcos.estatusBarco === 'OPERATIVO' &&
            barcos.reporteCargaGOM.length !== 0 && (
              <ReporteCargaGOMInfoCard key={barcos.id} barcos={barcos} />
            )
        )
      )}
      {barcoFill.length === 0 && (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
          <div className="animate__animated animate__bounceInLeft animate__slow animate__flip animate__repeat-3">
            <img src={logo2023Plateado} height="300px" alt="logo" />
          </div>
        </div>
      )}
    </>
  )
}

export default ReporteCargaGOMInfo
