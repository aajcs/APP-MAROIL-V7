import IngresoGastoContextProvider from '../contexts/IngresoGastoContext'
import HomeAdministracion from '../components/HomeAdministracion'
export const HomeAdministracionPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <IngresoGastoContextProvider>
          <HomeAdministracion />
        </IngresoGastoContextProvider>
      </div>
    </div>
  )
}
