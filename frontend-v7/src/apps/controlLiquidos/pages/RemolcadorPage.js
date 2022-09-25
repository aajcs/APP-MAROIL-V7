import RemolcadoList from '../components/RemolcadorList'
import RemolcadorContextProvider from '../contexts/RemolcadorContext'

export const RemolcadorPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <RemolcadorContextProvider>
            <RemolcadoList />
          </RemolcadorContextProvider>
        </div>
      </div>
    </div>
  )
}
