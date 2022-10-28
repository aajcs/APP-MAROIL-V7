import IngresoGastoEstadistica from '../../administracion/components/IngresoGastoEstadistica'
import IngresoGastoContextProvider from '../../administracion/contexts/IngresoGastoContext'
export const AdministracionReportePage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <IngresoGastoContextProvider>
          <IngresoGastoEstadistica />
        </IngresoGastoContextProvider>
      </div>
    </div>
  )
}
