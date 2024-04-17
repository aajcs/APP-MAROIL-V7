import ReporteCargaGOMContextProvider from '../contexts/ReporteCargaGOMContext'
import ReporteCargaGOMList from '../components/ReporteCargaGOMList'
import BarcoContextProvider from '../contexts/BarcoContext'
import WhatsappContextProvider from '../contexts/WhatsappContext'

export const ReporteCargaGOMPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>ReporteCargaGOM CRUD</h5>
          <WhatsappContextProvider>
            <BarcoContextProvider>
              <ReporteCargaGOMContextProvider>
                <ReporteCargaGOMList />
              </ReporteCargaGOMContextProvider>
            </BarcoContextProvider>
          </WhatsappContextProvider>
        </div>
      </div>
    </div>
  )
}
