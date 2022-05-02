import TotalStatus from './TotalStatus'
import ReporteHora from './ReporteHora'
import ComparativoCarga from './ComparativoCarga'
// import { ProductService } from '../service/ProductService';
import ReporteHoraContextProvider from '../contexts/ReporteHoraContext'

import BarcoContextProvider from '../contexts/BarcoContext'

export const Dashboard = () => {
  return (
    <div className="grid">
      <BarcoContextProvider>
        <TotalStatus />
      </BarcoContextProvider>
      <ReporteHora />

      <div className="col-12 xl:col-6">
        <ReporteHoraContextProvider>
          <ComparativoCarga />
        </ReporteHoraContextProvider>
      </div>
    </div>
  )
}
