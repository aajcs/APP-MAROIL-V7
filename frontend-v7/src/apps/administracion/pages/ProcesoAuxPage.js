import ProcesoAuxList from '../components/ProcesoAuxList'
import ProcesoAuxContextProvider from '../contexts/ProcesoAuxContext'

export const ProcesoAuxPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>ProcesoAux CRUD</h5>
          <ProcesoAuxContextProvider>
            <ProcesoAuxList />
          </ProcesoAuxContextProvider>
        </div>
      </div>
    </div>
  )
}
