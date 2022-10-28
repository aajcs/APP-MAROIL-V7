/* eslint-disable indent */
import { AppMenu } from './AppMenu'
import AuthUse from '../../../auth/AuthUse'

export const MenuReporteGerencia = () => {
  const auth = AuthUse()

  const panelMenuitems = [
    {
      label: 'ESCRITORIO',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'INICIO',
          icon: 'pi pi-fw pi-home',
          to: '/apps/ReporteGerencia',
          permi: 'SUPERADMIN',
          permi1: 'SUPERADMIN'
        },
        {
          label: 'ADMINISTRACION',
          icon: 'pi pi-fw pi-home',
          to: '/apps/reportegerencia/AdministracionReporte',
          permi: 'SUPERADMIN',
          permi1: 'SUPERADMIN'
        },
        {
          label: 'CONTROL SOLIDOS',
          icon: 'pi pi-fw pi-home',
          to: '/apps/reportegerencia/ControlSolidoReporte',
          permi: 'SUPERADMIN',
          permi1: 'SUPERADMIN'
        },
        {
          label: 'COSTO POR TONELADA',
          icon: 'pi pi-fw pi-home',
          to: '/apps/reportegerencia/CostoPorTm',
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
            // to: '/apps/ReporteGerencia/proyectoaux',
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
