import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

export default function MuseAuth() {
  return useContext(AuthContext)
}
