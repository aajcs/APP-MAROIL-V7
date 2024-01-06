import ReporteCargaGOMContextProvider from '../contexts/ReporteCargaGOMContext'
import BarcoContextProvider from '../contexts/BarcoContext'
import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'
import ReporteCargaGOMInfoInternationalMaterials from '../components/ReporteCargaGOMInfoInternationalMaterials'
import ProgramacionVentanaContextProvider from '../contexts/ProgramacionVentanaContext'

export const ReporteCargaGOMInfoPageInternationalMaterials = () => {
  return (
    <div className="grid">
      <BarcoContextProvider>
        <CargaBodegaContextProvider>
          <ProgramacionVentanaContextProvider>
            <ReporteCargaGOMContextProvider>
              <ReporteCargaGOMInfoInternationalMaterials />
            </ReporteCargaGOMContextProvider>
          </ProgramacionVentanaContextProvider>
        </CargaBodegaContextProvider>
      </BarcoContextProvider>
    </div>
  )
}
