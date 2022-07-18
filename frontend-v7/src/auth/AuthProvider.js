import { useEffect, useState, createContext } from 'react'

const loggedUserJSON = window.localStorage.getItem('loggedMaroilAppUser')

const user1 = JSON.parse(loggedUserJSON)
export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  // const [user, setUser] = useState(null);

  const [user, setUser] = useState(user1 || null)

  const isLogged = () => !!user

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedMaroilAppUser')
  }
  const login = (user) => setUser(user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedMaroilAppUser')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const hasRole = (role) => user?.user.rol === role

  const contexValue = {
    user,
    isLogged,
    hasRole,
    logout,
    login
  }
  return (
    <AuthContext.Provider value={contexValue}>{children}</AuthContext.Provider>
  )
}
