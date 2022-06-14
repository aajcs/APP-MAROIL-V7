import './layout/flags/flags.css'
import './layout/layout.scss'
import './App.scss'
// import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'moment/locale/es'
import 'animate.css/animate.min.css'
import './styles/styles.css'

import AuthProvider from './auth/AuthProvider'
import AppRouter from './routes/AppRouter'
import ConfigProvider from './contexts/ConfigContext'

function App() {
  return (
    <div>
      <AuthProvider>
        <ConfigProvider>
          <AppRouter />
        </ConfigProvider>
      </AuthProvider>
    </div>
  )
}

export default App
