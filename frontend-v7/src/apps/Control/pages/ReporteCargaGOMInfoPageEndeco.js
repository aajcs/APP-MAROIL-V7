import ReporteCargaGOMContextProvider from '../contexts/ReporteCargaGOMContext'
import BarcoContextProvider from '../contexts/BarcoContext'
import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'
import ReporteCargaGOMInfoEndeco from '../components/ReporteCargaGOMInfoEndeco'
import ProgramacionVentanaContextProvider from '../contexts/ProgramacionVentanaContext'

export const ReporteCargaGOMInfoPageEndeco = () => {
  return (
    <div className="grid">
      <BarcoContextProvider>
        <CargaBodegaContextProvider>
          <ProgramacionVentanaContextProvider>
            <ReporteCargaGOMContextProvider>
              <ReporteCargaGOMInfoEndeco />
            </ReporteCargaGOMContextProvider>
          </ProgramacionVentanaContextProvider>
        </CargaBodegaContextProvider>
      </BarcoContextProvider>
    </div>
  )
}
