import CargaInformacionPanel from '../components/CargaInformacionPanel'
import CargaViajeContextProvider from '../contexts/CargaViajeContext'

import EmbarcacionContextProvider from '../contexts/EmbarcacionContext'
import RemolcadorContextProvider from '../contexts/RemolcadorContext'
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
                  <CargaViajeContextProvider>
                    <CargaInformacionPanel />
                  </CargaViajeContextProvider>
                </ViajeContextProvider>
              </RemolcadorContextProvider>
            </EmbarcacionContextProvider>
          </ViajeAuxContextProvider>
        </div>
      </div>
    </div>
  )
}
