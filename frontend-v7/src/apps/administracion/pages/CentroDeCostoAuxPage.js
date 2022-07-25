import CentroDeCostoAuxList from '../components/CentroDeCostoAuxList'
import CentroDeCostoAuxContextProvider from '../contexts/CentroDeCostoAuxContext'

export const CentroDeCostoAuxPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>CentroDeCostoAux CRUD</h5>
          <CentroDeCostoAuxContextProvider>
            <CentroDeCostoAuxList />
          </CentroDeCostoAuxContextProvider>
        </div>
      </div>
    </div>
  )
}
