import { useEffect, useState } from 'react'
import SorteoCardRender from '../components/SorteoCardRender'

export const HomeProura = () => {
  const personalMaroil2 = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ]
  const [personalMaroilData, setPersonalMaroilData] = useState()
  // setInterval(() => {
  //   setPersonalMaroilData(personalMaroil)
  // }, 1000)
  // return () => {
  //   personalMaroil.map((personalMaroil) => (
  //     <SorteoCardRender data={personalMaroil} key={personalMaroil} />
  //   ))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPersonalMaroilData(personalMaroil2)
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])
  // const deleteBarcoDialogFooter = () => (
  //   <>
  //     {personalMaroil.map((personalMaroil) => (
  //       <SorteoCardRender data={personalMaroil} key={personalMaroil} />
  //     ))}
  //   </>
  // )

  return (
    <div className="grid">
      {/* <h1>Sorteo Diciembre 2022</h1> */}
      {personalMaroilData &&
        personalMaroilData.map((personalMaroil) => (
          <SorteoCardRender data={personalMaroil} key={personalMaroil} />
        ))}
    </div>
  )
}
