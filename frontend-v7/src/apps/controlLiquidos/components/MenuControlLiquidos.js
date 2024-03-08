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
          to: '/apps/controlLiquidos/inicioInfo',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        {
          label: 'CONTROL DE SOLIDOS',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/control/reportecargaGOMInfo',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
        },
        {
          label: 'HISTORIAL DE VIAJES',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/controlLiquidos/viajeinfo',
          permi: 'ADMIN',
          permi1: 'LECTURA',
          permi2: 'OPERADOR'
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
        },
        {
          label: 'INFORMACIÓN GASTOS',
          icon: 'pi pi-fw pi-info-circle',
          to: '/apps/controlLiquidos/gastosOperacionaleinfo',
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
            icon: 'pi pi-fw pi-server',
            to: '/apps/controlLiquidos/cargaInformacion',
            permi: 'ADMIN',
            permi2: 'OPERADOR'
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
            label: 'BUQUE',
            icon: 'pi pi-fw pi-database',
            to: '/apps/controlLiquidos/buque',
            permi: 'SUPERADMIN'
          },
          {
            label: 'REPORTE DE CARGA BUQUE',
            icon: 'pi pi-fw pi-database',
            to: '/apps/controlLiquidos/reporteCargaBuque',
            permi: 'SUPERADMIN'
          },
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
          },
          {
            label: 'VIAJEAUX',
            icon: 'pi pi-fw pi-database',
            to: '/apps/controlLiquidos/viajeAux',
            permi: 'SUPERADMIN'
          },
          {
            label: 'CARGAVIAJE',
            icon: 'pi pi-fw pi-database',
            to: '/apps/controlLiquidos/CargaViaje',
            permi: 'SUPERADMIN'
          },
          {
            label: 'TANQUEAUX',
            icon: 'pi pi-fw pi-database',
            to: '/apps/controlLiquidos/TanqueAux',
            permi: 'SUPERADMIN'
          },
          {
            label: 'GASTOSOPERACIONALE',
            icon: 'pi pi-fw pi-database',
            to: '/apps/controlLiquidos/GastosOperacionale',
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
