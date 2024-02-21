/* eslint-disable react/prop-types */
import { Redirect, Route } from 'react-router-dom'
import AuthUse from '../auth/AuthUse'

export default function PrivateRoute({ hasRole: role, ...rest }) {
  const { isLogged, user } = AuthUse()

  if (!isLogged()) return <Redirect to="/login" />
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'CREC 10'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoCrec10" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'ENDECO'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoEndeco" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'SUPERIOR QUANTITY SDN BHD'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoSuperiorQuantitySDNBHD" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'REZEL CATALYSTS'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoRezelCatalysts" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'ATLAS OIL'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoAtlasOil" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'IRAN GARMENT COMPANY'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoIranGarmentCompany" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'UNECA'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoUneca" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'INTERNATIONAL MATERIALS'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoInternationalMaterials" />
        <Route {...rest} />
      </>
    )
  }
  return (
    <div>
      <Route {...rest} />
    </div>
  )
}
