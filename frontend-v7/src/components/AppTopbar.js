/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */

import { useCallback, useContext, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import classNames from 'classnames'
import AuthUse from '../auth/AuthUse'
import { ConfigContext } from '../contexts/ConfigContext'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import logo2023Plateado from '../assets/logo2023Plateado.png'

export const AppTopbar = (props) => {
  const [visibleRight, setVisibleRight] = useState(false)
  const [scale, setScale] = useState(14)
  const [scales] = useState([12, 13, 14, 15, 16])
  const [theme, setTheme] = useState('bootstrap4-dark-blue')
  const auth = AuthUse()
  const { onToggleMenuClick, onMobileTopbarMenuClick, mobileTopbarMenuActive } =
    useContext(ConfigContext)
  useEffect(() => {
    document.documentElement.style.fontSize = scale + 'px'
  }, [scale])

  const decrementScale = () => {
    setScale((prevState) => --prevState)
  }

  const incrementScale = () => {
    setScale((prevState) => ++prevState)
  }
  const replaceLink = useCallback((linkElement, href, callback) => {
    if (isIE()) {
      linkElement.setAttribute('href', href)

      if (callback) {
        callback()
      }
    } else {
      const id = linkElement.getAttribute('id')
      const cloneLinkElement = linkElement.cloneNode(true)

      cloneLinkElement.setAttribute('href', href)
      cloneLinkElement.setAttribute('id', id + '-clone')

      linkElement.parentNode.insertBefore(
        cloneLinkElement,
        linkElement.nextSibling
      )

      cloneLinkElement.addEventListener('load', () => {
        linkElement.remove()
        cloneLinkElement.setAttribute('id', id)

        if (callback) {
          callback()
        }
      })
    }
  }, [])
  useEffect(() => {
    let themeElement = document.getElementById('theme-link')
    const themeHref =
      process.env.PUBLIC_URL + '/assets/themes/' + theme + '/theme.css'
    replaceLink(themeElement, themeHref)
  }, [theme, replaceLink])
  const isIE = () => {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent)
  }
  const changeTheme = (e, theme, scheme) => {
    setTheme(theme)
  }
  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        <img src={logo2023Plateado} alt="logo" />

        <span>Maroil Trading System</span>
      </Link>

      <button
        type="button"
        className="p-link  layout-menu-button layout-topbar-button"
        onClick={onToggleMenuClick}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={onMobileTopbarMenuClick}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <div className="layout-config" id={'layout-config'}>
          <div className="layout-config-content">
            <h5 className="mt-0">Component Scale</h5>
            <div className="config-scale">
              <Button
                icon="pi pi-minus"
                onClick={decrementScale}
                className="p-button-text"
                disabled={scale === scales[0]}
              />
              {scales.map((item) => {
                return (
                  <i
                    className={classNames('pi pi-circle-on', {
                      'scale-active': item === scale
                    })}
                    key={item}
                  />
                )
              })}
              <Button
                icon="pi pi-plus"
                onClick={incrementScale}
                className="p-button-text"
                disabled={scale === scales[scales.length - 1]}
              />
            </div>

            <h5>Themes</h5>
            <div className="grid free-themes">
              <div className="col-3 text-center">
                <button
                  className="p-link"
                  onClick={(e) =>
                    changeTheme(e, 'bootstrap4-light-blue', 'light')
                  }
                >
                  <img
                    src={require('../assets/bootstrap4-light-blue.svg').default}
                    alt="Bootstrap Light Blue"
                  />
                </button>
              </div>

              <div className="col-3 text-center">
                <button
                  className="p-link"
                  onClick={(e) =>
                    changeTheme(e, 'bootstrap4-dark-blue', 'dark')
                  }
                >
                  <img
                    src={require('../assets/bootstrap4-dark-blue.svg').default}
                    alt="Bootstrap Dark Blue"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
      <button
        className="p-link layout-topbar-button"
        onClick={() => setVisibleRight(true)}
      >
        <i className="pi pi-cog" />
        <span>Settings</span>
      </button>

      <ul
        className={classNames('layout-topbar-menu lg:flex origin-top', {
          'layout-topbar-menu-mobile-active': mobileTopbarMenuActive
        })}
      >
        {auth.isLogged() && (
          <li>
            <NavLink to="/apps" className="p-link layout-topbar-button">
              <i className="pi pi-microsoft" />
              <span>APPS</span>
            </NavLink>
          </li>
        )}
        {!auth.isLogged() && (
          <li>
            <NavLink to="/login" className="p-link layout-topbar-button">
              <i className="pi pi-user-plus" />
              <span>APPS</span>
            </NavLink>
            hola
          </li>
        )}
        {auth.isLogged() && (
          <li>
            <button
              className="p-link layout-topbar-button"
              onClick={auth.logout}
            >
              <i className="pi pi-user-minus pr-1" />
              <span>Settings</span> {auth.user.faidUser.user}
            </button>
          </li>
        )}
      </ul>
      {/* {auth.isLogged() && <h6>{auth.user.faidUser.user}</h6>} */}
    </div>
  )
}
