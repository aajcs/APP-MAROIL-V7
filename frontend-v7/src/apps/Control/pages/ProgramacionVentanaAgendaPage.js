import ProgramacionVentanaContextProvider from '../contexts/ProgramacionVentanaContext'
import Agenda from '../components/Agenda'
export const ProgramacionVentanaAgendaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        {/* <div className="text-center " style={{ 'margin-top': '10%' }}> */}
        <ProgramacionVentanaContextProvider>
          <Agenda />
        </ProgramacionVentanaContextProvider>
      </div>
    </div>
    // </div>
  )
}
