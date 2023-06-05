/* eslint-disable indent */
import { AppMenu } from './AppMenu'
import AuthUse from '../../../auth/AuthUse'

export const MenuAdministracion = () => {
  const auth = AuthUse()

  const panelMenuitems = [
    {
      label: 'ESCRITORIO',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'INICIO',
          icon: 'pi pi-fw pi-home',
          to: '/apps/administracion',
          permi: 'ADMIN',
          permi2: 'OPERADOR'
        }
      ]
    },

    auth.user.faidUser.roles[0] !== 'LECTURA' &&
      auth.user.faidUser.roles[0] !== 'CLIENTE' && {
        label: 'OPERACIONES',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'CARGA DE INFORMACION',
            icon: 'pi pi-fw pi-server',
            to: '/apps/administracion/cargaInformacion',
            permi: 'ADMIN',
            permi2: 'OPERADOR'
          },
          {
            label: 'CARGA DE PROFORMA',
            icon: 'pi pi-fw pi-server',
            to: '/apps/administracion/cargaProforma',
            permi: 'ADMIN',
            permi2: 'OPERADOR'
          }
        ]
      },

    auth.user.faidUser.roles[0] === 'SUPERADMIN' && {
      label: 'CARGA DE INFORMACION',
      icon: 'pi pi-fw pi-envelope',
      permi: 'SUPERADMIN',
      items: [
        {
          label: 'PROYECTOS',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/proyectoaux',
          permi: 'SUPERADMIN'
        },
        {
          label: 'ACTIVOS',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/Activo',
          permi: 'SUPERADMIN'
        },
        {
          label: 'CENTRODECOSTOSAUX',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/CentroDeCostoAux',
          permi: 'SUPERADMIN'
        },
        {
          label: 'PROCESOAUX',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/ProcesoAux',
          permi: 'SUPERADMIN'
        },
        {
          label: 'CONCEPTOAUX',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/ConceptoAux',
          permi: 'SUPERADMIN'
        },
        {
          label: 'FACTURA',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/Factura',
          permi: 'SUPERADMIN'
        },
        {
          label: 'INGRESOGASTO',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/IngresoGasto',
          permi: 'SUPERADMIN'
        },
        {
          label: 'PROVEEDOR',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/Proveedor',
          permi: 'SUPERADMIN'
        },
        {
          label: 'PRESUPUESTO',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/Presupuesto',
          permi: 'SUPERADMIN'
        },
        {
          label: 'MENSUALIDAD OPERATIVA',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/MensualidadOpMes',
          permi: 'SUPERADMIN'
        },
        {
          label: 'COSTO TM MES',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/CostoTmMes',
          permi: 'SUPERADMIN'
        },
        {
          label: 'CAJA CHICA',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/CajaChica',
          permi: 'SUPERADMIN'
        },
        {
          label: 'DOMINIO',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/Dominio',
          permi: 'SUPERADMIN'
        },
        {
          label: 'DIVISION',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/Division',
          permi: 'SUPERADMIN'
        },
        {
          label: 'DEPENDENCIA',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/Dependencia',
          permi: 'SUPERADMIN'
        },
        {
          label: 'SUBDEPENDENCIA',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/SubDependencia',
          permi: 'SUPERADMIN'
        },
        {
          label: 'ACTIVIDADAASOCIADA',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/ActividadAsociada',
          permi: 'SUPERADMIN'
        },
        {
          label: 'CLASIFICACIONSERVICIO',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/ClasificacionServicio',
          permi: 'SUPERADMIN'
        },
        {
          label: 'CLASIFICACION3ERNIVEL',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/Clasificacion3erNivel',
          permi: 'SUPERADMIN'
        },
        {
          label: 'CLASIFICACION4TONIVEL',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/Clasificacion4toNivel',
          permi: 'SUPERADMIN'
        },
        {
          label: 'PROFORMA',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/Proforma',
          permi: 'SUPERADMIN'
        },
        {
          label: 'ITEMSPROFORMA',
          icon: 'pi pi-fw pi-database',
          to: '/apps/administracion/ItemsProforma',
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
