/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { useContext, useEffect, useState } from 'react'
import { GanadorContext } from '../contexts/GanadorContext'
import SorteoCardRender from './SorteoCardRender'

const SorteoCard = () => {
  const { ganadors36 } = useContext(GanadorContext)
  const [aleatorio, setAleatorio] = useState([])
  const [count, setCount] = useState(10)
  console.log(count)
  // console.log(loading)
  console.log(aleatorio)
  const miArrayDesordenado = (ar) => ar.sort(() => Math.random() - 0.5)
  miArrayDesordenado(ganadors36)
  // console.log(ganadores32data)
  useEffect(() => {
    if (count >= 0) {
      const interval = setInterval(() => {
        console.log('This will run every second!')
        // setAleatorio(miArrayDesordenado(ganadors36))
        setCount((count) => count - 1)
        console.log(interval)
      }, 5000)

      // return () => clearInterval(interval)
    } else {
      setCount(10)
    }
  }, [])

  // let auxArr = []

  // const ganadores32 = () => {
  //   for (let i = 0; i < 31; i++) {
  //     const numAleatorio = Math.floor(Math.random() * ganadors.length)
  //     // console.log(ganadors[ganadores32])
  //     console.log('2')
  //     auxArr.push(ganadors[numAleatorio])
  //   }

  //   // ganadors.forEach((dataset, i) => {
  //   //   const ganadores32 = Math.floor(Math.random() * ganadors.length)
  //   //   console.log(ganadors[ganadores32])
  //   // })
  // }
  // // const arr = []
  // // const total = 32

  // // for (let i = 0; i < total; i++) {
  // //   const ganadores32 = Math.floor(Math.random() * ganadors.length)
  // //   console.log(ganadors[ganadores32])
  // //   arr.push(ganadors[ganadores32])
  // // }

  // // console.log(arr) // 👉️ ['a', 'a', 'a']

  // // const excuseGenerator = (ganadors) => {
  // //   const ganadores32 = Math.floor(Math.random() * ganadors.length)

  // //   return console.log(ganadors[ganadores32])
  // // }
  // // excuseGenerator(ganadors)

  return (
    <div className="grid  ">
      <p>You clicked {count} times</p>
      {count >= 0 &&
        ganadors36 &&
        ganadors36.length !== 0 &&
        ganadors36.map(
          (data, i) => i < 36 && <SorteoCardRender data={data} key={data.id} />
        )}
    </div>
  )
}

export default SorteoCard
