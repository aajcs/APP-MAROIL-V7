import InicioInfo from '../components/InicioInfo'
import CargaViajeContextProvider from '../contexts/CargaViajeContext'
import TanqueAuxContextProvider from '../contexts/TanqueAuxContext'
import ViajeAuxContextProvider from '../contexts/ViajeAuxContext'
import ViajeContextProvider from '../contexts/ViajeContext'

export const InicioInfoPage = () => {
  return (
    <div className="grid">
      <ViajeAuxContextProvider>
        <CargaViajeContextProvider>
          <TanqueAuxContextProvider>
            <ViajeContextProvider>
              <InicioInfo />
            </ViajeContextProvider>
          </TanqueAuxContextProvider>
        </CargaViajeContextProvider>
      </ViajeAuxContextProvider>
    </div>
  )
}
