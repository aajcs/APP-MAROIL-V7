import InicioInfo from '../components/InicioInfo'
import CargaViajeContextProvider from '../contexts/CargaViajeContext'
import GastosOperacionaleContextProvider from '../contexts/GastosOperacionaleContext'
import TanqueAuxContextProvider from '../contexts/TanqueAuxContext'
import ViajeAuxContextProvider from '../contexts/ViajeAuxContext'
import ViajeContextProvider from '../contexts/ViajeContext'

export const InicioInfoPage = () => {
  return (
    <div className="grid">
      <ViajeAuxContextProvider>
        <GastosOperacionaleContextProvider>
          <CargaViajeContextProvider>
            <TanqueAuxContextProvider>
              <ViajeContextProvider>
                <InicioInfo />
              </ViajeContextProvider>
            </TanqueAuxContextProvider>
          </CargaViajeContextProvider>
        </GastosOperacionaleContextProvider>
      </ViajeAuxContextProvider>
    </div>
  )
}
