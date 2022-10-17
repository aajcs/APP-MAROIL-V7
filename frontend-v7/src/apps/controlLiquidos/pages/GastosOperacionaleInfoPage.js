import GastosOperacionaleInfo from '../components/GastosOperacionaleInfo'
import GastosOperacionaleContextProvider from '../contexts/GastosOperacionaleContext'

export const GastosOperacionaleInfoPage = () => {
  return (
    <div className="grid">
      <GastosOperacionaleContextProvider>
        <GastosOperacionaleInfo />
      </GastosOperacionaleContextProvider>
    </div>
  )
}
