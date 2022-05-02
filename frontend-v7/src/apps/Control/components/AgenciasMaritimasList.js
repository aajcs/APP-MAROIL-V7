import { Timeline } from 'primereact/timeline'
import { Card } from 'primereact/card'

const AgenciasMaritimasList = () => {
  const agenciasMaritimas = [
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
      nombre: 'A. NAVAS & CO CA',
      direccion: 'Falcón, Venezuela',
      telefono: '+58 (269) 246.69.70',
      personaContacto: 'info@navasca.com.ve',
      webSite: 'http://navasca.com.ve/',
      image: ''
    },
    {
      status: 'Shipped',
      date: '15/10/2020 16:15',
      icon: 'pi pi-arrow-down-right',
      color: '#FF9800',
      nombre: 'DESARROLLOS 1405',
      direccion:
        'Avenida principal de lechería, Edif Y2K, piso 1, Estado Anzoategui.',
      telefono: '+58 (281) 282.02.58',
      personaContacto: 'ventas@desarrollos1405.com',
      webSite: 'https://desarrollos1405.com/',
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
