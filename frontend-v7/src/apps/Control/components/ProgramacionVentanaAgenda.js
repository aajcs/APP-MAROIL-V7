/* eslint-disable no-unused-vars */
import React, { useState, Children } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import Agenda from './Agenda'

const localizer = momentLocalizer(moment)

const events = [
  {
    title: 'UNIVERSE NEPTUNE / MAROIL / 50.0000 TM',
    bgColor: '#3b8afd',
    allDay: true,
    start: moment('4-25-2022', 'MM-DD-YYYY'),
    end: moment('4-30-2022', 'MM-DD-YYYY')
  },
  {
    title: 'TBN  / PDVSA / 50.0000 TM',
    bgColor: '#3b8afd',
    allDay: true,
    start: moment('4-26-2022', 'MM-DD-YYYY'),
    end: moment('5-1-2022', 'MM-DD-YYYY')
  },
  {
    title: 'EMILIA / MAROIL / 50.0000 TM',
    bgColor: '#3b8afd',
    allDay: true,
    start: moment('4-30-2022', 'MM-DD-YYYY'),
    end: moment('5-5-2022', 'MM-DD-YYYY')
  },
  {
    title: 'TBN  / PDVSA / 50.0000 TM',
    bgColor: '#3b8afd',
    allDay: true,
    start: moment('5-6-2022', 'MM-DD-YYYY'),
    end: moment('5-11-2022', 'MM-DD-YYYY')
  },
  {
    title: 'TOP OFF AP SVETI VLAHO / MAROIL / 20.0000 TM',
    bgColor: '#3b8afd',
    allDay: true,
    start: moment('5-3-2022', 'MM-DD-YYYY'),
    end: moment('5-5-2022', 'MM-DD-YYYY')
  },
  {
    title: 'PLUTUS / MAROIL / 13.0000 TM',
    bgColor: '#459e74',
    allDay: true,
    start: moment('4-25-2022', 'MM-DD-YYYY'),
    end: moment('4-27-2022', 'MM-DD-YYYY')
  },
  {
    title: 'J.M. ESPAÑA / MAROIL / 13.0000 TM',
    bgColor: '#459e74',
    allDay: true,
    start: moment('4-27-2022', 'MM-DD-YYYY'),
    end: moment('4-29-2022', 'MM-DD-YYYY')
  },
  {
    title: 'AP SVETI VLAHO / MAROIL / 30.0000 TM',
    bgColor: '#459e74',
    allDay: true,
    start: moment('4-29-2022', 'MM-DD-YYYY'),
    end: moment('5-3-2022', 'MM-DD-YYYY')
  },
  {
    title: 'J.M. ESPAÑA / MAROIL / 13.0000 TM',
    bgColor: '#459e74',
    allDay: true,
    start: moment('5-4-2022', 'MM-DD-YYYY'),
    end: moment('5-6-2022', 'MM-DD-YYYY')
  },
  {
    title: 'TBN/ MAROIL / 25.0000 TM',
    bgColor: '#459e74',
    allDay: true,
    start: moment('5-9-2022', 'MM-DD-YYYY'),
    end: moment('5-12-2022', 'MM-DD-YYYY')
  },

  {
    title: 'VIGOROUS/ PDVSA / 25.0000 TM',
    bgColor: '#ffd965',
    start: moment('4-27-2022', 'MM-DD-YYYY'),
    end: moment('5-7-2022', 'MM-DD-YYYY')
  }
]

function App() {
  //   const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' })
  const [allEvents, setAllEvents] = useState(events)
  const CURRENT_DATE = moment().toDate()
  const ColoredDateCellWrapper = ({ children, value }) =>
    React.cloneElement(Children.only(children), {
      style: {
        ...children.style,
        backgroundColor: value < CURRENT_DATE ? '#909397' : '#63676d'
      }
    })
  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.bgColor
    const style = {
      backgroundColor
    }
    return {
      style
    }
  }

  //   function handleAddEvent() {
  //     setAllEvents([...allEvents, newEvent])
  //   }

  return (
    <div className="">
      <h1>Programación de Ventana</h1>
      {/* <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: '20%', marginRight: '10px' }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: '10px' }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button stlye={{ marginTop: '10px' }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div> */}
      <Agenda />
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        messages={{
          next: 'sig',
          previous: 'ant',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día'
        }}
        onSelectEvent={(event) => alert(event.title)}
        // views={['week', 'month']}
        style={{ height: 'calc(120vh - 9rem)' }}
        // components={{
        //   dateCellWrapper: ColoredDateCellWrapper
        // }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  )
}

export default App
