import BarcoContextProvider from '../contexts/BarcoContext'
import HistoricoBuquesList from '../components/HistoricoBuquesList'
import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'

export const HistoricoBuquesPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <BarcoContextProvider>
            <CargaBodegaContextProvider>
              <HistoricoBuquesList />
            </CargaBodegaContextProvider>
          </BarcoContextProvider>
        </div>
      </div>
    </div>
  )
}
