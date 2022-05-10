/* eslint-disable indent */
import { AppMenu } from './AppMenu'
import AuthUse from '../../../auth/AuthUse'

export const MenuControl = () => {
  const auth = AuthUse()
  const panelMenuitems = [
    {
      label: 'ESCRITORIO',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'INICIO',
          icon: 'pi pi-fw pi-home',
          to: '/apps/control/reportecargaGOMInfo',
          permi: 'SUPERADMIN',
          permi1: 'SUPERADMIN'
        },
        {
          label: 'INFORMACION MARITIMA',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfo',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        {
          label: 'BUQUE 3D',
          icon: 'pi pi-fw pi-box',
          to: '/apps/control/barco3d',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        {
          label: 'PROGRAMACION DE VENTANA',
          icon: 'pi pi-fw pi-ticket',
          to: '/apps/control/programacionventanaAgendaPage',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        }
      ]
    },
    {
      label: 'MODELADO',
      icon: 'pi pi-fw pi-shopping-cart',
      items: [
        {
          label: 'MODELADO OPERACIONES',
          icon: 'pi pi-fw pi-video',
          to: '/apps/control/ModeladoOperacion',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        }
      ]
    },
    {
      label: 'ESTADISTICAS',
      icon: 'pi pi-fw pi-chart-bar',

      items: [
        {
          label: 'BUQUES POR CONSIGNATARIO',
          icon: 'pi pi-fw pi-chart-bar',
          to: '/apps/control/BuquesPorCliente',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        {
          label: 'MAPA',
          icon: 'pi pi-fw pi-map',
          to: '/apps/control/mapaestadistica',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        }

        // {
        //   label: 'CARGA DEL MES',
        //   icon: 'pi pi-fw pi-search'
        //   // items: [
        //   //   {
        //   //     label: "Customer",
        //   //     icon: "pi pi-fw pi-plus",
        //   //     template: (item, options) => {
        //   //       return (
        //   //           /* custom element */
        //   //           <a className={options.className} target={item.target} onClick={options.onClick}>
        //   //               <span className={classNames(options.iconClassName, 'pi pi-home')}></span>;
        //   //               <span className={options.labelClassName}>{item.label}</span>;
        //   //           </a>
        //   //       );
        //   //   },
        //   //   },
        //   //   {
        //   //     label: "Duplicate",
        //   //     icon: "pi pi-fw pi-copy",
        //   //     command:()=>( <Redirect to="/404" />),
        //   //   },
        //   // ],
        // }
      ]
    },

    auth.user.faidUser.roles[0] !== 'LECTURA' && {
      label: 'OPERACIONES',
      icon: 'pi pi-fw pi-shopping-cart',
      items: [
        {
          label: 'GERENCIA TERRESTRE',
          icon: 'pi pi-fw pi-server',
          to: '/apps/control/gabarraestatus'
        },
        {
          label: 'GERENCIA MARITIMA',
          icon: 'pi pi-fw pi-server',
          to: '/apps/control/OperacionesGOM',
          permi: 'ADMIN',
          permi2: 'OPERADOR'
        }
      ]
    },
    {
      label: 'SERVICIOS',
      icon: 'pi pi-fw pi-chart-bar',

      items: [
        {
          label: 'AGENCIAS MARITIMAS',
          icon: 'pi pi-fw pi-tags',
          to: '/apps/control/agenciamasritimas',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        }
        // {
        //   label: 'CARGA DEL MES',
        //   icon: 'pi pi-fw pi-search'
        //   // items: [
        //   //   {
        //   //     label: "Customer",
        //   //     icon: "pi pi-fw pi-plus",
        //   //     template: (item, options) => {
        //   //       return (
        //   //           /* custom element */
        //   //           <a className={options.className} target={item.target} onClick={options.onClick}>
        //   //               <span className={classNames(options.iconClassName, 'pi pi-home')}></span>;
        //   //               <span className={options.labelClassName}>{item.label}</span>;
        //   //           </a>
        //   //       );
        //   //   },
        //   //   },
        //   //   {
        //   //     label: "Duplicate",
        //   //     icon: "pi pi-fw pi-copy",
        //   //     command:()=>( <Redirect to="/404" />),
        //   //   },
        //   // ],
        // }
      ]
    },
    auth.user.faidUser.roles[0] !== 'LECTURA' &&
      auth.user.faidUser.roles[0] !== 'ADMIN' && {
        label: 'CARGA DE INFORMACION',
        icon: 'pi pi-fw pi-envelope',
        permi: 'SUPERADMIN',
        items: [
          {
            label: 'BUQUES',
            icon: 'pi pi-fw pi-database',
            to: '/apps/control/barco',
            permi: 'SUPERADMIN'
          },
          {
            label: 'GABARRA',
            icon: 'pi pi-fw pi-stop',
            to: '/apps/control/gabarra',
            permi: 'SUPERADMIN'
          },
          {
            label: 'USUARIOS',
            icon: 'pi pi-fw pi-user-plus',
            to: '/apps/control/usuarios',
            permi: 'SUPERADMIN'
          },

          {
            label: 'REPORTE CARGA',
            icon: 'pi pi-fw pi-database',
            to: '/apps/control/reportecarga',
            permi: 'SUPERADMIN'
          },
          {
            label: 'REPORTE CARGA GOM',
            icon: 'pi pi-fw pi-database',
            to: '/apps/control/reportecargaGOM',
            permi: 'SUPERADMIN'
          },
          {
            label: 'CARGA BODEGA',
            icon: 'pi pi-fw pi-database',
            to: '/apps/control/cargabodega',
            permi: 'SUPERADMIN'
          },
          {
            label: 'PROGRAMACION DE VENTANA',
            icon: 'pi pi-fw pi-database',
            to: '/apps/control/programacionventana',
            permi: 'SUPERADMIN'
          }
        ]
      }
  ]

  return (
    <>
      <AppMenu model={panelMenuitems} />
    </>
  )
}
