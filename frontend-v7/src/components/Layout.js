/* eslint-disable react/prop-types */
import { AppFooter } from '../components/AppFooter'
import { AppTopbar } from './AppTopbar'
import AuthUse from '../auth/AuthUse'

// import Navigation from "../components/Navigation";

export default function Layout({ children }) {
  const auth = AuthUse()
  return (
    <>
      {auth.isLogged() && <AppTopbar />}
      {children}
      <AppFooter />
    </>
  )
}
