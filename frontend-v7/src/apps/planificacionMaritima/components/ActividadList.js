/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { ActividadContext } from '../contexts/ActividadContext'
import moment from 'moment'

import ActividadForm from './ActividadForm'

const ActividadList = () => {
  const { actividads, findActividad, deleteActividad, loading } =
    useContext(ActividadContext)
  const [actividad, setActividad] = useState(actividads)
  const [deleteBarcoDialog, setDeleteBarcoDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const [selectedProducts, setSelectedProducts] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveBarco = (id) => {
    findActividad(id)
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

  const fechacreadoActividad = (rowData) => {
    const fecha = moment(rowData.creadoActividad)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechamodificadoActividad = (rowData) => {
    const fecha = moment(rowData.modificadoActividad)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarBarco = () => {
    deleteActividad(actividad.id)
    setDeleteBarcoDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Barco Eliminado',
      life: 3000
    })
  }

  const deleteBarcoDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteBarcoDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarBarco()}
      />
    </>
  )

  const confirmDeleteBarco = (barcos) => {
    setActividad(barcos)
    setDeleteBarcoDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveBarco(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded  p-button-danger"
          onClick={() => confirmDeleteBarco(rowData)}
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
      <h5 className="m-0">Actividad</h5>
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
    setDeleteBarcoDialog(false)
  }
  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={
          rowData.imagenDefectoActividad
            ? rowData.imagenDefectoActividad.url
            : 'https://res.cloudinary.com/dlt3eax5v/image/upload/v1675834230/saltarra/saltarrana_on_buzawp.png'
        }
        onError={(e) =>
          (e.target.src =
            'https://res.cloudinary.com/dlt3eax5v/image/upload/v1675834230/saltarra/saltarrana_on_buzawp.png')
        }
        alt={rowData.imagenDefectoActividad}
        className="product-image"
        height="100px"
        width={'100px'}
      />
    )
  }
  const imagenAvanceActividadTemplate = (rowData) => {
    return (
      <img
        src={
          rowData.imagenAvanceActividad
            ? rowData.imagenAvanceActividad.url
            : 'https://res.cloudinary.com/dlt3eax5v/image/upload/v1675834230/saltarra/saltarrana_on_buzawp.png'
        }
        onError={(e) =>
          (e.target.src =
            'https://res.cloudinary.com/dlt3eax5v/image/upload/v1675834230/saltarra/saltarrana_on_buzawp.png')
        }
        alt={rowData.imagenAvanceActividad}
        className="product-image"
        height="100px"
        width={'100px'}
      />
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

      <DataTable
        ref={dt}
        value={actividads}
        onSelectionChange={(e) => setSelectedProducts(e.value_id)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Actividad"
        globalFilter={globalFilter}
        emptyMessage="No hay datos."
        header={header}
        sortField="barcoCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column field="codigoActividad" header="codigoActividad" />
        <Column field="embarcacionId" header="embarcacionId" />
        <Column field="procesoActividad" header="procesoActividad" />
        <Column
          field="nivelPrioridadActividad"
          header="nivelPrioridadActividad"
        />
        <Column field="descripcionActividad" header="descripcionActividad" />
        <Column field="estatusActividad" header="Estatus" />
        <Column
          field="imagenDefectoActividad"
          header="imagenDefectoActividad"
          body={imageBodyTemplate}
        />
        <Column
          field="imagenAvanceActividad"
          header="imagenAvanceActividad"
          body={imagenAvanceActividadTemplate}
        />
        <Column field="responsableUsuarioId" header="responsableUsuarioId" />
        <Column field="fechaInicioActividad" header="fechaInicioActividad" />
        <Column field="fechaFinActividad" header="fechaFinActividad" />
        <Column
          field="creadoActividad"
          body={fechacreadoActividad}
          header="Creado"
          dataType="date"
        />
        <Column
          field="modificadoActividad"
          body={fechamodificadoActividad}
          header="Modificado"
          dataType="date"
        />
      </DataTable>

      <ActividadForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteBarcoDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteBarcoDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {actividad && (
            <span>
              Esta seguro que quiere eliminar la barco{' '}
              <b>{actividad.nombreActividad}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default ActividadList
