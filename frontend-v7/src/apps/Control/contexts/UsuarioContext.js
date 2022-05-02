/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { UsuarioService } from '../services/UsuarioService'
import AuthUse from '../../../auth/AuthUse'
export const UsuarioContext = createContext()

const UsuarioContextProvider = (props) => {
  const usuarioService = new UsuarioService()

  const [usuarios, setUsuarios] = useState([])
  const [editUsuario, setEditUsuario] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    usuarioService.readAll(token).then((data) => {
      setUsuarios(data)
      setLoading(false)
    })
  }, [])

  const findUsuario = (id) => {
    const usuario = usuarios.find((p) => p.id === id)
    setEditUsuario(usuario)
  }

  const createUsuario = (usuario) => {
    usuarioService
      .create(usuario, token)
      .then((data) => setUsuarios([...usuarios, data.saveUsuario]))
  }

  const updateUsuario = (usuario) => {
    usuarioService
      .update(usuario, token)
      .then((data) =>
        setUsuarios(
          usuarios.map((p) => (p.id === usuario.id ? data.updateUsuario : p))
        )
      )
    setEditUsuario(null)
  }

  const deleteUsuario = (id) => {
    usuarioService
      .delete(id, token)
      .then(() => setUsuarios(usuarios.filter((p) => p.id !== id)))
  }

  return (
    <UsuarioContext.Provider
      value={{
        findUsuario,
        createUsuario,
        updateUsuario,
        deleteUsuario,
        editUsuario,
        usuarios,
        loading
      }}
    >
      {props.children}
    </UsuarioContext.Provider>
  )
}

export default UsuarioContextProvider
