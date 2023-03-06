/* eslint-disable indent */
import { AppMenu } from './AppMenu'
import AuthUse from '../../../auth/AuthUse'

export const MenuPlanificacionMaritima = () => {
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
          }
        ]
      },

    auth.user.faidUser.roles[0] === 'SUPERADMIN' && {
      label: 'CARGA DE INFORMACION',
      icon: 'pi pi-fw pi-envelope',
      permi: 'SUPERADMIN',
      items: [
        {
          label: 'ACTIVIDADES',
          icon: 'pi pi-fw pi-database',
          to: '/apps/PlanificacionMaritima/actividad',
          permi: 'SUPERADMIN'
        },
        {
          label: 'PRESUPUESTO',
          icon: 'pi pi-fw pi-database',
          to: '/apps/PlanificacionMaritima/presupuestopm',
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
