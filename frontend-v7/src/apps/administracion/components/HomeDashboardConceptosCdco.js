/* eslint-disable react/prop-types */

import moment from 'moment'

const HomeDashboardConceptosCdco = ({
  conceptoAuxs,
  ingresoGastosPorCdco,
  centroDeCosto,
  dateDashboard
}) => {
  const formatCurrency = (value) => {
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })
  }
  const ingresoGastoMesActual = ingresoGastosPorCdco.filter((p) =>
    moment(dateDashboard).isSame(p.fechaIngresoGasto, 'month')
  )
  const totalGastosCdcoConcepto = ingresoGastoMesActual
    .map((p) => p.conceptoAuxId?.id === conceptoAuxs.id && p.egresoIngresoGasto)
    .reduce((a, b) => a + b, 0)
  const totalGastosCdcoTotal = ingresoGastoMesActual
    .map((p) => p.egresoIngresoGasto)
    .reduce((a, b) => a + b, 0)
  const ubicacionBuqueTags = {
    'Rail Veyor': '#f3de66',
    'MAROIL TERMINAL 2': '#094db1',
    'MAROIL TERMINAL 3': '#094db1',
    'Puesto de Espera (Oeste)': '#094db1',
    'Puesto de Carga (Centro)': '#094db1',
    'Puesto de Carga S.T.S. (Este)': '#094db1',
    'Petro Cedeño': '#83c1ed',
    'Petro San Felix': '#b2ef88'
  }
  const ubicacionBuqueTag = (value) => {
    return ubicacionBuqueTags[value]
  }
  return (
    <>
      {totalGastosCdcoConcepto !== 0 && (
        <div
          className="field card col-12 lg:col-12 xl:col-4  m-0 border-top-0 border-end-0 border-2 "
          style={{
            'font-size': '11px',
            'border-color': ubicacionBuqueTag(
              centroDeCosto.descripcionCentroDeCosto
            )
          }}
          // style={{
          //   background: 'transparent'
          // }}
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
            <strong>{formatCurrency(totalGastosCdcoConcepto)}</strong>
          </span>
        </div>
      )}
    </>
  )
}

export default HomeDashboardConceptosCdco
