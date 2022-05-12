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
          : '#dc3545'
    })
  }
  const agentaCard = () => {
    programacionVentanas.map((events) => {
      if (events.fechaFinVentana >= moment().subtract(1, 'days').format()) {
        if (events.terminalBuque === 'MAROIL TERMINAL 1') {
          console.log('1', events.terminalBuque)
          auxTerminalMaroilPuesto1.push(events)
        } else if (events.terminalBuque === 'MAROIL TERMINAL 2') {
          console.log('2', events.terminalBuque)
          auxTerminalMaroilPuesto2.push(events)
        } else if (events.terminalBuque === 'PETRO SAN FELIX') {
          console.log('3', events.terminalBuque)
          auxTerminalPetroSanFelix.push(events)
        } else {
          console.log('4', events.terminalBuque)
          auxTerminalPetroCedeno.push(events)
        }
      }
    })
    setTerminalMaroilPuesto1(auxTerminalMaroilPuesto1)
    setTerminalMaroilPuesto2(auxTerminalMaroilPuesto2)
    setTerminalPetroSanFelix(auxTerminalPetroSanFelix)
    setTerminalPetroCedeno(auxTerminalPetroCedeno)
  }
  console.log(auxProgramacionVentanas)
  console.log(auxTerminalMaroilPuesto1)
  console.log(auxTerminalMaroilPuesto2)
  console.log(auxTerminalPetroSanFelix)
  console.log(auxTerminalPetroCedeno)
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
                PETRO SAN FELIX
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
                PETRO SEDEÑO
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
