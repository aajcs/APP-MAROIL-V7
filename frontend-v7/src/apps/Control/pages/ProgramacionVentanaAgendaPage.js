import ProgramacionVentanaContextProvider from '../contexts/ProgramacionVentanaContext'
import ProgramacionVentanaAgenda from '../components/ProgramacionVentanaAgenda'
export const ProgramacionVentanaAgendaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          {/* <div className="text-center " style={{ 'margin-top': '10%' }}> */}
          <ProgramacionVentanaContextProvider>
            <ProgramacionVentanaAgenda />
          </ProgramacionVentanaContextProvider>
        </div>
      </div>
    </div>
    // </div>
  )
}
