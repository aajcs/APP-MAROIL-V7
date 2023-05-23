/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { DependenciaService } from '../services/DependenciaService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const DependenciaContext = createContext()

const DependenciaContextProvider = (props) => {
  const dependenciaService = new DependenciaService()
  // const cargaBodegaService = new CargaBodegaService()

  const [dependencias, setDependencias] = useState([])
  const [createBodegaDependencia1, setCreateBodegaDependencia1] = useState([])
  const [dependenciacargando, setDependenciacargando] = useState(null)
  const [editDependencia, setEditDependencia] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    dependenciaService.readAll(token).then((data) => {
      setDependencias(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      dependenciaService.readAll(token).then((data) => {
        setDependencias(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const dependencia = dependencias.find(
      (p) => p.estatusDependencia === 'OPERATIVO'
    )
    setDependenciacargando(dependencia)
  }, [dependencias])

  const findDependencia = (id) => {
    const dependencia = dependencias.find((p) => p.id === id)
    setEditDependencia(dependencia)
  }

  const createDependencia = (dependencia) => {
    dependenciaService.create(dependencia, token).then((data) => {
      setDependencias([...dependencias, data.saveDependencia])
      createBodegaDependencia(data.saveDependencia)
      setCreateBodegaDependencia1(data.saveDependencia)
    })
  }
  const createBodegaDependencia = (saveDependencia) => {
    const cargaBodega = {
      dependenciaID: saveDependencia.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveDependencia.cantidadBodegas)
    for (let i = 1; i <= saveDependencia.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // dependenciaService.create(CargaBodega, token).then((data) => {
    //   setDependencias([...dependencias, data.saveDependencia])
    //   console.log('dependencia creado', data.saveDependencia)
    // })
  }

  const updateDependencia = (dependencia) => {
    dependenciaService
      .update(dependencia, token)
      .then((data) =>
        setDependencias(
          dependencias.map((p) =>
            p.id === dependencia.id ? data.updateDependencia : p
          )
        )
      )
    setEditDependencia(null)
  }
  const deleteDependencia = (id) => {
    dependenciaService
      .delete(id, token)
      .then(() => setDependencias(dependencias.filter((p) => p.id !== id)))
  }

  return (
    <DependenciaContext.Provider
      value={{
        findDependencia,
        createDependencia,
        updateDependencia,
        deleteDependencia,
        editDependencia,
        dependenciacargando,
        dependencias,
        loading,
        createBodegaDependencia1
      }}
    >
      {props.children}
    </DependenciaContext.Provider>
  )
}

export default DependenciaContextProvider
