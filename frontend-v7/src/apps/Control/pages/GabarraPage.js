import GabarraList from '../components/GabarraList'
import GabarraContextProvider from '../contexts/GabarraContext'

export const GabarraPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <h5>Gabarra CRUD</h5>
          <GabarraContextProvider>
            <GabarraList />
          </GabarraContextProvider>
        </div>
      </div>
    </div>
  )
}
