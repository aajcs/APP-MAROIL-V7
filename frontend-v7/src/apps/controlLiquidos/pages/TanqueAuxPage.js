import TanqueAuxList from '../components/TanqueAuxList'
import EmbarcacionContextProvider from '../contexts/EmbarcacionContext'
import TanqueAuxContextProvider from '../contexts/TanqueAuxContext'

export const TanqueAuxPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <EmbarcacionContextProvider>
            <TanqueAuxContextProvider>
              <TanqueAuxList />
            </TanqueAuxContextProvider>
          </EmbarcacionContextProvider>
        </div>
      </div>
    </div>
  )
}
