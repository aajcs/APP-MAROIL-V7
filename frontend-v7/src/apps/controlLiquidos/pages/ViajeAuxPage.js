import ViajeAuxList from '../components/ViajeAuxList'
import ViajeAuxContextProvider from '../contexts/ViajeAuxContext'
import ViajeContextProvider from '../contexts/ViajeContext'

export const ViajeAuxPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <ViajeContextProvider>
            <ViajeAuxContextProvider>
              <ViajeAuxList />
            </ViajeAuxContextProvider>
          </ViajeContextProvider>
        </div>
      </div>
    </div>
  )
}
