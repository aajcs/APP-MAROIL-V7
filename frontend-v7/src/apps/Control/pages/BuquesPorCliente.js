import BuquePorClienteList from '../components/BuquePorClienteList'
import BarcoContextProvider from '../contexts/BarcoContext'
import ReporteCargaGOMContextProvider from '../contexts/ReporteCargaGOMContext'

export const BuquesPorCliente = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="">
          <BarcoContextProvider>
            <ReporteCargaGOMContextProvider>
              <BuquePorClienteList />
            </ReporteCargaGOMContextProvider>
          </BarcoContextProvider>
        </div>
      </div>
    </div>
  )
}
