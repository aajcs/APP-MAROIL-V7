/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { BuqueContext } from '../contexts/BuqueContext'
import moment from 'moment'

import BuqueForm from './BuqueForm'

const BuqueList = () => {
  const { buques, findBuque, deleteBuque, loading } = useContext(BuqueContext)
  console.log(buques)
  const [buque, setBuque] = useState(buques)
  const [deleteBuqueDialog, setDeleteBuqueDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const [selectedProducts, setSelectedProducts] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveBuque = (id) => {
    findBuque(id)
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
  const fechaAtracoTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaAtraco).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaAtraco)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaInicioCargaTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaInicioCarga).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaInicioCarga)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaFinalCargaTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaFinalCarga).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaFinalCarga)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const fechaBuqueCreado = (rowData) => {
    const fecha = moment(rowData.buqueCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaBuqueModificado = (rowData) => {
    const fecha = moment(rowData.buqueModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarBuque = () => {
    deleteBuque(buque.id)
    setDeleteBuqueDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Buque Eliminado',
      life: 3000
    })
  }

  const deleteBuqueDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteBuqueDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarBuque()}
      />
    </>
  )

  const confirmDeleteBuque = (buques) => {
    setBuque(buques)
    setDeleteBuqueDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveBuque(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded  p-button-danger"
          onClick={() => confirmDeleteBuque(rowData)}
        />
      </div>
    )
  }
  const diasTotalesCarga = (rowData) => {
    function secondsToString(diff) {
      const numdays = Math.floor(diff / 86400)
      const numhours = Math.floor((diff % 86400) / 3600)
      const numminutes = Math.floor(((diff % 86400) % 3600) / 60)
      // const numseconds = ((diff % 86400) % 3600) % 60

      return (
        numdays + ' dias ' + numhours + ' horas ' + numminutes + ' minutos '
      )
    }
    const fecha1 = moment(rowData.fechaInicioCarga)
    const fecha2 = moment(
      rowData.fechaFinalCarga ? rowData.fechaFinalCarga : moment()
    ) //
    const diff = fecha2.diff(fecha1, 'seconds') // Diff in days

    return <div className="actions">{secondsToString(diff)}</div>
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Buques</h5>
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
  const clearSelected = () => {
    setDeleteBuqueDialog(false)
  }

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
        value={buques}
        onSelectionChange={(e) => setSelectedProducts(e.value_id)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Buques"
        globalFilter={globalFilter}
        emptyMessage="No hay buques."
        header={header}
        sortField="buqueCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column field="nombreBuque" header="nombreBuque" />
        <Column field="descripcionBuque" header="descripcionBuque" />
        <Column field="clienteBuque" header="clienteBuque" />
        <Column field="clienteVentaBuque" header="clienteVentaBuque" />
        <Column field="paisDestinoBuque" header="paisDestinoBuque" />
        <Column field="capacidadBuque" header="capacidadBuque" />
        <Column
          field="capacidadNominadaBuque"
          header="capacidadNominadaBuque"
        />
        <Column field="capacidadActualBuque" header="capacidadActualBuque" />
        <Column field="etcBuque" header="etcBuque" />
        <Column field="blFinalBuque" header="blFinalBuque" />
        <Column field="totalGabarras" header="totalGabarras" />
        <Column field="cantidadBodegas" header="cantidadBodegas" />
        <Column field="tiempoDemora" header="tiempoDemora" />
        <Column field="costoDemora" header="costoDemora" />
        <Column field="cantidadGruasBuque" header="cantidadGruasBuque" />

        <Column
          field="fechaAtracoBuque"
          header="fecha Atraco"
          body={fechaAtracoTemplate}
          dataType="date"
        />
        <Column
          field="fechaInicioCargaBuque"
          header="fecha Inicio Carga"
          body={fechaInicioCargaTemplate}
          dataType="date"
        />
        <Column
          field="fechaFinalCargaBuque"
          header="fecha Final Carga"
          body={fechaFinalCargaTemplate}
          dataType="date"
        />
        <Column header="Dias Totales de Carga" body={diasTotalesCarga}></Column>

        <Column field="estatusBuque" header="estatus Buque" />

        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <BuqueForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteBuqueDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteBuqueDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {buque && (
            <span>
              Esta seguro que quiere eliminar la buque{' '}
              <b>{buque.nombreBuque}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default BuqueList
