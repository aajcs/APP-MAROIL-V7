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
          permi: 'SUPERADMIN',
          permi1: 'SUPERADMIN'
        }
      ]
    },

    auth.user.faidUser.roles[0] !== 'LECTURA' &&
      auth.user.faidUser.roles[0] !== 'CLIENTE' && {
        label: 'OPERACIONES',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'REQUISICIÓN',
            icon: 'pi pi-fw pi-server'
            // to: '/apps/control/gabarraestatus'
          }
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
