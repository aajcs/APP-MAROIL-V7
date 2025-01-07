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
    user.faidUser.nombre === 'HK JIN GANG NA MEI'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoHKJinGangNaMei" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'YIWU WUTING TRADING'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoYiwuWutingTrading" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'SHANGHAI INTERNATIONAL LOGISTICS'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoShanghaiInternationalLogistics" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'ARXHK'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoArxhk" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'LATAM RESOURCE SSUPPLY'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoLatamResourceSsupply" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'MBENGUE SARL'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoMbengueSarl" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'GLOBEX WORLDWIDE'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoGlobexWorldwide" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'SANEKS'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoSaneks" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'MERCALIX'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoMercalix" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'KARAMAN PETROKIMYA ANONIM SIRKETI'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoKaramanPetrokimyaAnonimSirketi" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'PRAXLAN'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoPraxlan" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'PROTOCOL CAPITAL W. L. L.'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoProtocolCapitalWLL" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'RAC OVERSEAS'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoRacOverseas" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'FONTE GLOBAL TRADING AND LOGISTICS'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoFonteGlobalTradingAndLogistics" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'TTCO VERSEAS'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoTTCOverseas" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'NORMAN GLOBAL CORPORATION'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoNormanGlobalCorporation" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'MINAS GUSA'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoMinasGusa" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'TARDID LIMITED'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoTardidLimited" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'GLOBAL CARGO TRADING'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoGlobalCargoTrading" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'COMET'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoComet" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'FARLE'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoFarle" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'EMPRESA DE ASISTENCIAS Y SERVICIOS'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoEmpresaDeAsistenciasYServicios" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'GRANELES'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoGraneles" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'ADENIX GROUP LIMITED'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoAdenixGroupLimited" />
        <Route {...rest} />
      </>
    )
  }
  if (
    user.faidUser.roles[0] === 'CLIENTE' &&
    user.faidUser.nombre === 'GLOBULK DMCC'
  ) {
    return (
      <>
        <Redirect to="/apps/control/reportecargaGOMInfoGlobulkDmcc" />
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
