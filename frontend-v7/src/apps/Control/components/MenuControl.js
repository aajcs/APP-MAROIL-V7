/* eslint-disable indent */
import { AppMenu } from './AppMenu'
import AuthUse from '../../../auth/AuthUse'

export const MenuControl = () => {
  const auth = AuthUse()
  console.log(auth.user.faidUser.nombre)
  const usersBloqueo = ['vina', 'psuarez']
  const userBloqueo = usersBloqueo.filter((x) => x === auth.user.faidUser.user)

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
          label: 'INFORMACIÓN MARÍTIMA',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfo',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        {
          label: 'HISTORICO DE BUQUES',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/historicoBuques',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        {
          label: 'CONTROL DE LIQUIDOS',
          icon: 'pi pi-fw pi-home',
          to: '/apps/controlLiquidos/inicioInfo',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'CREC 10') && {
          label: 'CLIENTE CREC 10',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoCrec10',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },

        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'ENDECO') && {
          label: 'CLIENTE ENDECO',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoEndeco',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre ===
            'KARAMAN PETROKIMYA ANONIM SIRKETI') && {
          label: 'CLIENTE KARAMAN PETROKIMYA ANONIM SIRKETI',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoKaramanPetrokimyaAnonimSirketi',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'PRAXLAN') && {
          label: 'CLIENTE PRAXLAN',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoPraxlan',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'PROTOCOL CAPITAL W. L. L.') && {
          label: 'CLIENTE PROTOCOL CAPITAL W. L. L.',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoProtocolCapitalWLL',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'RAC OVERSEAS') && {
          label: 'CLIENTE RAC OVERSEAS',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoRacOverseas',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre ===
            'FONTE GLOBAL TRADING AND LOGISTICS') && {
          label: 'CLIENTE FONTE GLOBAL TRADING AND LOGISTICS',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoFonteGlobalTradingAndLogistics',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'TTCO VERSEAS') && {
          label: 'CLIENTE TTCO VERSEAS',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoTTCOverseas',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'NORMAN GLOBAL CORPORATION') && {
          label: 'CLIENTE NORMAN GLOBAL CORPORATION',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoNormanGlobalCorporation',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'MINAS GUSA') && {
          label: 'CLIENTE MINAS GUSA',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoMinasGusa',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'TARDID LIMITED') && {
          label: 'CLIENTE TARDID LIMITED',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoTardidLimited',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'GLOBAL CARGO TRADING') && {
          label: 'CLIENTE GLOBAL CARGO TRADING',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoGlobalCargoTrading',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'COMET') && {
          label: 'CLIENTE COMET',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoComet',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'FARLE') && {
          label: 'CLIENTE FARLE',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoFarle',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },

        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre ===
            'EMPRESA DE ASISTENCIAS Y SERVICIOS') && {
          label: 'CLIENTE EMPRESA DE ASISTENCIAS Y SERVICIOS',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoEmpresaDeAsistenciasYServicios',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'GLOBULK DMCC') && {
          label: 'CLIENTE GLOBULK DMCC',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoGlobulkDmcc',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'GRANELES') && {
          label: 'CLIENTE GRANELES',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoGraneles',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'ADENIX GROUP LIMITED') && {
          label: 'CLIENTE ADENIX GROUP LIMITED',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoAdenixGroupLimited',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'SUPERIOR QUANTITY SDN BHD') && {
          label: 'CLIENTE SUPERIOR QUANTITY SDN BHD',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoSuperiorQuantitySDNBHD',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'REZEL CATALYSTS') && {
          label: 'CLIENTE REZEL CATALYSTS',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoRezelCatalysts',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'ATLAS OIL') && {
          label: 'CLIENTE ATLAS OIL',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoAtlasOil',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'IRAN GARMENT COMPANY') && {
          label: 'CLIENTE IRAN GARMENT COMPANY',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoIranGarmentCompany',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'UNECA') && {
          label: 'CLIENTE UNECA',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoUneca',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        (auth.user.faidUser.roles[0] !== 'CLIENTE' ||
          auth.user.faidUser.nombre === 'INTERNATIONAL MATERIALS') && {
          label: 'CLIENTE INTERNATIONAL MATERIALS',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfoInternationalMaterials',
          permi: 'ADMIN',
          permi2: 'OPERADOR',
          permi3: 'CLIENTE'
        },
        {
          label: 'BUQUE 3D',
          icon: 'pi pi-fw pi-box',
          to: '/apps/control/barco3d',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        userBloqueo.length === 0 && {
          label: 'PROGRAMACIÓN DE VENTANA',
          icon: 'pi pi-fw pi-ticket',
          to: '/apps/control/programacionventanaAgendaPage',
          permi: 'ADMIN'
        }
      ]
    },
    auth.user.faidUser.roles[0] !== 'CLIENTE' && {
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
    auth.user.faidUser.roles[0] !== 'CLIENTE' && {
      label: 'ESTADISTICAS',
      icon: 'pi pi-fw pi-chart-bar',

      items: [
        userBloqueo.length === 0 && {
          label: 'MÓDULO DE GRÁFICOS',
          icon: 'pi pi-fw pi-chart-bar',
          to: '/apps/control/BuquesPorCliente',
          permi: 'ADMIN'
        },
        userBloqueo.length === 0 && {
          label: 'MÓDULO DE VOLUMETRIA',
          icon: 'pi pi-fw pi-chart-bar',
          to: '/apps/control/VolumetriaEstadistica',
          permi: 'ADMIN'
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

    auth.user.faidUser.roles[0] !== 'LECTURA' &&
      auth.user.faidUser.roles[0] !== 'CLIENTE' && {
        label: 'OPERACIONES',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'GERENCIA TERRESTRE',
            icon: 'pi pi-fw pi-server',
            to: '/apps/control/gabarraestatus'
          },
          {
            label: 'GERENCIA MARÍTIMA',
            icon: 'pi pi-fw pi-server',
            to: '/apps/control/OperacionesGOM',
            permi: 'ADMIN',
            permi2: 'OPERADOR'
          }
        ]
      },

    auth.user.faidUser.roles[0] !== 'CLIENTE' && {
      label: 'SERVICIOS',
      icon: 'pi pi-fw pi-chart-bar',

      items: [
        {
          label: 'AGENCIAS MARÍTIMAS',
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
    auth.user.faidUser.roles[0] !== 'CLIENTE' &&
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
          },
          {
            label: 'VOLUMETRIA',
            icon: 'pi pi-fw pi-database',
            to: '/apps/control/Volumetria',
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
