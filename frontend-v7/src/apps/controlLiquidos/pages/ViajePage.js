import ViajeList from '../components/ViajeList'

import EmbarcacionContextProvider from '../contexts/EmbarcacionContext'
import RemolcadorContextProvider from '../contexts/RemolcadorContext'
import ViajeContextProvider from '../contexts/ViajeContext'

export const ViajePage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <EmbarcacionContextProvider>
            <RemolcadorContextProvider>
              <ViajeContextProvider>
                <ViajeList />
              </ViajeContextProvider>
            </RemolcadorContextProvider>
          </EmbarcacionContextProvider>
        </div>
      </div>
    </div>
  )
}
