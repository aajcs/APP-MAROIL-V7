import EmbarcacionContextProvider from '../../controlLiquidos/contexts/EmbarcacionContext'
import CodificacionList from '../components/CodificacionList'
import CodificacionContextProvider from '../contexts/CodificacionContext'

export const CodificacionPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Codificacion CRUD</h5>
          <CodificacionContextProvider>
            <EmbarcacionContextProvider>
              <CodificacionList />
            </EmbarcacionContextProvider>
          </CodificacionContextProvider>
        </div>
      </div>
    </div>
  )
}
