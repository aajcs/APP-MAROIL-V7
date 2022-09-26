import ViajeList from '../components/ViajeList'
import ViajeContextProvider from '../contexts/ViajeContext'

export const ViajePage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <ViajeContextProvider>
            <ViajeList />
          </ViajeContextProvider>
        </div>
      </div>
    </div>
  )
}
