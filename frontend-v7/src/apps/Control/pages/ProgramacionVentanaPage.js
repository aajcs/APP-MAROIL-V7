import { Tag } from 'primereact/tag'
import logomaroil from '../assetsControl/logomaroil.png'
import ProgramacionVentanaListList from '../components/ProgramacionVentanaList'
import ProgramacionVentanaContextProvider from '../contexts/ProgramacionVentanaContext'
export const ProgramacionVentana = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card" style={{ height: 'calc(95vh - 9rem)' }}>
          <div className="text-center " style={{ 'margin-top': '10%' }}>
            <img
              className="animate__animated animate__flip animate__slower"
              id="frame"
              src={logomaroil}
              height="300px"
              // style={{
              //   position: 'absolute',
              //   overflow: 'hidden',
              //   bottom: '0px'
              // }}
            ></img>
            <div className="animate__animated animate__backInUp animate__slower">
              <Tag
                className="mt-3 p-2"
                severity="warning"
                style={{ fontSize: '35px' }}
              >
                Sección en construcción por el dpto. de AIT.
              </Tag>
            </div>
            <ProgramacionVentanaContextProvider>
              <ProgramacionVentanaListList />
            </ProgramacionVentanaContextProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
