/* eslint-disable indent */
import { AppMenu } from './AppMenu'
import AuthUse from '../../../auth/AuthUse'

export const MenuControlLiquidos = () => {
  const auth = AuthUse()

  const panelMenuitems = [
    {
      label: 'ESCRITORIO',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'INICIO',
          icon: 'pi pi-fw pi-home',
          // to: '/apps/control/reportecargaGOMInfo',
          permi: 'SUPERADMIN',
          permi1: 'SUPERADMIN'
        },
        {
          label: 'INFORMACIÓN EMBARCACIONES',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/controlLiquidos/embarcacioninfo',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        {
          label: 'INFORMACIÓN REMOLCADORES',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/controlLiquidos/remolcadorinfo',
          permi: 'ADMIN',
          permi1: 'LECTURA',
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
            label: 'CARGA DE INFORMACIÓN',
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
            label: 'EMBARCACION',
            icon: 'pi pi-fw pi-database',
            to: '/apps/controlLiquidos/embarcacion',
            permi: 'SUPERADMIN'
          },
          {
            label: 'REMOLCADOR',
            icon: 'pi pi-fw pi-database',
            to: '/apps/controlLiquidos/remolcador',
            permi: 'SUPERADMIN'
          },
          {
            label: 'VIAJE',
            icon: 'pi pi-fw pi-database',
            to: '/apps/controlLiquidos/viaje',
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
