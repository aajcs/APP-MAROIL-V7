import GastosOperacionaleList from '../components/GastosOperacionaleList'
import EmbarcacionContextProvider from '../contexts/EmbarcacionContext'
import GastosOperacionaleContextProvider from '../contexts/GastosOperacionaleContext'
import RemolcadorContextProvider from '../contexts/RemolcadorContext'
import ViajeContextProvider from '../contexts/ViajeContext'

export const GastosOperacionalePage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <ViajeContextProvider>
            <EmbarcacionContextProvider>
              <RemolcadorContextProvider>
                <GastosOperacionaleContextProvider>
                  <GastosOperacionaleList />
                </GastosOperacionaleContextProvider>
              </RemolcadorContextProvider>
            </EmbarcacionContextProvider>
          </ViajeContextProvider>
        </div>
      </div>
    </div>
  )
}
