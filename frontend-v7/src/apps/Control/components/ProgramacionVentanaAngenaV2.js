/* eslint-disable indent */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// import { ProgramacionVentanaContext } from '../contexts/ProgramacionVentanaContext'
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
    name: 'Puesto de Espera (Oeste)',
    parentId: 'r0'
  },
  {
    id: 'r2',
    name: 'Puesto de Carga (Centro)',
    parentId: 'r0'
  },
  {
    id: 'r5',
    name: 'Puesto de Carga S.T.S. (Este)',
    parentId: 'r0'
  },
  {
    id: 'r3',
    name: 'Petro San Félix'
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

class ProgramacionVentanaAngenaV2 extends Component {
  constructor(props) {
    super(props)

    let schedulerData = new SchedulerData(
      moment().format(DATE_FORMAT),
      ViewTypes.Year,
      false,
      false,
      {
        checkConflict: true,
        schedulerWidth: '75%',
        schedulerMaxHeight: 500,
        agendaResourceTableWidth: 300,
        customResourceTableWidth: 300,
        quarterResourceTableWidth: 220,
        startResizable: false,
        endResizable: false,
        movable: false,
        creatable: false,
        resourceName: 'Terminales',
        eventItemPopoverEnabled: false,
        views: [
          {
            viewName: 'Día',
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

    schedulerData.localeMoment.locale('he-il')
    schedulerData.setResources(resources)
    schedulerData.setEvents(props.events)
    this.state = {
      viewModel: schedulerData
    }
  }

  render() {
    const { viewModel } = this.state

    return (
      <div>
        <div>
          <h3 style={{ textAlign: 'center' }}>Programación de Ventana</h3>
          <Scheduler
            schedulerData={viewModel}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            // eventItemClick={this.eventClicked}
            // viewEventClick={this.ops1}
            // viewEventText="Ops 1"
            // viewEvent2Text="Ops 2"
            // viewEvent2Click={this.ops2}
            updateEventStart={this.updateEventStart}
            updateEventEnd={this.updateEventEnd}
            moveEvent={this.moveEvent}
            newEvent={this.newEvent}
            conflictOccurred={this.conflictOccurred}
          />
        </div>
      </div>
    )
  }

  prevClick = (schedulerData) => {
    schedulerData.prev()
    schedulerData.setEvents(this.props.events)
    this.setState({
      viewModel: schedulerData
    })
  }

  nextClick = (schedulerData) => {
    schedulerData.next()
    schedulerData.setEvents(this.props.events)
    this.setState({
      viewModel: schedulerData
    })
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    )
    schedulerData.setEvents(this.props.events)
    this.setState({
      viewModel: schedulerData
    })
  }

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date)
    schedulerData.setEvents(this.props.events)
    this.setState({
      viewModel: schedulerData
    })
  }

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`)
  }

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`
    )
  }

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`
    )
  }

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    if (
      confirm(
        `Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`
      )
    ) {
      let newFreshId = 0
      schedulerData.events.forEach((item) => {
        if (item.id >= newFreshId) newFreshId = item.id + 1
      })

      let newEvent = {
        id: newFreshId,
        title: 'New event you just created',
        start: start,
        end: end,
        resourceId: slotId,
        bgColor: 'purple'
      }
      schedulerData.addEvent(newEvent)
      this.setState({
        viewModel: schedulerData
      })
    }
  }

  updateEventStart = (schedulerData, event, newStart) => {
    if (
      confirm(
        `Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`
      )
    ) {
      schedulerData.updateEventStart(event, newStart)
    }
    this.setState({
      viewModel: schedulerData
    })
  }

  updateEventEnd = (schedulerData, event, newEnd) => {
    if (
      confirm(
        `Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`
      )
    ) {
      schedulerData.updateEventEnd(event, newEnd)
    }
    this.setState({
      viewModel: schedulerData
    })
  }

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (
      confirm(
        `Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`
      )
    ) {
      schedulerData.moveEvent(event, slotId, slotName, start, end)
      this.setState({
        viewModel: schedulerData
      })
    }
  }

  conflictOccurred = (schedulerData, action, event) => {
    alert(`Conflict occurred. {action: ${action}, event: ${event}`)
  }
}

export default DragDropContext(HTML5Backend)(ProgramacionVentanaAngenaV2)
