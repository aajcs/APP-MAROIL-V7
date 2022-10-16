import ViajeInfo from '../components/ViajeInfo'
import CargaViajeContextProvider from '../contexts/CargaViajeContext'
import TanqueAuxContextProvider from '../contexts/TanqueAuxContext'
import ViajeAuxContextProvider from '../contexts/ViajeAuxContext'
import ViajeContextProvider from '../contexts/ViajeContext'

export const ViajeInfoPage = () => {
  return (
    <div className="grid">
      <ViajeAuxContextProvider>
        <CargaViajeContextProvider>
          <TanqueAuxContextProvider>
            <ViajeContextProvider>
              <ViajeInfo />
            </ViajeContextProvider>
          </TanqueAuxContextProvider>
        </CargaViajeContextProvider>
      </ViajeAuxContextProvider>
    </div>
  )
}
