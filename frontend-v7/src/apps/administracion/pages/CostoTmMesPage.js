import CostoTmMesList from '../components/CostoTmMesList'
import CostoTmMesContextProvider from '../contexts/CostoTmMesContext'

export const CostoTmMesPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>CostoTmMes CRUD</h5>
          <CostoTmMesContextProvider>
            <CostoTmMesList />
          </CostoTmMesContextProvider>
        </div>
      </div>
    </div>
  )
}
