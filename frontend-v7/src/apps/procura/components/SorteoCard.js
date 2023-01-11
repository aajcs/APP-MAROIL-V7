/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { useContext, useEffect, useState } from 'react'
import { GanadorContext } from '../contexts/GanadorContext'
import SorteoCardRender from './SorteoCardRender'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import logomaroil from '../../../assets/logomaroil.png'
const SorteoCard = () => {
  const initialGanadorForm = {
    id: null,
    nombreGanador: '',
    estatusGanador: ''
  }
  const { ganadors36, updateGanador } = useContext(GanadorContext)
  const [aleatorio, setAleatorio] = useState([])
  const [ganadorFinal, setGanadorFinal] = useState([])
  const [count, setCount] = useState(0)
  const [loading1, setLoading1] = useState(false)
  const [ganadorData, setGanadorData] = useState(initialGanadorForm)
  const ganadors36Fill = ganadors36.filter(
    (p) => p.estatusGanador === 'concursante' && p
  )

  const onLoadingClick1 = () => {
    setLoading1(true)
    setCount(10)
    setTimeout(() => {
      setLoading1(false)

      ganadorFinalFunc()
      setCount(0)
    }, 4000)
  }
  const ganadorFinalFunc = () => {
    const numAleatorio = Math.floor(Math.random() * ganadors36Fill.length)
    // console.log(ganadors36[numAleatorio].nombreGanador)
    setGanadorFinal(ganadors36Fill[numAleatorio].nombreGanador)
    updateField(ganadors36Fill[numAleatorio].nombreGanador, 'nombreGanador')

    saveGanador(ganadors36Fill[numAleatorio])
    setCount(0)
  }
  // console.log(count)
  // console.log(loading)
  // console.log(aleatorio)
  const miArrayDesordenado = (ar) => ar.sort(() => Math.random() - 0.5)
  miArrayDesordenado(ganadors36)
  // console.log(ganadores32data)
  useEffect(() => {
    if (count >= 0) {
      const interval = setInterval(() => {
        // console.log('This will run every second!')
        // setAleatorio(miArrayDesordenado(ganadors36))
        setCount((count) => count - 1)
        // console.log(interval)
      }, 4000)

      // return () => clearInterval(interval)
    } else {
      setCount(10)
    }
  }, [])
  const saveGanador = (e) => {
    // updateGanador(ganadorData)
    updateGanador({
      ...e,
      estatusGanador: 'ganador'
    })

    // setGanadorData(initialGanadorForm)
  }
  const updateField = (data, field) => {
    setGanadorData({
      ...ganadorData,
      [field]: data
    })
  }
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
      {' '}
      {loading1 &&
        count >= 0 &&
        ganadors36 &&
        ganadors36.length !== 0 &&
        ganadors36.map(
          (data, i) => i < 48 && <SorteoCardRender data={data} key={data.id} />
        )}
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          overflow: 'hidden',
          bottom: '-30%',
          'margin-left': '9%',
          'padding-left': '30%'
        }}
      >
        <Button
          // label={ganadorFinal}
          // icon="pi pi-box"
          loading={loading1}
          onClick={onLoadingClick1}
          className="cardAPPS p-button-rounded p-button-success p-button-lg"
          aria-label="Search"
          style={{
            width: '400px',
            height: '400px',
            'border-radius': '50%',
            position: 'absolute',
            'font-size': '30px',
            background: '#9a9888',
            'border-width': 0
          }}
        >
          {!loading1 && ganadorFinal.length !== 0 && (
            <>
              <img
                src={logomaroil}
                height="100px"
                alt="logo"
                style={{
                  height: '30%',
                  width: '55%',
                  position: 'absolute',
                  overflow: 'hidden',
                  bottom: '59%',
                  'margin-left': '6%',
                  'padding-left': '26%'
                }}
              />
              <h1
                className="  animate__animated animate__slideInRight animate__slower "
                style={{
                  height: '30%',
                  width: '100%',
                  position: 'absolute',
                  overflow: 'hidden',
                  bottom: '12%',
                  'font-size': '30px',
                  'margin-left': '0%'
                  // color: '#0c04f7'
                }}
              >
                {ganadorFinal}
              </h1>
            </>
          )}
          {!loading1 && ganadorFinal.length === 0 && (
            <>
              <img
                src={logomaroil}
                height="100px"
                alt="logo"
                style={{
                  height: '30%',
                  width: '55%',
                  position: 'absolute',
                  overflow: 'hidden',
                  bottom: '35%',
                  'margin-left': '7%',
                  'padding-left': '26%'
                }}
              />
            </>
          )}
        </Button>
      </div>
      {/* <p>You clicked {count} times</p> */}
    </div>
  )
}

export default SorteoCard
