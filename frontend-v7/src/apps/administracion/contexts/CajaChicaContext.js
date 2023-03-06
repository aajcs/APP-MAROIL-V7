/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { CajaChicaService } from '../services/CajaChicaService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const CajaChicaContext = createContext()

const CajaChicaContextProvider = (props) => {
  const cajaChicaService = new CajaChicaService()
  // const cargaBodegaService = new CargaBodegaService()

  const [cajaChicas, setCajaChicas] = useState([])
  const [createBodegaCajaChica1, setCreateBodegaCajaChica1] = useState([])
  const [cajaChicacargando, setCajaChicacargando] = useState(null)
  const [editCajaChica, setEditCajaChica] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    cajaChicaService.readAll(token).then((data) => {
      setCajaChicas(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      cajaChicaService.readAll(token).then((data) => {
        setCajaChicas(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const cajaChica = cajaChicas.find((p) => p.estatusCajaChica === 'OPERATIVO')
    setCajaChicacargando(cajaChica)
  }, [cajaChicas])

  const findCajaChica = (id) => {
    const cajaChica = cajaChicas.find((p) => p.id === id)
    setEditCajaChica(cajaChica)
  }

  const createCajaChica = (cajaChica) => {
    cajaChicaService.create(cajaChica, token).then((data) => {
      setCajaChicas([...cajaChicas, data.saveCajaChica])
      createBodegaCajaChica(data.saveCajaChica)
      setCreateBodegaCajaChica1(data.saveCajaChica)
    })
  }
  const createBodegaCajaChica = (saveCajaChica) => {
    const cargaBodega = {
      cajaChicaID: saveCajaChica.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveCajaChica.cantidadBodegas)
    for (let i = 1; i <= saveCajaChica.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // cajaChicaService.create(CargaBodega, token).then((data) => {
    //   setCajaChicas([...cajaChicas, data.saveCajaChica])
    //   console.log('cajaChica creado', data.saveCajaChica)
    // })
  }

  const updateCajaChica = (cajaChica) => {
    cajaChicaService
      .update(cajaChica, token)
      .then((data) =>
        setCajaChicas(
          cajaChicas.map((p) =>
            p.id === cajaChica.id ? data.updateCajaChica : p
          )
        )
      )
    setEditCajaChica(null)
  }
  const deleteCajaChica = (id) => {
    cajaChicaService
      .delete(id, token)
      .then(() => setCajaChicas(cajaChicas.filter((p) => p.id !== id)))
  }

  return (
    <CajaChicaContext.Provider
      value={{
        findCajaChica,
        createCajaChica,
        updateCajaChica,
        deleteCajaChica,
        editCajaChica,
        cajaChicacargando,
        cajaChicas,
        loading,
        createBodegaCajaChica1
      }}
    >
      {props.children}
    </CajaChicaContext.Provider>
  )
}

export default CajaChicaContextProvider
