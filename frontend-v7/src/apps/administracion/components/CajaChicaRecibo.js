/* eslint-disable react/prop-types */
import React from 'react'
import {
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet
} from '@react-pdf/renderer'
import firmamaroilsinletra from '../../../assets/firmamaroilsinletra.png'
import moment from 'moment'

const COL_ANCHO_1 = 25
const COL_ANCHO_2 = 33.4
const styles = StyleSheet.create({
  tabla: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20
  },
  tablaFila: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tablaColumna1: {
    width: COL_ANCHO_1 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tablaColumna2: {
    width: COL_ANCHO_2 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tablaCeldaHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 500
  },
  anchoColumna1: {
    width: COL_ANCHO_1 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  anchoColumna2: {
    width: COL_ANCHO_2 + '%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tablaCelda: {
    margin: 5,
    fontSize: 10
  }
})

const CajaChicaRecibo = ({ cajaChica, auth }) => {
  const formatCurrency = (value) => {
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })
  }
  return (
    <Document>
      <Page size="A4">
        <View style={{ padding: '15px' }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
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
            <View style={{ flex: 2 }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '5px',
                  border: '1px solid #000',
                  padding: '20px',
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
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  COMPROBANTE DE RECIBO
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',

                    color: '#dc3545'
                  }}
                >
                  N° {cajaChica.codigoCajaChica}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: '12px', fontWeight: 'bold' }}>
                Recibe: {cajaChica.proveedorId.nombreProveedor}
              </Text>
              <Text
                style={{
                  marginTop: '5px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Rif/CI: {cajaChica.proveedorId.rifProveedor}
              </Text>
              <Text
                style={{
                  marginTop: '5px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Concepto: {cajaChica.conceptoAuxId.nombreConceptoAux}{' '}
              </Text>
              <Text
                style={{
                  marginTop: '5px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Descripcion: {cajaChica.descripcionCajaChica}
                {/* {typeof cajaChica.Direccion === 'object'
                  ? cajaChica.Direccion.region +
                    '/' +
                    cajaChica.Direccion.provincia +
                    '/' +
                    cajaChica.Direccion.distrito +
                    '/' +
                    cajaChica.Direccion.direccion
                  : cajaChica.Direccion} */}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: '12px', fontWeight: 'bold' }}>
                Fecha de Emisión:{' '}
                {moment(cajaChica.fechaEfectivaCajaChica).format(
                  'dddDD/MM/YY HH:mm'
                )}
                {/* console.log(moment(date9).format('YYYY')) */}
              </Text>
              <Text
                style={{
                  marginTop: '5px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Centro de costo:{' '}
                {cajaChica.centroDeCostoAuxId.descripcionCentroDeCosto}
              </Text>
              {/* <Text style={{ fontSize: '12px', fontWeight: 'bold' }}>
                Condición de venta:{' '}
              </Text> */}
            </View>
          </View>
          <View style={styles.tabla}>
            <View style={styles.tablaFila}>
              {/* <View style={styles.tablaColumna1}>
                <Text style={styles.tablaCeldaHeader}>ITEM</Text>
              </View>
              <View style={styles.tablaColumna1}>
                <Text style={styles.tablaCeldaHeader}>CANTIDAD</Text>
              </View>
              <View style={styles.tablaColumna2}>
                <Text style={styles.tablaCeldaHeader}>UNIDAD</Text>
              </View> */}
              <View style={styles.tablaColumna2}>
                <Text style={styles.tablaCeldaHeader}>MONTO ENTREGADO</Text>
              </View>
              <View style={styles.tablaColumna2}>
                <Text style={styles.tablaCeldaHeader}>CAMBIO PENDIENTE</Text>
              </View>
              <View style={styles.tablaColumna2}>
                <Text style={styles.tablaCeldaHeader}>MONTO TOTAL</Text>
              </View>
            </View>

            <View style={styles.tablaFila} key={1}>
              {/* <View style={styles.anchoColumna1}>
                <Text style={styles.tablaCelda}>{1 + 1}</Text>
              </View>
              <View style={styles.anchoColumna1}>
                <Text style={styles.tablaCelda}>
                  {cajaChica.codigoCajaChica}
                </Text>
              </View>
              <View style={styles.anchoColumna2}>
                <Text style={styles.tablaCelda}>UNIDAD</Text>
              </View> */}
              <View style={styles.anchoColumna2}>
                <Text style={styles.tablaCelda}>
                  {formatCurrency(cajaChica.montoEntregadoCajaChica)}
                </Text>
              </View>
              <View style={styles.anchoColumna2}>
                <Text style={styles.tablaCelda}>
                  {formatCurrency(cajaChica.montoVueltoCajaChica)}
                </Text>
              </View>
              <View style={styles.anchoColumna2}>
                <Text style={styles.tablaCelda}>
                  {formatCurrency(cajaChica.egresoMontoCajaChica)}
                </Text>
              </View>
            </View>
          </View>
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
              {cajaChica.ingresoMontoCajaChica?.reduce(
                (antes, actual) =>
                  parseFloat(actual.Precio) * actual.Unidades + antes,
                0
              )}
            </Text>
          </View> */}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
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
                <Text style={{ marginTop: '-15px', fontSize: '12px' }}>
                  Recibe
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
                    {cajaChica.proveedorId.nombreProveedor}
                  </Text>
                  <Text style={{ marginTop: '5px', fontSize: '12px' }}>
                    {cajaChica.proveedorId.rifProveedor}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default CajaChicaRecibo
