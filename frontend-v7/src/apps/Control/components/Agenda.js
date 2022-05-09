/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable new-cap */
import { useContext } from 'react'
import { ProgramacionVentanaContext } from '../contexts/ProgramacionVentanaContext'

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
      {auxProgramacionVentanas.length !== 0 && (
        <ProgramacionVentanaAngenaV2 events={auxProgramacionVentanas} />
      )}
    </div>
  )
}
export default Agenda
