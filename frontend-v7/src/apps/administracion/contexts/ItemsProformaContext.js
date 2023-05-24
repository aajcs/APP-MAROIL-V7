/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { ItemsProformaService } from '../services/ItemsProformaService'
import AuthUse from '../../../auth/AuthUse'
// import { CargaBodegaService } from '../services/CargaBodegaService'
export const ItemsProformaContext = createContext()

const ItemsProformaContextProvider = (props) => {
  const itemsProformaService = new ItemsProformaService()
  // const cargaBodegaService = new CargaBodegaService()

  const [itemsProformas, setItemsProformas] = useState([])
  const [createBodegaItemsProforma1, setCreateBodegaItemsProforma1] = useState(
    []
  )
  const [itemsProformacargando, setItemsProformacargando] = useState(null)
  const [editItemsProforma, setEditItemsProforma] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actuallizar, setActuallizar] = useState(null)

  const auth = AuthUse()
  const token = auth.user.token

  useEffect(() => {
    itemsProformaService.readAll(token).then((data) => {
      setItemsProformas(data)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      itemsProformaService.readAll(token).then((data) => {
        setItemsProformas(data)
        setLoading(false)
      })
      setActuallizar(actuallizar + 1)
    }, 600000)
    return () => {
      clearInterval(interval)
    }
  }, [actuallizar])

  useEffect(() => {
    const itemsProforma = itemsProformas.find(
      (p) => p.estatusItemsProforma === 'OPERATIVO'
    )
    setItemsProformacargando(itemsProforma)
  }, [itemsProformas])

  const findItemsProforma = (id) => {
    const itemsProforma = itemsProformas.find((p) => p.id === id)
    setEditItemsProforma(itemsProforma)
  }

  const createItemsProforma = (itemsProforma) => {
    itemsProformaService.create(itemsProforma, token).then((data) => {
      setItemsProformas([...itemsProformas, data.saveItemsProforma])
      createBodegaItemsProforma(data.saveItemsProforma)
      setCreateBodegaItemsProforma1(data.saveItemsProforma)
    })
  }
  const createBodegaItemsProforma = (saveItemsProforma) => {
    const cargaBodega = {
      itemsProformaID: saveItemsProforma.id,
      nombreBodega: '',
      estatusCargaBodega: 'CARGANDO',
      toneladasCargadasBodega: 0,
      toneladasCapacidadBodega: 0
    }

    // let i = 1

    // do {
    //   cargaBodega.nombreBodega = `BODEGA ${i}`
    //   cargaBodegaService.create(cargaBodega, token).then(i++)
    // } while (i <= saveItemsProforma.cantidadBodegas)
    for (let i = 1; i <= saveItemsProforma.cantidadBodegas; i++) {
      cargaBodega.nombreBodega = `BODEGA ${i}`
    }
    // itemsProformaService.create(CargaBodega, token).then((data) => {
    //   setItemsProformas([...itemsProformas, data.saveItemsProforma])
    //   console.log('itemsProforma creado', data.saveItemsProforma)
    // })
  }

  const updateItemsProforma = (itemsProforma) => {
    itemsProformaService
      .update(itemsProforma, token)
      .then((data) =>
        setItemsProformas(
          itemsProformas.map((p) =>
            p.id === itemsProforma.id ? data.updateItemsProforma : p
          )
        )
      )
    setEditItemsProforma(null)
  }
  const deleteItemsProforma = (id) => {
    itemsProformaService
      .delete(id, token)
      .then(() => setItemsProformas(itemsProformas.filter((p) => p.id !== id)))
  }

  return (
    <ItemsProformaContext.Provider
      value={{
        findItemsProforma,
        createItemsProforma,
        updateItemsProforma,
        deleteItemsProforma,
        editItemsProforma,
        itemsProformacargando,
        itemsProformas,
        loading,
        createBodegaItemsProforma1
      }}
    >
      {props.children}
    </ItemsProformaContext.Provider>
  )
}

export default ItemsProformaContextProvider
