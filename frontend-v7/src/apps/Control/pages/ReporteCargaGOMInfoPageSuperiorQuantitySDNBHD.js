import ReporteCargaGOMContextProvider from '../contexts/ReporteCargaGOMContext'
import BarcoContextProvider from '../contexts/BarcoContext'
import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'
import ReporteCargaGOMInfoSuperiorQuantitySDNBHD from '../components/ReporteCargaGOMInfoSuperiorQuantitySDNBHD'
import ProgramacionVentanaContextProvider from '../contexts/ProgramacionVentanaContext'

export const ReporteCargaGOMInfoPageSuperiorQuantitySDNBHD = () => {
  return (
    <div className="grid">
      <BarcoContextProvider>
        <CargaBodegaContextProvider>
          <ProgramacionVentanaContextProvider>
            <ReporteCargaGOMContextProvider>
              <ReporteCargaGOMInfoSuperiorQuantitySDNBHD />
            </ReporteCargaGOMContextProvider>
          </ProgramacionVentanaContextProvider>
        </CargaBodegaContextProvider>
      </BarcoContextProvider>
    </div>
  )
}
// SuperiorQuantitySDNBHD
