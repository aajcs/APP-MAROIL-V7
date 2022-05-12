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

const Agenda = () => {
  const { programacionVentanas } = useContext(ProgramacionVentanaContext)
  const [terminalMaroilPuesto1, setTerminalMaroilPuesto1] = useState([])
  const [terminalMaroilPuesto2, setTerminalMaroilPuesto2] = useState([])
  const [terminalPetroSanFelix, setTerminalPetroSanFelix] = useState([])
  const [terminalPetroCedeno, setTerminalPetroCedeno] = useState([])
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
  let auxTerminalPetroSanFelix = []
  let auxTerminalPetroCedeno = []
  for (let prop in programacionVentanas) {
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
        programacionVentanas[prop].terminalBuque === 'MAROIL TERMINAL 1'
          ? 'r1'
          : programacionVentanas[prop].terminalBuque === 'MAROIL TERMINAL 2'
          ? 'r2'
          : programacionVentanas[prop].terminalBuque === 'PETRO SAN FELIX'
          ? 'r3'
          : 'r4',
      movable: false,
      bgColor:
        programacionVentanas[prop].buqueCliente === 'MAROIL'
          ? '#0d6efd'
          : programacionVentanas[prop].buqueCliente === 'PDVSA'
          ? '#dc3545'
          : '#797d82'
    })
  }
  const agentaCard = () => {
    programacionVentanas.map((events) => {
      if (events.fechaFinVentana >= moment().subtract(1, 'days').format()) {
        if (events.terminalBuque === 'MAROIL TERMINAL 1') {
          auxTerminalMaroilPuesto1.push(events)
        } else if (events.terminalBuque === 'MAROIL TERMINAL 2') {
          auxTerminalMaroilPuesto2.push(events)
        } else if (events.terminalBuque === 'PETRO SAN FELIX') {
          auxTerminalPetroSanFelix.push(events)
        } else {
          auxTerminalPetroCedeno.push(events)
        }
      }
    })
    setTerminalMaroilPuesto1(auxTerminalMaroilPuesto1)
    setTerminalMaroilPuesto2(auxTerminalMaroilPuesto2)
    setTerminalPetroSanFelix(auxTerminalPetroSanFelix)
    setTerminalPetroCedeno(auxTerminalPetroCedeno)
  }

  useEffect(() => {
    agentaCard()
  }, [programacionVentanas])

  return (
    <div>
      {auxProgramacionVentanas.length === 0 ? (
        <div className="field col-12  pr-0">
          <div className=" custom-skeleton p-4">
            <div className="flex justify-content-between mt-3 mb-3">
              <div className="mr-2">
                <Skeleton
                  width="13rem"
                  height="3rem"
                  className="mb-2"
                ></Skeleton>
              </div>

              <Skeleton width="40rem" height="3rem"></Skeleton>
            </div>

            <Skeleton width="100%" height="18rem" className="mb-2"></Skeleton>
          </div>
        </div>
      ) : (
        <>
          <div className="card">
            <ProgramacionVentanaAngenaV2 events={auxProgramacionVentanas} />
          </div>
        </>
      )}
      <div className="grid flex">
        {auxTerminalMaroilPuesto1.length === 0 && (
          <div className="col-12 lg:col-6 xl:col-3">
            <div className="card  ">
              <span className="text-900 text-center fw-bold fst-italic mb-2">
                MAROIL TERMINAL 1
              </span>
              {terminalMaroilPuesto1.map((events) => (
                <>
                  <ProgramacionVentanaCard key={events.id} events={events} />
                </>
              ))}
            </div>
          </div>
        )}
        {auxTerminalMaroilPuesto2.length === 0 && (
          <div className="col-12 lg:col-6 xl:col-3">
            <div className="card  ">
              <span className="text-900 text-center fw-bold fst-italic mb-2">
                MAROIL TERMINAL 2
              </span>
              {terminalMaroilPuesto2.map((events) => (
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
      </div>
    </div>
  )
}
export default Agenda
