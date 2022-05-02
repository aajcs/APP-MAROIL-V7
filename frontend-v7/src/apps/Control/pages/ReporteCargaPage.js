import ReporteCargaContextProvider from '../contexts/ReporteCargaContext'
import ReporteCargaList from '../components/ReporteCargaList'
import BarcoContextProvider from '../contexts/BarcoContext'

export const ReporteCargaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>ReporteCarga CRUD</h5>
          <BarcoContextProvider>
            <ReporteCargaContextProvider>
              <ReporteCargaList />
            </ReporteCargaContextProvider>
          </BarcoContextProvider>
        </div>
      </div>
    </div>
  )
}
