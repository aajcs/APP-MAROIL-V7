/* eslint-disable react/prop-types */

import { useContext } from 'react'
import { ConceptoAuxContext } from '../contexts/ConceptoAuxContext'
import HomeDashboardConceptosCdco from './HomeDashboardConceptosCdco'
import HomeDashboardTotalCdcoGrafica from './HomeDashboardTotalCdcoGrafica'
import { ScrollPanel } from 'primereact/scrollpanel'
import moment from 'moment'
import { VolumetriaContext } from '../../Control/contexts/VolumetriaContext'

const HomeDashboardTotalMes = ({ centroDeCosto, ingresoGastos }) => {
  const { conceptoAuxs } = useContext(ConceptoAuxContext)
  const { volumetrias } = useContext(VolumetriaContext)
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
    moment('2023-02-20').isSame(p.fechaIngresoGasto, 'month')
  )
  const totalGastos = ingresoGastoMesActual
    .map((p) => p.egresoIngresoGasto)
    .reduce((a, b) => a + b, 0)
  const ingresoGastoMesActual6Mecs = ingresoGastos.filter((p) =>
    moment('2022-09-20').isSame(p.fechaIngresoGasto, 'month')
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
      <div className="field card col-12 lg:col-12 xl:col-6 ">
        <div
          className="formgrid grid  "
          style={{
            'font-size': '12px'
          }}
        >
          <div className="field card col-12 lg:col-12 xl:col-6 ">
            Carga
            <div className="formgrid grid  ">
              <div className="field card col-12 lg:col-12 xl:col-6 ">
                Total Historico{' '}
                {centroDeCosto.id === '63504235a9d055063b6447f0' &&
                  volumetriaTodoMaroil.toFixed(2)}
                {centroDeCosto.id === '6350424ca9d055063b6447f3' &&
                  volumetriaTodoPC.toFixed(2)}
                {centroDeCosto.id === '62de20b986f66dbfa7f25dde' &&
                  volumetriaTodoPSF.toFixed(2)}
              </div>
              <div className="field card col-12 lg:col-12 xl:col-6 ">
                Tasa Promedio
              </div>
            </div>
          </div>
          <div className="field card col-12 lg:col-12 xl:col-6">
            Gastos Totales
            <div className="formgrid grid  ">
              <div className="field card col-12 lg:col-12 xl:col-6 ">
                Total Historico <br />
                {totalGastosCdco.toFixed(2)}
              </div>
              <div className="field card col-12 lg:col-12 xl:col-6 ">
                Tasa Promedio
                <br />
                {((tasaPromedrioGasto6MecsFianl - 1) * 100).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="field card col-12 lg:col-12 xl:col-12">
            <HomeDashboardTotalCdcoGrafica />
          </div>
        </div>
      </div>
      <div className="field card col-12 lg:col-12 xl:col-6">
        <div className="formgrid grid d-flex  ">
          <div className="field card col-12 lg:col-12 xl:col-9">
            <ScrollPanel
              style={{ width: '100%', height: '200px' }}
              className="custombar1"
            >
              <div style={{ padding: '1em', lineHeight: '1.5' }}>
                <div className="formgrid grid d-flex  ">
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
                Peso Gasto Op.
                <br />
                {((totalGastosCdcoMesActual / totalGastos) * 100).toFixed(1)} %
              </div>
              <div className="field card col-12 lg:col-12 xl:col-12">
                Gasto Total
                {totalGastosCdcoMesActual.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeDashboardTotalMes
