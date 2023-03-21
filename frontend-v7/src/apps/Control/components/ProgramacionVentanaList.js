/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { ProgramacionVentanaContext } from '../contexts/ProgramacionVentanaContext'
import moment from 'moment'

import ProgramacionVentanaForm from './ProgramacionVentanaForm'

const ProgramacionVentanaList = () => {
  const {
    programacionVentanas,
    findProgramacionVentana,
    deleteProgramacionVentana,
    loading
  } = useContext(ProgramacionVentanaContext)
  const [programacionVentana, setProgramacionVentana] =
    useState(programacionVentanas)
  const [deleteProgramacionVentanaDialog, setDeleteProgramacionVentanaDialog] =
    useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const [selectedProducts, setSelectedProducts] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveProgramacionVentana = (id) => {
    findProgramacionVentana(id)
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
  const fechaInicioVentana = (rowData) => {
    const validarFecha = moment(rowData.fechaInicioVentana).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaInicioVentana)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaFinVentana = (rowData) => {
    const validarFecha = moment(rowData.fechaFinVentana).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaFinVentana)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaFinalCargaTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaFinalCarga).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaFinalCarga)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const fechaProgramacionVentanaCreado = (rowData) => {
    const fecha = moment(rowData.programacionVentanaCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaProgramacionVentanaModificado = (rowData) => {
    const fecha = moment(rowData.programacionVentanaModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarProgramacionVentana = () => {
    deleteProgramacionVentana(programacionVentana.id)
    setDeleteProgramacionVentanaDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'ProgramacionVentana Eliminado',
      life: 3000
    })
  }

  const deleteProgramacionVentanaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteProgramacionVentanaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarProgramacionVentana()}
      />
    </>
  )

  const confirmDeleteProgramacionVentana = (programacionVentanas) => {
    setProgramacionVentana(programacionVentanas)
    setDeleteProgramacionVentanaDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveProgramacionVentana(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded  p-button-danger"
          onClick={() => confirmDeleteProgramacionVentana(rowData)}
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
      <h5 className="m-0">ProgramacionVentanas</h5>
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
    setDeleteProgramacionVentanaDialog(false)
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
        value={programacionVentanas}
        onSelectionChange={(e) => setSelectedProducts(e.value_id)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} ProgramacionVentanas"
        globalFilter={globalFilter}
        emptyMessage="No hay programacionVentanas."
        header={header}
        sortField="programacionVentanaCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column field="nombreBuque" header="nombreBuque" />
        <Column field="descripcion" header="descripcion" />
        <Column field="terminalBuque" header="terminalBuque" />
        <Column field="buqueCliente" header="buqueCliente" />
        <Column field="buquePaisDestino" header="buquePaisDestino" />
        <Column field="toneladasNominadas" header="toneladasNominadas" />
        <Column
          field="fechaInicioVentana"
          header="fechaInicioVentana"
          body={fechaInicioVentana}
          dataType="date"
        />
        <Column
          field="fechaFinVentana"
          header="fechaFinVentana"
          body={fechaFinVentana}
          dataType="date"
        />

        <Column
          field="programacionVentanaCreado"
          body={fechaProgramacionVentanaCreado}
          header="programacionVentana Creado"
          dataType="date"
        />
        <Column
          field="programacionVentanaModificado"
          body={fechaProgramacionVentanaModificado}
          header="programacionVentana Modificado"
          dataType="date"
        />

        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <ProgramacionVentanaForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <Dialog
        visible={deleteProgramacionVentanaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteProgramacionVentanaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {programacionVentana && (
            <span>
              Esta seguro que quiere eliminar la programacionVentana2{' '}
              <b>{programacionVentana.nombreProgramacionVentana}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default ProgramacionVentanaList
