import CargaInformacionPanel from '../components/CargaInformacionPanel'
import CargaViajeContextProvider from '../contexts/CargaViajeContext'

import EmbarcacionContextProvider from '../contexts/EmbarcacionContext'
import GastosOperacionaleContextProvider from '../contexts/GastosOperacionaleContext'
import RemolcadorContextProvider from '../contexts/RemolcadorContext'
import TanqueAuxContextProvider from '../contexts/TanqueAuxContext'
import ViajeAuxContextProvider from '../contexts/ViajeAuxContext'
import ViajeContextProvider from '../contexts/ViajeContext'

export const CargaInformacionPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <ViajeAuxContextProvider>
            <EmbarcacionContextProvider>
              <RemolcadorContextProvider>
                <ViajeContextProvider>
                  <TanqueAuxContextProvider>
                    <CargaViajeContextProvider>
                      <GastosOperacionaleContextProvider>
                        <CargaInformacionPanel />
                      </GastosOperacionaleContextProvider>
                    </CargaViajeContextProvider>
                  </TanqueAuxContextProvider>
                </ViajeContextProvider>
              </RemolcadorContextProvider>
            </EmbarcacionContextProvider>
          </ViajeAuxContextProvider>
        </div>
      </div>
    </div>
  )
}