import ProveedorList from '../components/ProveedorList'
import ProveedorContextProvider from '../contexts/ProveedorContext'

export const ProveedorPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Proveedor CRUD</h5>
          <ProveedorContextProvider>
            <ProveedorList />
          </ProveedorContextProvider>
        </div>
      </div>
    </div>
  )
}
