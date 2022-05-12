/* eslint-disable indent */
/* eslint-disable prefer-const */
import { useState, useEffect, useContext } from 'react'
import { ProgramacionVentanaContext } from '../contexts/ProgramacionVentanaContext'
// import { PropTypes } from 'prop-types'
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT
} from 'react-big-scheduler'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import moment from 'moment'

const resources = [
  { id: 'r0', name: 'Terminal Maroil' },
  {
    id: 'r1',
    name: 'Puesto 1',
    parentId: 'r0'
  },
  {
    id: 'r2',
    name: 'Puesto 2',
    parentId: 'r0'
  },
  {
    id: 'r3',
    name: 'Petro San Felix'
  },
  {
    id: 'r4',
    name: 'Petro Cedeño'
  }
]
// const events = [
//   {
//     id: 1,
//     title: 'UNIVERSE NEPTUNE / MAROIL / 50.0000 TM',
//     start: '2022-4-25 09:30:00',
//     end: '2022-4-29 23:30:00',
//     resourceId: 'r1',
//     movable: false,
//     bgColor: '#3b8afd',
//     type: 2
//   },
//   {
//     id: 2,
//     title: 'TBN  / PDVSA / 50.0000 TM',
//     start: '2022-4-26 12:30:00',
//     end: '2022-5-1 23:30:00',
//     resourceId: 'r2',
//     movable: false,
//     bgColor: '#3b8afd'
//   },
//   {
//     id: 3,
//     title: 'EMILIA / MAROIL / 50.0000 TM',
//     start: '2022-4-30 12:30:00',
//     end: '2022-5-4 23:30:00',
//     resourceId: 'r1',
//     movable: false,
//     bgColor: '#3b8afd'
//   },
//   {
//     id: 4,
//     title: 'TBN  / PDVSA / 50.0000 TM',
//     start: '2022-5-6 12:30:00',
//     end: '2022-5-11 23:30:00',
//     resourceId: 'r1',
//     movable: false,
//     bgColor: '#3b8afd'
//   },
//   {
//     id: 5,
//     title: 'TOP OFF AP SVETI VLAHO / MAROIL / 20.0000 TM',
//     start: '2022-5-3 12:30:00',
//     end: '2022-5-4 23:30:00',
//     resourceId: 'r2',
//     movable: false,
//     bgColor: '#3b8afd'
//   },
//   {
//     id: 6,
//     title: 'PLUTUS / MAROIL / 13.0000 TM',
//     start: '2022-4-25 12:30:00',
//     end: '2022-4-26 23:30:00',
//     resourceId: 'r3',
//     movable: false,
//     bgColor: '#459e74'
//   },
//   {
//     id: 7,
//     title: 'J.M. ESPAÑA / MAROIL / 13.0000 TM',
//     start: '2022-4-27 12:30:00',
//     end: '2022-4-28 23:30:00',
//     resourceId: 'r3',
//     movable: false,
//     bgColor: '#459e74'
//   },
//   {
//     id: 8,
//     title: 'AP SVETI VLAHO / MAROIL / 30.0000 TM',
//     start: '2022-4-29 12:30:00',
//     end: '2022-5-3 23:30:00',
//     resourceId: 'r3',
//     movable: false,
//     bgColor: '#459e74'
//   },
//   {
//     id: 9,
//     title: 'J.M. ESPAÑA / MAROIL / 13.0000 TM',
//     start: '2022-5-4 12:30:00',
//     end: '2022-5-6 23:30:00',
//     resourceId: 'r3',
//     movable: false,
//     bgColor: '#459e74'
//   },
//   {
//     id: 10,
//     title: 'TBN/ MAROIL / 25.0000 TM',
//     start: '2022-5-9 12:30:00',
//     end: '2022-5-12 23:30:00',
//     resourceId: 'r3',
//     movable: false,
//     bgColor: '#459e74'
//   },
//   {
//     id: 5,
//     title: 'VIGOROUS/ PDVSA / 25.0000 TM',
//     start: '2022-4-27 15:30:00',
//     end: '2022-5-7 23:30:00',
//     resourceId: 'r4',
//     movable: false,
//     bgColor: '#ffd965'
//   }
// ]

const ProgramacionVentanaAngenaV2 = () => {
  let schedulerDataPrimari = new SchedulerData(
    moment().format(DATE_FORMAT),
    ViewTypes.Quarter,
    false,
    false,
    {
      checkConflict: true,
      schedulerWidth: '75%',
      schedulerMaxHeight: 500,
      resourceName: 'Terminales',
      views: [
        {
          viewName: 'Dia',
          viewType: ViewTypes.Day,
          showAgenda: false,
          isEventPerspective: false
        },
        {
          viewName: 'Semana',
          viewType: ViewTypes.Week,
          showAgenda: false,
          isEventPerspective: false
        },
        {
          viewName: 'Mes',
          viewType: ViewTypes.Month,
          showAgenda: false,
          isEventPerspective: false
        },
        {
          viewName: 'Trimestre',
          viewType: ViewTypes.Quarter,
          showAgenda: false,
          isEventPerspective: false
        },
        {
          viewName: 'Año',
          viewType: ViewTypes.Year,
          showAgenda: false,
          isEventPerspective: false
        }
      ]
    }
  )
  const [viewModel, setViewModel] = useState(schedulerDataPrimari)
  const { programacionVentanas } = useContext(ProgramacionVentanaContext)

  let auxProgramacionVentanas = []
  for (let prop in programacionVentanas) {
    auxProgramacionVentanas.push({
      id: programacionVentanas[prop].id,
      title:
        programacionVentanas[prop].nombreBuque +
        ' / ' +
        programacionVentanas[prop].buqueCliente +
        ' / ' +
        programacionVentanas[prop].toneladasNominadas +
        ' TM',
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

  const prevClick = (schedulerData) => {
    schedulerData.prev()
    schedulerData.setEvents(auxProgramacionVentanas)

    setViewModel(schedulerData)
  }

  const nextClick = (schedulerData) => {
    schedulerData.next()
    schedulerData.setEvents(auxProgramacionVentanas)
    setViewModel(schedulerData)
  }
  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    )
    schedulerData.setEvents(auxProgramacionVentanas)
    setViewModel(schedulerData)
  }

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date)
    schedulerData.setEvents(auxProgramacionVentanas)
    setViewModel(schedulerData)
  }
  useEffect(() => {
    schedulerDataPrimari.localeMoment.locale('es')
    schedulerDataPrimari.setResources(resources)
    schedulerDataPrimari.setEvents(auxProgramacionVentanas)
  })
  return (
    <div>
      <div>
        <h3 style={{ textAlign: 'center' }}>Programacion de Ventana</h3>
        <Scheduler
          schedulerData={viewModel}
          prevClick={prevClick}
          nextClick={nextClick}
          onSelectDate={onSelectDate}
          onViewChange={onViewChange}
          // eventItemClick={this.eventClicked}
          // viewEventClick={this.ops1}
          // viewEventText="Ops 1"
          // viewEvent2Text="Ops 2"
          // viewEvent2Click={this.ops2}
          //   updateEventStart={this.updateEventStart}
          //   updateEventEnd={this.updateEventEnd}
          //   moveEvent={this.moveEvent}
          //   newEvent={this.newEvent}
          //   conflictOccurred={this.conflictOccurred}
        />
      </div>
    </div>
  )
}
export default DragDropContext(HTML5Backend)(ProgramacionVentanaAngenaV2)
