import FacturaList from '../components/FacturaList'
import FacturaContextProvider from '../contexts/FacturaContext'

export const FacturaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Factura CRUD</h5>
          <FacturaContextProvider>
            <FacturaList />
          </FacturaContextProvider>
        </div>
      </div>
    </div>
  )
}
