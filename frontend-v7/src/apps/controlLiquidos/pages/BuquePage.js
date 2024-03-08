import BuqueContextProvider from '../contexts/BuqueContext'
import BuqueList from '../components/BuqueList'
// import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'

export const BuquePage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <h5>Buque CRUD</h5>
          <BuqueContextProvider>
            {/* <CargaBodegaContextProvider> */}
            <BuqueList />
            {/* </CargaBodegaContextProvider> */}
          </BuqueContextProvider>
        </div>
      </div>
    </div>
  )
}
