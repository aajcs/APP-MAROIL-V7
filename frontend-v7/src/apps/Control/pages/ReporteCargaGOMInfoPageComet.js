import ReporteCargaGOMContextProvider from '../contexts/ReporteCargaGOMContext'
import BarcoContextProvider from '../contexts/BarcoContext'
import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'
import ReporteCargaGOMInfoComet from '../components/ReporteCargaGOMInfoComet'
import ProgramacionVentanaContextProvider from '../contexts/ProgramacionVentanaContext'

export const ReporteCargaGOMInfoPageComet = () => {
  return (
    <div className="grid">
      <BarcoContextProvider>
        <CargaBodegaContextProvider>
          <ProgramacionVentanaContextProvider>
            <ReporteCargaGOMContextProvider>
              <ReporteCargaGOMInfoComet />
            </ReporteCargaGOMContextProvider>
          </ProgramacionVentanaContextProvider>
        </CargaBodegaContextProvider>
      </BarcoContextProvider>
    </div>
  )
}
