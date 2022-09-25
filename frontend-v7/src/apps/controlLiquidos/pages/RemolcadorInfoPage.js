import RemolcadorInfo from '../components/RemolcadorInfo'
import RemolcadorContextProvider from '../contexts/RemolcadorContext'

export const RemolcadorInfoPage = () => {
  return (
    <div className="grid">
      <RemolcadorContextProvider>
        <RemolcadorInfo />
      </RemolcadorContextProvider>
    </div>
  )
}
