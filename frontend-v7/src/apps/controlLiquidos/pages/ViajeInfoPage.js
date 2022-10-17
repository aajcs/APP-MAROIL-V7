import ViajeInfo from '../components/ViajeInfo'
import CargaViajeContextProvider from '../contexts/CargaViajeContext'
import GastosOperacionaleContextProvider from '../contexts/GastosOperacionaleContext'
import TanqueAuxContextProvider from '../contexts/TanqueAuxContext'
import ViajeAuxContextProvider from '../contexts/ViajeAuxContext'
import ViajeContextProvider from '../contexts/ViajeContext'

export const ViajeInfoPage = () => {
  return (
    <div className="grid">
      <ViajeAuxContextProvider>
        <GastosOperacionaleContextProvider>
          <CargaViajeContextProvider>
            <TanqueAuxContextProvider>
              <ViajeContextProvider>
                <ViajeInfo />
              </ViajeContextProvider>
            </TanqueAuxContextProvider>
          </CargaViajeContextProvider>
        </GastosOperacionaleContextProvider>
      </ViajeAuxContextProvider>
    </div>
  )
}
