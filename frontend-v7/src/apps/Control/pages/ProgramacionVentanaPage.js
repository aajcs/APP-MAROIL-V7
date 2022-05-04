import ProgramacionVentanaListList from '../components/ProgramacionVentanaList'
import ProgramacionVentanaContextProvider from '../contexts/ProgramacionVentanaContext'
export const ProgramacionVentana = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card" style={{ height: 'calc(95vh - 9rem)' }}>
          <div className="text-center " style={{ 'margin-top': '10%' }}>
            <ProgramacionVentanaContextProvider>
              <ProgramacionVentanaListList />
            </ProgramacionVentanaContextProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
