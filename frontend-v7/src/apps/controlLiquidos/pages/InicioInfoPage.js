/* eslint-disable no-unused-vars */
import InicioInfo from '../components/InicioInfo'
import ReporteCargaBuqueInfo from '../components/ReporteCargaBuqueInfo'
import BuqueContextProvider from '../contexts/BuqueContext'
import CargaViajeContextProvider from '../contexts/CargaViajeContext'
import GastosOperacionaleContextProvider from '../contexts/GastosOperacionaleContext'
import ReporteCargaBuqueContextProvider from '../contexts/ReporteCargaBuqueContext'
import TanqueAuxContextProvider from '../contexts/TanqueAuxContext'
import ViajeAuxContextProvider from '../contexts/ViajeAuxContext'
import ViajeContextProvider from '../contexts/ViajeContext'

export const InicioInfoPage = () => {
  return (
    <div className="grid">
      <BuqueContextProvider>
        <ReporteCargaBuqueContextProvider>
          <ReporteCargaBuqueInfo />
        </ReporteCargaBuqueContextProvider>
      </BuqueContextProvider>
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
