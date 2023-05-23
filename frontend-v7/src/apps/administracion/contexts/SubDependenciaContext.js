/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { SubDependenciaService } from '../services/SubDependenciaService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const SubDependenciaContext = createContext()

const SubDependenciaContextProvider = (props) => {
  const subDependenciaService = new SubDependenciaService()
  // const cargaBodegaService = new CargaBodegaService()

  const [subDependencias, setSubDependencias] = useState([])
  const [createBodegaSubDependencia1, setCreateBodegaSubDependencia1] =
    useState([])
  const [subDependenciacargando, setSubDependenciacargando] = useState(null)
  const [editSubDependencia, setEditSubDependencia] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    subDependenciaService.readAll(token).then((data) => {
      setSubDependencias(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      subDependenciaService.readAll(token).then((data) => {
        setSubDependencias(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const subDependencia = subDependencias.find(
      (p) => p.estatusSubDependencia === 'OPERATIVO'
    )
    setSubDependenciacargando(subDependencia)
  }, [subDependencias])

  const findSubDependencia = (id) => {
    const subDependencia = subDependencias.find((p) => p.id === id)
    setEditSubDependencia(subDependencia)
  }

  const createSubDependencia = (subDependencia) => {
    subDependenciaService.create(subDependencia, token).then((data) => {
      setSubDependencias([...subDependencias, data.saveSubDependencia])
      createBodegaSubDependencia(data.saveSubDependencia)
      setCreateBodegaSubDependencia1(data.saveSubDependencia)
    })
  }
  const createBodegaSubDependencia = (saveSubDependencia) => {
    const cargaBodega = {
      subDependenciaID: saveSubDependencia.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveSubDependencia.cantidadBodegas)
    for (let i = 1; i <= saveSubDependencia.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // subDependenciaService.create(CargaBodega, token).then((data) => {
    //   setSubDependencias([...subDependencias, data.saveSubDependencia])
    //   console.log('subDependencia creado', data.saveSubDependencia)
    // })
  }

  const updateSubDependencia = (subDependencia) => {
    subDependenciaService
      .update(subDependencia, token)
      .then((data) =>
        setSubDependencias(
          subDependencias.map((p) =>
            p.id === subDependencia.id ? data.updateSubDependencia : p
          )
        )
      )
    setEditSubDependencia(null)
  }
  const deleteSubDependencia = (id) => {
    subDependenciaService
      .delete(id, token)
      .then(() =>
        setSubDependencias(subDependencias.filter((p) => p.id !== id))
      )
  }

  return (
    <SubDependenciaContext.Provider
      value={{
        findSubDependencia,
        createSubDependencia,
        updateSubDependencia,
        deleteSubDependencia,
        editSubDependencia,
        subDependenciacargando,
        subDependencias,
        loading,
        createBodegaSubDependencia1
      }}
    >
      {props.children}
    </SubDependenciaContext.Provider>
  )
}

export default SubDependenciaContextProvider
