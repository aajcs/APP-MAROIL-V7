/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable multiline-ternary */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable new-cap */
import { useContext, useEffect, useState } from 'react'
import { ProgramacionVentanaContext } from '../contexts/ProgramacionVentanaContext'
import { Skeleton } from 'primereact/skeleton'
import moment from 'moment'

import ProgramacionVentanaAngenaV2 from './ProgramacionVentanaAngenaV2'

import 'react-big-scheduler/lib/css/style.css'
import ProgramacionVentanaCard from './ProgramacionVentanaCard'

const ProgramacionVentanaFonteGlobalTradingAndLogistics = () => {
  const { programacionVentanas } = useContext(ProgramacionVentanaContext)
  const [terminalMaroilPuesto1, setTerminalMaroilPuesto1] = useState([])
  const [terminalMaroilPuesto2, setTerminalMaroilPuesto2] = useState([])
  const [terminalMaroilPuesto3, setTerminalMaroilPuesto3] = useState([])
  const [terminalPetroSanFelix, setTerminalPetroSanFelix] = useState([])
  const [terminalPetroCedeno, setTerminalPetroCedeno] = useState([])
  const [terminalBuquesFondeados, setTerminalBuquesFondeados] = useState([])
  const [sumaTmMes, setSumaTmMes] = useState([])

  programacionVentanas.sort((o1, o2) => {
    if (o1.fechaInicioVentana < o2.fechaInicioVentana) {
      return -1
    } else if (o1.fechaInicioVentana > o2.fechaInicioVentana) {
      return 1
    } else {
      return 0
    }
  })

  //   const schedulerData = new SchedulerData(
  //     new moment().format(DATE_FORMAT),
  //     ViewTypes.Week
  //   )
  //   moment.locale('he-il')
  //   schedulerData.setLocaleMoment(moment)

  let auxProgramacionVentanas = []
  let auxTerminalMaroilPuesto1 = []
  let auxTerminalMaroilPuesto2 = []
  let auxTerminalMaroilPuesto3 = []
  let auxTerminalPetroSanFelix = []
  let auxTerminalPetroCedeno = []
  let auxTerminalBuquesFondeados = []
  let auxSumaTmMes = 0
  for (let prop in programacionVentanas) {
    if (programacionVentanas[prop].terminalBuque !== 'BUQUES FONDEADOS') {
      auxProgramacionVentanas.push({
        id: programacionVentanas[prop].id,
        title:
          programacionVentanas[prop].nombreBuque +
          ' / ' +
          programacionVentanas[prop].toneladasNominadas +
          ' TM / ' +
          programacionVentanas[prop].buqueCliente,
        start: programacionVentanas[prop].fechaInicioVentana,
        end: programacionVentanas[prop].fechaFinVentana,
        resourceId:
          programacionVentanas[prop].terminalBuque === 'MAROIL TERMINAL 1' ||
          programacionVentanas[prop].terminalBuque ===
            'Puesto de Espera (Oeste)'
            ? 'r1'
            : programacionVentanas[prop].terminalBuque ===
                'MAROIL TERMINAL 2' ||
              programacionVentanas[prop].terminalBuque ===
                'Puesto de Carga (Centro)'
            ? 'r2'
            : programacionVentanas[prop].terminalBuque ===
                'MAROIL TERMINAL 3' ||
              programacionVentanas[prop].terminalBuque ===
                'Puesto de Carga S.T.S. (Este)'
            ? 'r5'
            : programacionVentanas[prop].terminalBuque === 'PETRO SAN FELIX'
            ? 'r3'
            : 'r4',
        movable: false,
        bgColor:
          programacionVentanas[prop].buqueCliente === 'MAROIL'
            ? '#0d6efd'
            : programacionVentanas[prop].buqueCliente === 'MAROIL PRIORIDAD'
            ? '#08afff'
            : programacionVentanas[prop].buqueCliente === 'PDVSA'
            ? '#dc3545'
            : programacionVentanas[prop].buqueCliente === 'PDVSA PRIORIDAD'
            ? '#f759ab'
            : '#797d82'
      })
    }
  }
  const agentaCard = () => {
    programacionVentanas.map((events) => {
      if (events.buqueClienteVenta === 'FONTE GLOBAL TRADING AND LOGISTICS') {
        if (
          events.fechaFinVentana >= moment().subtract(1, 'days').format() &&
          events.fechaInicioVentana >= moment().subtract(1, 'days').format()
        ) {
          if (
            events.terminalBuque === 'MAROIL TERMINAL 1' ||
            events.terminalBuque === 'Puesto de Espera (Oeste)'
          ) {
            auxTerminalMaroilPuesto1.push(events)
          } else if (
            events.terminalBuque === 'MAROIL TERMINAL 2' ||
            events.terminalBuque === 'Puesto de Carga (Centro)'
          ) {
            auxTerminalMaroilPuesto2.push(events)
          } else if (
            events.terminalBuque === 'MAROIL TERMINAL 3' ||
            events.terminalBuque === 'Puesto de Carga S.T.S. (Este)'
          ) {
            auxTerminalMaroilPuesto3.push(events)
          } else if (events.terminalBuque === 'PETRO SAN FELIX') {
            auxTerminalPetroSanFelix.push(events)
          } else {
            auxTerminalPetroCedeno.push(events)
          }
        }
      }
      // let fecha = moment(events.fechaFinVentana).format('YYYY-MM-DD')
      if (moment(events.fechaFinVentana).isSame(moment(), 'month')) {
        auxSumaTmMes = auxSumaTmMes + events.toneladasNominadas
      }
      if (events.terminalBuque === 'BUQUES FONDEADOS') {
        auxTerminalBuquesFondeados.push(events)
      }
    })
    setSumaTmMes(auxSumaTmMes)
    setTerminalMaroilPuesto1(auxTerminalMaroilPuesto1)
    setTerminalMaroilPuesto2(auxTerminalMaroilPuesto2)
    setTerminalMaroilPuesto3(auxTerminalMaroilPuesto3)
    setTerminalPetroSanFelix(auxTerminalPetroSanFelix)
    setTerminalPetroCedeno(auxTerminalPetroCedeno)
    setTerminalBuquesFondeados(auxTerminalBuquesFondeados)
  }

  useEffect(() => {
    agentaCard()
  }, [programacionVentanas])

  return (
    <div>
      <div className="grid flex">
        {auxTerminalMaroilPuesto2.length === 0 && (
          <div className="col-12 lg:col-6 xl:col-3">
            <div className="card  ">
              <span className="text-900 text-center fw-bold fst-italic mb-2">
                MAROIL Puesto de Carga (Centro)
              </span>
              {terminalMaroilPuesto2.map((events) => (
                <>
                  <ProgramacionVentanaCard key={events.id} events={events} />
                </>
              ))}
            </div>
          </div>
        )}
        {auxTerminalMaroilPuesto3.length === 0 && (
          <div className="col-12 lg:col-6 xl:col-3">
            <div className="card  ">
              <span className="text-900 text-center fw-bold fst-italic mb-2">
                Puesto de Carga S.T.S. (Este)
              </span>
              {terminalMaroilPuesto3.map((events) => (
                <>
                  <ProgramacionVentanaCard key={events.id} events={events} />
                </>
              ))}
            </div>
          </div>
        )}
        {auxTerminalPetroSanFelix.length === 0 && (
          <div className="col-12 lg:col-6 xl:col-3">
            <div className="card  ">
              <span className="text-900 text-center fw-bold fst-italic mb-2">
                PETRO SAN FÉLIX
              </span>
              {terminalPetroSanFelix.map((events) => (
                <>
                  <ProgramacionVentanaCard key={events.id} events={events} />
                </>
              ))}
            </div>
          </div>
        )}
        {auxTerminalPetroCedeno.length === 0 && (
          <div className="col-12 lg:col-6 xl:col-3">
            <div className="card  ">
              <span className="text-900 text-center fw-bold fst-italic mb-2">
                PETRO CEDEÑO
              </span>
              {terminalPetroCedeno.map((events) => (
                <>
                  <ProgramacionVentanaCard key={events.id} events={events} />
                </>
              ))}
            </div>
          </div>
        )}
        {auxTerminalMaroilPuesto1.length === 0 && (
          <div className="col-12 lg:col-6 xl:col-3">
            <div className="card  ">
              <span className="text-900 text-center fw-bold fst-italic mb-2">
                MAROIL Puesto de Espera (Oeste)
              </span>
              {terminalMaroilPuesto1.map((events) => (
                <>
                  <ProgramacionVentanaCard key={events.id} events={events} />
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default ProgramacionVentanaFonteGlobalTradingAndLogistics
