import ProyectoAuxList from '../components/ProyectoAuxList'
import ProyectoAuxContextProvider from '../contexts/ProyectoAuxContext'

export const ProyectoAuxPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>ProyectoAux CRUD</h5>
          <ProyectoAuxContextProvider>
            <ProyectoAuxList />
          </ProyectoAuxContextProvider>
        </div>
      </div>
    </div>
  )
}
