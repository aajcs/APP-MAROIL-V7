/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { ColumnGroup } from 'primereact/columngroup'
import { Row } from 'primereact/row'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { VolumetriaContext } from '../contexts/VolumetriaContext'
import { BarcoContext } from '../contexts/BarcoContext'
import VolumetriaForm from './VolumetriaForm'
import { InputText } from 'primereact/inputtext'
import moment from 'moment'
import { BarcoService } from '../services/BarcoService'
import AuthUse from '../../../auth/AuthUse'

const VolumetriaListCargaDatos = () => {
  const barcoService = new BarcoService()
  const auth = AuthUse()
  const token = auth.user.token
  const { volumetrias, findVolumetria, deleteVolumetria, loading } =
    useContext(VolumetriaContext)

  const { barcos } = useContext(BarcoContext)
  const [barcostodos, setBarcostodos] = useState(barcos)

  const [volumetria, setVolumetria] = useState(volumetrias)
  const [deleteVolumetriaDialog, setDeleteVolumetriaDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [expandedRows2, setExpandedRows2] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const dt2 = useRef(null)
  const toast = useRef(null)
  const saveVolumetria = (id) => {
    findVolumetria(id)
    setIsVisible(true)
  }

  useEffect(() => {
    barcoService.readAll(token).then((data) => {
      setBarcostodos(data)
    })
  }, [volumetrias])

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={() => setIsVisible(true)}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
          />
        </div>
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    )
  }
  const exportCSV = () => {
    dt.current.exportCSV()
  }

  const eliminarVolumetria = () => {
    deleteVolumetria(volumetria.id)
    setDeleteVolumetriaDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Reporte Carga GOM Eliminado',
      life: 3000
    })
  }
  const deleteVolumetriaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteVolumetriaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarVolumetria()}
      />
    </>
  )
  const confirmDeleteVolumetria = (volumetrias) => {
    setVolumetria(volumetrias)
    setDeleteVolumetriaDialog(true)
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => saveVolumetria(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteVolumetria(rowData)}
        />
      </div>
    )
  }
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Volumetria</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        {/* <i className="pi pi-search" />
         <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        /> */}
      </span>
    </div>
  )
  const clearSelected = () => {
    setDeleteVolumetriaDialog(false)
  }

  const fechaBlFinalVolumetriaTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaBlFinalVolumetria).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaBlFinalVolumetria)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const volumetriaCreadoTemplate = (rowData) => {
    const validarFecha = moment(rowData.volumetriaCreado).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.volumetriaCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const volumetriaModificadoTemplate = (rowData) => {
    const validarFecha = moment(rowData.volumetriaModificado).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.volumetriaModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaFinalCargaTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaFinalCarga).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaFinalCarga)
    return fecha.format('MMMM/YY')
  }
  const blFinalVolumetriaBodyTemplate = (rowData) => {
    const numeroTonelada = new Intl.NumberFormat('de-DE').format(
      rowData.blFinalVolumetria
    )
    return numeroTonelada + ' TM'
  }
  const blFinalBuqueBodyTemplate = (rowData) => {
    const numeroTonelada = new Intl.NumberFormat('de-DE').format(
      rowData.blFinalBuque
    )
    return numeroTonelada + ' TM'
  }
  const onRowExpand = (event) => {
    toast.current.show({
      severity: 'info',
      summary: 'Grupo de filas ampliado',
      detail: 'Buque: ' + event.data.nombreBarco,
      life: 3000
    })
  }

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: 'success',
      summary: 'Product Collapsed',
      detail: event.data.name,
      life: 3000
    })
  }
  const expandAll = () => {
    const _expandedRows = {}
    barcos.forEach((p) => (_expandedRows[`${p.id}`] = true))

    setExpandedRows2(_expandedRows)
  }

  const collapseAll = () => {
    setExpandedRows2(null)
  }
  const header2 = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <Button
        icon="pi pi-plus"
        label="Expand All"
        onClick={expandAll}
        className="mr-2"
      />
      <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} />
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  )

  const blVolumetriaTotal = (data) => {
    let total = 0

    for (const data1 of data) {
      total += data1.blFinalVolumetria
    }

    return new Intl.NumberFormat('de-DE').format(total) + ' TM'
  }

  const footerGroup = (data) => {
    return (
      <ColumnGroup>
        <Row>
          <Column
            footer="Totals:"
            colSpan={4}
            footerStyle={{ textAlign: 'right' }}
          />
          <Column footer={blVolumetriaTotal(data)} />
        </Row>
      </ColumnGroup>
    )
  }
  const rowExpansionTemplate = (data) => {
    const volumetriaBuques = volumetrias.filter(
      (p) => p.barcoID && p.barcoID.id === data.id && p
    )

    return (
      <div className="orders-subtable">
        <DataTable
          ref={dt2}
          value={volumetriaBuques}
          responsiveLayout="scroll"
          dataKey="id"
          header={header}
          globalFilter={globalFilter}
          groupRowsBy="blFinalVolumetria"
          footerColumnGroup={footerGroup(volumetriaBuques)}
          sortField="estatusBarco"
          sortOrder={-1}
          loading={loading}
        >
          <Column body={actionBodyTemplate}></Column>
          <Column field="barcoID.nombreBarco" header="Buque" sortable />
          <Column field="barcoID.buqueCliente" header="buqueCliente" sortable />
          <Column field="terminalAuxId" header="terminalAuxId" sortable />
          <Column
            field="blFinalVolumetria"
            header="blFinalVolumetria"
            sortable
            body={blFinalVolumetriaBodyTemplate}
          />
          <Column
            field="fechaBlFinalVolumetria"
            header="fechaBlFinalVolumetria"
            sortable
            body={fechaBlFinalVolumetriaTemplate}
            dataType="date"
          />
          {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
            <Column
              field="volumetriaCreado"
              header="volumetriaCreado"
              body={volumetriaCreadoTemplate}
              dataType="date"
            />
          )}
          {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
            <Column
              field="volumetriaModificado"
              header="volumetriaModificado"
              dataType="date"
              body={volumetriaModificadoTemplate}
            />
          )}
        </DataTable>
      </div>
    )
  }

  return (
    <>
      <Toast ref={toast} />
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>

      <div className="card">
        <DataTable
          value={barcostodos}
          expandedRows={expandedRows2}
          onRowToggle={(e) => setExpandedRows2(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          responsiveLayout="scroll"
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="id"
          header={header2}
          globalFilter={globalFilter}
          sortField="estatusBarco"
          sortOrder={-1}
        >
          <Column expander style={{ width: '3em' }} />
          <Column field="nombreBarco" header="Buque" sortable />

          <Column
            field="blFinalBuque"
            header="toneladas Finales"
            sortable
            body={blFinalBuqueBodyTemplate}
          />
          <Column
            field="fechaFinalCarga"
            header="fechaFinalCarga"
            sortable
            body={fechaFinalCargaTemplate}
          />
        </DataTable>
      </div>

      <VolumetriaForm isVisible={isVisible} setIsVisible={setIsVisible} />
      <Dialog
        visible={deleteVolumetriaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteVolumetriaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {volumetria && (
            <span>
              Esta seguro que quiere eliminar la volumetria Selecionado ?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default VolumetriaListCargaDatos
