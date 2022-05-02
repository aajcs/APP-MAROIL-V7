/* eslint-disable multiline-ternary */
/* eslint-disable indent */
/* eslint-disable array-callback-return */
import React, { useContext, useRef } from 'react'

import { Toast } from 'primereact/toast'
import { GabarraContext } from '../contexts/GabarraContext'
import GabarraCard from './GabarraCard'
import { ReporteCargaContext } from '../contexts/ReporteCargaContext'
import { BarcoContext } from '../contexts/BarcoContext'

const GabarraEstatusList = () => {
  const { reporteCargas, createReporteCarga } = useContext(ReporteCargaContext)
  const { gabarras, updateGabarra } = useContext(GabarraContext)
  const { barcocargando } = useContext(BarcoContext)

  const toast = useRef(null)

  const totaltrenes = reporteCargas
    .map((trenes) => trenes.tren_cargados)
    .reduce((a, b) => a + b, 0)
  const totaltoneladas = reporteCargas
    .map((trenes) => trenes.toneladas_cargadas)
    .reduce((a, b) => a + b, 0)
  const totalremanente = reporteCargas
    .map((remanente) => remanente.toneladas_remanente)
    .reduce((a, b) => a + b, 0)

  const gabarraEstatus = (gabarraid, estatusGabarra, remanentegabarra) => {
    if (estatusGabarra === 'Cargando') {
      const actualizarGabarras = gabarras.filter(
        (estatus) => estatus.estatus === 'Cargando'
      )
      actualizarGabarras.length === 0
        ? gabarras.map((gabarra) => {
            if (gabarra.id === gabarraid) {
              updateGabarra({
                ...gabarra,
                estatusGabarra: estatusGabarra,
                toneladasRemanente: remanentegabarra
              })
            }
          })
        : toast.current.show({
            severity: 'error',
            summary: 'No puede cambiar el estatus',
            detail:
              'Tiene una Gabarra con estado cargando revise e intente nuevamente',
            life: 5000
          })
    } else if (estatusGabarra === 'Fondeada sin Carga') {
      gabarras.map((gabarra) => {
        if (gabarra.id === gabarraid) {
          updateGabarra({
            ...gabarra,
            estatusGabarra: estatusGabarra,
            trenesActual: 0,
            toneladasActual: 0,
            toneladasRemanente: 0
          })
          // console.log(gabarra);
          const reporteCargaauto = {
            id: null,
            barco: barcocargando.id,
            barcoID: barcocargando.id,
            gabarra: gabarra.nombre,
            tren_cargados: gabarra.trenes_actual,
            tren_totales: totaltrenes + gabarra.trenes_actual,
            toneladas_cargadas: gabarra.toneladas_actual,
            toneladas_totales:
              totaltoneladas -
              totalremanente +
              (gabarra.toneladas_actual - gabarra.toneladas_remanente),
            toneladas_remanente: gabarra.toneladas_remanente,
            fecha_modificado: new Date(),
            fecha_creado: new Date()
          }

          createReporteCarga(reporteCargaauto)
        }
      })

      // console.log("error tienes una gabarra ");
    } else {
      gabarras.map((gabarra) => {
        if (gabarra.id === gabarraid) {
          updateGabarra({
            ...gabarra,
            estatusGabarra: estatusGabarra
          })
        }
      })
    }
  }

  const gabarratrenesactual = (gabarraid, gabarratrenesactual) => {
    gabarras.map((gabarra) => {
      if (gabarra.id === gabarraid) {
        updateGabarra({
          ...gabarra,
          trenesActual: gabarratrenesactual,
          toneladasActual: gabarratrenesactual * 136
        })
      }
    })
  }
  const gabarratoneladasremanente = (gabarraid, remanentegabarra) => {
    gabarras.map((gabarra) => {
      if (gabarra.id === gabarraid) {
        // updateGabarra({
        //   ...gabarra,
        //   toneladas_remanente: remanentegabarra,
        // });
      }
    })
  }
  return (
    <>
      <Toast ref={toast} position="center"></Toast>
      {gabarras.length === 0 ? (
        <div className="alert alert-primary">
          No hay Gabarras. Por favor Agregue uno
        </div>
      ) : (
        gabarras.map((gabarra) => (
          <GabarraCard
            gabarra={gabarra}
            key={gabarra.id}
            gabarraEstatus={gabarraEstatus}
            gabarratrenesactual={gabarratrenesactual}
            gabarratoneladasremanente={gabarratoneladasremanente}
          />
        ))
      )}
    </>
  )
}

export default GabarraEstatusList
