import ViajeInfo from '../components/ViajeInfo'
import CargaViajeContextProvider from '../contexts/CargaViajeContext'
import ViajeContextProvider from '../contexts/ViajeContext'

export const ViajeInfoPage = () => {
  return (
    <div className="grid">
      <CargaViajeContextProvider>
        <ViajeContextProvider>
          <ViajeInfo />
        </ViajeContextProvider>
      </CargaViajeContextProvider>
    </div>
  )
}
