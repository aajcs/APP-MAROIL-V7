import { Timeline } from 'primereact/timeline'
import { Card } from 'primereact/card'

const AgenciasMaritimasList = () => {
  const agenciasMaritimas = [
    {
      status: 'Shipped',
      date: '15/10/2020 16:15',
      icon: 'pi pi-arrow-down-right',
      color: '#FF9800',
      nombre: 'DESARROLLOS 1405',
      direccion:
        'Avenida principal de lechería, Edif Y2K, piso 1, Estado Anzoátegui.',
      telefono: '+58 (281) 282.02.58',
      personaContacto: 'ventas@desarrollos1405.com',
      webSite: 'https://desarrollos1405.com/',
      image: ''
    },
    {
      status: 'Ordered',
      date: '15/10/2020 10:30',
      icon: 'pi pi-arrow-down-right',
      color: '#9C27B0',
      descrioption: 'probando que funciona lo q voy a poer aqui',
      nombre: 'OCAMAR',
      direccion:
        'Estación Principal Guardacostas “TN Fernando Fernández” Final de la Av. Principal De Guanta, Sector la Playa, Estado Anzoátegui',
      telefono: '+58 (414) 313.03.74',
      personaContacto: 'gerenciaocamaroriente@ocamar.com.ve',
      webSite: 'https://ocamar.com.ve/contactenos/',
      image: ''
    },
    {
      status: 'Processing',
      date: '15/10/2020 14:00',
      icon: 'pi pi-arrow-down-left',
      color: '#673AB7',
      nombre: 'A NAVA & CO, C.A AGENTES ADUANALES Y NAVIERA ',
      direccion:
        'Av. Bolivar. C.C.E. Caribe, Piso 2. Local L2-1, Falcón, Venezuela',
      telefono: '+58 (269) 246.69.70',
      personaContacto: 'info@navasca.com.ve',
      webSite: 'http://navasca.com.ve/',
      image: ''
    },

    {
      status: 'Delivered',
      date: '16/10/2020 10:00',
      icon: 'pi pi-arrow-down-left',
      color: '#607D8B',
      nombre: 'MARINE AGENCY',
      direccion: '-----------------',
      telefono: '',
      personaContacto: 'plc@marineagency.org',
      webSite: '#',
      image: ''
    },
    {
      status: 'Processing',
      date: '15/10/2020 14:00',
      icon: 'pi pi-arrow-down-left',
      color: '#673AB7',
      nombre: 'SERVICIO MARÍTIMOS DE ORIENTE C.A',
      direccion: 'Lecheria, Estado Anzoátegui',
      telefono: '+58 (414) 819.15.30',
      personaContacto: '',
      webSite: 'https://servimaritima.com/',
      image: ''
    },

    {
      status: 'Delivered',
      date: '16/10/2020 10:00',
      icon: 'pi pi-arrow-down-left',
      color: '#607D8B',
      nombre: 'NAUTICAL ROSE SERVICES VENEZUELA, C.A',
      direccion:
        'Final Av. Uno, Urb. Guaraguao, Puerto La Cruz, Anzoategui, Venezuela',
      telefono: '+58 (414) 4129425815',
      personaContacto: 'info@nauticalroses.com',
      webSite: 'https://nauticalroses.com/',
      image: ''
    },
    {
      status: 'Processing',
      date: '15/10/2020 14:00',
      icon: 'pi pi-arrow-down-left',
      color: '#673AB7',
      nombre: 'SOLUCIONES C.A',
      direccion: 'ZULIA, Venezuela',
      telefono: '+58 (412) 191.03.08',
      personaContacto: 'ops.plc@solucionesshippingagency.com',
      webSite: '#',
      image: ''
    },

    {
      status: 'Delivered',
      date: '16/10/2020 10:00',
      icon: 'pi pi-arrow-down-left',
      color: '#607D8B',
      nombre: 'NAVIERA PARAGUANÁ C.A ',
      direccion:
        'Av. Elice y José Felix Sosa, Edificio Nuevo Centro Piso 7, oficina 7-E, Chacao -Caracas. Venezuela',
      telefono: '+58 (416) 503.36.37',
      personaContacto: 'Info.navieraparaguana@gmail.com',
      webSite: 'https://www.navieraparaguana.com/',
      image: ''
    },
    {
      status: 'Processing',
      date: '15/10/2020 14:00',
      icon: 'pi pi-arrow-down-left',
      color: '#673AB7',
      nombre: 'ATLÁNTICO AGENTES LOGÍSTICOS Y PORTUARIOS C.A',
      direccion:
        'Av. Jacinto Lara, Esquina Libertador, Centro Comercial Premier Piso 1. Oficina N- 13, Punto Fijo, estado Falcón',
      telefono: '+58 (412) 059.51.25',
      personaContacto: 'atlanticoops@gmail.com',
      webSite: '#',
      image: ''
    },

    {
      status: 'Delivered',
      date: '16/10/2020 10:00',
      icon: 'pi pi-arrow-down-left',
      color: '#607D8B',
      nombre: 'BAFER SERVICIOS Y SUMINISTROS MARÍTIMOS, C.A',
      direccion: 'Av. Ollarvides. Punta Cardon Falcon, Venezuela',
      telefono: '+58 (412) 425.56.37',
      personaContacto: 'Info@Baferca.Com',
      webSite: 'https://baferca.com/',
      image: ''
    }
  ]
  const customizedMarker = (item) => {
    return (
      <span
        className="custom-marker p-shadow-2"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    )
  }
  const customizedContent = (item) => {
    return (
      <Card
        className="cardAgenciaMaritima animate__animated animate__flipInX animate__slower"
        title={item.nombre}
        subTitle={item.direccion}
      >
        {item.image && (
          <img
            src={`images/product/${item.image}`}
            onError={(e) =>
              (e.target.src =
                'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
            }
            alt={item.name}
            width={200}
            className="p-shadow-2"
          />
        )}
        <p className="">
          <i className="pi pi-envelope text-blue-500 text-xl ml-3 mr-3" />
          {'    '}
          {item.personaContacto && item.personaContacto}
        </p>

        <p>
          <i className="pi pi-phone text-blue-500 text-xl ml-3 mr-3" />

          {'  '}
          {item.telefono && item.telefono}
        </p>

        <a
          href={item.webSite}
          className="p-button font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sitio Web
        </a>
      </Card>
    )
  }
  return (
    <>
      <Timeline
        value={agenciasMaritimas}
        align="alternate"
        className="customized-timeline"
        marker={customizedMarker}
        content={customizedContent}
      />
    </>
  )
}
export default AgenciasMaritimasList
