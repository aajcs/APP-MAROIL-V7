import ReporteCargaGOMContextProvider from '../contexts/ReporteCargaGOMContext'
import BarcoContextProvider from '../contexts/BarcoContext'
import ReporteCargaGOMInfo from '../components/ReporteCargaGOMInfo'
import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'

export const ReporteCargaGOMInfoPage = () => {
  return (
    <div className="grid">
      <BarcoContextProvider>
        <CargaBodegaContextProvider>
          <ReporteCargaGOMContextProvider>
            <ReporteCargaGOMInfo />
          </ReporteCargaGOMContextProvider>
        </CargaBodegaContextProvider>
      </BarcoContextProvider>
    </div>
  )
}
