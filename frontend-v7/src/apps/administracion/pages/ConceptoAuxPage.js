import ConceptoAuxList from '../components/ConceptoAuxList'
import ConceptoAuxContextProvider from '../contexts/ConceptoAuxContext'

export const ConceptoAuxPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>ConceptoAux CRUD</h5>
          <ConceptoAuxContextProvider>
            <ConceptoAuxList />
          </ConceptoAuxContextProvider>
        </div>
      </div>
    </div>
  )
}
