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
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        {
          label: 'ADMINISTRACION',
          icon: 'pi pi-fw pi-home',
          to: '/apps/reportegerencia/AdministracionReporte',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        {
          label: 'CONTROL SOLIDOS',
          icon: 'pi pi-fw pi-home',
          to: '/apps/reportegerencia/ControlSolidoReporte',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        {
          label: 'COSTO POR TONELADA',
          icon: 'pi pi-fw pi-home',
          to: '/apps/reportegerencia/CostoPorTm',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        }
      ]
    },

    auth.user.faidUser.roles[0] !== 'SUPERADMIN' && {
      label: 'OPERACIONES',
      icon: 'pi pi-fw pi-shopping-cart',
      items: []
    },

    auth.user.faidUser.roles[0] !== 'SUPERADMIN' && {
      label: 'CARGA DE INFORMACION',
      icon: 'pi pi-fw pi-envelope',
      permi: 'SUPERADMIN',
      items: []
    }
  ]

  return (
    <>
      <AppMenu model={panelMenuitems} />
    </>
  )
}
