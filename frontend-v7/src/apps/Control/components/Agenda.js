/* eslint-disable new-cap */
import React from 'react'

import ProgramacionVentanaAngenaV2 from './ProgramacionVentanaAngenaV2'

import 'react-big-scheduler/lib/css/style.css'

const Agenda = () => {
  //   const schedulerData = new SchedulerData(
  //     new moment().format(DATE_FORMAT),
  //     ViewTypes.Week
  //   )
  //   moment.locale('he-il')
  //   schedulerData.setLocaleMoment(moment)

  return (
    <div>
      <ProgramacionVentanaAngenaV2 />
    </div>
  )
}
export default Agenda
