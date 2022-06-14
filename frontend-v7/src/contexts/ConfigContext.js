/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, createContext } from 'react'

export const ConfigContext = createContext()

export default function ConfigProvider({ children }) {
  // const [user, setUser] = useState(null);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false)
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false)
  const [layoutMode, setLayoutMode] = useState('static')
  let menuClick = false
  let mobileTopbarMenuClick = false
  const onToggleMenuClick = (event) => {
    menuClick = true

    if (layoutMode === 'static') {
      setStaticMenuInactive((prevState) => !prevState)
    }

    // event.preventDefault()
  }
  const onMobileTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true

    setMobileTopbarMenuActive((prevState) => !prevState)
    // event.preventDefault()
  }
  const isDesktop = () => {
    return window.innerWidth <= 992
  }
  const contexValue = {
    staticMenuInactive,
    onToggleMenuClick,
    mobileTopbarMenuActive,
    onMobileTopbarMenuClick
  }
  return (
    <ConfigContext.Provider value={contexValue}>
      {children}
    </ConfigContext.Provider>
  )
}
