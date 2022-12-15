// import { useEffect, useState } from 'react'
import SorteoCard from '../components/SorteoCard'
import GanadorPageContextProvider from '../contexts/GanadorContext'

export const HomeProura = () => {
  // const personalMaroil2 = [
  //   'enero',
  //   'febrero',
  //   'marzo',
  //   'abril',
  //   'mayo',
  //   'junio',
  //   'julio',
  //   'agosto',
  //   'septiembre',
  //   'octubre',
  //   'noviembre',
  //   'diciembre',
  //   'enero',
  //   'febrero',
  //   'marzo',
  //   'abril',
  //   'mayo',
  //   'junio',
  //   'julio',
  //   'agosto',
  //   'septiembre',
  //   'octubre',
  //   'noviembre',
  //   'diciembre',
  //   'enero',
  //   'febrero',
  //   'marzo',
  //   'abril',
  //   'mayo',
  //   'junio',
  //   'julio',
  //   'agosto',
  //   'septiembre',
  //   'octubre',
  //   'noviembre',
  //   'diciembre'
  // ]
  // const [personalMaroilData, setPersonalMaroilData] = useState()
  // // setInterval(() => {
  // //   setPersonalMaroilData(personalMaroil)
  // // }, 1000)
  // // return () => {
  // //   personalMaroil.map((personalMaroil) => (
  // //     <SorteoCardRender data={personalMaroil} key={personalMaroil} />
  // //   ))

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setPersonalMaroilData(personalMaroil2)
  //     console.log('aqui')
  //   }, 3000)

  //   return () => clearInterval(intervalId)
  // }, [])
  // const deleteBarcoDialogFooter = () => (
  //   <>
  //     {personalMaroil.map((personalMaroil) => (
  //       <SorteoCardRender data={personalMaroil} key={personalMaroil} />
  //     ))}
  //   </>
  // )

  return (
    <div className="grid">
      <GanadorPageContextProvider>
        <SorteoCard />
      </GanadorPageContextProvider>
    </div>
  )
}
