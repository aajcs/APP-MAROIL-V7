import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { ProformaContext } from '../contexts/ProformaContext'
import moment from 'moment'

import CargaProformaForm from './CargaProformaForm'
import AuthUse from '../../../auth/AuthUse'

import ItemsProformaForm from './ItemsProformaForm'
const CargaProformaList = () => {
  const auth = AuthUse()
  const { proformas, findProforma, deleteProforma, loading } =
    useContext(ProformaContext)

  const [proforma, setProforma] = useState(proformas)
  const [deleteProformaDialog, setDeleteProformaDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isVisible2, setIsVisible2] = useState(false)
  const [expandedRows2, setExpandedRows2] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveProforma = (id) => {
    findProforma(id)
    setIsVisible(true)
  }

  // cabecera de la tabla
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2 ">
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={() => setIsVisible(true)}
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

  const fechaControlProformaBody = (rowData) => {
    const fecha = moment(rowData.fechaControlProforma)
    return fecha.format('DD/MM/YY')
  }
  // const fechaProformaModificado = (rowData) => {
  //   const fecha = moment(rowData.proformaModificado)
  //   return fecha.format('dddDD/MM/YY')
  // }

  const eliminarProforma = () => {
    deleteProforma(proforma.id)
    setDeleteProformaDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Proforma Eliminado',
      life: 3000
    })
  }

  const deleteProformaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteProformaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarProforma()}
      />
    </>
  )

  const confirmDeleteProforma = (proformas) => {
    setProforma(proformas)
    setDeleteProformaDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-1"
          onClick={() => saveProforma(rowData.id)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteProforma(rowData)}
          />
        )}
      </div>
    )
  }

  // const header = (
  //   <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
  //     <h5 className="m-0">Proforma</h5>
  //     <span className="block mt-2 md:mt-0 p-input-icon-left">
  //       <i className="pi pi-search" />
  //       <InputText
  //         type="search"
  //         onInput={(e) => setGlobalFilter(e.target.value)}
  //         placeholder="Buscar..."
  //       />
  //     </span>
  //   </div>
  // )
  const clearSelected = () => {
    setDeleteProformaDialog(false)
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
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  const itemPrecioUnitarioBodyTemplate = (rowData) => {
    return formatCurrency(rowData.itemPrecioUnitario)
  }
  const itemPrecioTotalBodyTemplate = (rowData) => {
    return formatCurrency(rowData.itemCantidad * rowData.itemPrecioUnitario)
  }
  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <DataTable
          value={data.items}
          // responsiveLayout="scroll"
          sortField="data.reporteCargaGOMModificado"
          sortOrder={-1}
        >
          <Column
            field="itemId"
            header="itemId"
            className=" pt-0 pb-0"
            hidden={true}
          ></Column>

          <Column
            field="itemClasificacionServicio"
            header="Clasificacion Servicio"
            className=" pt-0 pb-0"
          ></Column>
          <Column
            field="itemClasificacion3erNivel"
            header="itemClasificacion3erNivel"
            className=" pt-0 pb-0"
            hidden={true}
          ></Column>
          <Column
            field="itemClasificacion4toNivel"
            header="Codigo"
            className=" pt-0 pb-0"
          ></Column>
          <Column
            field="itemDescripcion"
            header="Descripcion"
            className=" pt-0 pb-0"
          ></Column>
          <Column
            field="itemUnidad"
            header="Unidad"
            className=" pt-0 pb-0"
          ></Column>
          <Column
            field="itemCantidad"
            header="Cantidad"
            className=" pt-0 pb-0"
          ></Column>

          <Column
            field="itemPrecioUnitario"
            header="Precio Unitario"
            body={itemPrecioUnitarioBodyTemplate}
            className=" pt-0 pb-0"
          ></Column>
          <Column
            field="itemPrecioTotal"
            header="Precio Total"
            body={itemPrecioTotalBodyTemplate}
            className=" pt-0 pb-0"
          ></Column>
        </DataTable>
      </div>
    )
  }
  const expandAll = () => {
    const _expandedRows = {}
    proformas.forEach((p) => (_expandedRows[`${p.id}`] = true))

    setExpandedRows2(_expandedRows)
  }

  const collapseAll = () => {
    setExpandedRows2(null)
  }
  const header2 = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <Button
        icon="pi pi-plus"
        label="Expandir Todos"
        onClick={expandAll}
        className="mr-2"
      />
      <Button icon="pi pi-minus" label="Reducir Todos" onClick={collapseAll} />
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

  return (
    <>
      <Toast ref={toast} />
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>

      <DataTable
        ref={dt}
        value={proformas}
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
        loading={loading}
      >
        <Column expander style={{ width: '3em' }} />
        <Column
          body={actionBodyTemplate}
          className=" p-0"
          style={{ minWidth: '6rem' }}
        ></Column>

        <Column field="codigoProforma" header="codigo Proforma" sortable />
        <Column
          field="proveedorId.nombreProveedor"
          header="Proveedor"
          sortable
        />
        <Column
          field="numeroControlProforma"
          header="Numero Proforma"
          sortable
        />
        <Column
          field="fechaControlProforma"
          header="Fecha Proforma"
          sortable
          body={fechaControlProformaBody}
        />
        <Column field="dominioId.nombreDominio" header="Dominio" sortable />
        <Column field="divisionId.nombreDivision" header="Division" sortable />
        <Column
          field="dependenciaId.nombreDependencia"
          header="Dependencia"
          sortable
        />
        <Column
          field="subDependenciaId.nombreSubDependencia"
          header="Sub Dependencia"
          sortable
        />
        <Column field="usoFondoProforma" header="Uso Fondo Proforma" />
        <Column
          field="actividadAsociadaId.nombreActividadAsociada"
          header="Actividad Asociada"
          sortable
        />
        <Column
          field="clasificacionServicioId.nombreClasificacionServicio"
          header="Clasificacion Servicio"
          sortable
        />

        <Column field="totalProforma" header="totalProforma" sortable />
        <Column field="descripcionProforma" header="Descripcion" sortable />
        <Column field="estatusProforma" header="Estatus Proforma" sortable />
        <Column field="estatus2Proforma" header="Estatus2 Proforma" sortable />
        {/* <Column field="userCreatorId.id" header="userCreatorId" sortable />

        <Column
          field="creadoProforma"
          body={fechaProformaCreado}
          header="creadoProforma"
          dataType="date"
          sortable
        />
        <Column
          field="modificadoProforma"
          body={fechaProformaModificado}
          header="modificadoProforma"
          dataType="date"
          sortable
        /> */}
      </DataTable>

      <CargaProformaForm isVisible={isVisible} setIsVisible={setIsVisible} />
      <ItemsProformaForm isVisible={isVisible2} setIsVisible={setIsVisible2} />

      <Dialog
        visible={deleteProformaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteProformaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {proforma && (
            <span>
              Esta seguro que quiere eliminar la Proforma{' '}
              <b>{proforma.nombreProforma}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default CargaProformaList
