import CargaViajeList from '../components/CargaViajeList'
import CargaViajeContextProvider from '../contexts/CargaViajeContext'
import ViajeContextProvider from '../contexts/ViajeContext'

export const CargaViajePage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <ViajeContextProvider>
            <CargaViajeContextProvider>
              <CargaViajeList />
            </CargaViajeContextProvider>
          </ViajeContextProvider>
        </div>
      </div>
    </div>
  )
}
