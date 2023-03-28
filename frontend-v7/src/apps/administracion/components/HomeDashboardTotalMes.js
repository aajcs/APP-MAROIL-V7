/* eslint-disable react/prop-types */

import { useContext } from 'react'
import { ConceptoAuxContext } from '../contexts/ConceptoAuxContext'
import HomeDashboardConceptosCdco from './HomeDashboardConceptosCdco'
import HomeDashboardTotalCdcoGrafica from './HomeDashboardTotalCdcoGrafica'
import { ScrollPanel } from 'primereact/scrollpanel'
import moment from 'moment'
import { VolumetriaContext } from '../../Control/contexts/VolumetriaContext'

const HomeDashboardTotalMes = ({
  centroDeCosto,
  ingresoGastos,
  dateDashboard
}) => {
  const { conceptoAuxs } = useContext(ConceptoAuxContext)
  const { volumetrias } = useContext(VolumetriaContext)
  console.log(volumetrias)
  const formatCurrency = (value) => {
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })
  }
  const ubicacionBuqueTags = {
    'Rail Veyor': '#d9a406',
    'MAROIL TERMINAL 2': '#094db1',
    'MAROIL TERMINAL 3': '#094db1',
    'Puesto de Espera (Oeste)': '#094db1',
    'Puesto de Carga (Centro)': '#094db1',
    'Puesto de Carga S.T.S. (Este)': '#094db1',
    'Petro Cedeño': '#0070c0',
    'Petro San Felix': '#70ad47'
  }
  const ubicacionBuqueTag = (value) => {
    return ubicacionBuqueTags[value]
  }
  const ingresoGastosPorCdco = ingresoGastos.filter(
    (p) => p.centroDeCostoAuxId.id === centroDeCosto.id && p
  )

  const totalGastosCdco = ingresoGastos
    .map(
      (p) =>
        p.centroDeCostoAuxId.id === centroDeCosto.id && p.egresoIngresoGasto
    )
    .reduce((a, b) => a + b, 0)
  const ingresoGastoMesActual = ingresoGastos.filter((p) =>
    moment(dateDashboard).isSame(p.fechaIngresoGasto, 'month')
  )
  const volumetriaMesActual = volumetrias.filter((p) =>
    moment(dateDashboard).isSame(p.fechaBlFinalVolumetria, 'month')
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
  const totalGastosCdcoMesActual = ingresoGastoMesActual
    .map(
      (p) =>
        p.centroDeCostoAuxId.id === centroDeCosto.id && p.egresoIngresoGasto
    )
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
            style={{
              background: ubicacionBuqueTag(
                centroDeCosto.descripcionCentroDeCosto
              )
            }}
          >
            <span className="text-center">Carga</span>
            <div className="formgrid grid  ">
              <div className="field card col-12 lg:col-12 xl:col-6 mb-0 text-center d-flex justify-content-center align-items-center">
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
                className="field card col-12 lg:col-12 xl:col-6 mb-0 border-0 text-center d-flex align-items-center"
                style={{
                  background: ubicacionBuqueTag(
                    centroDeCosto.descripcionCentroDeCosto
                  )
                }}
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
            style={{
              background: ubicacionBuqueTag(
                centroDeCosto.descripcionCentroDeCosto
              )
            }}
          >
            <span className="text-center"> Gastos Totales</span>
            <div className="formgrid grid  ">
              <div className="field card col-12 lg:col-12 xl:col-6 mb-0 text-center d-flex justify-content-center align-items-center">
                Total Historico <br />
                {formatCurrency(totalGastosCdco)}
              </div>
              <div
                className="field card col-12 lg:col-12 xl:col-6 mb-0 border-0 text-center"
                style={{
                  background: ubicacionBuqueTag(
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
            <HomeDashboardTotalCdcoGrafica />
          </div>
        </div>
      </div>
      <div className="field  col-12 lg:col-12 xl:col-6 mb-0">
        <div className="formgrid grid d-flex  ">
          <div
            className="field card col-12 lg:col-12 xl:col-9 mb-0"
            style={{
              background: ubicacionBuqueTag(
                centroDeCosto.descripcionCentroDeCosto
              )
            }}
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
                Contribución
                <br />
                {((totalGastosCdcoMesActual / totalGastos) * 100).toFixed(1)} %
              </div>
              <div className="field card col-12 lg:col-12 xl:col-12">
                Gasto Total
                <br />
                {formatCurrency(totalGastosCdcoMesActual)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeDashboardTotalMes
