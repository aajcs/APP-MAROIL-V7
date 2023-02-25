import HomeAlmacen from '../components/HomeAlmacen'
import CodificacionContextProvider from '../contexts/CodificacionContext'
export const HomeAlmacenPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <CodificacionContextProvider>
          <HomeAlmacen />
        </CodificacionContextProvider>
      </div>
    </div>
  )
}
