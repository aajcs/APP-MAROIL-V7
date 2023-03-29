/* eslint-disable multiline-ternary */
/* eslint-disable indent */
/* eslint-disable react/prop-types */

import moment from 'moment'

const HomeDashboardConceptosCdco = ({
  conceptoAuxs,
  ingresoGastosPorCdco,
  centroDeCosto,
  dateDashboard,
  totalVolumetriaMesMaroil,
  totalVolumetriaMesPc,
  totalVolumetriaMesPsf,
  totalVolumetriaMesAnteriorMaroil,
  totalVolumetriaMesAnteriorPc,
  totalVolumetriaMesAnteriorPsf
}) => {
  const formatCurrency = (value) => {
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })
  }
  const ingresoGastoMesActual = ingresoGastosPorCdco.filter((p) =>
    moment(dateDashboard).isSame(p.fechaIngresoGasto, 'month')
  )
  const ingresoGastoMesAnterior = ingresoGastosPorCdco.filter((p) =>
    moment(dateDashboard).subtract(1, 'M').isSame(p.fechaIngresoGasto, 'month')
  )

  const totalGastosCdcoConceptoMesAnterior = ingresoGastoMesAnterior
    .map((p) => p.conceptoAuxId?.id === conceptoAuxs.id && p.egresoIngresoGasto)
    .reduce((a, b) => a + b, 0)

  const totalGastosCdcoTotalMesAnterior = ingresoGastoMesAnterior
    .map((p) => p.egresoIngresoGasto)
    .reduce((a, b) => a + b, 0)

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
  console.log(
    totalGastosCdcoConcepto /
      totalVolumetriaMesMaroil /
      (totalGastosCdcoConceptoMesAnterior / totalVolumetriaMesAnteriorMaroil) -
      1 * 1
  )
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
            {(totalGastosCdcoConcepto / totalGastosCdcoTotal) * 100 -
              (totalGastosCdcoConceptoMesAnterior /
                totalGastosCdcoTotalMesAnterior) *
                100 >
            0 ? (
              <i
                className="pi pi-arrow-up"
                style={{ color: 'green', fontSize: '0.8rem' }}
              ></i>
            ) : (
              <i
                className="pi pi-arrow-down"
                style={{ color: 'red', fontSize: '0.8rem' }}
              ></i>
            )}

            <strong>
              {((totalGastosCdcoConcepto / totalGastosCdcoTotal) * 100).toFixed(
                2
              )}
              %
            </strong>
            <strong>
              {/* {(totalGastosCdcoConcepto / totalVolumetriaMesMaroil).toFixed(2)} */}
              {centroDeCosto.id === '63504235a9d055063b6447f0' &&
                (totalGastosCdcoConcepto / totalVolumetriaMesMaroil).toFixed(2)}
              {centroDeCosto.id === '6350424ca9d055063b6447f3' &&
                (totalGastosCdcoConcepto / totalVolumetriaMesPc).toFixed(2)}
              {centroDeCosto.id === '62de20b986f66dbfa7f25dde' &&
                (totalGastosCdcoConcepto / totalVolumetriaMesPsf).toFixed(2)}
            </strong>
          </span>
          <span className="mt-2">
            <strong>{formatCurrency(totalGastosCdcoConcepto)}</strong>
            <strong>
              {/* {(totalGastosCdcoConcepto / totalVolumetriaMesMaroil).toFixed(2)} */}
              {centroDeCosto.id === '63504235a9d055063b6447f0' &&
                totalGastosCdcoConcepto /
                  totalVolumetriaMesMaroil /
                  (totalGastosCdcoConceptoMesAnterior /
                    totalVolumetriaMesAnteriorMaroil) -
                  1 * 1 !==
                  Infinity &&
                (
                  totalGastosCdcoConcepto /
                    totalVolumetriaMesMaroil /
                    (totalGastosCdcoConceptoMesAnterior /
                      totalVolumetriaMesAnteriorMaroil) -
                  1 * 1
                ).toFixed(2)}
              {centroDeCosto.id === '6350424ca9d055063b6447f3' &&
                totalGastosCdcoConcepto /
                  totalVolumetriaMesPc /
                  (totalGastosCdcoConceptoMesAnterior /
                    totalVolumetriaMesAnteriorPc) -
                  1 * 1 !==
                  Infinity &&
                totalGastosCdcoConcepto /
                  totalVolumetriaMesPc /
                  (totalGastosCdcoConceptoMesAnterior /
                    totalVolumetriaMesAnteriorPc) -
                  1 * 1}
              {centroDeCosto.id === '62de20b986f66dbfa7f25dde' &&
                totalGastosCdcoConcepto /
                  totalVolumetriaMesPsf /
                  (totalGastosCdcoConceptoMesAnterior /
                    totalVolumetriaMesAnteriorPsf) -
                  1 * 1 !==
                  Infinity &&
                totalGastosCdcoConcepto /
                  totalVolumetriaMesPsf /
                  (totalGastosCdcoConceptoMesAnterior /
                    totalVolumetriaMesAnteriorPsf) -
                  1 * 1}
            </strong>
          </span>
        </div>
      )}
    </>
  )
}

export default HomeDashboardConceptosCdco
