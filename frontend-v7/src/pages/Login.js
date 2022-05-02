import React, { useRef, useState } from 'react'
// import { UsuarioService } from '../service/UsuarioService'
import { Button } from 'primereact/button'

import { InputText } from 'primereact/inputtext'
import AuthUse from '../auth/AuthUse'
import login from '../service/loginService'
import { Toast } from 'primereact/toast'
import logomaroil from '../assets/logomaroil.png'

export default function Login() {
  const toast = useRef(null)
  const auth = AuthUse()

  const showSuccess = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Mensaje del Sistema',
      detail: 'Usuario o Clave Invalido',
      life: 3000
    })
  }
  const [user, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line no-unused-vars

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const faidUser = await login.login({
        user,
        password
      })
      window.localStorage.setItem(
        'loggedMaroilAppUser',
        JSON.stringify(faidUser)
      )
      auth.login(faidUser)
      setUsername('')
      setPassword('')
    } catch (error) {
      showSuccess()
      setUsername('')
      setPassword('')
    }
  }
  return (
    <div className="layout-main-container justify-content-center">
      <Toast ref={toast} />
      <div className="flex align-items-center justify-content-center animate__animated animate__backInUp ">
        <div className="surface-card p-4 shadow-2 border-round w-full  lg:w-4   ">
          <form onSubmit={handleLogin}>
            <div className="text-center mb-5">
              <img src={logomaroil} height="100px" alt="logo" />
              <div className="text-900 text-6xl font-medium mb-3">
                Bienvenido
              </div>
            </div>

            <div>
              <label
                htmlFor="user"
                className="block text-900 text-4xl font-medium mb-2"
              >
                Usuario
              </label>
              <InputText
                id="user"
                type="text"
                value={user}
                className="w-full mb-3"
                onChange={({ target }) => setUsername(target.value)}
              />

              <label
                htmlFor="password"
                className="block text-900 text-4xl font-medium mb-2"
              >
                Contraseña
              </label>
              <InputText
                id="password"
                type="password"
                value={password}
                className="w-full mb-3"
                onChange={({ target }) => setPassword(target.value)}
              />

              <Button
                label="Ingresar"
                icon="pi pi-user"
                className="w-full"
                // onClick={() => auth.login()}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
