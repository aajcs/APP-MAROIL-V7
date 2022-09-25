import EmbarcacionList from '../components/EmbarcacionList'
import EmbarcacionContextProvider from '../contexts/EmbarcacionContext'

export const EmbarcacionPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <EmbarcacionContextProvider>
            <EmbarcacionList />
          </EmbarcacionContextProvider>
        </div>
      </div>
    </div>
  )
}
