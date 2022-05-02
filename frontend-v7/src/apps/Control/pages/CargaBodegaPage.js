import CargaBodegaList from '../components/CargaBodegaList'
import BarcoContextProvider from '../contexts/BarcoContext'
import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'

export const CargaBodegaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>CargaBodega CRUD</h5>
          <BarcoContextProvider>
            <CargaBodegaContextProvider>
              <CargaBodegaList />
            </CargaBodegaContextProvider>
          </BarcoContextProvider>
        </div>
      </div>
    </div>
  )
}
