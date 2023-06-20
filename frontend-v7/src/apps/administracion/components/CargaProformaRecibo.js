/* eslint-disable react/prop-types */
import {
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
  Font
} from '@react-pdf/renderer'
import firmamaroilsinletra from '../../../assets/firmamaroilsinletra.png'
import pagada from '../../../assets/pagada.png'
import nopagada from '../../../assets/nopagada.png'
import moment from 'moment'

import RobotoRegular from '../fonts/Roboto-Regular.ttf'
import RobotoBold from '../fonts/Roboto-Bold.ttf'
import RobotoItalic from '../fonts/Roboto-Italic.ttf'
// const COL_ANCHO_1 = 25
// const COL_ANCHO_2 = 16.67
Font.register({
  family: 'Roboto',
  fonts: [
    { src: RobotoRegular, fontWeight: 'normal' },
    { src: RobotoBold, fontWeight: 'bold' },
    { src: RobotoItalic, fontWeight: 'normal', fontStyle: 'italic' }
  ]
})
const styles = StyleSheet.create({
  footerFirma: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    paddingLeft: '25px',
    paddingRight: '25px'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10
  },
  logo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 130,
    height: 100
  },
  label: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5
  },
  textBox: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',

    fontSize: 12,
    marginBottom: 5
  },

  body: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'normal'
  },
  italic: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  title: {
    fontSize: '10px',
    fontWeight: 'bold',
    marginTop: 30
  },
  tabla: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 3
  },
  tablaFila: {
    fontSize: '8px',
    margin: 'auto',
    flexDirection: 'row'
  },
  // tablaColumna1: {
  //   width: COL_ANCHO_1 + '%',
  //   borderStyle: 'solid',
  //   borderColor: '#000',
  //   borderBottomColor: '#000',
  //   borderWidth: 1,
  //   borderLeftWidth: 0,
  //   borderTopWidth: 0
  // },
  tablaColumna1: {
    width: 19 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#dee2e6'
  },
  tablaColumna2: {
    width: 8 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#dee2e6'
  },
  tablaColumna3: {
    width: 8 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#dee2e6'
  },
  tablaColumnaDescripcion: {
    width: 26 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#dee2e6'
  },
  tablaCeldaHeader: {
    margin: 5,
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },

  anchoColumna1: {
    width: 19 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  anchoColumna2: {
    width: 8 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  anchoColumna3: {
    width: 8 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  anchoColumnaDescripcion: {
    width: 26 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tablaCelda: {
    margin: 5,
    fontSize: 9
    // marginBottom: 0,
    // marginTop: 0
  },
  tablaCelda1: {
    margin: 5,
    fontSize: 9,
    // marginBottom: 0,
    // marginTop: 0,
    textAlign: 'right'
  }
})

const CargaProformaRecibo = ({ proforma, auth }) => {
  const formatCurrency = (value) => {
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })
  }
  return (
    <Document>
      <Page size="LETTER">
        {proforma.estatus2Proforma === 'NO PAGADA' && (
          <Image src={nopagada} style={styles.logo} />
        )}
        {proforma.estatus2Proforma === 'PAGADA' && (
          <Image src={pagada} style={styles.logo} />
        )}

        {/* <Image style={{ width: '50px' }} src={pagada} /> */}
        <View
          style={{
            paddingBottom: '50px',
            paddingTop: '50px',
            paddingLeft: '25px',
            paddingRight: '25px'
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%'
            }}
          ></View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {' '}
            <View style={{ flex: 1 }}>
              <Image style={{ width: '50px' }} src={firmamaroilsinletra} />
            </View>
            <View style={{ flex: 2 }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {/* <Image src="/logoLoganNegro.png" /> */}
                <Text style={{ textAlign: 'center', fontSize: '12px' }}>
                  TRANSPORTE KAPETCO
                </Text>
                {/* <Text
                  style={{
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}
                >
                  VENTA AL POR MAYOR Y MENOR
                </Text> */}
                {/* <Text
                  style={{
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}
                >
                  Lima - Lima
                </Text> */}
                {/* <Text
                  style={{
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}
                >
                  Jr. Andahuaylas Nro. 158
                </Text> */}
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}
                >
                  RIF- J-40897731-1
                </Text>
              </View>
            </View>
            <View style={{ paddingRight: '60px', flex: 2 }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '5px',
                  border: '1px solid #000',
                  padding: '10px',

                  borderRadius: '10px'
                }}
              >
                {/* <Text
                  style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  R.U.C. 10464177995
                </Text> */}
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}
                >
                  COMPROBANTE DE PROFORMA
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',

                    color: '#dc3545'
                  }}
                >
                  N° {proforma.codigoProforma}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}
          >
            <View style={{ flex: 1 }}>
              <Text>
                <Text style={styles.label}>Proveedor:</Text>
                <Text style={styles.textBox}>
                  {' '}
                  {proforma.proveedorId.nombreProveedor}
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Rif/CI:</Text>
                <Text style={styles.textBox}>
                  {' '}
                  {proforma.proveedorId.rifProveedor}
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Fecha de Control:</Text>
                <Text style={styles.textBox}>
                  {' '}
                  {moment(proforma.fechaControlProforma).format('DD/MM/YY')}
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Fecha de Inicio:</Text>
                <Text style={styles.textBox}>
                  {' '}
                  {moment(proforma.fechaInicioProforma).format('DD/MM/YY')}
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Fecha de Fin:</Text>
                <Text style={styles.textBox}>
                  {' '}
                  {moment(proforma.fechaFinProforma).format('DD/MM/YY')}
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Uso de Proforma:</Text>
                <Text style={styles.textBox}> {proforma.usoFondoProforma}</Text>
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                <Text style={styles.label}>Fecha de Emisión:</Text>
                <Text style={styles.textBox}>
                  {' '}
                  {moment(proforma.fechaControlProforma).format('DD/MM/YY')}
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Dominio: </Text>
                <Text style={styles.textBox}>
                  {' '}
                  {proforma.dominioId.nombreDominio}
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Division:</Text>
                <Text style={styles.textBox}>
                  {' '}
                  {proforma.divisionId.nombreDivision}
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Dependencia:</Text>
                <Text style={styles.textBox}>
                  {' '}
                  {proforma.dependenciaId.nombreDependencia}
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Sud Dependencia:</Text>
                <Text style={styles.textBox}>
                  {' '}
                  {proforma.subDependenciaId.nombreSubDependencia}
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Actividad Asociada:</Text>
                <Text style={styles.textBox}>
                  {' '}
                  {proforma.actividadAsociadaId.nombreActividadAsociada}
                </Text>
              </Text>
              <Text>
                <Text style={styles.label}>Clasificacion Servicio:</Text>
                <Text style={styles.textBox}>
                  {' '}
                  {proforma.clasificacionServicioId.nombreClasificacionServicio}
                </Text>
              </Text>
            </View>
          </View>

          <Text style={styles.title}>Detalle de la Proforma</Text>
          <View style={styles.tabla}>
            <View style={styles.tablaFila}>
              <View style={styles.tablaColumna1}>
                <Text style={styles.tablaCeldaHeader}>
                  Clasificacion Servicio
                </Text>
              </View>
              <View style={styles.tablaColumna1}>
                <Text style={styles.tablaCeldaHeader}>
                  Clasificacion 4toNivel
                </Text>
              </View>
              <View style={styles.tablaColumnaDescripcion}>
                <Text style={styles.tablaCeldaHeader}>Descripcion</Text>{' '}
              </View>
              <View style={styles.tablaColumna2}>
                <Text style={styles.tablaCeldaHeader}>Uni.</Text>{' '}
              </View>
              <View style={styles.tablaColumna2}>
                <Text style={styles.tablaCeldaHeader}>Cant.</Text>{' '}
              </View>
              <View style={styles.tablaColumna3}>
                <Text style={styles.tablaCeldaHeader}>P.U.</Text>{' '}
              </View>
              <View
                style={{
                  ...styles.tablaColumna3,

                  width: 12 + '%'
                }}
              >
                <Text style={styles.tablaCeldaHeader}>Total</Text>{' '}
              </View>
            </View>
            {proforma.items?.map((item, index) => (
              <View style={styles.tablaFila} key={index}>
                <View style={styles.anchoColumna1}>
                  <Text style={styles.tablaCelda}>
                    {item.itemClasificacionServicio}
                  </Text>
                </View>
                <View style={styles.anchoColumna1}>
                  <Text style={styles.tablaCelda}>
                    {item.itemClasificacion4toNivel}
                  </Text>{' '}
                </View>
                <View style={styles.anchoColumnaDescripcion}>
                  <Text style={styles.tablaCelda}>{item.itemDescripcion}</Text>{' '}
                </View>
                <View style={styles.anchoColumna2}>
                  <Text style={styles.tablaCelda}>{item.itemUnidad}</Text>{' '}
                </View>
                <View style={styles.anchoColumna2}>
                  <Text style={styles.tablaCelda}>{item.itemCantidad}</Text>{' '}
                </View>
                <View style={styles.anchoColumna3}>
                  <Text style={styles.tablaCelda1}>
                    {formatCurrency(item.itemPrecioUnitario)}
                  </Text>{' '}
                </View>
                <View
                  style={{
                    ...styles.tablaColumna3,

                    width: 12 + '%'
                  }}
                >
                  <Text style={styles.tablaCelda1}>
                    {formatCurrency(
                      item.itemCantidad * item.itemPrecioUnitario
                    )}
                  </Text>{' '}
                </View>
              </View>
            ))}
            <View style={styles.tablaFila}>
              <View style={styles.tablaColumna1}>
                <Text style={styles.tablaCeldaHeader}></Text>
              </View>
              <View style={styles.tablaColumna1}>
                <Text style={styles.tablaCeldaHeader}></Text>
              </View>
              <View style={styles.tablaColumnaDescripcion}>
                <Text style={styles.tablaCeldaHeader}></Text>{' '}
              </View>
              <View style={styles.tablaColumna2}>
                <Text style={styles.tablaCeldaHeader}></Text>{' '}
              </View>
              {/* <View style={styles.tablaColumna2}>
                <Text style={styles.tablaCeldaHeader}></Text>{' '}
              </View> */}
              <View style={{ ...styles.tablaColumna3, width: 16 + '%' }}>
                <Text style={styles.tablaCelda1}>Total Proforma</Text>{' '}
              </View>
              <View
                style={{
                  ...styles.tablaColumna3,

                  width: 12 + '%'
                }}
              >
                <Text
                  style={{
                    ...styles.tablaCelda1,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold'
                  }}
                >
                  {formatCurrency(proforma.totalProforma)}
                </Text>{' '}
              </View>
            </View>
          </View>
          <Text style={{ marginTop: '15px' }}>
            <Text style={styles.label}>Descripcion:</Text>
            <Text style={styles.textBox}> {proforma.descripcionProforma}</Text>
          </Text>
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '70px',
              justifyContent: 'flex-end'
            }}
          >
            <Text style={{ fontSize: '10px', fontWeight: 'bold' }}>
              IMPORTE TOTAL: S/.
              {proforma.ingresoMontoCajaChica?.reduce(
                (antes, actual) =>
                  parseFloat(actual.Precio) * actual.Unidades + antes,
                0
              )}
            </Text>
          </View> */}
        </View>
        <View
          style={{
            ...styles.footerFirma,
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <View style={{ flex: 2 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '5px',
                border: '1px solid #000',
                padding: '20px',
                paddingBottom: '0',
                borderRadius: '10px'
              }}
            >
              <Text style={{ marginTop: '-15px', fontSize: '12px' }}>
                Emite
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '25px'
                }}
              >
                <Text
                  style={{
                    fontSize: '12px',
                    borderTop: '1px solid #000',
                    textAlign: 'center',
                    width: '100px'
                  }}
                >
                  {auth.user.faidUser.nombre}
                </Text>
                <Text style={{ marginTop: '5px', fontSize: '12px' }}>
                  {auth.user.faidUser.correo}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 2 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '5px',
                border: '1px solid #000',
                padding: '20px',
                paddingBottom: '0',
                borderRadius: '10px'
              }}
            >
              <Text
                style={{
                  marginTop: '-15px',
                  fontSize: '12px'
                }}
              >
                Autoriza
              </Text>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '25px'
                }}
              >
                {' '}
                <Text
                  style={{
                    // marginTop: '10px',
                    borderBottom: '1px solid #000',
                    width: '100px'
                  }}
                ></Text>
                <Text
                  style={{
                    fontSize: '12px',
                    // borderTop: '1px solid #000',
                    // textAlign: 'center',
                    width: '100px',
                    marginLeft: '-180px'
                  }}
                >
                  Nombre:
                </Text>
                <Text
                  style={{
                    marginTop: '5px',
                    fontSize: '12px',
                    marginLeft: '-180px'
                  }}
                >
                  Cargo:
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.footer}>
          PDF Generado el {moment().format('dddd, DD [de] MMMM [de] YYYY')},
          Desde APP Maroil Tranding.
        </Text>
      </Page>
    </Document>
  )
}

export default CargaProformaRecibo
