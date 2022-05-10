/* eslint-disable multiline-ternary */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable new-cap */
import { useContext } from 'react'
import { ProgramacionVentanaContext } from '../contexts/ProgramacionVentanaContext'
import { Skeleton } from 'primereact/skeleton'

import ProgramacionVentanaAngenaV2 from './ProgramacionVentanaAngenaV2'

import 'react-big-scheduler/lib/css/style.css'

const Agenda = () => {
  const { programacionVentanas } = useContext(ProgramacionVentanaContext)

  //   const schedulerData = new SchedulerData(
  //     new moment().format(DATE_FORMAT),
  //     ViewTypes.Week
  //   )
  //   moment.locale('he-il')
  //   schedulerData.setLocaleMoment(moment)

  let auxProgramacionVentanas = []
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
  console.log(auxProgramacionVentanas)
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
        <ProgramacionVentanaAngenaV2 events={auxProgramacionVentanas} />
      )}
    </div>
  )
}
export default Agenda
