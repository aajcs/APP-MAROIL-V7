/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { VolumetriaService } from '../services/VolumetriaService.js'
import AuthUse from '../../../auth/AuthUse'
export const VolumetriaContext = createContext()

const VolumetriaContextProvider = (props) => {
  const volumetriaService = new VolumetriaService()

  const [volumetrias, setVolumetrias] = useState([])
  const [editVolumetria, setEditVolumetria] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)
  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    volumetriaService.readAll(token).then((data) => {
      setVolumetrias(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      volumetriaService.readAll(token).then((data) => {
        setVolumetrias(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  const findVolumetria = (id) => {
    const volumetria = volumetrias.find((p) => p.id === id)
    setEditVolumetria(volumetria)
  }

  const createVolumetria = (volumetria) => {
    volumetriaService
      .create(volumetria, token)
      .then((data) => setVolumetrias([...volumetrias, data.saveVolumetria]))
  }

  const updateVolumetria = (volumetria) => {
    volumetriaService
      .update(volumetria, token)
      .then((data) =>
        setVolumetrias(
          volumetrias.map((p) =>
            p.id === volumetria.id ? data.updateVolumetria : p
          )
        )
      )
    setEditVolumetria(null)
  }

  const deleteVolumetria = (id) => {
    volumetriaService
      .delete(id, token)
      .then(() => setVolumetrias(volumetrias.filter((p) => p.id !== id)))
  }

  return (
    <VolumetriaContext.Provider
      value={{
        findVolumetria,
        createVolumetria,
        updateVolumetria,
        deleteVolumetria,
        setEditVolumetria,
        editVolumetria,
        volumetrias,
        loading
      }}
    >
      {props.children}
    </VolumetriaContext.Provider>
  )
}

export default VolumetriaContextProvider
