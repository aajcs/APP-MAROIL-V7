/* eslint-disable react/prop-types */
import React from 'react'
// import { Card } from 'primereact/card'
// import { Message } from 'primereact/message'
import { Tag } from 'primereact/tag'
// Parcialmente soleado: Partly cloudy day
// Mayormente nublando: overcast
// Nublado: Cloudy
// Vientos fuertes: wind- Alert
// Despejado: clear - day
// Soleado: Sun hot
// Tormentas aisladas: thunderdstorms-overcast- rain
// Parcialemente nublado: cloud-down
const ClimaVientoGOMInfoCard = ({ clima, viento }) => {
  const getClimaIcon = (weather) => {
    switch (weather) {
      case 'Parcialmente soleado':
        return 'partly-cloudy-day.svg'
      case 'Mayormente nublando':
        return 'overcast.svg'
      case 'Nublado':
        return 'cloudy.svg'
      case 'Vientos fuertes':
        return 'wind-alert.svg'
      case 'Despejado':
        return 'clear-day.svg'
      case 'Soleado':
        return 'dust-day.svg'
      case 'Tormentas aisladas':
        return 'thunderstorms-day-overcast-rain.svg'
      case 'Parcialmente nublado':
        return 'cloud-down.svg'
      default:
        return 'clear-day.svg'
    }
  }
  const getVientoIcon = (stake) => {
    if (stake >= 1 && stake <= 2) {
      return 'wind-beaufort-3.svg'
    } else if (stake >= 3 && stake <= 5) {
      return 'wind-beaufort-4.svg'
    } else if (stake >= 6 && stake <= 10) {
      return 'wind-beaufort-5.svg'
    } else if (stake >= 11 && stake <= 15) {
      return 'wind-beaufort-6.svg'
    } else if (stake >= 16 && stake <= 20) {
      return 'wind-beaufort-7.svg'
    } else if (stake >= 21 && stake <= 26) {
      return 'wind-beaufort-8.svg'
    } else if (stake >= 27 && stake <= 32) {
      return 'wind-beaufort-9.svg'
    } else if (stake >= 33) {
      return 'wind-beaufort-10.svg'
    } else {
      return 'wind-beaufort-0.svg'
    }
  }
  const getVientoColor = (stake) => {
    if (stake >= 1 && stake <= 2) {
      return '#2fb78a'
    } else if (stake >= 3 && stake <= 5) {
      return '#2fb78a'
    } else if (stake >= 6 && stake <= 10) {
      return '#2fb78a'
    } else if (stake >= 11 && stake <= 15) {
      return '#2eb323'
    } else if (stake >= 16 && stake <= 20) {
      return '#91b400'
    } else if (stake >= 21 && stake <= 26) {
      return '#d8b502'
    } else if (stake >= 27 && stake <= 32) {
      return '#dba408'
    } else if (stake >= 33) {
      return '#df9507'
    } else {
      return '#2fb9d1'
    }
  }
  const getVientoEscala = (stake) => {
    if (stake >= 1 && stake <= 2) {
      return 'Viento ligero'
    } else if (stake >= 3 && stake <= 5) {
      return 'Brisa muy débil'
    } else if (stake >= 6 && stake <= 10) {
      return 'Brisa débil'
    } else if (stake >= 11 && stake <= 15) {
      return 'Brisa moderada'
    } else if (stake >= 16 && stake <= 20) {
      return 'Brisa fresca'
    } else if (stake >= 21 && stake <= 26) {
      return 'Brisa fuerte'
    } else if (stake >= 27 && stake <= 32) {
      return 'Viento fuerte'
    } else if (stake >= 33) {
      return 'Temporal'
    } else {
      return 'Calma'
    }
  }
  return (
    <>
      <div className="col-6 p-0">
        <h5 className="card-title mb-0">
          <img
            src={require(`../assetsControl/${getClimaIcon(clima)}`)}
            alt={clima}
            style={{ width: '3em', height: '3em' }}
          />
          {clima}
        </h5>
      </div>
      <div className="col-6 text-right p-0">
        <div>
          <img
            src={require(`../assetsControl/${getVientoIcon(viento)}`)}
            alt={clima}
            style={{ width: '3em', height: '3em' }}
          />{' '}
          <Tag
            className=" p-2 text-900"
            // severity={}
            style={{ background: getVientoColor(viento) }}
          >
            <h5 className=" mb-0">{viento} Nudos</h5>
            <span>{getVientoEscala(viento)}</span>
          </Tag>
        </div>
      </div>
      {/* <Card className="border-0 w-100 p-0 shadow-none">
        <i
          className={getClimaIcon(clima)}
          style={{ fontSize: '3em', marginRight: '10px' }}
        ></i>

        <Message severity="info" text={`Clima: ${clima}`} />

        <Message severity="info" text={`Wind: ${viento} mph`} />
      </Card> */}
    </>
  )
}

export default ClimaVientoGOMInfoCard
