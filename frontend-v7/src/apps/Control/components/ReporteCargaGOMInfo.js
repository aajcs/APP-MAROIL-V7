/* eslint-disable multiline-ternary */
import { useContext } from 'react'
import { BarcoContext } from '../contexts/BarcoContext'
import ReporteCargaGOMInfoCard from './ReporteCargaGOMInfoCard'

function ReporteCargaGOMInfo() {
  const { barcos } = useContext(BarcoContext)
  return (
    <>
      {barcos.length === 0 ? (
        <div className="alert alert-primary">
          No hay barco. Por favor Agregue uno
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
    </>
  )
}

export default ReporteCargaGOMInfo
