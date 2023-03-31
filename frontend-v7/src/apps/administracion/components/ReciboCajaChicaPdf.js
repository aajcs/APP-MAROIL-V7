/* eslint-disable react/prop-types */
import { Document, Page, Text, View, Image } from '@react-pdf/renderer'
import firmamaroilsinletra from '../../../assets/firmamaroilsinletra.png'

const ReciboCajaChicaPDF = ({ cajaChica }) => {
  //   const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  // console.log(cajaChica)
  return (
    <Document>
      <Page
        size="A4"
        // style={{
        //   display: 'flex',
        //   flexDirection: 'column',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   backgroundColor: 'white'
        // }}
      >
        <View
          style={{
            // display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: 'white',
            padding: '40px'
          }}
        >
          <View
            style={{
              display: 'flex',

              flexDirection: 'row'
            }}
          >
            <View
              style={{
                flex: 1
              }}
            >
              <Image
                src={firmamaroilsinletra}
                alt="random image"
                style={{ maxWidth: '50px' }}
              />
            </View>
            <View
              style={{
                flex: 2
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                  //   // justifyContent: 'center',
                  //   alignItems: 'center'
                }}
              >
                <Text style={{ textAlign: 'center', fontSize: '12px' }}>
                  DICIEMBRE - 2022
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                  //   // justifyContent: 'center',
                  //   alignItems: 'center'
                }}
              >
                <Text style={{ textAlign: 'center', fontSize: '12px' }}>
                  RECIBO DE EGRESO
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#dc3545',
                    fontSize: '14px'
                  }}
                >
                  Nro. {cajaChica.codigoCajaChica}
                </Text>

                <Text style={{ textAlign: 'center', fontSize: '12px' }}>
                  Fecha {cajaChica.fechaEfectivaCajaChica}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              marginTop: '30px',
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                flex: 1
              }}
            >
              <Text style={{ fontSize: '12px' }}>
                Hemos recibo de: Transporte Kapetco
              </Text>
              <Text style={{ marginTop: '5px', fontSize: '12px' }}>
                La cantidad de: {cajaChica.egresoMontoCajaChica}
              </Text>
              <Text style={{ marginTop: '5px', fontSize: '12px' }}>
                Por concepto de: {cajaChica.conceptoAuxId.nombreConceptoAux}{' '}
                {'//'} {cajaChica.descripcionCajaChica}
              </Text>
            </View>
            {/* <View
              style={{
                flex: 1
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                  //   // justifyContent: 'center',
                  //   alignItems: 'center'
                }}
              >
                <Text style={{ fontSize: '12px' }}>Transporte Kapetco</Text>
                <Text style={{ marginTop: '5px', fontSize: '12px' }}>
                  {cajaChica.egresoMontoCajaChica}
                </Text>
                <Text style={{ marginTop: '5px', fontSize: '12px' }}>
                  {cajaChica.conceptoAuxId.nombreConceptoAux} {'//'}{' '}
                  {cajaChica.descripcionCajaChica}
                </Text>
              </View>
            </View> */}
          </View>
          <View
            style={{
              display: 'flex',
              marginTop: '20px',
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                flex: 1
              }}
            >
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
                <Text style={{ marginTop: '5px', fontSize: '12px' }}>
                  {cajaChica.centroDeCostoAuxId.descripcionCentroDeCosto}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default ReciboCajaChicaPDF
