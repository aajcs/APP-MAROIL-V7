import ReporteCargaGOMContextProvider from '../contexts/ReporteCargaGOMContext'
import ReporteCargaGOMList from '../components/ReporteCargaGOMList'
import BarcoContextProvider from '../contexts/BarcoContext'

export const ReporteCargaGOMPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>ReporteCargaGOM CRUD</h5>
          <BarcoContextProvider>
            <ReporteCargaGOMContextProvider>
              <ReporteCargaGOMList />
            </ReporteCargaGOMContextProvider>
          </BarcoContextProvider>
        </div>
      </div>
    </div>
  )
}
