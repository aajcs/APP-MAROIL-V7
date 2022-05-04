/* eslint-disable no-unused-vars */
import React, { useState, Children } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const events = [
  {
    title: 'PROBANDO BUQUE 1',
    bgColor: '#094db1',
    allDay: true,
    start: moment('5-5-2022', 'MM-DD-YYYY'),
    end: moment('5-7-2022', 'MM-DD-YYYY')
  },
  {
    title: 'PROBANDO BUQUE 1',
    bgColor: '#094db1',
    allDay: true,
    start: moment('5-5-2022', 'MM-DD-YYYY'),
    end: moment('5-16-2022', 'MM-DD-YYYY')
  },
  {
    title: 'PROBANDO BUQUE 1',
    bgColor: '#094db1',
    allDay: true,
    start: moment('5-1-2022', 'MM-DD-YYYY'),
    end: moment('5-8-2022', 'MM-DD-YYYY')
  },
  {
    title: 'PROBANDO BUQUE 1',
    bgColor: '#094db1',
    allDay: true,
    start: moment('5-5-2022', 'MM-DD-YYYY'),
    end: moment('5-10-2022', 'MM-DD-YYYY')
  },
  {
    title: 'PROBANDO BUQUE 2',
    bgColor: '#d9a406',
    start: moment('5-15-2022', 'MM-DD-YYYY'),
    end: moment('5-22-2022', 'MM-DD-YYYY')
  },
  {
    title: 'PROBANDO BUQUE 3',
    bgColor: '#157347',
    start: moment('5-25-2022', 'MM-DD-YYYY'),
    end: moment('5-30-2022', 'MM-DD-YYYY')
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
  console.log(allEvents)
  return (
    <div className="">
      <h1>Programacion de Ventana</h1>
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
        // onSelectEvent={(event) => alert(event.title)}
        // views={['week', 'month']}
        style={{ height: 'calc(95vh - 9rem)' }}
        // components={{
        //   dateCellWrapper: ColoredDateCellWrapper
        // }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  )
}

export default App
