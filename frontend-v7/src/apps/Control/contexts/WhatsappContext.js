/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'
import { WhatsappService } from '../services/WhatsappService.js'
export const WhatsappContext = createContext()

const WhatsappContextProvider = (props) => {
  const whatsappService = new WhatsappService()

  const [whatsapps, setWhatsapps] = useState([])

  const createWhatsapp = (toValor, nameValor, textValor) => {
    whatsappService
      .create(toValor, nameValor, textValor)
      .then((data) => setWhatsapps([...whatsapps, data.saveWhatsapp]))
  }
  const createWhatsappSolicitudFondo = (
    toValor,
    nameValor,
    textValor,
    textbody
  ) => {
    whatsappService
      .createSolicitudFondo(toValor, nameValor, textValor, textbody)
      .then((data) => setWhatsapps([...whatsapps, data.saveWhatsapp]))
  }

  return (
    <WhatsappContext.Provider
      value={{
        createWhatsapp,
        createWhatsappSolicitudFondo,
        whatsapps
      }}
    >
      {props.children}
    </WhatsappContext.Provider>
  )
}

export default WhatsappContextProvider
