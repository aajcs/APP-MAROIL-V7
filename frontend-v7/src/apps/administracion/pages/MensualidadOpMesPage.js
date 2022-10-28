import MensualidadOpMesList from '../components/MensualidadOpMesList'
import MensualidadOpMesContextProvider from '../contexts/MensualidadOpMesContext'

export const MensualidadOpMesPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>MensualidadOpMes CRUD</h5>
          <MensualidadOpMesContextProvider>
            <MensualidadOpMesList />
          </MensualidadOpMesContextProvider>
        </div>
      </div>
    </div>
  )
}
