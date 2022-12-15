/* eslint-disable indent */
import { AppMenu } from './AppMenu'
import AuthUse from '../../../auth/AuthUse'

export const MenuProcura = () => {
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
            to: '/apps/procura/proyectoaux',
            permi: 'SUPERADMIN'
          },
          {
            label: 'CONCURSO',
            icon: 'pi pi-fw pi-database',
            to: '/apps/procura/ganador',
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
