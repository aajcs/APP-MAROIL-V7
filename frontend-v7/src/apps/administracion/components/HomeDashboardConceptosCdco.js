/* eslint-disable react/prop-types */

import moment from 'moment'

const HomeDashboardConceptosCdco = ({ conceptoAuxs, ingresoGastosPorCdco }) => {
  console.log(conceptoAuxs)
  console.log(ingresoGastosPorCdco)
  const ingresoGastoMesActual = ingresoGastosPorCdco.filter((p) =>
    moment('2023-02-20').isSame(p.fechaIngresoGasto, 'month')
  )
  const totalGastosCdcoConcepto = ingresoGastoMesActual
    .map((p) => p.conceptoAuxId?.id === conceptoAuxs.id && p.egresoIngresoGasto)
    .reduce((a, b) => a + b, 0)
  const totalGastosCdcoTotal = ingresoGastoMesActual
    .map((p) => p.egresoIngresoGasto)
    .reduce((a, b) => a + b, 0)
  console.log(totalGastosCdcoTotal)
  return (
    <>
      {totalGastosCdcoConcepto !== 0 && (
        <div
          className="field card col-12 lg:col-12 xl:col-4 "
          style={{
            'font-size': '11px'
          }}
        >
          <span>{conceptoAuxs.nombreConceptoAux.substring(0, 13)}</span>
          <span className="mt-2">
            <strong>
              {((totalGastosCdcoConcepto / totalGastosCdcoTotal) * 100).toFixed(
                2
              )}
              %
            </strong>
          </span>
          <span className="mt-2">
            <strong>{totalGastosCdcoConcepto}</strong>
          </span>
        </div>
      )}
    </>
  )
}

export default HomeDashboardConceptosCdco
