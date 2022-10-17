import BarcoContextProvider from '../contexts/BarcoContext'
import HistoricoBuquesList from '../components/HistoricoBuquesList'

export const HistoricoBuquesPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <BarcoContextProvider>
            <HistoricoBuquesList />
          </BarcoContextProvider>
        </div>
      </div>
    </div>
  )
}
