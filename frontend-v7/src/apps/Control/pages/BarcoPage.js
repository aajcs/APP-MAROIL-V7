import BarcoContextProvider from '../contexts/BarcoContext'
import BarcoList from '../components/BarcoList'
import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'

export const BarcoPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <h5>Barco CRUD</h5>
          <BarcoContextProvider>
            <CargaBodegaContextProvider>
              <BarcoList />
            </CargaBodegaContextProvider>
          </BarcoContextProvider>
        </div>
      </div>
    </div>
  )
}
