/* eslint-disable react/prop-types */

import { useContext } from 'react'
import { ConceptoAuxContext } from '../contexts/ConceptoAuxContext'
import HomeDashboardConceptosCdco from './HomeDashboardConceptosCdco'
import HomeDashboardTotalCdcoGrafica from './HomeDashboardTotalCdcoGrafica'
import { ScrollPanel } from 'primereact/scrollpanel'
import moment from 'moment'
import { VolumetriaContext } from '../../Control/contexts/VolumetriaContext'
import { Tag } from 'primereact/tag'
// import HomeDashboardTotalGrafica from './HomeDashboardTotalGrafica'

const HomeDashboardTotalMes = ({
  centroDeCosto,
  ingresoGastos,
  dateDashboard
}) => {
  const { conceptoAuxs } = useContext(ConceptoAuxContext)
  const { volumetrias } = useContext(VolumetriaContext)
  const formatCurrency = (value) => {
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })
  }
  const ubicacionBuqueTags = {
    'Rail Veyor': '#1473e9b8',
    'MAROIL TERMINAL 2': '#094db1',
    'MAROIL TERMINAL 3': '#094db1',
    'Puesto de Espera (Oeste)': '#094db1',
    'Puesto de Carga (Centro)': '#094db1',
    'Puesto de Carga S.T.S. (Este)': '#094db1',
    'Petro Cedeño': '#b8202e',
    'Petro San Felix': '#70ad47'
  }
  const ubicacionBuqueTag = (value) => {
    return ubicacionBuqueTags[value]
  }
  const ingresoGastosPorCdco = ingresoGastos.filter(
    (p) => p.centroDeCostoAuxId.id === centroDeCosto.id && p
  )
  console.log(ingresoGastos)

  const totalGastosCdco = ingresoGastos
    .map(
      (p) =>
        p.centroDeCostoAuxId.id === centroDeCosto.id && p.egresoIngresoGasto
    )
    .reduce((a, b) => a + b, 0)
  const totalGastosCdcoAdminMaroil = ingresoGastos
    .map(
      (p) =>
        p.procesoAuxId?.id === '65748c89afc5555f3f9b20de' &&
        p.centroDeCostoAuxId.id === centroDeCosto.id &&
        p.egresoIngresoGasto
    )
    .reduce((a, b) => a + b, 0)
  console.log(totalGastosCdcoAdminMaroil)
  const ingresoGastoMesActual = ingresoGastos.filter((p) =>
    moment(dateDashboard).isSame(p.fechaIngresoGasto, 'month')
  )
  const volumetriaMesActual = volumetrias.filter((p) =>
    moment(dateDashboard).isSame(p.fechaBlFinalVolumetria, 'month')
  )
  const volumetriaMesMesAnterior = volumetrias.filter((p) =>
    moment(dateDashboard)
      .subtract(5, 'M')
      .isSame(p.fechaBlFinalVolumetria, 'month')
  )
  const volumetriaMesActual6Mecs = volumetrias.filter((p) =>
    moment(dateDashboard)
      .subtract(5, 'M')
      .isSame(p.fechaBlFinalVolumetria, 'month')
  )

  const totalVolumetriaMesMaroil = volumetriaMesActual
    .map((p) => p.terminalAuxId === 'MAROIL TERMINAL' && p.blFinalVolumetria)
    .reduce((a, b) => a + b, 0)
  const totalVolumetriaMesPc = volumetriaMesActual
    .map((p) => p.terminalAuxId === 'PETRO CEDENO' && p.blFinalVolumetria)
    .reduce((a, b) => a + b, 0)
  const totalVolumetriaMesPsf = volumetriaMesActual
    .map((p) => p.terminalAuxId === 'PETRO SAN FELIX' && p.blFinalVolumetria)
    .reduce((a, b) => a + b, 0)
  const totalVolumetriaMesAnteriorMaroil = volumetriaMesMesAnterior
    .map((p) => p.terminalAuxId === 'MAROIL TERMINAL' && p.blFinalVolumetria)
    .reduce((a, b) => a + b, 0)
  const totalVolumetriaMesAnteriorPc = volumetriaMesMesAnterior
    .map((p) => p.terminalAuxId === 'PETRO CEDENO' && p.blFinalVolumetria)
    .reduce((a, b) => a + b, 0)
  const totalVolumetriaMesAnteriorPsf = volumetriaMesMesAnterior
    .map((p) => p.terminalAuxId === 'PETRO SAN FELIX' && p.blFinalVolumetria)
    .reduce((a, b) => a + b, 0)
  const totalVolumetriaMesMaroil6Mecs = volumetriaMesActual6Mecs
    .map((p) => p.terminalAuxId === 'MAROIL TERMINAL' && p.blFinalVolumetria)
    .reduce((a, b) => a + b, 0)
  const totalVolumetriaMesPc6Mecs = volumetriaMesActual6Mecs
    .map((p) => p.terminalAuxId === 'PETRO CEDENO' && p.blFinalVolumetria)
    .reduce((a, b) => a + b, 0)
  const totalVolumetriaMesPsf6Mecs = volumetriaMesActual6Mecs
    .map((p) => p.terminalAuxId === 'PETRO SAN FELIX' && p.blFinalVolumetria)
    .reduce((a, b) => a + b, 0)

  const totalGastos = ingresoGastoMesActual
    .map((p) => p.egresoIngresoGasto)
    .reduce((a, b) => a + b, 0)
  const ingresoGastoMesActual6Mecs = ingresoGastos.filter((p) =>
    moment(dateDashboard).subtract(5, 'M').isSame(p.fechaIngresoGasto, 'month')
  )
  const ingresoGastoMesAnterior = ingresoGastos.filter((p) =>
    moment(dateDashboard).subtract(1, 'M').isSame(p.fechaIngresoGasto, 'month')
  )

  const totalGastosCdcoMesActual = ingresoGastoMesActual
    .map(
      (p) =>
        p.centroDeCostoAuxId.id === centroDeCosto.id && p.egresoIngresoGasto
    )
    .reduce((a, b) => a + b, 0)
  const totalGastosCdcoMesAnterior = ingresoGastoMesAnterior
    .map(
      (p) =>
        p.centroDeCostoAuxId.id === centroDeCosto.id && p.egresoIngresoGasto
    )
    .reduce((a, b) => a + b, 0)
  const totalGastosMesAnterior = ingresoGastoMesAnterior
    .map((p) => p.egresoIngresoGasto)
    .reduce((a, b) => a + b, 0)

  const totalGastosCdcoMesActual6Mecs = ingresoGastoMesActual6Mecs
    .map(
      (p) =>
        p.centroDeCostoAuxId.id === centroDeCosto.id && p.egresoIngresoGasto
    )
    .reduce((a, b) => a + b, 0)

  const tasaPromedrioGasto6Mecs =
    totalGastosCdcoMesActual / totalGastosCdcoMesActual6Mecs
  const tasaPromedrioGasto6MecsFianl = Math.pow(
    tasaPromedrioGasto6Mecs,
    0.1666667
  )
  const tasaPromedrioVolumetriaMaroil6Mecs = Math.pow(
    totalVolumetriaMesMaroil / totalVolumetriaMesMaroil6Mecs,
    0.1666667
  )
  const tasaPromedrioVolumetriaPc6Mecs = Math.pow(
    totalVolumetriaMesPc / totalVolumetriaMesPc6Mecs,
    0.1666667
  )
  const tasaPromedrioVolumetriaPsf6Mecs = Math.pow(
    totalVolumetriaMesPsf / totalVolumetriaMesPsf6Mecs,
    0.1666667
  )

  const volumetriaTodoMaroil = volumetrias
    .map(
      (blFinal) =>
        blFinal.terminalAuxId === 'MAROIL TERMINAL' && blFinal.blFinalVolumetria
    )
    .reduce((a, b) => a + b, 0)
  const volumetriaTodoPC = volumetrias
    .map(
      (blFinal) =>
        blFinal.terminalAuxId === 'PETRO CEDENO' && blFinal.blFinalVolumetria
    )
    .reduce((a, b) => a + b, 0)
  const volumetriaTodoPSF = volumetrias
    .map(
      (blFinal) =>
        blFinal.terminalAuxId === 'PETRO SAN FELIX' && blFinal.blFinalVolumetria
    )
    .reduce((a, b) => a + b, 0)
  return (
    <div className="formgrid grid  ">
      <div className="field  col-12 lg:col-12 xl:col-6 mb-0 ">
        <div
          className="formgrid grid  "
          style={{
            'font-size': '12px'
          }}
        >
          <div
            className=" card col-12 lg:col-12 xl:col-6 mb-0"
            // style={{
            //   'border-color': ubicacionBuqueTag(
            //     centroDeCosto.descripcionCentroDeCosto
            //   )
            // }}
          >
            <span className="text-center">Carga</span>
            <div className="formgrid grid  ">
              <div
                className="field card col-12 lg:col-12 xl:col-6 mb-0 text-center d-flex justify-content-center align-items-center"
                style={{
                  'border-color': ubicacionBuqueTag(
                    centroDeCosto.descripcionCentroDeCosto
                  )
                }}
              >
                Total Historico{' '}
                {centroDeCosto.id === '63504235a9d055063b6447f0' &&
                  volumetriaTodoMaroil.toLocaleString('de-DE', {
                    maximumFractionDigits: 2
                  })}
                {centroDeCosto.id === '6350424ca9d055063b6447f3' &&
                  volumetriaTodoPC.toLocaleString('de-DE', {
                    maximumFractionDigits: 2
                  })}
                {centroDeCosto.id === '62de20b986f66dbfa7f25dde' &&
                  volumetriaTodoPSF.toLocaleString('de-DE', {
                    maximumFractionDigits: 2
                  })}
              </div>
              <div
                // className="field card  border-top-0 border-end-0 border-2 animate__animated animate__zoomInLeft animate__slower animate__delay-2s"
                style={{
                  'border-color': ubicacionBuqueTag(
                    centroDeCosto.descripcionCentroDeCosto
                  )
                }}
                className="field card col-12 lg:col-12 xl:col-6 mb-0  text-center d-flex align-items-center"
                // style={{
                //   background: ubicacionBuqueTag(
                //     centroDeCosto.descripcionCentroDeCosto
                //   )
                // }}
              >
                Tasa Prom.
                <br />
                {centroDeCosto.id === '63504235a9d055063b6447f0' &&
                  ((tasaPromedrioVolumetriaMaroil6Mecs - 1) * 100).toFixed(2)}
                {centroDeCosto.id === '6350424ca9d055063b6447f3' &&
                  ((tasaPromedrioVolumetriaPc6Mecs - 1) * 100).toFixed(2)}
                {centroDeCosto.id === '62de20b986f66dbfa7f25dde' &&
                  ((tasaPromedrioVolumetriaPsf6Mecs - 1) * 100).toFixed(2)}
                %
                <br />
                <span
                  style={{
                    'font-size': '8px'
                  }}
                >
                  (Últ. 6 meses)
                </span>
              </div>
            </div>
          </div>
          <div
            className="field card col-12 lg:col-12 xl:col-6 mb-0"
            // style={{
            //   'border-color': ubicacionBuqueTag(
            //     centroDeCosto.descripcionCentroDeCosto
            //   )
            // }}
          >
            <span className="text-center"> Gastos Totales</span>
            <div className="formgrid grid  ">
              <div
                className="field card col-12 lg:col-12 xl:col-6 mb-0 text-center d-flex justify-content-center align-items-center"
                style={{
                  'border-color': ubicacionBuqueTag(
                    centroDeCosto.descripcionCentroDeCosto
                  )
                }}
              >
                Total Historico <br />
                {formatCurrency(totalGastosCdco)}
              </div>
              <div
                className="field card col-12 lg:col-12 xl:col-6 mb-0  text-center"
                style={{
                  'border-color': ubicacionBuqueTag(
                    centroDeCosto.descripcionCentroDeCosto
                  )
                }}
              >
                Tasa Prom.
                <br />
                {((tasaPromedrioGasto6MecsFianl - 1) * 100).toFixed(2)} %
                <br />
                <span
                  style={{
                    'font-size': '8px'
                  }}
                >
                  (Últ. 6 meses)
                </span>
              </div>
            </div>
          </div>
          <div className="field card col-12 lg:col-12 xl:col-12 mb-0">
            <HomeDashboardTotalCdcoGrafica
              dateDashboard={dateDashboard}
              centroDeCosto={centroDeCosto}
              ingresoGastosPorCdco={ingresoGastosPorCdco}
            />
          </div>
        </div>
      </div>
      <div className="field  col-12 lg:col-12 xl:col-6 mb-0">
        <div className="formgrid grid d-flex  ">
          <div
            className="field card col-12 lg:col-12 xl:col-9 mb-0"
            // style={{
            //   'border-color': ubicacionBuqueTag(
            //     centroDeCosto.descripcionCentroDeCosto
            //   )
            // }}
          >
            <ScrollPanel
              style={{ width: '100%', height: '180px' }}
              className="custombar1 "
            >
              <div style={{ padding: '0.5em', lineHeight: '1.5' }}>
                <div className="formgrid grid d-flex ">
                  {conceptoAuxs.map(
                    (p) =>
                      p.estatusConceptoAux === 'OPERATIVO' && (
                        <HomeDashboardConceptosCdco
                          key={p.id}
                          conceptoAuxs={p}
                          ingresoGastosPorCdco={ingresoGastosPorCdco}
                          centroDeCosto={centroDeCosto}
                          dateDashboard={dateDashboard}
                          totalVolumetriaMesMaroil={totalVolumetriaMesMaroil}
                          totalVolumetriaMesPc={totalVolumetriaMesPc}
                          totalVolumetriaMesPsf={totalVolumetriaMesPsf}
                          totalVolumetriaMesAnteriorMaroil={
                            totalVolumetriaMesAnteriorMaroil
                          }
                          totalVolumetriaMesAnteriorPc={
                            totalVolumetriaMesAnteriorPc
                          }
                          totalVolumetriaMesAnteriorPsf={
                            totalVolumetriaMesAnteriorPsf
                          }
                        />
                      )
                  )}
                </div>
              </div>
            </ScrollPanel>
          </div>
          <div className="field card col-12 lg:col-12 xl:col-3">
            <div className="formgrid grid d-flex  ">
              <div className="field card col-12 lg:col-12 xl:col-12">
                <Tag
                  style={{
                    background: ubicacionBuqueTag(
                      centroDeCosto.descripcionCentroDeCosto
                    )
                  }}
                >
                  <div className="flex align-items-center gap-2">
                    <span className="h6 mb-0">Contribución</span>
                  </div>
                </Tag>

                <div className="d-flex justify-content-between mt-3">
                  <div>
                    {((totalGastosCdcoMesActual / totalGastos) * 100).toFixed(
                      1
                    )}{' '}
                    %
                  </div>
                  <div>
                    <span
                      style={{
                        'font-size': '8px',
                        position: 'absolute',
                        top: '27px',
                        right: '5px'
                      }}
                    >
                      {'V(%)C/Tm'}
                    </span>
                    {/* {(totalGastosCdcoMesActual / totalGastos).toFixed(2)} */}
                    {(totalGastosCdcoMesActual /
                      totalGastos /
                      (totalGastosCdcoMesAnterior / totalGastosMesAnterior) -
                      1 * 1) *
                      100 !==
                      Infinity &&
                      (
                        (totalGastosCdcoMesActual /
                          totalGastos /
                          (totalGastosCdcoMesAnterior /
                            totalGastosMesAnterior) -
                          1 * 1) *
                        100
                      ).toFixed(2)}
                    {/* {totalGastosCdcoMesAnterior.toFixed(2)}s
                {totalGastosMesAnterior.toFixed(2)}s */}
                  </div>
                </div>
                <div className="field  col-12 lg:col-12 xl:col-12 mb-0">
                  {/* <HomeDashboardTotalGrafica
                    dateDashboard={dateDashboard}
                    centroDeCosto={centroDeCosto}
                    ingresoGastosPorCdco={ingresoGastosPorCdco}
                  /> */}
                </div>
              </div>
              <div className="field card col-12 lg:col-12 xl:col-12">
                <Tag
                  style={{
                    background: ubicacionBuqueTag(
                      centroDeCosto.descripcionCentroDeCosto
                    )
                  }}
                >
                  <div className="flex align-items-center gap-2">
                    <span className="h6 mb-0">Gasto Total</span>
                  </div>
                </Tag>

                {formatCurrency(totalGastosCdcoMesActual)}
                <div className="field  col-12 lg:col-12 xl:col-12 mb-0">
                  {/* <HomeDashboardTotalGrafica
                    dateDashboard={dateDashboard}
                    centroDeCosto={centroDeCosto}
                    ingresoGastosPorCdco={ingresoGastosPorCdco}
                  /> */}
                </div>
              </div>
              <div className="field card col-12 lg:col-12 xl:col-12">
                <Tag
                  style={{
                    background: ubicacionBuqueTag(
                      centroDeCosto.descripcionCentroDeCosto
                    )
                  }}
                >
                  <div className="flex align-items-center gap-2">
                    <span
                      className="h6 mb-0"
                      style={{
                        'font-size': '12px'
                      }}
                    >
                      TM Totales
                    </span>
                  </div>
                </Tag>
                {centroDeCosto.id === '63504235a9d055063b6447f0' &&
                  totalVolumetriaMesMaroil.toLocaleString('de-DE', {
                    maximumFractionDigits: 3
                  })}
                {centroDeCosto.id === '6350424ca9d055063b6447f3' &&
                  totalVolumetriaMesPc.toLocaleString('de-DE', {
                    maximumFractionDigits: 3
                  })}
                {centroDeCosto.id === '62de20b986f66dbfa7f25dde' &&
                  totalVolumetriaMesPsf.toLocaleString('de-DE', {
                    maximumFractionDigits: 3
                  })}{' '}
                Tm
                {/* {formatCurrency(totalGastosCdcoMesActual)} */}
                <div className="field  col-12 lg:col-12 xl:col-12 mb-0">
                  {/* <HomeDashboardTotalGrafica
                    dateDashboard={dateDashboard}
                    centroDeCosto={centroDeCosto}
                    ingresoGastosPorCdco={ingresoGastosPorCdco}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeDashboardTotalMes
